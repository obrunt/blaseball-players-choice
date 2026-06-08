const { getMultiplier } = require("./getMultiplier");

const { getVibes, getPlayerStat, isFlinching } = require("../database/fetchPlayerInfo");
const { getGameSeason, getGameDay } = require("../database/fetchSeasonDayGames");
const { getGameStadium, getGameInning } = require("../database/fetchGameInfo");
const { getStadiumStat } = require("../database/fetchStadiumInfo");




function get_double_play_threshold(game_id){

    const { batter, pitcher, batting_team, pitching_team } = await getPlayersTeams(game_id);

    const season = await getGameSeason(game_id);
    const day = await getGameDay(game_id);
    const stadium_id = await getGameStadium(game_id);
    const inning = await getGameInning(game_id);


    const pitcher_vibes = await getVibes(pitcher, day);
    const fielder_vibes = await getVibes(fielder_id, day);



    let multiplier = getMultiplier(batter, batting_team, stadium_id, game_id, season, day, 'tragicness');
    const batter_tragicness = (await getPlayerStat('tragicness', batter)) * (1 / multiplier);
    const inverted_tragicness = max((1 - batter_tragicness), 0);

    multiplier = getMultiplier(pitcher, pitching_team, stadium_id, game_id, season, day, 'shakespearianism');
    const pitcher_shakespearianism = (await getPlayerStat('shakespearianism', pitcher)) * multiplier * (1 + 0.2 * pitcher_vibes);
    
    multiplier = getMultiplier(fielder_id, pitching_team, stadium_id, game_id, season, day, 'tenaciousness');
    const fielder_tenaciousness = (await getPlayerStat('tenaciousness', fielder_id)) * multiplier * (1 + 0.2 * fielder_vibes);

    const stadium_elongation = await getStadiumStat('elongation', stadium_id) - 0.5;


    const threshold = -0.05
                    + 0.40 * pitcher_shakespearianism
                    - 0.18 * inverted_tragicness
                    + 0.10 * fielder_tenaciousness
                    - 0.16 * stadium_elongation;

    return max(threshold, 0.001);
}

//This forumal is just made up wholecloth
//Is takes the formula structure from double plays
//Along with some attributes from the sacrifice
    //Needed some way that it would check to see if the batter even attempted a sacrifice
    //Because moving the fielders/sacrifice outside of the runner on first base check
    //Means that without this check there would only be a regular ground out when there was one out left in the inning
function get_sacrifice_attempt_threshold(fielder_id, game_id){

    const { batter, pitcher, batting_team, pitching_team } = await getPlayersTeams(game_id);

    const season = await getGameSeason(game_id);
    const day = await getGameDay(game_id);
    const stadium_id = await getGameStadium(game_id);
    const inning = await getGameInning(game_id);


    const pitcher_vibes = await getVibes(pitcher, day);
    const fielder_vibes = await getVibes(fielder_id, day);


    let multiplier = getMultiplier(batter, batting_team, stadium_id, game_id, season, day, 'martyrdom');
    const batter_martyrdom = (await getPlayerStat('martyrdom', batter)) * (1 / multiplier);
    const inverted_martyrdom = max((1 - batter_martyrdom), 0);

    multiplier = getMultiplier(pitcher, pitching_team, stadium_id, game_id, season, day, 'shakespearianism');
    const pitcher_shakespearianism = (await getPlayerStat('shakespearianism', pitcher)) * multiplier * (1 + 0.2 * pitcher_vibes);
    
    multiplier = getMultiplier(fielder_id, pitching_team, stadium_id, game_id, season, day, 'watchfulness');
    const fielder_watchfulness = (await getPlayerStat('watchfulness', fielder_id)) * multiplier * (1 + 0.2 * fielder_vibes);

    const stadium_elongation = await getStadiumStat('elongation', stadium_id) - 0.5;


    const threshold = -0.05
                    + 0.40 * pitcher_shakespearianism
                    - 0.18 * inverted_martyrdom
                    + 0.10 * fielder_watchfulness
                    - 0.16 * stadium_elongation;

    return max(threshold, 0.001);
}

function get_sacrifice(game_id){

    const { batter, batting_team } = await getPlayersTeams(game_id);

    const season = await getGameSeason(game_id);
    const day = await getGameDay(game_id);
    const stadium_id = await getGameStadium(game_id);
    const inning = await getGameInning(game_id);

    
    let multiplier = getMultiplier(batter, batting_team, stadium_id, game_id, season, day, 'martyrdom');
    const batter_martyrdom = (await getPlayerStat('martyrdom"', batter)) * (1 / multiplier);

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
    get_sacrifice,
    get_sacrifice_attempt_threshold
}