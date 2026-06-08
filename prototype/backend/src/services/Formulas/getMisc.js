const { getMultiplier } = require("getMultiplier");

const { getVibes, getPlayerStat, isFlinching } = require("../database/fetchPlayerInfo");
const { fetchGameSeason, fetchGameDay } = require("../database/fetchSeasonDayGames");
const { getGameStadium, getGameInning } = require("../database/fetchGameInfo");
const { getStadiumStat } = require("../database/fetchStadiumInfo");

function get_acidic_pitch(pitcher_id, pitcher_team, game_id){

}



//This is a function that's just been made up whole cloth
    //Based in part on the sacrifice threshold
//According to the Shot Caller it mainly uses moxie as a baseline

function get_big_buckets_threshold(game_id){

    const { batter, batting_team } = await getPlayersTeams(game_id);

    const season = await fetchGameSeason(game_id);
    const day = await fetchGameDay(game_id);
    const stadium_id = await getGameStadium(game_id);
    const inning = await getGameInning(game_id);


    const batter_vibes = await getVibes(batter, day);
    
    
    let multiplier = getMultiplier(batter, batting_team, stadium_id, game_id, season, day, 'moxie');
    const batter_moxie = (await getPlayerStat('moxie"', batter)) * multiplier * (1 + 0.2 * batter_vibes);

    //Checking who is on the home team
    //And assigning the stadium hype to them
    let hype;

    if(inning.top_of_inning){
        hype = await getStadiumStat('hype', stadium_id);
    }
    else {
        hype = -1 * await getStadiumStat('hype', stadium_id);
    }

    let threshold;

    //For any season before 19
    if(season < 18){
        threshold = 0.05 + 0.25 * batter_moxie;
    }
    else if (season == 18){
        threshold = 0.05 + 0.25 * batter_moxie - 0.05 * hype;
    }
    else{
        threshold = 0.05 + 0.25 * batter_moxie - 0.035 * hype;
    }
    
    return threshold;
}

module.exports = {
    get_big_buckets_threshold
}