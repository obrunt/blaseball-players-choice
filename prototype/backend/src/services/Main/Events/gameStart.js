const { pool } = require("../../../../config/db");
const { roll } = require("../../../middleware/randomRoll");


async function sendGameStart (game_id, event_type, params){
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
        home_team_id,
        pitcher_id,
        away_team_id,
        event_text
    )
    VALUES (
        ?,
        'GAME_START',
        0,
        (SELECT home_team FROM data.games
        WHERE game_id = ?),
        (SELECT away_team FROM data.games
        WHERE game_id = ?),
        (SELECT home_team_pitcher_id FROM data.games
        WHERE game_id = ?),
        'Play ball!'
    );
  `;

  try {
    const result = await pool.query(query, [game_id, game_id, game_id, game_id]);

    //Returns index of weather and name of weather
    return 'Play ball!';

  } catch (err){
    console.log(err);
  }
}

module.export = {
    sendGameStart
}