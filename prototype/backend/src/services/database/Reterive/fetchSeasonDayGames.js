const { pool } = require("../../../../config/db");
const { roll } = require("../../../middleware/randomRoll");



async function fetchGameDay(game_id){
  
  const query = `
    SELECT day FROM data.games
    WHERE game_id = ?
    LIMIT 1;
  `;

  try {
    const result = await pool.query(query, [game_id]);

    //The day the game takes place
    return result[0];

  } catch (err){
    console.log(err);
  }
}

async function fetchGameSeason (game_id){
  
  const query = `
    SELECT season FROM data.games
    WHERE game_id = ?
    LIMIT 1;
  `;

  try {
    const result = await pool.query(query, [game_id]);

    //The season the game takes place
    return result[0];

  } catch (err){
    console.log(err);
  }
}

//Getting all of the teams within the layers of the subleague
async function getSeasonDayGames(day, season){

  const query = `
    SELECT * FROM data.games
    WHERE day = ?
    AND season = ?;
  `;

  try {
    const result = await pool.query(query, [day, season]);

    //Returns an array of objects for the different rows of the current league table
    return result[0];

  } catch (err){
    console.log(err);
  }
}

function fetch_game_order(season, day){
  return await getSeasonDayGames(day, season);
}


module.exports = {
  fetch_game_order,
  fetchGameDay,
  fetchSeasonDay
};