const { pool } = require("../../../../config/db");
const { roll } = require("../../../middleware/randomRoll");


async function sendInningStart (game_id){

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

        (SELECT home_team FROM data.games
        WHERE game_id = ?),

        (SELECT away_team FROM data.games
        WHERE game_id = ?),

        (SELECT home_team_pitcher_id from data.games    --Pitcher (top of inning will always be home team)
        WHERE game_id = ?),   

        (SELECT t.full_name FROM data.teams AS t
        LEFT JOIN data.games AS g
        ON g.away_team = t.team_id
        WHERE t.valid_until IS NULL
        AND g.game_id = ?) + ' batting.'
    );
  `;

  try {
    const result = await pool.query(query, [game_id, game_id, game_id, game_id, game_id, game_id, game_id]);

    //Find way to get the number of the inning 
    return `Top of _, ${params.away_team} batting.`;

  } catch (err){
    console.log(err);
  }
}

module.export = {
  sendInningStart
}