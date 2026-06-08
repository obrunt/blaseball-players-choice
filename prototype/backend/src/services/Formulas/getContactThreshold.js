const { getMultiplier } = require("getMultiplier");

const { getVibes, getPlayerStat } = require("../database/fetchPlayerInfo");
const { fetchGameSeason, fetchGameDay } = require("../database/fetchSeasonDayGames");
const { getGameStadium } = require("../database/fetchGameInfo");
const { getStadiumStat } = require("../database/fetchStadiumInfo");



//Assume that the unknown season were just the most/least recent
const strike_threshold_look_up_table = [
    {       //Season 1
        constant: 0.8,
        batting_factor: 0.16,
        cap:0.9
    },
    {       //Season 2
        constant: 0.8,
        batting_factor: 0.16,
        cap:0.9
    },
    {       //Season 3
        constant: 0.8,
        batting_factor: 0.16,
        cap:0.9
    },
    {       //Season 4
        constant: 0.8,
        batting_factor: 0.16,
        cap:0.9
    },
    {       //Season 5
        constant: 0.8,
        batting_factor: 0.16,
        cap:0.9
    },
    {       //Season 6
        constant: 0.8,
        batting_factor: 0.16,
        cap:0.9
    },
    {       //Season 7
        constant: 0.8,
        batting_factor: 0.16,
        cap:0.9
    },
    {       //Season 8
        constant: 0.8,
        batting_factor: 0.16,
        cap:0.9
    },
    {       //Season 9
        constant: 0.8,
        batting_factor: 0.16,
        cap:0.9
    },
    {       //Season 10
        constant: 0.8,
        batting_factor: 0.16,
        cap:0.9
    },
    {       //Season 11
        constant: 0.8,
        batting_factor: 0.16,
        cap:0.9
    },
    {       //Season 12
        constant: 0.8,
        batting_factor: 0.16,
        cap:0.9
    },
    {       //Season 13
        constant: 0.8,
        batting_factor: 0.16,
        cap:0.9
    },
    {       //Season 14
        constant: 0.78,
        batting_factor: 0.17,
        cap:0.925
    },
    {       //Season 15
        constant: 0.78,
        batting_factor: 0.17,
        cap:0.925
    },
    {       //Season 16
        constant: 0.78,
        batting_factor: 0.17,
        cap:0.925
    },
    {       //Season 17
        constant: 0.78,
        batting_factor: 0.17,
        cap:0.925
    },
    {       //Season 18
        constant: 0.78,
        batting_factor: 0.17,
        cap:0.925
    },
    {       //Season 19
        constant: 0.78,
        batting_factor: 0.17,
        cap:0.925
    },
    {       //Season 20
        constant: 0.78,
        batting_factor: 0.17,
        cap:0.925
    },
    {       //Season 21
        constant: 0.78,
        batting_factor: 0.17,
        cap:0.925
    },
    {       //Season 22
        constant: 0.78,
        batting_factor: 0.17,
        cap:0.925
    },
    {       //Season 23
        constant: 0.78,
        batting_factor: 0.17,
        cap:0.925
    },
    {       //Season 24
        constant: 0.78,
        batting_factor: 0.17,
        cap:0.925
    }
];


//Assume that the unknown season were just the most/least recent
const ball_threshold_look_up_table = [
    {       //Season 1
        constant: 0.35,
        batting_factor: 0.4,
        cap: 1
    },
    {       //Season 2
        constant: 0.35,
        batting_factor: 0.4,
        cap: 1
    },
    {       //Season 3
        constant: 0.35,
        batting_factor: 0.4,
        cap: 1
    },
    {       //Season 4
        constant: 0.35,
        batting_factor: 0.4,
        cap: 1
    },
    {       //Season 5
        constant: 0.35,
        batting_factor: 0.4,
        cap: 1
    },
    {       //Season 6
        constant: 0.35,
        batting_factor: 0.4,
        cap: 1
    },
    {       //Season 7
        constant: 0.35,
        batting_factor: 0.4,
        cap: 1
    },
    {       //Season 8
        constant: 0.35,
        batting_factor: 0.4,
        cap: 1
    },
    {       //Season 9
        constant: 0.35,
        batting_factor: 0.4,
        cap: 1
    },
    {       //Season 10
        constant: 0.35,
        batting_factor: 0.4,
        cap: 1
    },
    {       //Season 11
        constant: 0.35,
        batting_factor: 0.4,
        cap: 1
    },
    {       //Season 12
        constant: 0.35,
        batting_factor: 0.4,
        cap: 1
    },
    {       //Season 13
        constant: 0.4,
        batting_factor: 0.35,
        cap: 1
    },
    {       //Season 14
        constant: 0.4,
        batting_factor: 0.35,
        cap: 1
    },
    {       //Season 15
        constant: 0.4,
        batting_factor: 0.35,
        cap: 1
    },
    {       //Season 16
        constant: 0.4,
        batting_factor: 0.35,
        cap: 1
    },
    {       //Season 17
        constant: 0.4,
        batting_factor: 0.35,
        cap: 1
    },
    {       //Season 18
        constant: 0.4,
        batting_factor: 0.35,
        cap: 1
    },
    {       //Season 19
        constant: 0.4,
        batting_factor: 0.35,
        cap: 1
    },
    {       //Season 20
        constant: 0.4,
        batting_factor: 0.35,
        cap: 1
    },
    {       //Season 21
        constant: 0.4,
        batting_factor: 0.35,
        cap: 1
    },
    {       //Season 22
        constant: 0.4,
        batting_factor: 0.35,
        cap: 1
    },
    {       //Season 23
        constant: 0.4,
        batting_factor: 0.35,
        cap: 1
    },
    {       //Season 24
        constant: 0.4,
        batting_factor: 0.35,
        cap: 1
    }
];


function get_contact_strike_threshold(game_id){

    const { batter, pitcher, batting_team, pitching_team } = await getPlayersTeams(game_id);

    const season = await fetchGameSeason(game_id);
    const day = await fetchGameDay(game_id);
    const stadium_id = await getGameStadium(game_id);    

    const pitcher_vibes = await getVibes(pitcher, day);
    const batter_vibes = await getVibes(batter, day);

    
    let multiplier = getMultiplier(batter, batting_team, stadium_id, game_id, season, day, 'divinity');
    const batter_divinity = (await getPlayerStat('divinity', batter)) * multiplier;
    multiplier = getMultiplier(batter, batting_team, stadium_id, game_id, season, day, 'musclitude');
    const batter_musclitude = (await getPlayerStat('musclitude', batter)) * multiplier;
    multiplier = getMultiplier(batter, batting_team, stadium_id, game_id, season, day, 'thwackability');
    const batter_thwackability = (await getPlayerStat('thwackability', batter)) * multiplier;
    multiplier = getMultiplier(batter, batting_team, stadium_id, game_id, season, day, 'patheticism');
    const batter_patheticism = (await getPlayerStat('patheticism', batter)) * (1 / multiplier);

    const combined_batting = ((batter_divinity + batter_musclitude + batter_thwackability - batter_patheticism) / 2) * (1 + 0.2 * batter_vibes);
    

    multiplier = getMultiplier(pitcher, pitching_team, stadium_id, game_id, season, day, 'ruthlessness');
    const pitcher_ruthlessness = (await getPlayerStat('ruthlessness', pitcher)) * multiplier * (1 + 0.2 * pitcher_vibes);
    
    
    const stadium_fortification = await getStadiumStat('fortification', stadium_id) - 0.5;
    const stadium_viscosity = await getStadiumStat('viscosity', stadium_id) - 0.5;
    const stadium_forwardness = await getStadiumStat('forwardness', stadium_id) - 0.5;

    const ballpark_sum = (stadium_fortification + 3 * stadium_viscosity - 6 * stadium_forwardness) / 10;

    let factors = strike_threshold_look_up_table[season];

    const threshold = factors.constant - 0.08 * pitcher_ruthlessness + 0.16 * ballpark_sum + factors.batting_factor * (combined_batting**1.2);

    return min(factors.cap, threshold);
}


function get_contact_ball_threshold(game_id){

    const { batter, pitcher, batting_team, pitching_team } = await getPlayersTeams(game_id);

    const season = await fetchGameSeason(game_id);
    const day = await fetchGameDay(game_id);
    const stadium_id = await getGameStadium(game_id);    

    const pitcher_vibes = await getVibes(pitcher, day);
    const batter_vibes = await getVibes(batter, day);

    
    let multiplier = getMultiplier(batter, batting_team, stadium_id, game_id, season, day, 'patheticism');
    const batter_patheticism = (await getPlayerStat('patheticism', batter)) * (1 / multiplier);
    const inverted_patheticism = max((1 - batter_patheticism) * (1 + 0.2 * batter_vibes), 0);
    

    multiplier = getMultiplier(pitcher, pitching_team, stadium_id, game_id, season, day, 'ruthlessness');
    const pitcher_ruthlessness = (await getPlayerStat('ruthlessness', pitcher)) * multiplier * (1 + 0.2 * pitcher_vibes);
    
    
    const stadium_fortification = await getStadiumStat('fortification', stadium_id) - 0.5;
    const stadium_viscosity = await getStadiumStat('viscosity', stadium_id) - 0.5;
    const stadium_forwardness = await getStadiumStat('forwardness', stadium_id) - 0.5;

    const ballpark_sum = (stadium_fortification + 3 * stadium_viscosity - 6 * stadium_forwardness) / 10;


    let factors = ball_threshold_look_up_table[season];

    const threshold = factors.constant - 0.1 * pitcher_ruthlessness + batting_factor * (inverted_patheticism**1.5) + 0.14 * ballpark_sum;

    return min(factors.cap, threshold);
}

module.exports = {
    get_contact_ball_threshold,
    get_contact_strike_threshold
}