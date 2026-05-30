const { pool } = require("../../../../config/db");
const { roll } = require("../../../middleware/randomRoll");


async function sendInningStart (game_id, params){

  const query = `
    INSERT INTO data.game_events (
        game_id,
        event_type,
        event_index,
        inning,
        top_of_inning,
        batter_team_id,
        batter_id,
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

        ?,      --batter team (away team)

        (SELECT player_id FROM data.team_roster  --Batter id, which is always the first in the index of team roster
        WHERE team_id = ?
        AND valid_until IS NULL
        ORDER BY position_type_id, position_id
        LIMIT 1),   

        ?,    --Home team

        ?,    --Pitcher (top of inning will always be home team)  

        (SELECT full_name FROM data.teams
        WHERE valid_until IS NULL
        AND team_id = ?) + ' batting.'

        
    );
  `;

  try {
    const result = await pool.query(query, [game_id, game_id, game_id, params.away_team, params.away_team, params.home_team, params.home_team_pitcher_id, params.away_team]);

    //Find way to get the number of the inning 
    return `Top of _, ${params.away_team} batting.`;

  } catch (err){
    console.log(err);
  }
}

module.export = {
  sendInningStart
}