const { pool } = require("../../../../config/db");
const { roll } = require("../../../middleware/randomRoll");



async function getPreviousBatter(game_id, team_id){
    
  const query = `
    SELECT batter_position, batter_id FROM data.game_events
    WHERE game_id = ?
    AND batter_team_id = ?
    AND batter_position IS NOT NULL
    AND batter_id IS NOT NULL
    ORDER BY event_index
    LIMIT 1;
  `;

  try {
    const result = await pool.query(query, [game_id, team_id]);

    //Returns the batter id, and the position within their own roster
    return result[0];

  } catch (err){
    console.log(err);
  }
}


async function sendBatterUp(game_id){

  //The batting team was already set when the inning event was created
  //So we just need to poll the previous event
  const batting_team_id = getBattingTeam(game_id);

  //Getting how many batters the team has, so that we can loop the array
  const batterLength = await getPositionRosterLength(batting_team_id, 0);

  //Getting the position of the previous 
  const prevBatter = await getPreviousBatter(game_id, batting_team_id);

  //Increasing the index position, then modding to include wrap around scenarios
  const batter_position = (prevBatter.batter_position + 1) % batterLength;

  const batter_id = await getPlayerFromIndex(batting_team_id, 0, newBatterPosition);


  //TODO: Copy over the previous info such as outs, different team info set from game start

  const query = `
    INSERT INTO data.game_events (
        game_id,
        event_type,
        event_index,
        batter_id,
        batter_position,
        event_text
    )
    VALUES (
        ?,  --Game id  

        'BATTER_UP', --Event text

        (SELECT event_index FROM data.game_events   --Event index place increase
        WHERE game_id = ?
        ORDER BY event_index DESC 
        LIMIT 1) + 1,

        ?,  --Player id for the batter

        ?,  --Batters position within the team roster

        (SELECT player_name FROM data.teams
        WHERE valid_until IS NULL
        AND player_id = ?)
        + ' batting for the ' +
        (SELECT nickname FROM data.teams
        WHERE valid_until IS NULL
        AND team_id = ?) + '.'
        
    );
  `;

  try {
    const result = await pool.query(query, [game_id, game_id, batter_id, batter_position, batter_id, batting_team_id]);

    //Find way to get the number of the inning 
    return `player_name batting for the nickname.`;

  } catch (err){
    console.log(err);
  }
}


module.exports = {
  getPreviousBatter,
  sendBatterUp
}