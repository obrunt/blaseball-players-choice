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
        ?,
        ?,
        ?,
        'Play ball!'
    );
  `;

  try {
    const result = await pool.query(query, [params.game_id, params.home_team, params.pitcher_id, params.away_team]);

    //Returns index of weather and name of weather
    return 'Play ball!';

  } catch (err){
    console.log(err);
  }
}


async function sendNewInning (game_id, event_type, params){

  const query = `
    INSERT INTO data.game_events (
        game_id,
        event_type,
        event_index,
        inning,
        top_of_inning,
        batter_team_id, 
        pitcher_team_id,
        pitcher_id,
        event_text
    )
    VALUES (
        ?,  --Game id  
        'INNING_START', --Event text
        (SELECT event_index FROM data.game_events   --Event index place increase
        WHERE game_id = ?
        ORDER BY event_index DESC 
        LIMIT 1) + 1,
        (SELECT inning FROM data.game_events    --Inning number increase
        WHERE game_id = ?
        ORDER BY inning DESC
        LIMIT 1) + 1,
        TRUE,   --Is the top of the inning
        ?,      --Home team
        ?,      --Away team
        (SELECT home_team_pitcher_id from data.games    --Pitcher (top of inning will always be home team)
        WHERE game_id = ?),      
        (SELECT full_name FROM data.teams
        WHERE valid_until IS NULL
        AND team_id = ?) + ' batting.'
    );
  `;

  try {
    const result = await pool.query(query, [params.game_id, params.game_id, params.pitcher_id, params.home_team, params.away_team]);

    //Find way to get the number of the inning 
    return `Top of _, ${params.away_team} batting.`;

  } catch (err){
    console.log(err);
  }
}


function send_game_event (game_id, event_type, params){
    switch(event_type){
        case 'GAME_START':
            await sendGameStart(game_id, event_type, params);
            break;
        case 'INNING_START':
            await sendNewInning(game_id, event_type, params);
            break;
        case 'GAME_START':
            break;
        case 'GAME_START':
            break;
        case 'GAME_START':
            break;
        case 'GAME_START':
            break;
        case 'GAME_START':
            break;
        case 'GAME_START':
            break;
    }
}


module.export = {
    send_game_event
};