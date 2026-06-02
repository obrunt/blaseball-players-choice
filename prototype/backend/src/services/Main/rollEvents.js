

const { floatRoll, intRoll } = require("../../middleware/randomRoll");

const { get_strike_threshold } = require("../formulas/getStrikeThreshold");
const { get_swing_strike_threshold, get_swing_ball_threshold } = require("../formulas/getSwingThreshold");

const { getGameStadium, getBattingTeam, getPitchingTeam, getBatter, getPitcher } = require("../database/Reterive/fetchGameInfo");
const { pitcherAcidicBlood } = require("../database/fetchGameMisc");
const { getGameStadium, getBattingTeam, getPitchingTeam } = require("../database/fetchGameInfo");


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


  //TODO
  /*if(pitcherAcidicBlood(game_id)){

  }*/



  //Differing formulas for each situation
  //Becuase of that, need to have two different option once a ball is thrown
    //Would be nice to just combine into one check
    //But want to keep the math as accurate as possible
  
  let pitchType;
  let swingThreshold;

  //This is a strike thrown
  if(throwRoll < pitchThreshold){
    pitchType = 'strike';
    swingThreshold = swingBat(game_id, pitchType);
  }
  //This is a ball
  else{
    pitchType = 'ball';
    swingThreshold = swingBat(game_id, pitchType);
  }

  //Checking to see if the batter swung
  const swingRoll = floatRoll(0,1);

  //If the batter didn't swing at the ball
  if(swingRoll > swingThreshold){
    //If the ball thrown was a ball
    if(pitchType == 'ball'){
      let ballResult = increaseBallResult(game_id);

      //If the ball caused a walk
      if(ballResult){
        send_game_event(game_id, 'WALK');
        send_game_event(game_id, 'BATTER_UP');
        /**
         * 
          if batter has base instincts:
            roll for base instincts (thresholds TODO)
         */
      }
      //If it was just a ball
      else{
        send_game_event(game_id, 'BALL');
      }
      //Going back to the main loop
      return;
    }
    else{

    }




  }
  else{

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



/**
*
roll for strike zone (threshold known)
if pitcher has acidic blood mod:
  roll for acidic blood (threshold TODO)
if batter has flinch and strike count is 0:
  automatic no-swing
else:
  roll for swing (threshold differs based on strike zone roll; both thresholds known)
if batter didn't swing:
  if ball out of zone:
    ball count += 1
    if ball count == # of balls in a walk:
      result is walk
      if batter has base instincts:
        roll for base instincts (thresholds TODO)
    else:
      result is a ball
  else:
    strike count += 1
    if strike count == # of strikes in a strikeout:
      result is strikeout looking
    else:
      result is strike looking/flinching
else:  # batter did swing
  roll for contact (threshold differs based on strike zone roll; both thresholds known)
  if no contact:
    strike count += 1
    if strike count == # of strikes in a strikeout:
      result is strikeout swinging
    else:
      result is strike swinging
  else:  # yes contact
    roll for foul (threshold known)
    if foul:
      result is foul
    else:
      roll to choose a fielder (known)
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