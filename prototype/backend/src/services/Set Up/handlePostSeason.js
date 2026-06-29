const { pool } = require("../../../config/db");
const { roll } = require("../../utils/randomRoll");
const { partition, partitionBy } = require('../../utils/partition');


async function setPostSeasonGame(params){
  const { subdivision_id, home_team, away_team, games_to_win, round_number, season, day} = params;


  const gameQuery = `
    INSERT INTO data.games (day, season, home_team, away_team, series_length, is_postseason)
    OUTPUT Inserted.game_id
     VALUES (
      ?,
      ?,
      ?,
      ?,
      2,
      true
    );
  `;

  try {
    const gameResult = await pool.query(gameQuery, [day, season, home_team, away_team]);

    //TODO: find some way for the insert function to send the game_id of the new insert
    console.log(gameResult);

  } catch (err){
    console.log(err);
  }

  /**
   * 

CREATE TABLE data.post_season_rounds(
    round_number INT DEFAULT 0,
    games_to_win INT DEFAULT 0,
    games_played INT DEFAULT 0,
    home_team VARCHAR(36),
    away_team VARCHAR(36),
    home_team_wins INT DEFAULT 0,
    away_team_wins INT DEFAULT 0,
    game_id VARCHAR(36)
);

   */

  const postSeasonQuery = `
    INSERT INTO data.post_season_rounds (round_number, games_to_win, home_team, away_team, game_id)
     VALUES (
      ?,
      ?,
      ?,
      ?,
      ?
    );
  `;

  
  try {
    const postSeasonResult = await pool.query(postSeasonQuery, [round_number, games_to_win, home_team, away_team, gameResult]);

    
    return postSeasonResult;

  } catch (err){
    console.log(err);
  }
}







//TODO: fix this whole system
        //Need to add check to make sure that the number of teams can eventually become 2^x
            //Checks for 2^x number of subleagues
            //Checks that wildcard per subleague less than skill
        //The normal game system is "stateless" but have to find a way to reference the current state

async function setPostSeasonStandings(season){

    //Brainstorming time

    //Things we know:
        //Wild card games are best two out of three
        //Real games are best three of five
        //Teams are selected by the following:
            //Best team of each division
            //Two teams from each subleague that scored the best
            //One wild card team from subleague division


    let seasonStandings = await getSeasonStandings(season);

    //Don't need to get the different divisions, because all teams are playing in the same division

    const postSeasonTeams = getPlayingTeams(season, seasonStandings);

    //Getting the team standings sorted by the subleague
        //Only time teams of other subleagues is when only one team from a sub league remains
    seriesCatagories = partitionBy(postSeasonTeams, o => o.subleague_id);


    //Could probably stand to make this more generic 
    if(season > 10){
        //TODO: Need to get a paramater that tells how many wildcards there are in a league
            //This says that per subdivision there are that many wildcard matches
        const wildcardCount = 1;

        for(subdivision in seriesCatagories){
            setPostSeasonOrderWildCard(subdivision, wildcardCount);
        }
    }
    //This means we don't have to worry about the wildcard games
    else {
        for(subdivision in seriesCatagories){
            setPostSeasonOrder(subdivision);
        }
    }

    return;
}


function setPostSeasonOrder(subdivision){
    for (let i = 0; i < subdivision.length; i+= 2){
        const params = {
            subdivision_id: subdivision[i].subleague_id,
            home_team: subdivision[i].winning_teams,
            away_team: subdivision[i+1].winning_teams,
            games_to_win: 3,
            round_number: 1,
            season: season,
            day: 100
        }

        setPostSeasonGame(params);
    }
    
    return;
}


//This function really needs to change
    //Add a check that the total wild cards per
function setPostSeasonOrderWildCard(subdivision, wildcardCount){
    //There's three different for loops here
    //This has to be made better

    for (let i = 0; i < wildcardCount * 2; i += 2){
        params = {
            subdivision_id: subdivision[i].subleague_id,
            home_team: subdivision[i].winning_teams,
            away_team: subdivision[i+1].winning_teams,
            games_to_win: 2,
            round_number: 0,
            season: season,
            day: 100
        };

        setPostSeasonGame(params);
    }
    
    for (let i = wildcardCount * 2; i < subdivision.length - wildcardCount - 1; i += 2){
        params = {
            subdivision_id: subdivision[i].subleague_id,
            home_team: subdivision[i].winning_teams,
            away_team: subdivision[i+1].winning_teams,
            games_to_win: 3,
            round_number: 1,
            season: season,
            day: 101
        };

        setPostSeasonGame(params);
    }

    //This is for teams who have to wait until the wildcard is decided
    for(let i = subdivision.length - wildcardCount; i < subdivision.length; i++){
        const params = {
            subdivision_id: subdivision[i].subleague_id,
            home_team: subdivision[i].winning_teams,
            away_team: null,
            games_to_win: 3,
            round_number: 1,
            season: season,
            day: 101
        };

        setPostSeasonGame(params);
    }


    return;
}

function getPlayingTeams (season, seasonStandings){
    
    let playingTeams = [];

    const subleagueGrouped = Object.values(seasonStandings.reduce((acc, item) => {
        // Append the item to the array for each subleague (wild/mild or good/evil)
        acc[item.subleague_id] = [...(acc[item.subleague_id] || []), item];
        return acc;
    }, {}));

    const divisionGrouped = Object.values(seasonStandings.reduce((acc, item) => {
        // Append the item to the array for each division (usually groups of 5 or 6)
        acc[item.subleague_id] = [...(acc[item.subleague_id] || []), item];
        return acc;
    }, {}));

    //Getting the first teams from the season
        //The teams are already ordered by the total wins and card for tie breakers
    for (let i = 0; i < divisionGrouped.length; i++){
        playingTeams.push(divisionGrouped[i][0]);
    }

    //Removing elements that are already in the array
    subleagueGrouped = subleagueGrouped.filter(function(el) {
        return playingTeams.indexOf(el) > -1;
    });

    //Getting the other two best teams in the league, and a wild card if needed
    for (let i = 0; i < subleagueGrouped.length; i++){
        playingTeams.push(subleagueGrouped[i][0]);
        playingTeams.push(subleagueGrouped[i][1]);

        //Removing the elements that we've added to the array
        subleagueGrouped.splice((i, 0), 2);

        
        //This is seeing if wild cards would be included
        if(season > 10){
            //Selecting a random element from the remaining parts of the array
            playingTeams.push(
                subleagueGrouped[i][Math.floor(Math.random()*subleagueGrouped[i].length)]
            );
        }
    }

    return playingTeams;
}

module.exports = {
    setPostSeasonStandings
}