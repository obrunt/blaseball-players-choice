
const { getMultiplier } = require("./getMultiplier");

const { getVibes, getPlayerStat } = require("../database/fetchPlayerInfo");
const { getGameSeason, getGameDay } = require("../database/fetchSeasonDayGames");
const { getGameStadium, getGameInning, getPlayersTeams } = require("../database/fetchGameInfo");
const { getStadiumStat } = require("../database/fetchStadiumInfo");

//TODO: change all the get requireed info at the beginning to maybe a helper function
    //This would be used by almost all of the formula files

    
async function get_homerun_threshold(game_id){

    const { batter, pitcher, batting_team, pitching_team } = await getPlayersTeams(game_id);

    const season = await getGameSeason(game_id);
    const day = await getGameDay(game_id);
    const stadium_id = await getGameStadium(game_id);
    const inning = await getGameInning(game_id);


    const pitcher_vibes = await getVibes(pitcher, day);
    const batter_vibes = await getVibes(batter, day);


    let multiplier = getMultiplier(batter, batting_team, stadium_id, game_id, season, day, 'divinity');
    const batter_divinity = (await getPlayerStat('divinity', batter)) * multiplier * (1 + 0.2 * batter_vibes);

    multiplier = getMultiplier(pitcher, pitching_team, stadium_id, game_id, season, day, 'overpowerment');
    const pitcher_overpowerment = (await getPlayerStat('overpowerment', pitcher)) * multiplier * (1 + 0.2 * pitcher_vibes);
    multiplier = getMultiplier(pitcher, pitching_team, stadium_id, game_id, season, day, 'suppression');
    const pitcher_suppression = (await getPlayerStat('suppression', pitcher)) * multiplier * (1 + 0.2 * pitcher_vibes);
    

    const stadium_grandiosity = await getStadiumStat('grandiosity', stadium_id) - 0.5;
    const stadium_fortification = await getStadiumStat('fortification', stadium_id) - 0.5;
    const stadium_viscosity = await getStadiumStat('viscosity', stadium_id) - 0.5;
    const stadium_ominousness = await getStadiumStat('ominousness', stadium_id) - 0.5;
    const stadium_forwardness = await getStadiumStat('forwardness', stadium_id) - 0.5;

    const ballpark_sum = 0.4 * stadium_grandiosity
                    + 0.2 * stadium_fortification
                    + 0.08 * stadium_viscosity
                    + 0.08 * stadium_ominousness
                    - 0.24 * stadium_forwardness;

    
    overpowerment_supressed = (10 * pitcher_overpowerment + pitcher_suppression) / 11;

    const threshold = 0.12
                    + 0.16 * batter_divinity
                    - 0.08 * overpowerment_supressed
                    - 0.18 * ballpark_sum;

    return parseFloat(threshold.toFixed(4));
}


async function get_triple_threshold(fielder_id, game_id){

    const { batter, pitcher, batting_team, pitching_team } = await getPlayersTeams(game_id);

    const season = await getGameSeason(game_id);
    const day = await getGameDay(game_id);
    const stadium_id = await getGameStadium(game_id);
    const inning = await getGameInning(game_id);

    const pitcher_vibes = await getVibes(pitcher, day);
    const batter_vibes = await getVibes(batter, day);
    const fielder_vibes = await getVibes(fielder_id, day);

    let hype = await getStadiumStat('hype', stadium_id);

    if(!inning.top_of_inning){
        hype *= -1;
    }

    let multiplier = getMultiplier(batter, batting_team, stadium_id, game_id, season, day, 'ground_friction');
    const batter_ground_friction = (((await getPlayerStat('ground_friction', batter)) * multiplier) - 0.2 * hype ) * (1 + 0.2 * batter_vibes);

    multiplier = getMultiplier(pitcher, pitching_team, stadium_id, game_id, season, day, 'overpowerment');
    const pitcher_overpowerment = (((await getPlayerStat('overpowerment', pitcher)) * multiplier)  + 0.2 * hype ) * (1 + 0.2 * pitcher_vibes);
    
    multiplier = getMultiplier(fielder_id, pitching_team, stadium_id, game_id, season, day, 'chasiness');
    const fielder_chasiness = (((await getPlayerStat('chasiness', fielder_id)) * multiplier)  + 0.2 * hype ) * (1 + 0.2 * fielder_vibes);
    

    const stadium_forwardness = await getStadiumStat('forwardness', stadium_id) - 0.5;
    const stadium_grandiosity = await getStadiumStat('grandiosity', stadium_id) - 0.5;
    const stadium_obtuseness = await getStadiumStat('obtuseness', stadium_id) - 0.5;
    const stadium_viscosity = await getStadiumStat('viscosity', stadium_id) - 0.5;
    const stadium_ominousness = await getStadiumStat('ominousness', stadium_id) - 0.5;

    const ballpark_sum = (3 * stadium_forwardness + 5 * stadium_grandiosity + 5 * stadium_obtuseness - stadium_viscosity - stadium_ominousness) / 15;

    let threshold;

    if(season < 13){
        threshold = 0.05 
                    + 0.2 * batter_ground_friction
                    - 0.04 * pitcher_overpowerment 
                    - 0.06 * fielder_chasiness 
                    + 0.1 * ballpark_sum;
    }
    else if (season < 18){
        threshold = 0.045 
                    + 0.2 * batter_ground_friction
                    - 0.04 * pitcher_overpowerment 
                    - 0.05 * fielder_chasiness 
                    + 0.1 * ballpark_sum;
    }
    else{
        threshold = 0.042 
                    + 0.2 * batter_ground_friction
                    - 0.056 * pitcher_overpowerment 
                    - 0.05 * fielder_chasiness 
                    + 0.1 * ballpark_sum;
    }

    return parseFloat(threshold.toFixed(4));
}


async function get_double_threshold(fielder_id, game_id){

    const { batter, pitcher, batting_team, pitching_team } = await getPlayersTeams(game_id);

    const season = await getGameSeason(game_id);
    const day = await getGameDay(game_id);
    const stadium_id = await getGameStadium(game_id);
    const inning = await getGameInning(game_id);


    const pitcher_vibes = await getVibes(pitcher, day);
    const batter_vibes = await getVibes(batter, day);
    const fielder_vibes = await getVibes(fielder_id, day);



    let multiplier = getMultiplier(batter, batting_team, stadium_id, game_id, season, day, 'musclitude');
    const batter_musclitude = (await getPlayerStat('musclitude', batter)) * multiplier * (1 + 0.2 * batter_vibes);

    multiplier = getMultiplier(pitcher, pitching_team, stadium_id, game_id, season, day, 'overpowerment');
    const pitcher_overpowerment = (await getPlayerStat('overpowerment', pitcher)) * multiplier * (1 + 0.2 * pitcher_vibes);
    
    multiplier = getMultiplier(fielder_id, pitching_team, stadium_id, game_id, season, day, 'chasiness');
    const fielder_chasiness = (await getPlayerStat('chasiness', fielder_id)) * multiplier * (1 + 0.2 * fielder_vibes);
    

    const stadium_forwardness = await getStadiumStat('forwardness', stadium_id) - 0.5;
    const stadium_elongation = await getStadiumStat('elongation', stadium_id) - 0.5;
    const stadium_viscosity = await getStadiumStat('viscosity', stadium_id) - 0.5;
    const stadium_ominousness = await getStadiumStat('ominousness', stadium_id) - 0.5;

    const ballpark_sum = 0.027 * stadium_forwardness 
                        - 0.015 * stadium_elongation 
                        - 0.010 * stadium_ominousness 
                        - 0.008 * stadium_viscosity;

    let threshold;

    if(season < 13){
        threshold = 0.17 
                    + 0.2 * batter_musclitude
                    - 0.04 * pitcher_overpowerment 
                    - 0.1 * fielder_chasiness 
                    + ballpark_sum;
    }
    else if (season == 13){
        threshold = 0.165
                    + 0.2 * batter_musclitude
                    - 0.04 * pitcher_overpowerment 
                    - 0.09 * fielder_chasiness 
                    + ballpark_sum;
    }
    else{
        threshold = 0.16
                    + 0.2 * batter_musclitude
                    - 0.04 * pitcher_overpowerment 
                    - 0.08 * fielder_chasiness 
                    + ballpark_sum;
    }

    return parseFloat(threshold.toFixed(4));
}

async function get_base_advancement_threshold(runner_id, fielder_id, game_id){
    const { batting_team, pitching_team } = await getPlayersTeams(game_id);

    const season = await getGameSeason(game_id);
    const day = await getGameDay(game_id);
    const stadium_id = await getGameStadium(game_id);
    const inning = await getGameInning(game_id);

    //Original formual doesn't include the vibes in it
        //Included because it helps with changing the outcomes
        //aka more game variety
    const runner_vibes = await getVibes(runner_id, day);
    const fielder_vibes = await getVibes(fielder_id, day);


    let multiplier = getMultiplier(runner_id, batting_team, stadium_id, game_id, season, day, 'continuation');
    const runner_continuation = (await getPlayerStat('continuation', runner_id)) * multiplier * (1 + 0.2 * runner_vibes);
    
    multiplier = getMultiplier(fielder_id, pitching_team, stadium_id, game_id, season, day, 'tenaciousnes');
    const fielder_tenaciousnes = (await getPlayerStat('tenaciousnes', fielder_id)) * multiplier * (1 + 0.2 * fielder_vibes);
    
    const threshold = 0.7 - 1.0 * fielder_tenaciousnes + 0.6 * runner_continuation;

    //Making sure the value is between 0.01 and 0.95
    return Math.min(Math.max(parseFloat(threshold.toFixed(4)), 0.01), 0.95);
}


module.exports = {
    get_homerun_threshold,
    get_triple_threshold,
    get_double_threshold,
    get_base_advancement_threshold
}
