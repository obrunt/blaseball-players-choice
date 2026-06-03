

const { floatRoll, intRoll } = require("../../middleware/randomRoll");

const { get_strike_threshold } = require("../formulas/getStrikeThreshold");
const { get_swing_strike_threshold, get_swing_ball_threshold } = require("../formulas/getSwingThreshold");
const { get_contact_ball_threshold, get_contact_strike_threshold } = require("../formulas/getContactThreshold");

const { getGameStadium, getBattingTeam, getPitchingTeam, getBatter, getPitcher } = require("../database/fetchGameInfo");
const { pitcherAcidicBlood } = require("../database/fetchGameMisc");
const { getGameStadium, getBattingTeam, getPitchingTeam } = require("../database/fetchGameInfo");
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
        const outResult = await increaseResult(game_id, 'out');


        //If the inning will change
        if(outResult){
          //Sending a strikeout event
          send_game_event(game_id, 'STRIKEOUT', false);
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
        //The inning doesn't change
        else{
          //Sending a strikeout event
          send_game_event(game_id, 'STRIKEOUT', false);

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


        //If the inning will change
        if(outResult){
          //Sending a strikeout event
          send_game_event(game_id, 'STRIKEOUT', true);
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
        //The inning doesn't change
        else{
          //Sending a strikeout event
          send_game_event(game_id, 'STRIKEOUT', true);

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
  const fielderRoll = intRoll(0, feilder_ids.length());

  //REturning the player id of the chosen fielder
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
/**
*
else:  # yes contact
  else:
    roll for out (threshold in progress)
    if out:
      num outs += 1
      roll to choose a flyout assigned fielder (known)
      roll for fly (threshold known)
      if fly:
        if num outs < # of outs in a half-inning:
          for each runner in reverse order:
            if the next base is open:
              roll for runner advancement (threshold in progress)
        result is flyout with flyout assigned fielder responsible
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