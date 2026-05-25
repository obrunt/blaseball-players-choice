const { pool } = require("../../../config/db");
const { roll } = require("../../middleware/randomRoll");

async function fetchTeamRoster(team_id){

    //ordering by the position the players play
        //0 - Batters
        //1 - Pitchers
        //2:4 - Shadows
    //Further by their orders within the position
  const query = `
    SELECT * FROM data.team_roster 
    WHERE valid_until IS NULL 
    AND team_id = ? AND position_type_id = 1
    ORDER BY position_id;
  `;

  try {
    const result = await pool.query(query, [team_id]);

    //Returns an array of objects for the different rows of the current league table
    return result[0];

  } catch (err){
    console.log(err);
  }
}

async function fetcherPreviousPitcherHome(team_id, season, day){
    const query = `
        SELECT home_team_pitcher_id FROM data.games
        WHERE season = ? AND day = ?
        AND home_team = ?;
    `;

    try {
        const result = await pool.query(query, [season, day, team_id]);

        //The player id of the pitcher is returned
        return result[0][0];

    } catch (err){
        console.log(err);
    }
}

async function fetcherPreviousPitcherAway(team_id, season, day){
    const query = `
        SELECT away_team_pitcher_id FROM data.games
        WHERE season = ? AND day = ?
        AND away_team = ?;
    `;

    try {
        const result = await pool.query(query, [season, day, team_id, team_id]);

        //The player id of the pitcher is returned
        return result[0][0];

    } catch (err){
        console.log(err);
    }
}




function fetch_pitcher(team_id, season, day){
    const team = fetchTeamRoster(team_id);
    let hasPitcher = false;
    let daySub = 1;

    while(!hasPitcher){
        //Getting the home team pitcher
        let previousPitcher = fetcherPreviousPitcherHome(team_id, season, day-daySub);
        
        //If the team was playing away, then get the pitcher
            //Currently the pitcher is blank, so change that
        if(previousPitcher == null){
            previousPitcher = fetcherPreviousPitcherAway(team_id, season, day-daySub);
        }


        //Finding the position of the pitchers
        const i = team.findIndex(e => e.player_id == (previousPitcher));
        
        //If a pitcher cannot be found, check a previous day
            //This method of doing things can run into an error where all pitcher have switched
            //If a full pitcher thesues has occured then this method will fail to return anything
        if (i = -1) {
            daySub++;
            continue;
        }

        //This is done if a pitcher has been removed from the team to stop overreach
            //This method also assumes that new pitchers are added to the end of the roster
        const postition = (i + 1) % team.length();

        //Exiting the loop
        hasPitcher = true;
    }    

    //Returning the player id of the selected pitcher
    return team[position].player_id;
}


module.export = {
    fetch_pitcher,
    fetch_batter
}