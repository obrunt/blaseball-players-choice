const { pool } = require("../../../config/db");
const { roll } = require("../../middleware/randomRoll");


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

function decide_pitcher_order(){
    //take the day, mod the day by the number of pitchers, 
    //then use the remainder as the index of the pitcher

    //May have to consider edge cases if a pitcher is removed from the roster, ie swept away
    //Using this method means that a new player will replace the exact position of the old pitcher
}


module.exports = {
  fetch_game_order
};