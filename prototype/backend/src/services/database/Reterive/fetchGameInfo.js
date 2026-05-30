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

async function isMaximumBaseball(game_id){
    const query =  `
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



module.exports = {
    getGameWeather,
    getGameInning,
    getGameOccupiedBases,
    getBattingTeam,
    getPitchingTeam
};