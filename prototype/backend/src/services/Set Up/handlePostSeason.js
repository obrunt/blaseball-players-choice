const { pool } = require("../../../config/db");
const { roll } = require("../../middleware/randomRoll");

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

    let playingTeams = [];

    //Getting the first teams from the season
        //The teams are already ordered by the total wins and card for tie breakers
    for (let i = 0; i < divisionGrouped.length; i++){
        playingTeams.push(divisionGrouped[i][0]);
    }

    //Removing elements that are already in the array
    subleagueGrouped = subleagueGrouped.filter(function(el) {
        return playingTeams.indexOf(el) > -1;
    });

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

    
}