const { pool } = require("../../../../config/db");
const { roll } = require("../../../middleware/randomRoll");


async function sendGameStart (game_id, params){
  //This is creating the first event in the chain for the game id
  //Setting the initials
    //Event Type
    //The home and away teams
    //And the pitcher that was set previously
  
  //Have to look over how the event_index is set in the sql
  //Or if thats something that I have to do
  
  const query = `
    INSERT INTO data.game_events (
        game_id,
        event_type,
        event_index,
        pitcher_id,
        pitcher_team_id,
        batter_team_id,
        event_text
    )
    VALUES (
        ?,
        'GAME_START',
        0,
        ?,
        ?,
        ?,
        'Play ball!'
    );
  `;

  try {
    const result = await pool.query(query, [game_id, params.home_team_pitcher_id, params.home_team, params.away_team]);

    //Returns index of weather and name of weather
    return 'Play ball!';

  } catch (err){
    console.log(err);
  }
}

module.export = {
  sendGameStart
}