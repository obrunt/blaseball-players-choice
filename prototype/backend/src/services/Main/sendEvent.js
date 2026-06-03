const { pool } = require("../../../config/db");
const { roll } = require("../../middleware/randomRoll");


const { sendGameStart } = require("events/gameStart");
const { sendInningStart, sendInningFlip } = require("events/inningManagement");

const { sendBatterUp } = require("events/batterManagement");

const { sendBall, sendWalk } = require("events/countManagement");

//Need to get in all the imports
//Probably group into files
    //Inning info
    //Weather
    //Stadium
    //Batting
    //Blood
    //Other


function send_game_event(game_id, event_type, params){
    
    switch(event_type){
        case 'GAME_START':
            await sendGameStart(game_id, params);
            break;
        case 'INNING_TOP':
            await sendInningStart(game_id);
            break;
        case 'INNING_BOTTOM':
            await sendInningFlip(game_id);
            break;
        case 'BATTER_UP':
            await sendBatterUp(game_id);
            break;
        case 'WALK':
            //Sending a walk, then choosing a new batter
            await sendWalk(game_id);
            await sendBatterUp(game_id);
            break;
        case 'BALL':
            await sendBall(game_id);
            break;
        case 'STRIKEOUT':
            await sendStrikeout(game_id, params);
            break;
        case 'STRIKE':
            await sendStrike(game_id, params);
            break;
        case 'FOUL':
            await sendFoul(game_id, params);
            break;
        case 'FLYOUT':
            await sendFlyout(game_id, params);
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

    return;
}


module.export = {
    send_game_event
};