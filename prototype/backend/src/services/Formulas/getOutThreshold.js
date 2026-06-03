const { getMultiplier } = require("getMultiplier");

const { getVibes, getPlayerStat } = require("../database/fetchPlayerInfo");
const { fetchGameSeason, fetchGameDay } = require("../database/fetchSeasonDayGames");
const { getGameStadium, getGameInning } = require("../database/fetchGameInfo");
const { getStadiumStat } = require("../database/fetchStadiumInfo");


function get_out_threshold(batter_id, pitcher_id, fielder_id, batter_team, pitcher_team, game_id){
    const season = await fetchGameSeason(game_id);
    const day = await fetchGameDay(game_id);
    const stadium_id = await getGameStadium(game_id);    

    const pitcher_vibes = await getVibes(pitcher_id, day);
    const batter_vibes = await getVibes(batter_id, day);
    const fielder_vibes = await getVibes(fielder_id, day);


    let multiplier = getMultiplier(batter_id, batter_team, stadium_id, game_id, season, day, 'thwackability');
    const batter_thwackability = (await getPlayerStat('thwackability', batter_id)) * multiplier * (1 + 0.2 * batter_vibes);

    multiplier = getMultiplier(batter_id, batter_team, stadium_id, game_id, season, day, 'unthwackability');
    const pitcher_unthwackability = (await getPlayerStat('unthwackability', batter_id)) * multiplier * (1 + 0.2 * pitcher_vibes);

    multiplier = getMultiplier(batter_id, batter_team, stadium_id, game_id, season, day, 'omniscience');
    const fielder_omniscience = (await getPlayerStat('omniscience', batter_id)) * multiplier * (1 + 0.2 * fielder_vibes);


    const stadium_grandiosity = await getStadiumStat('grandiosity', stadium_id) - 0.5;
    const stadium_ominousness = await getStadiumStat('ominousness', stadium_id) - 0.5;
    const stadium_inconvenience = await getStadiumStat('inconvenience', stadium_id) - 0.5;
    const stadium_viscosity = await getStadiumStat('viscosity', stadium_id) - 0.5;
    const stadium_forwardness = await getStadiumStat('forwardness', stadium_id) - 0.5;
    const stadium_obtuseness = await getStadiumStat('obtuseness', stadium_id) - 0.5;


    let threshold;
    //Formula changes sepending on the season
        //For seasons up to and including 13
    if(season < 13){
        threshold =
            0.315
            + 0.1 * batter_thwackability
            - 0.08 * pitcher_unthwackability
            - 0.07 * fielder_omniscience
            + 0.0145 * stadium_grandiosity
            + 0.0085 * stadium_ominousness
            - 0.011 * stadium_inconvenience
            - 0.005 * stadium_viscosity
            + 0.01 * stadium_forwardness;
    }
    //For season 14
    else if (season == 13){
        threshold =
            0.3115
            + 0.1 * batter_thwackability
            - 0.08 * pitcher_unthwackability
            - 0.065 * fielder_omniscience
            + 0.011 * stadium_grandiosity
            + 0.008 * stadium_obtuseness
            - 0.0033 * stadium_ominousness
            - 0.002 * stadium_inconvenience
            - 0.0033 * stadium_viscosity
            + 0.01 * stadium_forwardness;
    }
    //For seasons 15 and beyond
    else{
        const stadium_sum = ( 55 * stadium_grandiosity
            + 40 * stadium_obtuseness
            - 17 * stadium_ominousness
            - 10 * stadium_inconvenience
            - 17 * stadium_viscosity
            + 51 * stadium_forwardness
        ) / 100;

        threshold = 0.311 
            + 0.1 * batter_thwackability 
            - 0.08 * pitcher_unthwackability 
            - 0.064 * fielder_omniscience 
            + 0.02 * stadium_sum;
    }

    return threshold;
}

module.exports = {
    get_out_threshold
}