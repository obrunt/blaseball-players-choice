

const { floatRoll, intRoll } = require("../../middleware/randomRoll");

const { get_strike_threshold } = require("../formulas/getStrikeThreshold");
const { get_swing_strike_threshold, get_swing_ball_threshold } = require("../formulas/getSwingThreshold");
const { get_contact_ball_threshold, get_contact_strike_threshold } = require("../formulas/getContactThreshold");
const { get_out_threshold, get_fly_ground_threshold} = require("../formulas/getOutThreshold");

const { getGameStadium, getBattingTeam, getPitchingTeam, getBatter, getPitcher, getGameOccupiedBases, getGameCounts } = require("../database/fetchGameInfo");
const { pitcherAcidicBlood, get_big_buckets_threshold } = require("../database/fetchGameMisc");
const { increaseResult } = require("./Events/countManagement");
const { get_homerun_threshold, get_triple_threshold, get_double_threshold } = require("../formulas/getAdvanceThreshold");


//These are values that would be easier to be globally access
  //TODO: Check to see if this is a smart thing to do 
var game_id;
var base_count;
var bases_occupied;

var fielder_id;
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


//TODO:
  //Find every instance of check inning change or batter up and combine those into one function
function createEvent(game_id){
  game_id = game_id;

  let base_consts = await getGameOccupiedBases(game_id);
  base_count = base_consts.base_count;
  bases_occupied = base_consts.bases_occupied;


  //TODO: include acidic pitchs
  /*if(pitcherAcidicBlood(game_id)){

  }*/

  //Now that all the non game checks are done we can set a fielder
    //They will be used in a lot of the rolls during active play
  fielder_id = selectFielder();



  //Differing formulas for each situation
  //Because of that, need to have two different option once a ball is thrown
  
  let pitchType;
  //This is a strike thrown
  if(getThreshold('PITCH')){
    pitchType = 'strike';
  }
  //This is a ball
  else{
    pitchType = 'ball';
  }


  //If the batter didn't swing at the ball
  if(getThreshold('SWING', pitchType)){
    //If the ball thrown was a ball
    if(pitchType == 'ball'){
      let ballResult = increaseResult(game_id, 'ball');

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

      //If it was a strikeout
      if(increaseResult(game_id, 'strike')){
        //Checking to see if it would cause an inning change
          //This has to be before the strikeout event because that increases the outs
        const outResult = increaseResult(game_id, 'out');

        //Sending a strikeout event
        send_game_event(game_id, 'STRIKEOUT', false);

        //If the inning will change
        if(outResult){
          //Because the outs are equal to the total outs
          //Change the inning
            //Evalutates if its a top/bottom switch, or a total inning increase
          changeInning();
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
  //If there was no contact
    //Then it's a strike swinging
  if(getThreshold('HIT', pitchType)){
    //Checking to see if increasing the strikes would cause a strikeout

    //If it was a strikeout
    if(increaseResult(game_id, 'strike')){
      //Has to be before strikeout because strikeout increases the results
      const outResult = increaseResult(game_id, 'out');
      
      //Sending a strikeout event
      send_game_event(game_id, 'STRIKEOUT', true);

      
      //Checking to see if it would cause an inning change
      //If the inning will change
      if(outResult){
        //Because the outs are equal to the total outs
        //Change the inning
          //Evalutates if its a top/bottom switch, or a total inning increase
        changeInning();
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

  //It was a foul
  if(getThreshold('FOUL')){
    //Checking to see if increasing the strikes would cause a strikeout
      //Because it's a foul we want to see if we increase the strike count or not
    //Inverting the result because it tells us if increasing would cause an out
    //So we don't want to increase if it's true
    send_game_event(game_id, 'FOUL', !increaseResult(game_id, 'strike'));
    return;
  }


  //The ball was a valid, normal swing
    //Getting the person who will catch the ball

  //If the ball is an out
  if(getThreshold('CATCH')){
    //This is a fly ball
    if(getThreshold('FLYGROUND')){
      //If there are outs left in the inning
        //Runners on base can advance
        //This makes the scoring/advancement distince from the innging change events
      if(!increaseResult(game_id, 'out')){

        let params = {
          bases_occupied: bases_occupied,
          runs: '',
          fielder_id: chosenFielder
        }
        params.runs = advanceBasesOut(false, false);


        send_game_event(game_id, 'FLYOUT', params);

        //We need to get a new batter for the team
        send_game_event(game_id, 'BATTER_UP');
        return;
      }

    //If there are not outs left in the inning
    //Then send a flyout and an inning switch
      let params = {
        runs: '',
        bases_occupied: bases_occupied,
        fielder_id: chosenFielder
      };
      //Sending the flyout, then the inning change
      send_game_event(game_id, 'FLYOUT', params);
      
      //Because the outs are equal to the total outs
      //Change the inning
        //Evalutates if its a top/bottom switch, or a total inning increase
      changeInning();

      return;

      //Sending the FLYOUT result after the runners have advanced
      //This sets the order of (possible) events as
        //Score - if runner on closes base scores
        //Advance - if no score, or for each remaning runner
        //Flyout - set
        //Inning change - if the outs would cause a change
    }

    //If there are still outs left once this one is processed
      //Then there are a few different options that can happen
    if(!increaseResult(game_id, 'out')){

      //Checking to see if someone is on first base
        //If true, then a double play can be made
      if(bases_occupied[0] != ''){

        //Double play is happening
          //Need to check how many outs there are
        if(getThreshold('DOUBLEPLAY')){
          const { outs, out_count } = await getGameCounts(game_id);

          //Getting the current bases because the function expects a base array to replace
            //It will be cleared when the inning ticks over

          let params = {
            bases_occupied: bases_occupied,
            runs: '',
            fielder_id: chosenFielder
          }
    
          if((outs + 2) >= out_count){
            send_game_event(game_id, 'DOUBLE_PLAY', params);

            increaseInning();

            return;
          }

          params.runs = advanceBasesOut(false, true);
            
          send_game_event(game_id, 'DOUBLE_PLAY', params);
          
          //We need to get a new batter for the team
          send_game_event(game_id, 'BATTER_UP');

          return;
        }
        //There is no double play, now need to check a lot of other options
          //Sacrifice
          //Fielders choice
          //Normal ground out
      }

      //The original sim has sacrifices/fielders out only when there's someone on first base
        //This is probably because the first base runner is forced to go to the next base
        //aka actual sports stuff
      //However that's not nessacerily how actual sports stuff works
        //You could have someone on second and want a sacrifice bunt so they can get to third
        //aka actual sports stuff
      //So I've added another roll that has the same thresholds as the double play
        //So that they still have the same chance of happening
      //But it removes the arbitrary limitations of having a forced runner
        //If there wasn't this check then groundouts would only happen when it would be the final out of the inning

      if(getThreshold('SACRIFICEATTEMPT')){

        //Checking to see if the sacrifice goes throught
          //First see if the sacrifice failed
        if(getThreshold('SACRIFICE')){
          //Because the sacrifice didn't work, we need to remove the furthest
            //logic is that the batter attempted to get themselves out first to avoid the more important player
            //And if the scenario failed the fielder would tag them out as well

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
          advanceBasesOut(true, true);

          //We know intuitivly that
          params.bases_occupied = bases_occupied;
          
          send_game_event(game_id, 'FIELDERS_CHOICE', params);

          send_game_event(game_id, 'BATTER_UP');
          
          return;
        }

        //This is the case where the sacrifice went through
          //Advance all other players
            //Sending fielder id to mark a ground out
        let params = {
          bases_occupied: bases_occupied,
          runs: '',
          fielder_id: chosenFielder
        }
        params.runs = advanceBasesOut(false, true);

        send_game_event(game_id, 'SACRIFICE', params);

        send_game_event(game_id, 'BATTER_UP');

        return;
      }

      //TODO: add roll for debt after the ground out

      //This is the scenario where it's a normal advancement on a ground out
      let params = {
        bases_occupied: bases_occupied,
        runs: '',
        fielder_id: chosenFielder
      }
      params.runs = advanceBasesOut(false, true);

      send_game_event(game_id, 'GROUNDOUT', params);

      send_game_event(game_id, 'BATTER_UP');

      return;
    }
    //Because this would be the final out of the inning, it can only be a groundout
    advanceBasesOut(false, true);

    let params = {
      bases_occupied: bases_occupied,
      runs: '',
      fielder_id: chosenFielder
    }
    //Because this is the final out of the inning
    //Baserunners cannot score

    send_game_event(game_id, 'GROUNDOUT', params);
    
    //TODO: add roll for debt after ground out but before the new inning

    //Because the outs are equal to the total outs
    //Change the inning
      //Evalutates if its a top/bottom switch, or a total inning increase
    changeInning();

    return;
  }
  //The ball was not caught
    //Advance as normal

  //We check for base advances in most significant to least significant
    //HomeRuns
    //In theory - games with four bases before home could have a Fourth
    //Triple
    //Double
    //Single is the default

  if(getThreshold('HOMERUN')){

    const batter_id = getBatter();

    let params;

    params.runs = advanceBasesHit(base_count, batter_id);
    params.bases_occupied = bases_occupied;

    if(getThreshold('BUCKETS')){
      //Adding the batter ID to the end of the runs
      params.runs.push(runs[runs.length - 1]);
    }

    send_game_event(game_id, 'HOME_RUN', params);

    send_game_event(game_id, 'BATTER_UP');

    return;
  }

  //We've already rolled for fielder
    //If we were entirely sim accurate then it would go here as well

  if(getThreshold('TRIPLE')){
    const batter_id = getBatter();

    let params;

    params.runs = advanceBasesHit(3, batter_id);
    params.bases_occupied = bases_occupied;

    send_game_event(game_id, 'TRIPLE', params);

    send_game_event(game_id, 'BATTER_UP');

    return;
  }

  
  if(getThreshold('DOUBLE')){
    const batter_id = getBatter();

    let params;

    params.runs = advanceBasesHit(2, batter_id);
    params.bases_occupied = bases_occupied;

    send_game_event(game_id, 'DOUBLE', params);

    send_game_event(game_id, 'BATTER_UP');

    return;
}

  const batter_id = getBatter();

  let params;

  params.runs = advanceBasesHit(1, batter_id);
  params.bases_occupied = bases_occupied;

  send_game_event(game_id, 'SINGLE', params);

  send_game_event(game_id, 'BATTER_UP');

  return;
}


function getThreshold(thresholdType, params){
  //Getting the most commonly used values
  const { batter, pitcher, batting_team, pitching_team } = await getPlayersTeams(game_id);

  let threshold;

  switch(thresholdType){
    case 'PITCH':
      threshold = 1 - get_strike_threshold(batter, batting_team, pitcher, pitching_team, game_id);
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
      //If it's a foul we want to invert the threshold 
        //Math.random < threshold = Math.random > 1 - threshold
        //Getting the value under the line than over the line
      threshold = 1 - get_foul_threshold(batter, batting_team, game_id);
      break;

    case 'CATCH':
      threshold = await get_out_threshold(batter, pitcher, fielder_id, batting_team, pitching_team, game_id);
      break;

    case 'FLYGROUND':
      threshold = 1 - get_fly_ground_threshold(batter, pitcher, batting_team, pitching_team, game_id);
      break;

    case 'DOUBLEPLAY':
      threshold = 1 - get_double_play_threshold(batter, pitcher, fielder_id, batting_team, pitching_team, game_id);
      break;
    
    case 'SACRIFICE':
      threshold = 1 - get_sacrifice(batter, batter_team, game_id);
      break;

    case 'SACRIFICEATTEMPT':
      threshold = get_sacrifice_attempt_threshold(batter, pitcher, fielder_id, batting_team, pitching_team, game_id);
      break;

    case 'HOMERUN':
      threshold = 1 - get_homerun_threshold(batter, pitcher, batting_team, pitching_team, game_id);
      break;

    case 'BUCKETS':
      threshold = 1 - get_big_buckets_threshold(batter, batting_team, game_id);
      break;

    case 'TRIPLE':
      threshold = 1 - get_triple_threshold(batter, pitcher, fielder_id, batter_team, pitching_team, game_id);
      break;

    case 'BASEADVANCEMENT':
      threshold = 1 - get_base_advancement_threshold(params, fielder_id, batter_team, pitching_team, game_id);
      break;
  }

  return Math.random() > threshold;
}

function selectFielder(){
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


function advanceBasesOut(batter_advance, groundout){
  const { batter, pitcher, batting_team, pitching_team } = await getPlayersTeams(game_id);
  //Getting the id of a player if they scored
  let runScored = '';

  const batting_team = getBattingTeam(game_id);

  //Looping through the base array backwards to prevent "clogging" up the advancements
  for(let i = bases_occupied.length - 1; i >= 0; i--){
    //If there is someone on the current base
    if(bases_occupied[i] != ''){
      //Checking to see what advancement threshold we use 
      let advanceThreshold;
      if(groundout) {
        advanceThreshold = get_advance_base_out_ground(bases_occupied[i], fielder_id, batting_team, pitching_team, game_id);
      }
      else {
        advanceThreshold = get_advance_base_out_fly(bases_occupied[i], batting_team, i, game_id);
      }

      const advanceRoll = floatRoll(0, 1);

      if(advanceRoll < advanceThreshold){
        //If advancing bases means they're going home
        if(i+1 == base_count){
          //Run scored
          runScored.push(bases_occupied[i]);
          bases_occupied[i] = '';
        }
        //Checking that the base they're moving to is empty
        else if(base[i+1] == ''){
          //Moving the player up one base
          bases_occupied[i+1] = bases_occupied[i];
          bases_occupied[i] = '';
        }
      }
    }
  }

  if(batter_advance){
    if(bases_occupied[0] == ''){
      bases_occupied[0] = batter; 
    }
    else{
      //Getting the first un ocupied base
      const i = bases_occupied.indexOf('');
      if(i != -1){
        //Removing the unocupied base
        //And adding the batter to the front
          //This shifts everyone up
        bases_occupied.splice(i, 1);
        bases_occupied.unshift(batter);
      }
      else{
        //This means that all the bases are occupied
        //So we add the final base runner to the runs array
        //Then shift everyone up one
        runScored.push(bases_occupied[bases_occupied.length - 1]);
        bases_occupied.pop();
        bases_occupied.unshift(batter);
      }
    }
  }


  //TODO: changing the runs to an array will probably cause some issues later
    //Have to change any instances of runs to loop throught the array and increase the runs
    //Also have to deal with the event message

  return runScored;
}

function advanceBasesHit(bases_forward, batter_id){
  let runScored;

  //Moving all players forward by the know amount
  for(let i = 0; i < bases_forward; i++){
    bases_occupied.shift('');

    //Getting the last index of the array to pop
      //Check to see if someone made it home
      //Add them to the score if they did
    if(bases_occupied[bases_occupied.length - 1] != ''){
      runScored.push(bases_occupied[bases_occupied.length - 1]);
    }

    bases_occupied.pop();
  }

  //Getting all the values that are over the "active" bases
  for(let j = bases_occupied.length - 1; j > 0; j--){
    if(bases_occupied[j] != '' && bases_occupied[j + 1] == '' && getThreshold('BASEADVANCEMENT', bases_occupied[j])){
      bases_occupied[j + 1] = bases_occupied[j];
      bases_occupied[j] = '';
    }
  }

  //If someone on third advanced to home after the inital advancement shifts
  if (bases_occupied.length == base_count){
    runScored.push(bases_occupied[bases_occupied.length - 1]);

    bases_occupied.pop();
  }

  return runScored;
}


function changeInning(){
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


module.export = {
    
};