const { pool } = require("../../../../config/db");
const { roll } = require("../../../middleware/randomRoll");

const { getTeamStat } = require("../../database/fetchTeamInfo"); 
const { getPreviousBatter } = require("batterManagement");


async function sendInningStart(game_id){
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

  result.inning += 1;

  //If increasing the inning past 9 is happening
  if(result.inning >= 9){
    //Check to see if the scores are equal
    //If they aren't, then a winner can be selected
    if(result.home_score != result.away_score){
      //TODO: send game event to end the game
        //Include is_last_game_event to be true
      send_game_event(game_id, 'GAME_OVER');
      return;
    }

  }





  result.top_of_inning = true;

  //Because this is the top of the inning, the away team will always be batting
  //Need to get the assigned home team pitcher from the game table
  result.batter_team_id = result.away_team;
  result.pitcher_team_id = result.home_team;
  result.pitcher_id = await getSetPitchers(game_id).home_team_pitcher_id;

  //Resetting the counts for the new inning
  result.balls = 0;
  result.outs = 0;
  result.strikes = 0;

  const batting_team_name = await getTeamStat('full_name', result.batter_team_id);

  result.event_text = `Top of ${result.inning + 1}, ${batting_team_name} batting.`;

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
        'INNING_TOP',
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


async function sendInningFlip(game_id){
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

  //If increasing the inning is 9 or past (zero indexed)
  if(result.inning >= 8){
    //Check to see if the new batting team is already winning
    //If they are, then the game is over
    if(result.home_score > result.away_score){
      //TODO: send game event to end the game
        //Include is_last_game_event to be true
      send_game_event(game_id, 'GAME_OVER');
      return;
    }

  }


  result.top_of_inning = false;

  //Because this is the bottom of the inning, the home team will always be batting
  //Need to get the assigned away team pitcher from the game table
  result.batter_team_id = result.home_team;
  result.pitcher_team_id = result.away_team;
  result.pitcher_id = await getSetPitchers(game_id).away_team_pitcher_id;

  //Resetting the counts for the new inning
  result.balls = 0;
  result.outs = 0;
  result.strikes = 0;

  const batting_team_name = await getTeamStat('full_name', result.batter_team_id);

  result.event_text = `Bottom of ${result.inning + 1}, ${batting_team_name} batting.`;

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
        'INNING_TOP',
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



module.export = {
  sendInningStart,
  sendInningFlip
}