

const { floatRoll, intRoll } = require("../../middleware/randomRoll");

const { get_strike_threshold } = require("../formulas/getStrikeThreshold");
const { get_swing_strike_threshold, get_swing_ball_threshold } = require("../formulas/getSwingThreshold");
const { get_contact_ball_threshold, get_contact_strike_threshold } = require("../formulas/getContactThreshold");
const { get_out_threshold, get_fly_ground_threshold} = require("../formulas/getOutThreshold");

const { getGameStadium, getBattingTeam, getPitchingTeam, getBatter, getPitcher, getGameOccupiedBases, getGameCounts } = require("../database/fetchGameInfo");
const { pitcherAcidicBlood } = require("../database/fetchGameMisc");
const { increaseResult } = require("./Events/countManagement");


/**
 * roll for return-from-elsewhere (end event if it procs) and name unscattering (thresholds TODO?)
roll for weather, end event if it procs (thresholds TODO)
roll for party, end event if it procs (threshold known)
if weather is flooding:
  roll for flooding, end event if it procs (thresholds TODO)
roll for consumers, end event if it procs (threshold in progress)
if ballpark has peanut mister:
  roll for peanut mister, end event if it procs (threshold TODO)
if ballpark has smithy:
  roll for smithy, end event if it procs (threshold TODO)
if ballpark has secret base:
  roll for secret base, end event if it procs (regular and attractors; thresholds TODO)
if ballpark has grind rail:
  roll for grind rail, end event if it procs (thresholds TODO?)
if ballpark has tunnels:
  roll for tunnels, end event if it procs (threshold TODO)
roll to choose steal fielder (not confirmed)
for each steal-eligible player:
  roll for steal, end event if it procs (thresholds in progress)
if batter has electric blood mod:
  roll for zap, end event if it procs (threshold TODO)
if pitcher has debt and batter is not observed:
  roll for HBP, end event if it procs (threshold TODO)
if weather is birds:
  roll for bird ambush, end event if it procs (threshold TODO)
roll for mild, end event if it procs (roll regardless if the pitcher has the mod; threshold TODO)
if the count is 0-0 and batter or pitcher has charm blood mod:
  roll for charm, end event if it procs (threshold and exact logic TODO)
if batter is magmatic:
  roll for unknown reasons, possibly unused
  automatic home run, end event
  if ballpark has big buckets:
    roll for big buckets (threshold TODO)






*/

function createEvent(game_id){
  const pitchThreshold = throwPitch(game_id);
  const throwRoll = floatRoll(0,1);


  //TODO: include acidic pitchs
    //To be honest, don't like much of the things that can cause runs to be taken away
    //Or non interger runs
    //Just makes it look weird
    //Put it as low priority
  /*if(pitcherAcidicBlood(game_id)){

  }*/



  //Differing formulas for each situation
  //Because of that, need to have two different option once a ball is thrown
  
  let pitchType;
  //This is a strike thrown
  if(throwRoll < pitchThreshold){
    pitchType = 'strike';
  }
  //This is a ball
  else{
    pitchType = 'ball';
  }

  const swingThreshold = swingBat(game_id, pitchType);

  //Checking to see if the batter swung
  const swingRoll = floatRoll(0,1);

  //If the batter didn't swing at the ball
  if(swingRoll > swingThreshold){
    //If the ball thrown was a ball
    if(pitchType == 'ball'){
      let ballResult = await increaseResult(game_id, 'ball');

      //If the ball caused a walk
      if(ballResult){
        //TODO: have base instince, and include this to the WALK event
        /**
         * 
          if batter has base instincts:
            roll for base instincts (thresholds TODO)
         */

        //Sending the walk event
          //This also includes the scenario where the bases are loaded and someone scores
        send_game_event(game_id, 'WALK');
        //Sending a call for a new batter to replace the new one
        send_game_event(game_id, 'BATTER_UP');
        return;
        
      }
      //If it was just a ball
      else{
        send_game_event(game_id, 'BALL');
        return;
      }
      //Going back to the main loop
      return;
    }
    else if(pitchType = 'strike'){
      const strikeResult = await increaseResult(game_id, 'strike');

      //If it was a strikeout
      if(strikeResult){
        //Checking to see if it would cause an inning change
          //This has to be before the strikeout event because that increases the outs
        const outResult = await increaseResult(game_id, 'out');

        //Sending a strikeout event
        send_game_event(game_id, 'STRIKEOUT', false);

        //If the inning will change
        if(outResult){
          //Because the outs are equal to the total outs
          //Change the inning
            //Evalutates if its a top/bottom switch, or a total inning increase
          changeInning(game_id);
          return;
        }
        //The inning doesn't change
        else{
          //Because we know there are outs left in the inning (per previous check)
          //We need to get a new batter for the team
          send_game_event(game_id, 'BATTER_UP');
        }
        return;
      }
      //If it was just a strike
      else {
        send_game_event(game_id, 'STRIKE', false);
        return;
      }
      return;
    }
    //Both have a return inside
    //But if there's an error still want a way to get back to the main loop
    return;
  }
  //If the batter swung at the ball
  else{
    const contactThreshold = hitBall(game_is, pitchType);

    const contactRoll = floatRoll(0,1);
    //If there was no contact
      //Then it's a strike swinging
    if(contactRoll > contactThreshold){
      //Checking to see if increasing the strikes would cause a strikeout
      const strikeResult = await increaseResult(game_id, 'strike');

      //If it was a strikeout
      if(strikeResult){
        //Checking to see if it would cause an inning change
        const outResult = await increaseResult(game_id, 'out');
        
        //Sending a strikeout event
        send_game_event(game_id, 'STRIKEOUT', true);

        //If the inning will change
        if(outResult){
          //Because the outs are equal to the total outs
          //Change the inning
            //Evalutates if its a top/bottom switch, or a total inning increase
          changeInning(game_id);
        }
        //The inning doesn't change
        else{
          //Because we know there are outs left in the inning (per previous check)
          //We need to get a new batter for the team
          send_game_event(game_id, 'BATTER_UP');
        }
        return;
      }
      //If it was just a strike
      else {
        send_game_event(game_id, 'STRIKE', true);
        return;
      }
      return;
    }
    //If there was contact
    else{
      const foulThreshold = validHit(game_id);
      const foulRoll = floatRoll(0,1);

      //It was a foul
      if(foulRoll > foulThreshold){
        //Checking to see if increasing the strikes would cause a strikeout
          //Because it's a foul we want to see if we increase the strike count or not
        const strikeResult = await increaseResult(game_id, 'strike');

        //Inverting the result because it tells us if increasing would cause an out
        //So we don't want to increase if it's true
        send_game_event(game_id, 'FOUL', !strikeResult);
        return;
        
      }
      //The ball was a valid, normal swing
      else{
        //Getting the person who will catch the ball
        const chosenFielder = selectFielder(game_id);

        const outThreshold = catchBall(game_id, chosenFielder);

        const outRoll = floatRoll(0, 1);

        //If the ball is an out
        if(outRoll > outThreshold){
          const outResult = await increaseResult(game_id, 'out');

          const flyThreshold = catchAirGround(game_id);

          const flyRoll = floatRoll(0, 1);

          //This is a fly ball
          if(flyRoll > flyThreshold){
            //If there are outs left in the inning
              //Runners on base can advance
              //This makes the scoring/advancement distince from the innging change events
            if(!outResult){
              const current_bases = await getGameOccupiedBases(game_id);

              let params = advanceBases(game_id, current_bases.base_arr, current_bases.base_count);
              params.fielder_id = chosenFielder;

              send_game_event(game_id, 'FLYOUT', params);
              return;
            }
            //If there are not outs left in the inning
            //Then send a flyout and an inning switch
            else{

              let params = {
                runs: '',
                bases_occupied: '',
                fielder_id: chosenFielder
              };
              //Sending the flyout, then the inning change
              send_game_event(game_id, 'FLYOUT', params);
              
              //Because the outs are equal to the total outs
              //Change the inning
                //Evalutates if its a top/bottom switch, or a total inning increase
              changeInning(game_id);

              return;
  
            }
            //Sending the FLYOUT result after the runners have advanced
            //This sets the order of (possible) events as
              //Score - if runner on closes base scores
              //Advance - if no score, or for each remaning runner
              //Flyout - set
              //Inning change - if the outs would cause a change
          }
          //This is a ground out
          else {
            /**
             * FLOWCHART:
            # -Always roll for DP. Always. Ignore the roll if no runner on first.
            # -If runner on first (DP is possible):
            #     -Roll Where.
            #     -If DP pass:
            #         -If this ends the inning, DONE
            #         -If only forced runner is on first: Doesn't matter
            #         -Elif two forced runners:
            #             -Roll < 1/2 -> Out at third
            #             -Roll > 1/2 -> Out at second
            #         -Elif three forced runners:
            #             -Roll < 1/3 -> Out at home
            #             -Roll > 1/3, < 2/3 -> Out at third
            #             -Roll > 2/3 -> Out at second
            #         -Advance all other runners
            #     -Elif DP fail:
            #         -Roll Sacrifice
            #         -If Sacrifice fail:
            #             -Most advanced runner is out.
            #             -Advance everyone else
            #         -Elif Sacrifice pass:
            #             -Roll Advancement for every baserunner
            #             -For each runner:
            #                  -If not forced:
            #                      -Check advancement roll. Rolls apply in basesOccupied order aka most advanced first ([2,1,2,0] untested!!!)
            #                  -Elif forced:
            #                      -If initial baserunners were [2,0] AND 3rd base PASSED advancement (:ballclark:):
            #                          -Check advancement roll for 1st base.
            #                      -Elif any other baserunner configuration:
            #                          -Advance
            # -Elif no runner on first:
            #      -For each runner:
            #         -If not forced:
            #             -Check advancement roll. Rolls apply in basesOccupied order aka most advanced first ([2,1,2,0] untested!!!)
            #         -Elif forced:
            #             -If initial baserunners were [2,0] AND 3rd base PASSED advancement (:ballclark:):
            #                 -Check advancement roll for 1st base.
            #             -Elif any other baserunner configuration:
            #                 -Advance
             */


            //IF there are still outs left once this one is processed
              //Then there are a few different options that can happen
            if(!outResult){
              //Getting the bases that are loaded because it's relevent for the checks
              const bases = JSON.parse(await getGameOccupiedBases(game_id));

              //Checking to see if someone is on first base
                //If true, then a double play can be made
              if(bases.bases_occupied[0] != ''){
                const doublePlayThreshold = doublePlay(game_id, chosenFielder);

                const doublePlayRoll = floatRoll(0, 1);

                //Double play is happening
                  //Need to check how many outs there are
                if(doublePlayRoll > doublePlayThreshold){
                  const { outs, out_count } = await getGameCounts(game_id);

                  //If the double play were to start a new inning
                    //Then get a 
                  if((outs + 2) >= out_count){
                    //Getting the current bases because the function expects a base array to replace
                      //It will be cleared when the inning ticks over
                    const { bases_occupied } = await getGameOccupiedBases(game_id);

                    send_game_event(game_id, 'DOUBLE_PLAY', bases_occupied);

                    increaseInning(game_id);
                  }
                  else{
                    var { bases_occupied, base_count } = await getGameOccupiedBases(game_id);

                    //Getting the bases that have people on them
                    const player_bases = bases_occupied.filer((base) => base != '');
                    //Rolling for the player who will be tagged out
                    const baseRoll = intRoll(0, player_bases.length());

                    //Getting the index of it within the actual base array
                    const player_index = bases_occupied.indexOf(player_bases[baseRoll]);

                    //Removing the player who was out
                      //TODO: see if this player needs to be saved for the event message
                    bases_occupied[player_index] = '';
                    
                    //Advance all other players
                    //let {runs, bases_occupied } = advanceBasesOut(game_id, bases_occupied, base_count);
                  }
                }
              }

            }
            else{

            }
          }

          if(outResult){

          }
        }
        //The ball was not caught
          //Advance as normal
        else{

        }
      }
    }
  }


  return;
}


//Could probably turn these into generics
  //Do like how they all have easy to understand names tho

function throwPitch(game_id){  
  const batting_team = getBattingTeam(game_id);
  const pitching_team = getPitchingTeam(game_id);

  const batter = getBatter(game_id);
  const pitcher = getPitcher(game_id);

  //Getting the limits for the roll
  const threshold = get_strike_threshold(batter, batting_team, pitcher, pitching_team, game_id);
  
  return threshold;
}

function swingBat(game_id, throwType){
  const batting_team = getBattingTeam(game_id);
  const pitching_team = getPitchingTeam(game_id);

  const batter = getBatter(game_id);
  const pitcher = getPitcher(game_id);


  const batFlinch = await batterFlinch(game_id);
  const gameCount = await getGameCounts(game_id);

  //This is an automatic no-swing
  if(batFlinch && gameCount.strikes == 0){
    return false;
  }

  let swingThreshold;

  if(throwType = 'strike'){
    swingThreshold = get_swing_strike_threshold(batter, batting_team, pitcher, pitching_team, game_id);
  }
  //Technically this isn't needed
    //Keep for readability
  else if(throwType = 'ball'){
    swingThreshold = get_swing_ball_threshold(batter, batting_team, pitcher, pitching_team, game_id);
  }

  return swingThreshold;
}

function hitBall(game_id, throwType){
  const batting_team = getBattingTeam(game_id);
  const pitching_team = getPitchingTeam(game_id);

  const batter = getBatter(game_id);
  const pitcher = getPitcher(game_id);

  let contactThreshold;

  if(throwType = 'strike'){
    contactThreshold = get_contact_strike_threshold(batter, batting_team, pitcher, pitching_team, game_id);
  }
  //Technically this isn't needed
    //Keep for readability
  else if(throwType = 'ball'){
    contactThreshold = get_contact_ball_threshold(batter, batting_team, pitcher, pitching_team, game_id);
  }

  return contactThreshold;
}

function validHit(game_id){
  const batting_team = getBattingTeam(game_id);

  const batter = getBatter(game_id);

  let threshold = get_foul_threshold(batter, batting_team, game_id);

  return threshold;
}

function selectFielder(game_id){
  const pitching_team = await getPitchingTeam(game_id);

  //Getting the batters who are present
    //Because the pitching team is, well, pitching
    //The batters are in charge of getting the outs
  const fielder_ids = await getTeamPresentPlayers(pitching_team, 0);

  //The int roll is non inclusive for the right value
  //So we can just use the length of the list
  const fielderRoll = intRoll(0, fielder_ids.length());

  //Returning the player id of the chosen fielder
  return fielder_ids[fielderRoll];
}

function catchBall(game_id, fielder){
  const batting_team = getBattingTeam(game_id);
  const pitching_team = getPitchingTeam(game_id);

  const batter = getBatter(game_id);
  const pitcher = getPitcher(game_id);

  const threshold = await get_out_threshold(batter, pitcher, fielder, batting_team, pitching_team, game_id);

  return threshold;
}

function catchAirGround(game_id){
  const batting_team = getBattingTeam(game_id);
  const pitching_team = getPitchingTeam(game_id);

  const batter = getBatter(game_id);
  const pitcher = getPitcher(game_id);
  
  const threshold = get_fly_ground_threshold(batter, pitcher, batting_team, pitching_team, game_id);

  return threshold;
}

function doublePlay(game_id, fielder){
  const batting_team = getBattingTeam(game_id);
  const pitching_team = getPitchingTeam(game_id);

  const batter = getBatter(game_id);
  const pitcher = getPitcher(game_id);
  
  const threshold = get_double_play_threshold(batter, pitcher, fielder, batting_team, pitching_team, game_id);

  return threshold;
}

function advanceBasesOut(game_id, base_arr, base_count){
  //Getting the id of a player if they scored
  let runScored = '';

  const batting_team = getBattingTeam(game_id);

  //Looping through the base array backwards to prevent "clogging" up the advancements
  for(let i = base_arr.length() - 1; i >= 0; i--){
    //If there is someone on the current base
    if(base_arr[i] != ''){
      //Checking to see if the 
      const advanceThreshold = get_advance_base_out(base_arr[i], batting_team, i, game_id);

      const advanceRoll = floatRoll(0, 1);

      if(advanceRoll > advanceThreshold){
        //If advancing bases means they're going home
        if(i+1 == base_count){
          //Run scored
          runScored = base_arr[i];
          base_arr[i] = '';
        }
        //Checking that the base they're moving to is empty
        else if(base[i+1] == ''){
          //Moving the player up one base
          base_arr[i+1] = base_arr[i];
          base_arr[i] = '';
        }
      }
    }
  }

  const params = {
    runs: runScored,
    bases_occupied: base_arr
  }

  return params;
  /**
        elif self.ty == EventType.GROUND_OUT:
            if len(self.update["basesOccupied"]) > 0:
                # roll needs batter tragicness, fielder tenaciousness, pitcher shakespearianism
                dp_roll = self.roll("dp?")
                if self.batter.undefined():
                    # tragicness?
                    # the control flow is really weird here
                    # if there's no player on first, why would it roll for batter but not for fielder...?
                    # unless it's something else, i guess
                    self.roll("undefined (dp batter)")

                if Base.FIRST in self.update["basesOccupied"]:
                    if fielder.undefined():
                        self.roll("undefined (dp fielder)")
                        pass

                    is_dp = "into a double play!" in self.desc
                    is_fc = "on fielder's choice" in self.desc
                    self.log_roll(Csv.GROUNDOUT_FORMULAS, "DP", dp_roll, is_dp, fielder=fielder)

                    if is_dp:
                        # ...wait, is this just the martyr? roll?
                        self.roll("dp where")  # (index into basesOccupied)

                        # todo:this interacts weirdly with undefined
                        self.damage(self.pitcher, "pitcher")

                        if self.outs < self.max_outs - 2:
                            for base, runner_id in zip(self.next_update["basesOccupied"], self.next_update["baseRunners"]):
                                runner = self.data.get_player(runner_id)
                                self.damage(runner, "runner")

                        if "scores!" in self.desc:
                            # assuming this is always first?
                            scoring_runner = self.data.get_player(self.update["baseRunners"][0])

                            # "surviving" player takes damage (including scoring) but they get swept from bases
                            # so we just roll twice here
                            self.damage(scoring_runner, "runner")
                            self.damage(scoring_runner, "runner")

                        self.damage(self.pitcher, "pitcher")

                        return

                    if self.batter.undefined():
                        self.roll("undefined (martyr?)")

                    # needs batter martyrdom, runner indulgence
                    fc_roll = self.roll("martyr?")  # high = fc
                    self.log_roll(Csv.GROUNDOUT_FORMULAS, "Sac", fc_roll, not is_fc, fielder=fielder)

                    if is_fc:
                        # so this is a rough outline, we could probably clean up this logic
                        damage_runners = []

                        if self.update["basesOccupied"] == [2, 1, 0]:
                            damage_runners = [1, 0]  # does not include a 2 atvl
                        elif self.update["basesOccupied"] == [1, 0]:
                            damage_runners = [0]  # unsure
                        elif self.update["basesOccupied"] == [2, 0]:
                            damage_runners = [2, 2]  # this one is correct... or maybe not?
                            if self.stadium.has_mod(Mod.EXTRA_BASE):
                                damage_runners = [2]
                        elif self.update["basesOccupied"] == [0]:
                            damage_runners = []
                        elif self.update["basesOccupied"] == [3, 0]:
                            damage_runners = [3, 3]  # unsure
                        elif self.update["basesOccupied"] == [3, 1, 0]:
                            damage_runners = [3, 3, 1]  # unsure but there's 3
                        elif self.update["basesOccupied"] == [3, 2, 0]:
                            damage_runners = [3, 3, 2] # also unsure but there's 3

                        self.damage(self.pitcher, "pitcher")

                        for rbase in damage_runners:
                            idx = self.update["basesOccupied"].index(rbase)
                            runner_id = self.update["baseRunners"][idx]
                            runner = self.data.get_player(runner_id)
                            self.damage(runner, "runner")

                        return

            # as of s24, this is before item rolls for sure
            # see: 2021-07-28T10:08:43.892Z
            self.try_roll_batter_debt(fielder)

            self.damage(self.pitcher, "pitcher")
            # there's some weird stuff with damage rolls in the first fragment of s16
            # this seems to work for groundouts but something similar might be up for flyouts
            if (self.season, self.day) >= (15, 3):
                self.damage(self.batter, "fielder")
                self.damage(fielder, "fielder")

            forced_bases = 0
            while forced_bases in self.update["basesOccupied"]:
                forced_bases += 1

            base_before_home = Base.FOURTH if self.stadium.has_mod(Mod.EXTRA_BASE) else Base.THIRD
            for base, runner_id in zip(self.update["basesOccupied"], self.update["baseRunners"]):
                runner = self.data.get_player(runner_id)

                was_forced = base < forced_bases
                if self.event["created"] in ["2021-05-12T13:20:27.312Z", "2021-05-17T19:19:27.034Z"]:
                    # did_advance gets confused because the same runner is on two bases.
                    roll_outcome = True
                else:
                    roll_outcome = did_advance(base, runner_id) if not was_forced else None

                # needs... fielder tenaciousness and runner indulgence?
                adv_roll = self.roll(f"adv? {base}/{runner.name} ({roll_outcome})")
                if self.batter.undefined() and base == base_before_home: # sac?
                    # self.roll("undefined (advance batter)")
                    pass
                if runner.undefined():
                    self.roll("undefined (advance runner)")
                if fielder.undefined():
                    self.roll("undefined (runner adv fielder)")

                if roll_outcome and base == base_before_home and not was_forced:
                    # when a runner scores from third, it "ignores" forcing logic
                    # ie. [2, 0] -> [0] is possible! (first *isn't* forced to second. even if they probably should)
                    forced_bases = 0

                if roll_outcome is not None:
                    self.log_roll(
                        Csv.GROUNDOUT_FORMULAS,
                        "advance",
                        adv_roll,
                        roll_outcome,
                        fielder=fielder,
                        relevant_runner=runner,
                    )

                if roll_outcome or was_forced:
                    self.damage(runner, "batter")

                    if base == base_before_home:
                        if (self.season, self.day) >= (15, 3):
                            self.damage(runner, "batter")

                        else:
                            self.damage(self.batter, "batter")

            if (self.season, self.day) < (15, 3):
                self.damage(self.batter, "fielder")
                self.damage(fielder, "fielder")
                pass
    */
}

function changeInning(game_id){
  //If it is currently the top of the inning
  //Switch it to the bottom of the inning
  //Otherwise increase the inning
    //Evalutaions for ending the game are within the inning increase event
  const increaseInning = await getGameInning(game_id);

  if(increaseInning.top_of_inning){
    send_game_event(game_id, 'INNING_BOTTOM');
  }
  else{
    send_game_event(game_id, 'INNING_TOP');
  }
  return;
}
/**
*
else:  # yes contact
  else:
    roll for out (threshold in progress)
    if out:
      num outs += 1
      if fly:
      else:
        roll to choose a ground out assigned fielder (known)
        if num outs < # of outs in a half-inning:
          refer to https://github.com/xSke/resim/blob/83cb0d6165da8e099bc41e634272fcce8efe55d8/resim.py#L871 for double play, fielders choice, and runner advancement logic (all thresholds known)
        else:
          result is groundout with ground out assigned fielder responsible
      if batter has debt, result is a simple ground out or flyout, and assigned fielder is not already observed:
        roll for debt (threshold TODO)
    else:  # not an out
      roll for home run (threshold known)
      if home run:
        result is home run
        roll buckets (threshold unknown)
      else:  # base hit
        roll for fielder (known)
        roll for double (threshold known)
        roll for triple (threshold known)
        if triples roll passed:
          result is triple
        else if doubles roll passed:
          result is double
        else:
          result is single
        apply automatic advancement based on the hit type
        for each runner in reverse order:
          if the next base is open:
            roll for extra runner advancement (threshold TODO)
if batter is reverberating and this event ends the PA and it wasn't a hit or HR:
  roll for reverberating (threshold TODO)
if the attractor async thing happened:  # idk ask astrid
  roll for attractor's fake stars (formula known)
 */




module.export = {
    
};