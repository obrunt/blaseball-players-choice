
const { pool } = require("../../../config/db");


async function getDivisions(season){

}

async function getLeagues(season){

}

async function getSeasonStandings(season){
  //This gets all the cases where one team won in a game
  //Then adds it all up to get the totals
    //This also orders them by the total wins
    //Makes it easy to get the postseason standings
  const query = `
    SELECT
    CASE
        WHEN home_score > away_score
        THEN home_team
        WHEN away_score > home_score
        THEN away_team
    END AS winning_team,
    COUNT(
    CASE
        WHEN home_score > away_score
        THEN home_team
        WHEN away_score > home_score
        THEN away_team
    END)
    FROM data.games
    WHERE season = ?
    AND is_postseason = false
    GROUP BY winning_team
    ORDER BY count DESC;
  `;

  //Still need to order any ties by the card standings
  try {
    const result = await pool.query(query, [season]);

    //Returns the requested stat
    return result;

  } catch (err){
    console.log(err);
  }
}

async function getPostSeasonStandings(season){
  //This gets all the cases where one team won in a game
  //Then adds it all up to get the totals
    //This also orders them by the total wins
    //Makes it easy to get the postseason standings
  const query = `

  WITH current_standings AS (
    WITH winning_team AS (
      SELECT
      CASE
        WHEN home_score > away_score
        THEN home_team
        WHEN away_score > home_score
        THEN away_team
      END AS winning_teams
      FROM data.games
      WHERE season = 11
      AND is_postseason = false
    )

    SELECT d.subleague_id, d.division_id, winning_teams, COUNT(winning_teams) AS total_wins FROM winning_team
    LEFT JOIN data.division_teams AS d
    ON d.team_id = winning_teams
    WHERE d.valid_until IS NULL
    AND d.division_id IS NOT NULL
    GROUP BY d.subleague_id, d.division_id, winning_teams
    ORDER BY d.division_id, total_wins DESC
    )
  SELECT c.subleague_id, c.division_id, c.winning_teams, c.total_wins, t.card FROM current_standings AS c
  LEFT JOIN data.teams AS t
  ON c.winning_teams = t.team_id
  WHERE t.valid_until IS NOT NULL
  AND t.card > -1
  GROUP BY c.subleague_id, c.division_id, c.winning_teams, c.total_wins, t.card
  ORDER BY c.subleague_id, c.division_id, c.total_wins DESC, t.card;
  `;

  //Still need to order any ties by the card standings
  try {
    const result = await pool.query(query, [season]);

    //Returns the requested stat
    return result;

  } catch (err){
    console.log(err);
  }

}

async function getDivisionTeams(){
  const query = `
    SELECT d.division_name, t.team_id, m.full_name FROM data.divisions AS d
    LEFT JOIN data.division_teams AS t
    ON d.division_id = t.division_id
    LEFT JOIN data.teams AS m
    ON t.team_id = m.team_id
    WHERE d.valid_until IS NULL
    AND t.valid_until IS NULL
    AND m.valid_until IS NULL
    ORDER BY d.division_name;
  `;

  
  //Still need to order any ties by the card standings
  try {
    const result = await pool.query(query);

    //Returns the requested stat
    return result;

  } catch (err){
    console.log(err);
  }
}

module.exports = {
    getSeasonStandings,
    getPostSeasonStandings,

    getDivisionTeams
}