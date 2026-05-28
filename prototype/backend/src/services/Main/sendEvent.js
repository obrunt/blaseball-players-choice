const { pool } = require("../../../config/db");
const { roll } = require("../../middleware/randomRoll");

//NEed to get in all the imports
//Probably group into files
    //Inning info
    //Weather
    //Stadium
    //Batting
    //Blood
    //Other


function send_game_event (game_id, event_type, params){
    switch(event_type){
        case 'GAME_START':
            await sendGameStart(game_id);
            break;
        case 'INNING_START':
            await sendNewInning(game_id);
            break;
        case 'GAME_START':
            break;
        case 'GAME_START':
            break;
        case 'GAME_START':
            break;
        case 'GAME_START':
            break;
        case 'GAME_START':
            break;
        case 'GAME_START':
            break;
    }
}


module.export = {
    send_game_event
};