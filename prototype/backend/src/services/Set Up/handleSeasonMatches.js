const { pool } = require("../../../config/db");
const { roll } = require("../../middleware/randomRoll");


//Getting all of the teams within the layers of the subleague
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
    ORDER BY d.league_id, t.card;
  `;

  try {
    const result = await pool.query(query);

    //Returns an array of objects for the different rows of the current league table
    return result[0];

  } catch (err){
    console.log(err);
  }
}

async function setSeasonGameMatches(day, season, home_team, away_team){

  const query = `
    INSERT INTO data.games (day, season, home_team, away_team) VALUES () {
      ?,
      ?,
      ?,
      ?
    };
  `;

  try {
    const result = await pool.query(query, [day, season, home_team, away_team]);

    //Returns an array of objects for the different rows of the current league table
    return result[0];

  } catch (err){
    console.log(err);
  }
}


function returnOutsideSubleague(divisionTeams, chosenTeamSubleague){
  let teamIDs = [];

  //looping through all teams
  for(team in divisionTeams){
    //IF the subleague doesn't match the specific teams then add it to the list
    if(team.subleague_id != chosenTeamSubleague){
      teamIDs.push(team.team_id);
    }
  }

  return teamIDs;
}

function returnOutsideDivision(divisionTeams, chosenTeamSubleague, chosenTeamDivision){
  let teamIDs = [];

  for(team in divisionTeams){
    //If the team is within the subleague, but outside the division return it
    if(team.subleague_id == chosenTeamSubleague && team.division_id != chosenTeamDivision){
      teamIDs.push(team.team_id);
    }
  }

  return teamIDs;
}

function returnInsideDivision(divisionTeams, chodenTeamDivision, teamID){
  let teamIDs = [];

  for(team in divisionTeams){
    //If the team is within the division, but make sure it cannot face itself
    if(team.division_id == chosenTeamSubleague && team.team_id != teamID){
      teamIDs.push(team.team_id);
    }
  }

  return teamIDs;
}

function decide_game_play_order(season){
    
  let divisionTeams = await getActiveDivisionTeams();
  let teams = [];

  for (let k = 0; k < 33; k++) {
    //Choosing the match up
    for(let i = 0; i < divisionTeams.length(); i++){

      //If the team has already been assigned a game, continue to next team
      if(teams.includes(divisionTeams[i].team_id)){
        continue;
      }

      //Within sub league 20 / 32
      //Outside of sub league 11 / 32
      //Outside of league 1 / 32 
      //Home or away is a coin flip

      //Getting a random number
      let num = roll(0,32);

      //This means that the team is playing outside their subleague
      if (num == 0) {
        let avalibleTeams = returnOutsideSubleague(divisionTeams, divisionTeams[i].subleague_id);
      }
      //This means that the team is playing outside their division
      else if (num < 12) {
        let avalibleTeams = returnOutsideDivision(divisionTeams, divisionTeams[i].subleague_id, divisionTeams[i].division_id);
      }
      //This means that the team is playing inside their division
      else {
        let avalibleTeams = returnInsideDivision(divisionTeams, divisionTeams[i].subleague_id, divisionTeams[i].team_id);
      }


      //Roll a number for the index of the avalible teams
      //All area equally weighted within the chosen section
      num = roll(0, avalibleTeams.length() - 1);
      //Select a team
      let chosenTeam = avalibleTeams[num];


      //Getting a decide if the first team is playing home or away
      num = roll(0,1);
      
      switch (num){

        //First team is the home team
        case 0:
          teams.push(divisionTeams[i].team_id);
          teams.push(chosenTeam);
          break;

        //First team is the away team
        case 1:
          teams.push(chosenTeam);
          teams.push(divisionTeams[i].team_id);
          break;
      }
    }


    //Creating the game days

    //Looping through for the set of three games
    for (let j = 0; j < 3; j++){

      //Looping through the pairs of teams, and inseting them into the database
      for(let i = 0; i < teams.length(); i += 2){
        setSeasonGameMatches(k*3 + j, season, teams[i], teams[i+1]);
      }
    }
  }
}
