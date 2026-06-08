const { pool } = require("../../../../config/db");
const { roll } = require("../../../middleware/randomRoll");


//Getting all of the teams within the layers of the subleague
async function getLastGameDate(){

  //This is getting the previous season and day so that we can use it later
    //Including picher check because pitchers are decided day off
    //While games are made when the season starts
  const query = `
    SELECT season, day FROM data.games
    ORDER BY season DESC, day DESC
    WHERE home_team_pitcher_id IS NOT NULL
    AND away_team_pitcher_id IS NOT NULL
    LIMIT 1;
  `;

  try {
    const result = await pool.query(query, [day, season]);

    //Returns the season and day of the late game played
    return result[0];

  } catch (err){
    console.log(err);
  }
}

function fetch_previous_date(){
  return await getLastGameDate();
}

function setLastGameDate(value){
  getLastGameDate = value;
}

module.exports = {
  fetch_previous_date,

  setLastGameDate
};