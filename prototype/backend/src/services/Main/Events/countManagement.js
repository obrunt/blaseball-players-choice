const { pool } = require("../../../../config/db");
const { roll } = require("../../../middleware/randomRoll");


const { getGameCounts } = require("../../database/fetchGameInfo");

const { getPlayerTeam, getPlayerStat } = require("../../database/fetchPlayerInfo");


async function getPreviousRow(game_id) {
  const previousRowQuery =  `
    SELECT *
    WHERE game_id = ?
    ORDER BY event_index DESC
    LIMIT 1;
  `;
  try {
    let result = await pool.query(previousRowQuery, [game_id]);

  } catch (err){
    console.log(err);
  }

  return result;
}

async function sendNewRow(result){

  const newRowQuery = `
  INSERT INTO data.game_events (
        game_id,
        event_type,
        event_index,
        inning,
        top_of_inning,
        batter_id,
        batter_position,
        pitcher_id,
        pitcher_team_id,
        batter_team_id,
        home_team_id,
        away_team_id,
        home_score,
        away_score,
        home_strike_count,
        away_strike_count,
        bases_occupied,
        strikes,
        outs,
        balls,
        is_last_game_event,
        event_text,
        season,
        day,
        home_ball_count,
        away_ball_count,
        home_base_count,
        away_base_count,
        home_out_count,
        away_out_count,
        home_strike_count,
        away_strike_count,
        tournament  
  ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
  );`;

  try {
    result = await pool.query(newRowQuery, [
        result.game_id,
        result.event_type,
        result.event_index,
        result.inning,
        result.top_of_inning,
        result.batter_id,
        result.batter_position,
        result.pitcher_id,
        result.pitcher_team_id,
        result.batter_team_id,
        result.home_team_id,
        result.away_team_id,
        result.home_score,
        result.away_score,
        result.home_strike_count,
        result.away_strike_count,
        result.bases_occupied,
        result.strikes,
        result.outs,
        result.balls,
        result.is_last_game_event,
        result.event_text,
        result.season,
        result.day,
        result.home_ball_count,
        result.away_ball_count,
        result.home_base_count,
        result.away_base_count,
        result.home_out_count,
        result.away_out_count,
        result.home_strike_count,
        result.away_strike_count,
        result.tournament 
    ]);

    //Sending the OK message
    return result[0];
  } catch (err){
    console.log(err);
  }
}



async function sendBall(game_id) {
  let result = await getPreviousRow(game_id);

  result.balls += 1;
  result.event_index += 1;

  result.event_type = 'BALL';
  result.event_text = `Ball. ${result.balls}-${result.strikes}`

  const ok = await sendNewRow(result);

  return;
}

async function sendWalk(game_id) {
  let result = await getPreviousRow(game_id);

  let baseArr = JSON.parse(result.bases_occupied);

  //Taking the current value at the base
  //Saving it and moving the current value there
  let occupiedBase = baseArr[0];
  let baseHold;
  baseArr[0] = result.batter_id;

  //TODO: change this loop to match the number of bases the stadium has
  for(let i = 1; i < 3; i++){
    if(occupiedBase == ''){
        //If the previous base value was empty
        //Then exit the loop
        break;
    }
    else {
        //Taking the current base and saving the value
        baseHold = baseArr[i];
        //Moving the previous base value to the current base
        baseArr[i] = occupiedBase;
        //Saving the previous current base value to check if it was empty
        occupiedBase = baseHold;
    }
  }

  //Updating universial cases
  result.event_index += 1;
  result.balls = 0;
  result.strikes = 0;
  result.bases_occupied = baseArr;

  //Getting the batter name
  const batterName = await getPlayerStat('full_name', result.batter_id);

  result.event_type = 'WALK';
  result.event_text = `${batterName} draws a walk.`;



  //If all the bases did have someone on it
  //Then we need to increase the score, and add it to the event text
  if(occupiedBase != ''){
    //Getting the correct team, so that we can increase the correct team score
    const playerTeam = await getPlayerTeam(occupiedBase);
    if(playerTeam == result.home_team){
      result.home_score += 1;
    }
    else if(playerTeam == result.away_team){
      result.away_score += 1;
    }
    const scoringPlayerName = await getPlayerStat('full_name', occupiedBase);

    result.event_text += `\n${scoringPlayerName} scores! \n1 Run scored!`;
  }

  const ok = await sendNewRow(result);

  return;
}

async function sendStrikeout(game_id, didSwing) {
  let result = await getPreviousRow(game_id);

  result.event_index += 1;

  //Increasing the outs, and setting the batter specific counts back to zero
  result.outs += 1;
  result.strikes = 0;
  result.balls = 0;
  result.event_type = 'STRIKEOUT';


  //Getting the batters name for the event text
  const batterName = await getPlayerStat('full_name', result.batter_id);

  result.event_text = `\n${batterName} strikes out`;

  if(didSwing){
    result.event_text += ' swinging.'
  }
  else{
    result.event_text += ' looking.'
  }

  const ok = await sendNewRow(result);

  return;
}

async function sendStrike(game_id, didSwing){
  let result = await getPreviousRow(game_id);

  result.strikes += 1;
  result.event_index += 1;
  result.event_type = 'STRIKE';

  result.event_text = `Strike, `;

  if(didSwing){
    result.event_text += 'swinging.';
  }
  else{
    result.event_text += 'looking.';
  }

  //TODO: if the batter flinched
  //Change it to 'Strike, finching'
  result.event_text += ` ${result.balls}-${result.strikes}.`;

  const ok = await sendNewRow(result);

  return;
}

async function sendFoul(game_id, increaseStrikeCount){
  let result = await getPreviousRow(game_id);

  if(increaseStrikeCount){
    result.strikes += 1;    
  }

  result.event_index += 1;
  result.event_type = 'FOUL';
  result.event_text = `Foul. ${result.balls}-${result.strikes}`;

  const ok = await sendNewRow(result);

  return;
}

async function sendFlyout(game_id, params) {
  const { runs, bases_occupied, fielder_id } = params;

  let result = await getPreviousRow(game_id);

  //Updating universial cases
  result.event_index += 1;
  result.event_type = 'FLYOUT';
  result.outs += 1;
  result.balls = 0;
  result.strikes = 0;

  //Getting the batter and fielder name
  const batterName = await getPlayerStat('full_name', result.batter_id);
  const fielderName = await getPlayerStat('full_name', fielder_id);

  result.event_text = `${batterName} hit a flyout to ${fielderName}.`;

  //If the sent bases have changed
    //If they didn't either the inning changes such as it was not a sacrafice
    //Or the person on the furthest base failed to advance, so there were no changes
  if(result.bases_occupied != bases_occupied && bases_occupied != ''){
    result.bases_occupied = bases_occupied;
  }

  //TODO: check if someone can score when a flyout happens
    //Looking at the database, don't think they can
  //Someone advanced to home
  //Then we need to increase the score, and add it to the event text
  if(runs != ''){
    //Getting the correct team, so that we can increase the correct team score
    const playerTeam = await getPlayerTeam(runs);
    if(playerTeam == result.home_team){
      result.home_score += 1;
    }
    else if(playerTeam == result.away_team){
      result.away_score += 1;
    }
    const scoringPlayerName = await getPlayerStat('full_name', runs);

    result.event_text += `\n${scoringPlayerName} advances on the sacrafice. \n1 Run scored!`;
  }

  const ok = await sendNewRow(result);

  return;
}

async function sendDoublePlay(game_id, params){
  const {runs, bases_occupied, fielder_id} = params;

  let result = await getPreviousRow(game_id);

  //Updating universial cases
  result.event_index += 1;
  result.outs += 2;
  result.balls = 0;
  result.strikes = 0;
  result.event_type = 'DOUBLE_PLAY';

  //Getting the batter and fielder name
  const batterName = await getPlayerStat('full_name', result.batter_id);
  const fielderName = await getPlayerStat('full_name', fielder_id);

  result.event_text = `${batterName} hit into a double play!`;

  //If the sent bases have changed
    //If they didn't either the inning changes such as it was not a sacrafice
    //Or the person on the furthest base failed to advance, so there were no changes
  if(result.bases_occupied != bases_occupied && bases_occupied != ''){
    result.bases_occupied = bases_occupied;
  }

  //Someone advanced to home
  //Then we need to increase the score, and add it to the event text
  if(runs != ''){
    //Getting the correct team, so that we can increase the correct team score
    const playerTeam = await getPlayerTeam(runs);
    if(playerTeam == result.home_team){
      result.home_score += 1;
    }
    else if(playerTeam == result.away_team){
      result.away_score += 1;
    }
    const scoringPlayerName = await getPlayerStat('full_name', runs);

    result.event_text += `\n${scoringPlayerName} scores! \n1 Run scored!`;
  }

  const ok = await sendNewRow(result);

  return;
}

async function sendFieldersChoice(game_id, params){
  const { runner_id, runner_base, bases_occupied } = params;

  let result = await getPreviousRow(game_id);

  //Updating universial cases
  result.event_index += 1;
  result.outs += 1;
  result.balls = 0;
  result.strikes = 0;
  result.event_type = 'FIELDERS_CHOICE';

  //Getting the batter and fielder name
  const batterName = await getPlayerStat('full_name', result.batter_id);
  const runnerName = await getPlayerStat('full_name', runner_id);

  let base_name;

  result.event_text = `${runnerName} out at ${getBaseName(runner_base)}. ${batterName} reaches on fielder's choice.`;

  //If the sent bases have changed
    //If they didn't either the inning changes such as it was not a sacrafice
    //Or the person on the furthest base failed to advance, so there were no changes
  if(result.bases_occupied != bases_occupied && bases_occupied != ''){
    result.bases_occupied = bases_occupied;
  }

  const ok = await sendNewRow(result);

  return;
}


async function sendSacrifice(game_id, params){
  const { runs, bases_occupied, fielder_id } = params;

  let result = await getPreviousRow(game_id);

  //Updating universial cases
  result.event_index += 1;
  result.outs += 1;
  result.balls = 0;
  result.strikes = 0;
  result.event_type = 'SACRIFICE';

  //Getting the batter and fielder name
  const batterName = await getPlayerStat('full_name', result.batter_id);
  const fielderName = await getPlayerStat('full_name', fielder_id); 
  const runnerName = await getPlayerStat('full_name', runner_id);

  //TODO: check if more than one person can score on a sacrifice
  result.event_text = `${batterName} hit a ground out to ${fielderName}. ${runnerName} advances on the sacrifice.`;

  //If the sent bases have changed
    //If they didn't either the inning changes such as it was not a sacrafice
    //Or the person on the furthest base failed to advance, so there were no changes
  if(result.bases_occupied != bases_occupied && bases_occupied != ''){
    result.bases_occupied = bases_occupied;
  }

  if(runs != ''){
    for(let i = 0; i < runs.length; i++){
      const playerTeam = await getPlayerTeam(runs[i]);
      if(playerTeam == result.home_team){
        result.home_score += 1;
      }
      else if(playerTeam == result.away_team){
        result.away_score += 1;
      }
      const runnerName = await getPlayerStat('full_name', runs[i]);
      result.event_text += ` ${runnerName} advances on the sacrifice.`;
    }
    result.event_text += ` ${runs.length} runs scored!`;
  }

  const ok = await sendNewRow(result);

  return;
}


async function sendGroundOut(game_id, params){
  const { runs, bases_occupied, fielder_id } = params;

  let result = await getPreviousRow(game_id);

  //Updating universial cases
  result.event_index += 1;
  result.outs += 1;
  result.balls = 0;
  result.strikes = 0;
  result.event_type = 'GROUNDOUT';

  //Getting the batter and fielder name
  const batterName = await getPlayerStat('full_name', result.batter_id);
  const fielderName = await getPlayerStat('full_name', fielder_id); 
  const runnerName = await getPlayerStat('full_name', runner_id);

  //TODO: check if more than one person can score on a sacrifice
  result.event_text = `${batterName} hit a ground out to ${fielderName}. ${runnerName} advances on the sacrifice.`;

  //If the sent bases have changed
    //If they didn't either the inning changes such as it was not a sacrafice
    //Or the person on the furthest base failed to advance, so there were no changes
  if(result.bases_occupied != bases_occupied && bases_occupied != ''){
    result.bases_occupied = bases_occupied;
  }
  
  if(runs != ''){
    for(let i = 0; i < runs.length; i++){
      const playerTeam = await getPlayerTeam(runs[i]);
      if(playerTeam == result.home_team){
        result.home_score += 1;
      }
      else if(playerTeam == result.away_team){
        result.away_score += 1;
      }
      const runnerName = await getPlayerStat('full_name', runs[i]);
      result.event_text += ` ${runnerName} advances on the sacrifice.`;
    }
    result.event_text += ` ${runs.length} runs scored!`;
  }

  const ok = await sendNewRow(result);

  return;
}


//TODO: add solo and plural management for the event text

async function sendHomeRun(game_id, parmas) {

  const { runs, bases_occupied } = params;

  let result = await getPreviousRow(game_id);

  //Updating universial cases
  result.event_index += 1;
  result.balls = 0;
  result.strikes = 0;
  result.bases_occupied = bases_occupied;

  //Getting the batter name
  const batterName = await getPlayerStat('full_name', result.batter_id);

  result.event_type = 'HOME_RUN';
  result.event_text = `${batterName} hits a ${runs.length}-run home run.`;
  
  const playerTeam = await getPlayerTeam(runs[i]);
  if(playerTeam == result.home_team){
    result.home_score += runs.length;
  }
  else if(playerTeam == result.away_team){
    result.away_score += runs.length;
  }


  result.event_text += `\n ${runs.length} Runs scored!`;


  const ok = await sendNewRow(result);

  return;
}

async function sendTriple(game_id, parmas) {

  const { runs, bases_occupied } = params;

  let result = await getPreviousRow(game_id);

  //Updating universial cases
  result.event_index += 1;
  result.balls = 0;
  result.strikes = 0;
  result.bases_occupied = bases_occupied;

  //Getting the batter name
  const batterName = await getPlayerStat('full_name', result.batter_id);

  result.event_type = 'TRIPLE';
  result.event_text = `${batterName} hits a Triple!`;
  
  if(runs){
    const runnerName = await getPlayerStat('full_name', runs[0]);

    result.event_text += ` ${runnerName} scores!`;

    const playerTeam = await getPlayerTeam(runs[0]);

    if(playerTeam == result.home_team){
      result.home_score += runs.length;
    }
    else if(playerTeam == result.away_team){
      result.away_score += runs.length;
    }

    result.event_text += `\n ${runs.length} Runs scored!`;
  }

  const ok = await sendNewRow(result);

  return;
}

async function sendDouble(game_id, parmas) {

  const { runs, bases_occupied } = params;

  let result = await getPreviousRow(game_id);

  //Updating universial cases
  result.event_index += 1;
  result.balls = 0;
  result.strikes = 0;
  result.bases_occupied = bases_occupied;

  //Getting the batter name
  const batterName = await getPlayerStat('full_name', result.batter_id);

  result.event_type = 'DOUB:E';
  result.event_text = `${batterName} hits a Double!`;
  
  if(runs){
    const runnerName = await getPlayerStat('full_name', runs[0]);

    result.event_text += ` ${runnerName} scores!`;

    const playerTeam = await getPlayerTeam(runs[0]);

    if(playerTeam == result.home_team){
      result.home_score += runs.length;
    }
    else if(playerTeam == result.away_team){
      result.away_score += runs.length;
    }

    result.event_text += `\n ${runs.length} Runs scored!`;
  }

  const ok = await sendNewRow(result);

  return;
}



async function sendSingle(game_id, parmas) {

  const { runs, bases_occupied } = params;

  let result = await getPreviousRow(game_id);

  //Updating universial cases
  result.event_index += 1;
  result.balls = 0;
  result.strikes = 0;
  result.bases_occupied = bases_occupied;

  //Getting the batter name
  const batterName = await getPlayerStat('full_name', result.batter_id);

  result.event_type = 'SINGLE';
  result.event_text = `${batterName} hits a Single!`;
  
  if(runs){
    const runnerName = await getPlayerStat('full_name', runs[0]);

    result.event_text += ` ${runnerName} scores!`;

    const playerTeam = await getPlayerTeam(runs[0]);

    if(playerTeam == result.home_team){
      result.home_score += runs.length;
    }
    else if(playerTeam == result.away_team){
      result.away_score += runs.length;
    }

    result.event_text += `\n ${runs.length} Runs scored!`;
  }

  const ok = await sendNewRow(result);

  return;
}






function increaseResult(game_id, countVar){
  //Getting the counts for the current inning
  const gameCounts = await getGameCounts(game_id);

  const increaseCount = gameCounts[countVar + 's'] + 1;

  if(increaseCount == gameCounts[countVar + '_count']){
    return true;
  }

  return false;
}

//This is so dumb
//We love hardcoded values
//There's /gotta/ be a smarter way to do this
async function getBaseName(base_num){
  switch (base_num){
    case 0:
      return "first";
    case 1:
      return "second";
    case 2:
      return "third";
    case 3:
      return "fourth";
    case 4:
      return "fifth";
  }
  return '';
}


module.exports = {
  sendBall,
  sendWalk,
  sendFoul,
  sendStrikeout,
  sendStrike,

  increaseResult
}