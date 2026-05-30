const { pool } = require("../../../../config/db");
const { roll } = require("../../../middleware/randomRoll");


async function getGameStadium(game_id){
    //Getting both the weather index and the name of the event for the game
    //Not sure which will be needed
        //Index is likely for calculation
        //Name for announcing events
    //Combined them for easier calling weather readability
  const query = `
    SELECT w.weather_id, w.weather_text FROM data.games AS g
    LEFT_JOIN taxa.weather AS w
    ON g.weather = w.weather_id
    WHERE g.game_id = ?;
  `;

  try {
    const result = await pool.query(query, [game_id]);

    //Returns index of weather and name of weather
    return result[0];

  } catch (err){
    console.log(err);
  }
}

async function setGameStadium(game_id, team_id){
  //Selecting the home teams stadium id
    //Making sure that it is the most recent stadium
    //Might want to build in a catch system if running a way that doesn't have stadiums (earlier seasons)
  const stadiumQuery = `
    SELECT t.stadium_id FROM data.teams AS t
    LEFT_JOIN data.games AS g
    ON g.home_team = t.team_id
    WHERE g.game_id = ?
    AND t.team_id  = ?
    AND t.valid_until IS NULL;
  `;

  //Have to declare to prevent scope error
  let stadium_id;

  try {
    const result = await pool.query(stadiumQuery, [game_id, team_id]);

    //Updating the stadium id for next query
    stadium_id = result[0];

  } catch (err){
    console.log(err);
    return;
  }


  //Updating the game with the home teams stadium
  const updateQuery = `
    UPDATE data.games
    SET stadium_id = ?
    WHERE game_id = ?;
  `;

  
  try {
    const result = await pool.query(updateQuery, [stadium_id, game_id]);

    //Returning OK message
    return result[0];

  } catch (err){
    console.log(err);
    return;
  }
}


function get_stadium_game(game_id, team_id){
    return await getGameStadium(game_id);
}

function set_stadium_game(game_id, team_id){
    await setGameStadium(game_id, team_id);
}




function get_stadium_team(game_id, team_id){
    //return await getGameStadium(game_id);
}

function set_stadium_team(game_id, team_id){

}

module.export = {
    set_stadium_game,
    get_stadium_game,

    set_stadium_team,
    get_stadium_team
};