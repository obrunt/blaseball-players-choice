const { pool } = require("../../../../config/db");
const { roll } = require("../../../middleware/randomRoll");


const { getGameCounts } = require("../../database/fetchGameInfo");


async function sendBall(game_id) {
  const previousRowQuery =  `
    SELECT *
    WHERE game_id = ?
    ORDER BY event_index DESC
    LIMIT 1;
  `;
    let result;
  try {
    result = await pool.query(previousRowQuery, [game_id]);

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
    let result;
  try {
    result = await pool.query(previousRowQuery, [game_id]);

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

  //If the last base had someone on it and they were moved forward
  if(occupiedBase != ''){
    //Send a home run event after
  }


  result.event_index += 1;
  result.balls = 0;

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


async function increaseBallResult(game_id){
    //Getting
    const gameCounts = await getGameCounts(game_id);

    const increaseBalls = gameCounts.balls + 1;

    if(increaseBalls == gameCounts.ball_count){
        return true;
    }

    return false;
}

async function increaseStrikeResult(){

}

async function increaseOutResult() {
    
}

async function increaseFoulResult() {
    
}