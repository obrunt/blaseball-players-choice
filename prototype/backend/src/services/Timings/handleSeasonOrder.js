const { pool } = require("../../../config/db");


function fetch_game_order(season, day){
    
}

function decide_pitcher_order(){
    //take the day, mod the day by the number of pitchers, 
    //then use the remainder as the index of the pitcher
}

/* Getting all of the teams within the layers of the subleague*/
async function getActiveDivisionTeams(){

  const query = `
    SELECT 
      d.league_id, d.subleague_id, d.division_id, d.team_id, t.full_name, t.card
    FROM data.division_teams AS d
    LEFT JOIN data.teams AS t
      ON t.team_id = d.team_id
    WHERE t.valid_until IS NULL
      AND d.valid_until IS NULL
      AND t.card > -1
    ORDER BY d.league_id, d.subleague_id, d.division_id;
  `;

  try {
    const result = await pool.query(query);

    //Returns an array of objects for the different rows of the current league table
    return result[0];

  } catch (err){
    console.log(err);
  }
}



function decide_game_play_order(){
    
    let divisionTeams = await getActiveDivisionTeams();
    let teams;

    for(obj in divisionTeams){
      teams.push(obj.team_id);
    }
    
    //will have to get from 

    //Get the league
    //Get the sub league

    //Has a split of idk 

    //Within sub league 20 / 33

    //Outside of sub league 12 / 33

    //Outside of league 1 / 33 

    //Home or away is a coin flip

}

module.exports = {
    fetch_game_order
};