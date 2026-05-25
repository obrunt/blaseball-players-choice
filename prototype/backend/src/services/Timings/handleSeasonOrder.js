const { pool } = require("../../../config/db");
const { roll } = require("../../middleware/randomRoll");


function fetch_game_order(season, day){
    
}

function decide_pitcher_order(){
    //take the day, mod the day by the number of pitchers, 
    //then use the remainder as the index of the pitcher

    //May have to consider edge cases if a pitcher is removed from the roster, ie swept away
    //Using this method means that a new player will replace the exact position of the old pitcher
}


module.exports = {
  fetch_game_order
};