const { pool } = require("../../../config/db");
const { getGameCounts } = require('./fetchGameInfo');


function pitcherAcidicBlood(game_id){

}


async function isMaximumBaseball(game_id){
  //Need to get all of the outs, balls and fouls for the team that is currently up to bat
  //After getting them, compare the current to the maximum count - 1
      //Minus one because otherwise would roll over to be non maximum

  let info = await getGameCounts(game_id);

  //Checking that all of the info is the most it can be

  if(info.bases_occupied.length == info.base_count){
      if(info.strikes == (info.strike_count - 1)){
          if(info.balls == (info.ball_count - 1)){
              if(info.out == (info.ball_out - 1)){
                  return true;
              }
          }
      }
  }
  return false;
}



function setIsMaximumBlaseBall(value){
    isMaximumBaseball = value;
}



module.exports = {
    isMaximumBaseball,

    setIsMaximumBlaseBall
};