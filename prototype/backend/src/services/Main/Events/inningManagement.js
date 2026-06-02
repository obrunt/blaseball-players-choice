const { pool } = require("../../../../config/db");
const { roll } = require("../../../middleware/randomRoll");

const { getPositionRosterLength, getPlayerFromIndex } = require("../../database/fetchTeamInfo"); 
const { getPreviousBatter } = require("batterManagement");


async function sendInningStart (game_id, params){

  //Because we're starting an inning, the away team will be the ones batting
    //Getting how many batters the team has, so that we can loop the array
  const batterLength = await getPositionRosterLength(params.away_team, 0);

  //Getting the position of the previous 
  const prevBatter = await getPreviousBatter(game_id, params.away_team);

  //Increasing the index position, then modding to include wrap around scenarios
  const newBatterPosition = (prevBatter.batter_position + 1) % batterLength;

  const batter_id = await getPlayerFromIndex(params. away_team, 0, newBatterPosition);


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
        event_text,
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
               
        ?,    --Home team

        ?,    --Pitcher (top of inning will always be home team)  

        (SELECT full_name FROM data.teams
        WHERE valid_until IS NULL
        AND team_id = ?) + ' batting.'

        
    );
  `;

  try {
    const result = await pool.query(query, [game_id, game_id, game_id, params.away_team, params.home_team, params.home_team_pitcher_id, params.away_team]);

    //Find way to get the number of the inning 
    return `Top of _, ${params.away_team} batting.`;

  } catch (err){
    console.log(err);
  }
}

module.export = {
  sendInningStart
}