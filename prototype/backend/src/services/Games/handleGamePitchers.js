const { pool } = require("../../../config/db");
const { roll } = require("../../middleware/randomRoll");

async function fetchTeamRosterPitchers(team_id){

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

async function fetcherPreviousPitcher(team_id, season, day){
    const query = `
        SELECT home_team, away_team, 
        home_team_pitcher_id, away_team_pitcher_id FROM data.games
        WHERE season = ? AND day = ?
        AND (home_team = ? OR away_team = ?);
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
    const team = fetchTeamRosterPitchers(team_id);
    let hasPitcher = false;
    let daySub = 1;

    while(!hasPitcher){

        //Getting the two pitchers that played in the previous game
        let previousPitcher = fetcherPreviousPitcher(team_id, season, day-daySub);
        
        //Checking which side that team we are queuing for was on
        if(previousPitcher.home_team == team_id){
            //Assigning the pitcher
            previousPitcher = previousPitcher.home_team_pitcher_id;
        }
        else if(previousPitcher.away_team == team_id){  //Not technicallly needed, but usefull for readability
            //Assigning the pitcher
            previousPitcher = previousPitcher.away_team_pitcher_id;
        }

        //Finding the position of the pitcher
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

function set_pitcher(game_id, home_pitcher, away_pitcher){
    const query = `
        UPDATE data.games
        SET home_team_pitcher_id = ?,
        away_team_pitcher_id = >
        WHERE game_id = ?;
    `;

    try {
        const result = await pool.query(query, [home_pitcher, away_pitcher, team_id]);

        //Returns ok, is not used
        return result[0];

    } catch (err){
        console.log(err);
    }
}


module.export = {
    fetch_pitcher,
    set_pitcher
}