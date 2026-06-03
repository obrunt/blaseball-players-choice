const { pool } = require("../../../../config/db");
const { roll } = require("../../../middleware/randomRoll");


const { getGameCounts } = require("../../database/fetchGameInfo");

const { getPlayerTeam, getPlayerStat } = require("../../database/fetchPlayerInfo");


async function sendBall(game_id) {
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

  result.balls += 1;
  result.event_index += 1;

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
        'BALL',
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
        `Ball. ${result.balls}-${result.strikes}`,
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

  } catch (err){
    console.log(err);
  }
}

async function sendWalk(game_id) {
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
        'WALK',
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

  } catch (err){
    console.log(err);
  }
}

async function sendStrikeout(game_id, didSwing) {
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

  result.event_index += 1;

  //Increasing the outs, and setting the batter specific counts back to zero
  result.outs += 1;
  result.strikes = 0;
  result.balls = 0;


  //Getting the batters name for the event text
  const batterName = await getPlayerStat('full_name', result.batter_id);

  result.event_text += `\n${batterName} strikes out`;

  if(didSwing){
    result.event_text += ' swinging.'
  }
  else{
    result.event_text += ' looking.'
  }

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
        'STRIKEOUT',
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

  } catch (err){
    console.log(err);
  }
}

async function sendStrike(game_id, didSwing){
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

  result.strikes += 1;
  result.event_index += 1;

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

  //TODO: if the batter flinched
  //Change it to 'Strike, finching'

  try {
    result = await pool.query(newRowQuery, [
        result.game_id,
        'STRIKE',
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
        `Strike, looking. ${result.balls}-${result.strikes}`,
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

    return result;

  } catch (err){
    console.log(err);
  }
}

async function sendFoul(game_id, increaseStrikeCount){
  async function sendStrike(game_id, didSwing){
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

  if(increaseStrikeCount){
    result.strikes += 1;    
  }
  result.event_index += 1;

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
        'FOUL',
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
        `Foul. ${result.balls}-${result.strikes}`,
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

    return result;

  } catch (err){
    console.log(err);
  }
}
}

async function increaseResult(game_id, countVar){
  //Getting the counts for the current inning
  const gameCounts = await getGameCounts(game_id);

  const increaseCount = gameCounts[countVar + 's'] + 1;

  if(increaseCount == gameCounts[countVar + '_count']){
    return true;
  }

  return false;
}


module.exports = {
  sendBall,
  sendWalk,
  sendFoul,
  sendStrikeout,
  sendStrike,

  increaseResult
}