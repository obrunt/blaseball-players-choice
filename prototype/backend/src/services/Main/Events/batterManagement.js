const { pool } = require("../../../../config/db");
const { roll } = require("../../../middleware/randomRoll");

const { getPlayerStat } = require("../../database/fetchPlayerInfo");
const { getTeamStat, getPlayerFromIndex, getPositionRosterLength } = require("../../database/fetchTeamInfo");


async function getPreviousBatter(game_id, team_id){
    
  const query = `
    SELECT batter_position, batter_id FROM data.game_events
    WHERE game_id = ?
    AND batter_team_id = ?
    AND batter_position IS NOT NULL
    AND batter_id IS NOT NULL
    ORDER BY event_index
    LIMIT 1;
  `;

  try {
    const result = await pool.query(query, [game_id, team_id]);

    //Returns the batter id, and the position within their own roster
    return result[0];

  } catch (err){
    console.log(err);
  }
}


async function sendBatterUp(game_id){
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

  //Getting how many batters the team has, so that we can loop the array
  const batterLength = await getPositionRosterLength(result.batting_team_id, 0);

  //Increasing the index position, then modding to include wrap around scenarios
  result.batter_position = (result.batter_position + 1) % batterLength;

  //Getting a new batter from the roster where the player position is a batter
  result.batter_id = await getPlayerFromIndex(result.batting_team_id, 0, result.batter_position);

  //Player and team name for the event text
  const playerName = await getPlayerStat('full_name', result.batter_id);
  const teamNickname = await getTeamStat('nickname', result.batter_team_id);

  result.event_text = `${playerName} is batting for the ${teamNickname}`;


  //TODO: Copy over the previous info such as outs, different team info set from game start

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
        'BATTER_UP',
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

    return result[0];
  } catch (err){
    console.log(err);
  }
}


module.exports = {
  getPreviousBatter,
  sendBatterUp
}