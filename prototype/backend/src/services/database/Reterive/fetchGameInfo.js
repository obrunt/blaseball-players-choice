const { pool } = require("../../../../config/db");

async function getGameWeather(game_id){
    
  const query = `
    SELECT weather FROM data.games
    WHERE game_id = ?;
  `;

  try {
    const result = await pool.query(query, [game_id]);

    //Returns the weather intager
    return result[0];

  } catch (err){
    console.log(err);
  }
}

async function getGameStadium(game_id){    
  const query = `
    SELECT stadium_id FROM data.games
    WHERE game_id = ?;
  `;

  try {
    const result = await pool.query(query, [game_id]);

    //Returns the stadium id
    return result[0];

  } catch (err){
    console.log(err);
  }

}

async function getGameInning(game_id){
  //Want to get both the inning number and if it's top or bottom
  const query = `
    SELECT inning, top_of_inning FROM data.game_events
    WHERE game_id = ?
    ORDER BY event_index DESC
    LIMIT 1;
  `;

  try {
    const result = await pool.query(query, [game_id]);

    //Returning inning and where we are in the inning
    return result[0];

  } catch (err){
    console.log(err);
  }
}

async function getBattingTeam(game_id){
     
  //Want to get the most recent event that happened for who's on base
  const query = `
    SELECT batter_team_id FROM data.game_events
    WHERE game_id = ?
    ORDER BY event_index DESC
    LIMIT 1;
  `;

  try {
    const result = await pool.query(query, [game_id]);

    return result[0];

  } catch (err){
    console.log(err);
  }
}

async function getPitchingTeam(game_id){
     
  //Want to get the most recent event that happened for who's on base
  const query = `
    SELECT pitcher_team_id FROM data.game_events
    WHERE game_id = ?
    ORDER BY event_index DESC
    LIMIT 1;
  `;

  try {
    const result = await pool.query(query, [game_id]);

    return result[0];

  } catch (err){
    console.log(err);
  }
}

async function getGameOccupiedBases(game_id){
 
    //Want to get the most recent event that happened for who's on base
  const query = `
    SELECT bases_occupied FROM data.game_events
    WHERE game_id = ?
    ORDER BY event_index DESC
    LIMIT 1;
  `;

  try {
    const result = await pool.query(query, [game_id]);

    //Returns the text array of what bases are ocupied
    return result[0];

  } catch (err){
    console.log(err);
  }
}

async function getBatterAppearanceCount(game_id, player_id){
 
    //Want to get the most recent event that happened for who's on base
  const query = `
    SELECT COUNT (*) FROM data.game_events
    WHERE game_id = ?
    AND batter_id = ?
    AND event_type = 'BATTER_UP'
    ORDER BY event_index DESC;
  `;

  try {
    const result = await pool.query(query, [game_id, player_id]);

    //Returns the text array of what bases are ocupied
    return result[0];

  } catch (err){
    console.log(err);
  }
}

async function isMaximumBaseball(game_id){
    //Need to get all of the outs, balls and fouls for the team that is currently up to bat
    //After getting them, compare the current to the maximum count - 1
        //Minus one because otherwise would roll over to be non maximum

    const query =  `
    SELECT bases_occupied, strikes, outs, balls
    CASE
        WHEN batter_team_id = home_team_id
        THEN home_ball_count AS 'ball_count', home_base_count AS 'base_count', home_out_count AS 'out_count', home_strike_count AS 'strike_count'
        WHEN batter_team_id = away_team_id
        THEN away_ball_count AS 'ball_count', away_base_count AS 'base_count', away_out_count AS 'out_count', away_strike_count AS 'strike_count'
    FROM data.game_events
    WHERE game_id = ?
    ORDER BY event_index DESC
    LIMIT 1;
  `;

  try {
    const result = await pool.query(query, [game_id]);

    let info = JSON.parse(result[0]);

    //Checking that all of the info is the most it can be

    if(info.bases_occupied.length() == info.base_count){
        if(info.strikes == (info.strike_count - 1)){
            if(info.balls == (info.ball_count - 1)){
                if(info.out == (info.ball_out - 1)){
                    return true;
                }
            }
        }
    }

    return false;

  } catch (err){
    console.log(err);
  }
}



module.exports = {
    getGameWeather,
    getGameStadium,
    getGameInning,
    getGameOccupiedBases,
    getBattingTeam,
    getPitchingTeam,
    isMaximumBaseball,
    getBatterAppearanceCount
};