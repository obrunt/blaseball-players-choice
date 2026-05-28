const { pool } = require("../../../../config/db");
const { roll } = require("../../../middleware/randomRoll");


async function getGameWeather(game_id){
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

async function setGameWeather(weather, game_id){
  //This is getting the previous season and day so that we can use it later
    //Including picher check because pitchers are decided day off
    //While games are made when the season starts
  const query = `
    UPDATE data.games
    SET weather = ?
    WHERE game_id = ?;
  `;

  try {
    const result = await pool.query(query, [weather, game_id]);

    //Returns ok, not needed
    return result[0];

  } catch (err){
    console.log(err);
  }
}


function get_weather(game_id){
    return await getGameWeather(game_id);
}

function set_weather(game_id){
    //Getting the index of the weather for taxa.weather
        //26 & 27 are unknown
        //Definently weighted odds for each chance
            //Currently just keeping odds equal
    let weatherIndex = roll (0, 29);

    switch(weatherIndex){
        //This will probably need to change to checking for the ranges
        //Right now just keeping it simple
        default:
            await setGameWeather(weatherIndex, game_id);
            break;
    }
}

module.export = {
    set_weather,
    get_weather
};