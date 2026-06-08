const { getMultiplier } = require("getMultiplier");

const { getVibes, getPlayerStat, isFlinching } = require("../database/fetchPlayerInfo");
const { fetchGameSeason, fetchGameDay } = require("../database/fetchSeasonDayGames");
const { getGameStadium, getGameInning } = require("../database/fetchGameInfo");
const { getStadiumStat } = require("../database/fetchStadiumInfo");


function get_foul_threshold(game_id){

    const { batter, batting_team } = await getPlayersTeams(game_id);

    const season = await fetchGameSeason(game_id);
    const day = await fetchGameDay(game_id);
    const stadium_id = await getGameStadium(game_id);
    const inning = await getGameInning(game_id);
    

    const batter_vibes = await getVibes(batter, day);

    
    let multiplier = getMultiplier(batter, batting_team, stadium_id, game_id, season, day, 'musclitude');
    const batter_musclitude = (await getPlayerStat('musclitude', batter)) * multiplier * (1 + 0.2 * batter_vibes);
    multiplier = getMultiplier(batter, batting_team, stadium_id, game_id, season, day, 'thwackability');
    const batter_thwackability = (await getPlayerStat('thwackability', batter)) * multiplier * (1 + 0.2 * batter_vibes);
    multiplier = getMultiplier(batter, batting_team, stadium_id, game_id, season, day, 'divinity');
    const batter_divinity = (await getPlayerStat('divinity', batter)) * multiplier * (1 + 0.2 * batter_vibes);

    const batter_sum = (batter_musclitude + batter_thwackability + batter_divinity) / 3;

    
    const stadium_forwardness = await getStadiumStat('forwardness', stadium_id);
    const stadium_obtuseness = await getStadiumStat('obtuseness', stadium_id);


    let stadium_hype = await getStadiumStat('hype', stadium_id);
    let batter_hype;
    let pitcher_hype;

    //See if the home team is up to bat
    if(inning.top_of_inning){
        batter_hype = 0;
        pitcher_hype = stadium_hype;
    }
    else {
        batter_hype = stadium_hype;
        pitcher_hype = 0;
    }

    const hype_diff = (batter_hype - pitcher_hype) * (1 + 0.2 * batter_vibes);



    let threshold;
    if(season < 19){
        threshold = 0.25 + 0.1 * stadium_forwardness - 0.1 * stadium_obtuseness + 0.1 * batter_sum + 0.02 * hype_diff;
    }
    else{
        threshold = 0.25 + 0.1 * stadium_forwardness - 0.1 * stadium_obtuseness + 0.1 * batter_sum + 0.013 * hype_diff;
    }

    return threshold;
}

module.exports = {
    get_foul_threshold
}