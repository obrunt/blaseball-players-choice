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
        batter_id,
        batter_position,
        pitcher_team_id,
        batter_team_id,
        event_text
    )
    VALUES (
        ?,  --Game ID
        'GAME_START',
        0, --Starting event
        ?,  --Pitcher
        (SELECT player_id FROM data.team_roster     --Selecting the batter who's last in the roster
        WHERE position_type_id = 0                  --The BATTER UP event increases the index by one
        AND valid_until IS NULL                     --So for INNING START batter selection will start the a beginning again
        AND team_id = ?
        ORDER BY position_id DESC
        LIMIT 1),
        (SELECT position_id FROM data.team_roster     --Setting the index to be last in the index
        WHERE position_type_id = 0                  --The BATTER UP event increases the index by one
        AND valid_until IS NULL
        AND team_id = ?
        ORDER BY position_id DESC
        LIMIT 1),
        ?,
        ?,
        'Play ball!'
    );
  `;

  try {
    const result = await pool.query(query, [game_id, params.home_team_pitcher_id, params.away_team, params.away_team, params.home_team, params.away_team]);

    //Returns the text
      //Will probably not be used by anything
    return 'Play ball!';

  } catch (err){
    console.log(err);
  }
}

module.export = {
  sendGameStart
}