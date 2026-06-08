const { pool } = require("../../../config/db");

async function getGameDay(game_id){
  
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

async function getGameSeason (game_id){
  
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
async function getSeasonDayGames(season, day){

  const query = `
    SELECT * FROM data.games
    WHERE season = ?
    AND day = ?;
  `;

  try {
    const result = await pool.query(query, [season, day]);

    //Returns an array of objects for the different rows of the current league table
    return result[0];

  } catch (err){
    console.log(err);
  }
}

function setGameDay(value){
  getGameDay = value;
}

function setGameSeason(value){
  getGameDay = value;
}


function setSeasonDayGames(value){
  getSeasonDayGames = value;
}

module.exports = {
  getGameDay,
  getGameSeason,
  getSeasonDayGames,

  setGameDay,
  setGameSeason,
  setGameSeason
};