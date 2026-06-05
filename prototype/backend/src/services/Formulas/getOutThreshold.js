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

    multiplier = getMultiplier(pitcher_id, pitcher_team, stadium_id, game_id, season, day, 'unthwackability');
    const pitcher_unthwackability = (await getPlayerStat('unthwackability', pitcher_id)) * multiplier * (1 + 0.2 * pitcher_vibes);

    multiplier = getMultiplier(fielder_id, pitcher_team, stadium_id, game_id, season, day, 'omniscience');
    const fielder_omniscience = (await getPlayerStat('omniscience', fielder_id)) * multiplier * (1 + 0.2 * fielder_vibes);


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


function get_fly_ground_threshold(batter_id, pitcher_id, batter_team, pitcher_team, game_id){
    const season = await fetchGameSeason(game_id);
    const day = await fetchGameDay(game_id);
    const stadium_id = await getGameStadium(game_id);
    const inning = await getGameInning(game_id);

    let multiplier = getMultiplier(batter_id, batter_team, stadium_id, game_id, season, day, 'buoyancy');
    const batter_buoyancy = (await getPlayerStat('buoyancy', batter_id)) * (1 / multiplier);
    

    //As per the formula
        //To be completetly accurate this should use the batters stat
        //But it passed the pitchers team
        //So it's likely that it was intended to be getting the pitchers stat
        //So I've taken the liberty to just make that change
        //Even if it's not sim accurate
    multiplier = getMultiplier(pitcher_id, pitcher_team, stadium_id, game_id, season, day, 'suppression');
    const pitcher_suppression = (await getPlayerStat('suppression', pitcher_id)) * multiplier;
    

    const stadium_ominousness = (await getStadiumStat('ominousness', stadium_id)) - 0.5;

    let stadium_hype = await getStadiumStat('hype', stadium_id);
    if(!inning.top_of_inning){
        stadium_hype *= -1;
    }


    const threshold = 0.18 + 0.3 * (batter_buoyancy + 0.2 * stadium_hype) - 0.16 * (pitcher_suppression + 0.2 * stadium_hype) - 0.1 * stadium_ominousness;

    return max(threshold, 0.01);
}



function get_advance_base_out_fly(runner_id, batter_team, base_index, game_id){
    const season = await fetchGameSeason(game_id);
    const day = await fetchGameDay(game_id);
    const stadium_id = await getGameStadium(game_id);
    const inning = await getGameInning(game_id);

    
    const runner_vibes = await getVibes(runner_id, day);

    
    let multiplier = getMultiplier(runner_id, batter_team, stadium_id, game_id, season, day, 'indulgence');
    const runner_indulgence = (await getPlayerStat('indulgence', runner_id)) * multiplier * (1 + 0.2 * runner_vibes);

    
    const stadium_elongation = await getStadiumStat('elongation', stadium_id) - 0.5;
    const stadium_inconvenience = await getStadiumStat('inconvenience', stadium_id) - 0.5;


    let threshold;
    //If runner is on first base, they'll be advancing to second
    if(base_index == 0){
        threshold = -0.085
            + 0.36 * runner_indulgence
            - 0.38 * runner_indulgence**2
            + 0.24 * runner_indulgence**4
            - 0.10 * stadium_elongation
            - 0.10 * stadium_inconvenience;
    }
    //If runner is on second base, they'll be advancing to third
    else if (base_index == 1){
        threshold = 0.045
            + 0.065 * runner_indulgence
            + 0.30 * runner_indulgence**2
            - 0.10 * stadium_elongation
            - 0.10 * stadium_inconvenience;
    }
    //If they're on the third or fourth base
        //In the case where one of the teams has a mod that increases the total number of bases
        //They might not actally have the same formula, but it's easy enough to have a catch all
    else{
        threshold = 0.45
            + 0.35 * runner_indulgence
            - 0.10 * stadium_elongation
            - 0.10 * stadium_inconvenience;
    }

    return threshold;
}


function get_advance_base_out_ground(runner_id, fielder_id, batter_team, pitcher_team, game_id){
    const season = await fetchGameSeason(game_id);
    const day = await fetchGameDay(game_id);
    const stadium_id = await getGameStadium(game_id);
    const inning = await getGameInning(game_id);

    
    const runner_vibes = await getVibes(runner_id, day);
    const fielder_vibes = await getVibes(fielder_id, day);

    
    let multiplier = getMultiplier(runner_id, batter_team, stadium_id, game_id, season, day, 'indulgence');
    const runner_indulgence = (await getPlayerStat('indulgence', runner_id)) * multiplier * (1 + 0.2 * runner_vibes);

    multiplier = getMultiplier(fielder_id, pitcher_team, stadium_id, game_id, season, day, 'tenaciousness');
    const fielder_tenaciousness = (await getPlayerStat('tenaciousness', fielder_id)) * multiplier * (1 + 0.2 * fielder_vibes);


    
    const stadium_elongation = await getStadiumStat('elongation', stadium_id) - 0.5;
    const stadium_inconvenience = await getStadiumStat('inconvenience', stadium_id) - 0.5;


    const threshold = 0.5
                + 0.35 * runner_indulgence
                - 0.10 * fielder_tenaciousness
                - 0.10 * stadium_inconvenience
                - 0.10 * stadium_elongation;

    return threshold;
}


module.exports = {
    get_out_threshold,
    get_fly_ground_threshold,
    get_advance_base_out_fly,
    get_advance_base_out_ground
}