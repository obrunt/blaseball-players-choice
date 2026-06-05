const { getMultiplier } = require("getMultiplier");

const { getVibes, getPlayerStat, isFlinching } = require("../database/fetchPlayerInfo");
const { fetchGameSeason, fetchGameDay } = require("../database/fetchSeasonDayGames");
const { getGameStadium, getGameInning } = require("../database/fetchGameInfo");
const { getStadiumStat } = require("../database/fetchStadiumInfo");




function get_double_play_threshold(batter_id, pitcher_id, fielder_id, batter_team, pitcher_team, game_id){
    const season = await fetchGameSeason(game_id);
    const day = await fetchGameDay(game_id);
    const stadium_id = await getGameStadium(game_id);
    const inning = await getGameInning(game_id);


    const pitcher_vibes = await getVibes(pitcher_id, day);
    const fielder_vibes = await getVibes(fielder_id, day);



    let multiplier = getMultiplier(batter_id, batter_team, stadium_id, game_id, season, day, 'tragicness');
    const batter_tragicness = (await getPlayerStat('tragicness', batter_id)) * (1 / multiplier);
    const inverted_tragicness = max((1 - batter_tragicness), 0);

    multiplier = getMultiplier(pitcher_id, pitcher_team, stadium_id, game_id, season, day, 'shakespearianism');
    const pitcher_shakespearianism = (await getPlayerStat('shakespearianism', pitcher_id)) * multiplier * (1 + 0.2 * pitcher_vibes);
    
    multiplier = getMultiplier(fielder_id, pitcher_team, stadium_id, game_id, season, day, 'tenaciousness');
    const fielder_tenaciousness = (await getPlayerStat('tenaciousness', fielder_id)) * multiplier * (1 + 0.2 * fielder_vibes);

    const stadium_elongation = await getStadiumStat('elongation', stadium_id) - 0.5;


    const threshold = -0.05
                    + 0.40 * pitcher_shakespearianism
                    - 0.18 * inverted_tragicness
                    + 0.10 * fielder_tenaciousness
                    - 0.16 * stadium_elongation;

    return max(threshold, 0.001);
}

function get_sacrifice(batter_id, batter_team, game_id){
    const season = await fetchGameSeason(game_id);
    const day = await fetchGameDay(game_id);
    const stadium_id = await getGameStadium(game_id);
    const inning = await getGameInning(game_id);

    
    let multiplier = getMultiplier(batter_id, batter_team, stadium_id, game_id, season, day, 'martyrdom');
    const batter_martyrdom = (await getPlayerStat('martyrdom"', batter_id)) * (1 / multiplier);

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
        threshold = 0.05 + 0.25 * batter_martyrdom;
    }
    else if (season == 19){
        threshold = 0.05 + 0.25 * batter_martyrdom - 0.05 * hype;
    }
    else{
        threshold = 0.05 + 0.25 * batter_martyrdom - 0.035 * hype;
    }
    
    return threshold;
}

module.exports = {
    get_double_play_threshold,
    get_sacrifice
}