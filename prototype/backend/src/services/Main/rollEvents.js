

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
//TODO:
  //We love monolithic functions
  //Want to change this to something smaller



function createEvent(game_id){
  const pitchThreshold = getThreshold(game_id, 'PITCH');

  const throwRoll = floatRoll(0,1);


  //TODO: include acidic pitchs
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

  const swingThreshold = getThreshold(game_id, 'SWING', pitchType);

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

  const contactThreshold = getThreshold(game_id, 'HIT', pitchType);

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
    send_game_event(game_id, 'STRIKE', true);
    return;
  }
  //If there was contact

  const foulThreshold = getThreshold(game_id, 'FOUL');
  const foulRoll = floatRoll(0,1);

  //It was a foul
  if(foulRoll < foulThreshold){
    //Checking to see if increasing the strikes would cause a strikeout
      //Because it's a foul we want to see if we increase the strike count or not
    const strikeResult = await increaseResult(game_id, 'strike');

    //Inverting the result because it tells us if increasing would cause an out
    //So we don't want to increase if it's true
    send_game_event(game_id, 'FOUL', !strikeResult);
    return;
  }


  //The ball was a valid, normal swing
    //Getting the person who will catch the ball
  const chosenFielder = selectFielder(game_id);

  const outThreshold = getThreshold(game_id, 'CATCH', chosenFielder);

  const outRoll = floatRoll(0, 1);

  //If the ball is an out
  if(outRoll > outThreshold){
    const outResult = await increaseResult(game_id, 'out');

    const flyThreshold = getThreshold(game_id, 'FLYGROUND');

    const flyRoll = floatRoll(0, 1);

    //This is a fly ball
    if(flyRoll < flyThreshold){
      //If there are outs left in the inning
        //Runners on base can advance
        //This makes the scoring/advancement distince from the innging change events
      if(!outResult){
        const { base_count, bases_occupied} = await getGameOccupiedBases(game_id);

        let params = advanceBasesOut(game_id, bases_occupied, base_count);
        params.fielder_id = chosenFielder;

        send_game_event(game_id, 'FLYOUT', params);
        return;
      }


    //If there are not outs left in the inning
    //Then send a flyout and an inning switch
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

      //Sending the FLYOUT result after the runners have advanced
      //This sets the order of (possible) events as
        //Score - if runner on closes base scores
        //Advance - if no score, or for each remaning runner
        //Flyout - set
        //Inning change - if the outs would cause a change
    }
  }



    //This is a ground out
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


  //If there are still outs left once this one is processed
    //Then there are a few different options that can happen
  if(!outResult){
    //Getting the bases that are loaded because it's relevent for the checks
    const bases = JSON.parse(await getGameOccupiedBases(game_id));

    //Checking to see if someone is on first base
      //If true, then a double play can be made
    if(bases.bases_occupied[0] != ''){
      const doublePlayThreshold = getThreshold(game_id, 'DOUBLEPLAY', chosenFielder);

      const doublePlayRoll = floatRoll(0, 1);

      //Double play is happening
        //Need to check how many outs there are
      if(doublePlayRoll < doublePlayThreshold){
        const { outs, out_count } = await getGameCounts(game_id);

        //If the double play were to start a new inning
          //Then get a 
        if((outs + 2) >= out_count){
          //Getting the current bases because the function expects a base array to replace
            //It will be cleared when the inning ticks over
          const { bases_occupied } = await getGameOccupiedBases(game_id);

          const params = {
            runs: '',
            bases_occupied: bases_occupied,
            fielder_id: chosenFielder
          };

          send_game_event(game_id, 'DOUBLE_PLAY', params);

          increaseInning(game_id);

          return;
        }
      }
    }
    //These are calls that don't depend on a runner being on first
    
    //There is no double play, now need to check a lot of other options
      //Sacrifice
      //Fielders choice
      //Normal ground out

    //Sacrifice rolling
    const sacrificeThreshold = getThreshold(game_id, 'SACRIFICE');

    const sacrificeRoll = floatRoll(0, 1);

    //Checking to see if the sacrifice goes throught
      //First see if the sacrifice failed
    if(sacrificeRoll > sacrificeThreshold){
      //Because the sacrifice didn't work, we need to remove the furthest
        //logic is that the batter attempted to get themselves out first to avoid the more important player
        //And if the scenario failed the fielder would tag them out as well
      var { bases_occupied, base_count } = await getGameOccupiedBases(game_id);

      //Getting the bases that have people on them
      const last_player_base = bases_occupied.filer(base => base).pop();

      //Getting the index of it within the actual base array
      const player_index = bases_occupied.indexOf(last_player_base);


      //Saving the id of the player who was out
      //Setting the last base to be null
      let params = {
        runner_id: bases_occupied[player_index],
        runner_base: player_index
      };
      bases_occupied[player_index] = '';

      //Advance all other players
        //Sending fielder id to mark a ground out
      let { base_arr } = advanceBasesOut(game_id, bases_occupied, base_count, chosenFielder, true);

      //We know intuitivly that
      params.bases_occupied = base_arr;
      
      send_game_event(game_id, 'FIELDERS_CHOICE', params);
      
      return;
    }

    //This is the case where the sacrifice went through
    //Advance all other players
      //Sending fielder id to mark a ground out
    const params = advanceBasesOut(game_id, bases_occupied, base_count, chosenFielder, false);


    send_game_event(game_id, 'SACRIFICE', params);

    return;
  }

    //The ball was not caught
      //Advance as normal

  return;
}


function getThreshold(game_id, thresholdType, params){
  //Getting the most commonly used values
  const { batter, pitcher, batting_team, pitching_team } = await getPlayersTeams(game_id);

  let threshold;

  switch(thresholdType){
    case 'PITCH':
      threshold = get_strike_threshold(batter, batting_team, pitcher, pitching_team, game_id);
      break;

    case 'SWING':
      const batFlinch = await batterFlinch(game_id);
      const gameCount = await getGameCounts(game_id);

      //This is an automatic no-swing
      if(batFlinch && gameCount.strikes == 0){
        return 0.00;
      }

      if(params = 'strike'){
        threshold = get_swing_strike_threshold(batter, batting_team, pitcher, pitching_team, game_id);
      }
      //Technically this isn't needed
        //Keep for readability
      else if(params = 'ball'){
        threshold = get_swing_ball_threshold(batter, batting_team, pitcher, pitching_team, game_id);
      }
      break;

    case 'HIT':
      if(params = 'strike'){
        threshold = get_contact_strike_threshold(batter, batting_team, pitcher, pitching_team, game_id);
      }
      //Technically this isn't needed
        //Keep for readability
      else if(params = 'ball'){
        threshold = get_contact_ball_threshold(batter, batting_team, pitcher, pitching_team, game_id);
      }
      break;

    case 'FOUL':
      threshold = get_foul_threshold(batter, batting_team, game_id);
      break;

    case 'CATCH':
      threshold = await get_out_threshold(batter, pitcher, params, batting_team, pitching_team, game_id);
      break;

    case 'FLYGROUND':
      threshold = get_fly_ground_threshold(batter, pitcher, batting_team, pitching_team, game_id);
      break;

    case 'DOUBLEPLAY':
      threshold = get_double_play_threshold(batter, pitcher, params, batting_team, pitching_team, game_id);
      break;
    
    case 'SACRIFICE':
      threshold = get_sacrifice(batter, batter_team, game_id);
      break;
  }

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
  const fielderRoll = intRoll(0, fielder_ids.length);

  //Returning the player id of the chosen fielder
  return fielder_ids[fielderRoll];
}

/*
function advanceBases(game_id, base_arr, base_forward, base_count, advance_type, fielder_id){
  const { batter, pitcher, batting_team, pitching_team } = await getPlayersTeams(game_id);

  //Getting the id of a player if they scored
  let runScored = '';

  const batting_team = getBattingTeam(game_id);

  //Looping through the base array backwards to prevent "clogging" up the advancements
    //Basecount minus one because the final one is the home plate
  for(let i = base_count - 1; i >= 0; i--){
    //If there is someone on the current base
    if(base_arr[i] != ''){
      //Checking to see if they can advance
        //Switching between the different secnarios 
      let advanceThreshold;

      switch(advance_type){
        case 'GROUNDOUT':
          advanceThreshold = get_advance_base_out_ground(base_arr[i], fielder_id, batting_team, pitching_team, game_id);
          break;
        case 'FLYOUT':
          advanceThreshold = get_advance_base_out_fly(base_arr[i], batting_team, i, game_id);
          break;
        case 'SINGLE':
          break;
        case 'DOUBLE':
          break;
        case 'HOMERUN':
          break;
        
      }

      //const advanceThreshold = get_advance_base_out(base_arr[i], batting_team, i, game_id);

      const advanceRoll = floatRoll(0, 1);

      if(advanceRoll < advanceThreshold){
        //If advancing bases means they're going home or beyond
        if((i + base_forward) >= base_count){
          //Run scored
          runScored.push(base_arr[i]);
          base_arr[i] = '';
        }
        //Checking that the base they're moving to is empty
        else if(base[i + base_forward] == ''){
          //Moving the player up one base
          base_arr[i + base_forward] = base_arr[i];
          base_arr[i] = '';
        }
      }
    }
  }

  const params = {
    runs: runScored,
    base_arr: base_arr
  }

  return params;
}
  */

function advanceBasesOut(game_id, base_arr, base_count, fielder_id, batter_advance){
  const { batter, pitcher, batting_team, pitching_team } = await getPlayersTeams(game_id);
  //Getting the id of a player if they scored
  let runScored = '';

  const batting_team = getBattingTeam(game_id);

  //Looping through the base array backwards to prevent "clogging" up the advancements
  for(let i = base_arr.length - 1; i >= 0; i--){
    //If there is someone on the current base
    if(base_arr[i] != ''){
      //Checking to see what advancement threshold we use 
      let advanceThreshold;
      if(fielder_id != '') {
        advanceThreshold = get_advance_base_out_ground(base_arr[i], fielder_id, batting_team, pitching_team, game_id);
      }
      else {
        advanceThreshold = get_advance_base_out_fly(base_arr[i], batting_team, i, game_id);
      }

      const advanceRoll = floatRoll(0, 1);

      if(advanceRoll < advanceThreshold){
        //If advancing bases means they're going home
        if(i+1 == base_count){
          //Run scored
          runScored.push(base_arr[i]);
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

  if(batter_advance){
    if(base_arr[0] == ''){
      base_arr[0] = batter; 
    }
    else{
      //Getting the first un ocupied base
      const i = base_arr.indexOf('');
      if(i != -1){
        //Removing the unocupied base
        //And adding the batter to the front
          //This shifts everyone up
        base_arr.splice(i, 1);
        base_arr.unshift(batter);
      }
      else{
        //This means that all the bases are occupied
        //So we add the final base runner to the runs array
        //Then shift everyone up one
        runScored.push(base_arr[base_arr.length - 1]);
        base_arr.pop();
        base_arr.unshift(batter);
      }
    }
  }


  //TODO: changing the runs to an array will probably cause some issues later
    //Have to change any instances of runs to loop throught the array and increase the runs
    //Also have to deal with the event message
  const params = {
    runs: runScored,
    base_arr: base_arr
  }

  return params;
}

function advanceBasesHit(game_id, base_arr, bases_forward, base_count){
  let runs;

  //Moving all players forward by the know amount
  for(let i = 0; i < bases_forward; i++){
    base_arr.shift('');
  }

  //Getting all the values that are over the "active" bases
  for(let j = base_arr.length; j < base_count; j--){
    //If an 
    if(base_arr[j] != ''){
      runs.push(base_arr[j]);
    }
    base_arr.pop();
  }

  const result = {
    runs: runs,
    base_arr: base_arr
  }

  return result;
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