const { pool } = require("../../../config/db");
const { roll } = require("../../middleware/randomRoll");


const { sendGameStart } = require("Events/gameStart");
const { sendNewInning } = require("Events/inningManagement");

const { sendBatterUp } = require("Events/batterManagement");

//Need to get in all the imports
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
            await sendGameStart(game_id, params);
            break;
        case 'INNING_START':
            await sendNewInning(game_id, params);
            break;
        case 'BATTER_UP':
            await sendBatterUp(game_id, params);
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