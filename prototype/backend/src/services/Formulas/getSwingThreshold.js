const { getMultiplier } = require("getMultiplier");

const { getVibes, getPlayerStat } = require("../database/fetchPlayerInfo");
const { fetchGameSeason, fetchGameDay } = require("../database/fetchSeasonDayGames");
const { getGameStadium, getGameInning } = require("../database/fetchGameInfo");
const { getStadiumStat } = require("../database/fetchStadiumInfo");



function get_swing_strike_threshold(batter_id, pitcher_id, batter_team, pitcher_team, game_id){
    const season = await fetchGameSeason(game_id);
    const day = await fetchGameDay(game_id);
    const stadium_id = await getGameStadium(game_id);
    const inning = await getGameInning(game_id);
    
    const pitcher_vibes = await getVibes(pitcher_id, day);
    const batter_vibes = await getVibes(batter_id, day);

    
    let stadium_hype = await getStadiumStat('hype', stadium_id);
    //See if the home team is up to bat
    if(!inning.top_of_inning){
        stadium_hype *= -1;
    }

    const batter_hype = -stadium_hype * (1 + 0.2 * batter_vibes);
    const pitcher_hype = stadium_hype * (1 + 0.2 * pitcher_vibes);


    let multiplier = getMultiplier(batter_id, batter_team, stadium_id, game_id, season, day, 'divinity');
    const batter_divinity = (await getPlayerStat('divinity', batter_id)) * multiplier * (1 + 0.2 * batter_vibes);
    multiplier = getMultiplier(batter_id, batter_team, stadium_id, game_id, season, day, 'musclitude');
    const batter_musclitude = (await getPlayerStat('musclitude', batter_id)) * multiplier * (1 + 0.2 * batter_vibes);
    multiplier = getMultiplier(batter_id, batter_team, stadium_id, game_id, season, day, 'thwackability');
    const batter_thwackability = (await getPlayerStat('thwackability', batter_id)) * multiplier * (1 + 0.2 * batter_vibes);
    multiplier = getMultiplier(batter_id, batter_team, stadium_id, game_id, season, day, 'patheticism');
    const batter_patheticism = (await getPlayerStat('patheticism', batter_id)) * (1 / multiplier);
    const batter_patheticism_inverted = (1 - batter_patheticism) * (1 + 0.2 * batter_vibes);
    
    multiplier = getMultiplier(pitcher_id, pitcher_team, stadium_id, game_id, season, day, 'ruthlessness');
    const pitcher_ruthlessness = (await getPlayerStat('ruthlessness', pitcher_id)) * multiplier * (1 + 0.2 * pitcher_vibes);

    
    const stadium_viscosity = await getStadiumStat('viscosity', stadium_id);

    const combined_batting = (batter_divinity + batter_musclitude + batter_thwackability + batter_patheticism_inverted) / 4;

    let threshold;
    if(season < 18){
        threshold = 0.7 + 0.35 * combined_batting - 0.4 * pitcher_ruthlessness + 0.2 * (stadium_viscosity - 0.5);
    }
    else if (season == 18){
        threshold = 0.6 + 0.35 * (combined_batting + 0.2 * batter_hype) - 0.2 * (pitcher_ruthlessness + 0.2 * pitcher_hype) + 0.2 * (stadium_viscosity - 0.5);
    }
    else{
        threshold = 0.6 + 0.35 * combined_batting + 0.04 * batter_hype - 0.2 * pitcher_ruthlessness - 0.03125 * pitcher_hype + 0.2 * (stadium_viscosity - 0.5);
    }

    return threshold;
}


function get_swing_ball_threshold(batter_id, pitcher_id, batter_team, pitcher_team, game_id){
    const season = await fetchGameSeason(game_id);
    const day = await fetchGameDay(game_id);
    const stadium_id = await getGameStadium(game_id);
    const inning = await getGameInning(game_id);
    
    const pitcher_vibes = await getVibes(pitcher_id, day);
    const batter_vibes = await getVibes(batter_id, day);

    let multiplier = getMultiplier(batter_id, batter_team, stadium_id, game_id, season, day, 'moxie');
    const batter_moxie = (await getPlayerStat('moxie', batter_id)) * multiplier * (1 + 0.2 * batter_vibes);
    multiplier = getMultiplier(batter_id, batter_team, stadium_id, game_id, season, day, 'patheticism');
    const batter_patheticism = (await getPlayerStat('patheticism', batter_id)) * (1 / multiplier);
    
    multiplier = getMultiplier(pitcher_id, pitcher_team, stadium_id, game_id, season, day, 'ruthlessness');
    const pitcher_ruthlessness = (await getPlayerStat('ruthlessness', pitcher_id)) * multiplier * (1 + 0.2 * pitcher_vibes);

    
    const stadium_viscosity = await getStadiumStat('viscosity', stadium_id);


    let combined;
    if(season < 18){
        combined = ((12 * pitcher_ruthlessness) - (5 * batter_moxie) + (5 * batter_patheticism) + (4 * stadium_viscosity)) / 20;
    }
    else{
        combined = 0.375 * (pitcher_ruthlessness ** 0.25 ) + 0.2 * stadium_viscosity - 0.25 * batter_moxie + 0.25 * batter_patheticism;
    }

    const threshold = max(min(combined ** 1.5, 0.95), 0.1);

    return threshold;
}



module.exports = {
    get_swing_ball_threshold,
    get_swing_strike_threshold
}