const { pool } = require("../../../../config/db");
const { roll } = require("../../../middleware/randomRoll");


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
  fetch_game_order
};