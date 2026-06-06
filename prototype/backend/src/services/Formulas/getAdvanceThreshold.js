const { getMultiplier } = require("getMultiplier");

const { getVibes, getPlayerStat, isFlinching } = require("../database/fetchPlayerInfo");
const { fetchGameSeason, fetchGameDay } = require("../database/fetchSeasonDayGames");
const { getGameStadium, getGameInning } = require("../database/fetchGameInfo");
const { getStadiumStat } = require("../database/fetchStadiumInfo");



function get_homerun_threshold(batter_id, pitcher_id, batter_team, pitcher_team, game_id){
    const season = await fetchGameSeason(game_id);
    const day = await fetchGameDay(game_id);
    const stadium_id = await getGameStadium(game_id);
    const inning = await getGameInning(game_id);


    const pitcher_vibes = await getVibes(pitcher_id, day);
    const batter_vibes = await getVibes(batter_id, day);


    let multiplier = getMultiplier(batter_id, batter_team, stadium_id, game_id, season, day, 'divinity');
    const batter_divinity = (await getPlayerStat('divinity', batter_id)) * multiplier * (1 + 0.2 * batter_vibes);

    multiplier = getMultiplier(pitcher_id, pitcher_team, stadium_id, game_id, season, day, 'overpowerment');
    const pitcher_overpowerment = (await getPlayerStat('overpowerment', pitcher_id)) * multiplier * (1 + 0.2 * pitcher_vibes);
    multiplier = getMultiplier(pitcher_id, pitcher_team, stadium_id, game_id, season, day, 'suppression');
    const pitcher_suppression = (await getPlayerStat('suppression', pitcher_id)) * multiplier * (1 + 0.2 * pitcher_vibes);
    

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

    return threshold;
}


function get_triple_threshold(batter_id, pitcher_id, fielder_id, batter_team, pitcher_team, game_id){
    const season = await fetchGameSeason(game_id);
    const day = await fetchGameDay(game_id);
    const stadium_id = await getGameStadium(game_id);
    const inning = await getGameInning(game_id);


    const pitcher_vibes = await getVibes(pitcher_id, day);
    const batter_vibes = await getVibes(batter_id, day);
    const fielder_vibes = await getVibes(fielder_id, day);

    let hype = await getStadiumStat('hype', stadium_id);
    if(!inning.top_of_inning){
        hype *= -1;
    }


    let multiplier = getMultiplier(batter_id, batter_team, stadium_id, game_id, season, day, 'ground_friction');
    const batter_ground_friction = (await getPlayerStat('ground_friction', batter_id)) * multiplier * (1 + 0.2 * batter_vibes);

    multiplier = getMultiplier(pitcher_id, pitcher_team, stadium_id, game_id, season, day, 'overpowerment');
    const pitcher_overpowerment = (await getPlayerStat('overpowerment', pitcher_id)) * multiplier * (1 + 0.2 * pitcher_vibes);
    multiplier = getMultiplier(pitcher_id, pitcher_team, stadium_id, game_id, season, day, 'suppression');
    const pitcher_suppression = (await getPlayerStat('suppression', pitcher_id)) * multiplier * (1 + 0.2 * pitcher_vibes);
    

    const stadium_grandiosity = await getStadiumStat('grandiosity', stadium_id) - 0.5;
    const stadium_fortification = await getStadiumStat('fortification', stadium_id) - 0.5;
    const stadium_viscosity = await getStadiumStat('viscosity', stadium_id) - 0.5;
    const stadium_ominousness = await getStadiumStat('ominousness', stadium_id) - 0.5;
    const stadium_forwardness = await getStadiumStat('forwardness', stadium_id) - 0.5;

    /**

    batter_gf = batter.multiplied(
        "ground_friction", get_multiplier(batter, batting_team, "batter", "ground_friction", meta, stadium)
    )
    batter_gf = (batter_gf - 0.2 * hype) * (1 + 0.2 * batter_vibes)

    pitcher_opw = pitcher.multiplied(
        "overpowerment", get_multiplier(pitcher, pitching_team, "pitcher", "overpowerment", meta, stadium)
    )
    pitcher_opw = (pitcher_opw + 0.2 * hype) * (1 + 0.2 * pitcher_vibes)

    fielder_chase = fielder.multiplied(
        "chasiness", get_multiplier(fielder, pitching_team, "fielder", "chasiness", meta, stadium)
    )
    fielder_chase = (fielder_chase + 0.2 * hype) * (1 + 0.2 * fielder_vibes)

    fwd = stadium.forwardness - 0.5
    grand = stadium.grandiosity - 0.5
    obt = stadium.obtuseness - 0.5
    visc = stadium.viscosity - 0.5
    omi = stadium.ominousness - 0.5

    ballpark_sum = (3 * fwd + 5 * grand + 5 * obt - visc - omi) / 15

    if meta.season in [11, 12]:
        return 0.05 + 0.2 * batter_gf - 0.04 * pitcher_opw - 0.06 * fielder_chase + 0.1 * ballpark_sum
    elif meta.season in [13, 14, 15, 16, 17]:
        return 0.045 + 0.2 * batter_gf - 0.04 * pitcher_opw - 0.05 * fielder_chase + 0.1 * ballpark_sum
    else:
        if pitcher_opw < 0:
            # ...did this ever happen?
            return float("nan")
        opw_pow = pitcher_opw**1.5
        return 0.042 + 0.2 * batter_gf - 0.056 * opw_pow - 0.05 * fielder_chase + 0.1 * ballpark_sum
     */

    return threshold;
}


function get_double_threshold(batter_id, pitcher_id, batter_team, pitcher_team, game_id){
    const season = await fetchGameSeason(game_id);
    const day = await fetchGameDay(game_id);
    const stadium_id = await getGameStadium(game_id);
    const inning = await getGameInning(game_id);


    const pitcher_vibes = await getVibes(pitcher_id, day);
    const batter_vibes = await getVibes(batter_id, day);


    let multiplier = getMultiplier(batter_id, batter_team, stadium_id, game_id, season, day, 'divinity');
    const batter_divinity = (await getPlayerStat('divinity', batter_id)) * multiplier * (1 + 0.2 * batter_vibes);

    multiplier = getMultiplier(pitcher_id, pitcher_team, stadium_id, game_id, season, day, 'overpowerment');
    const pitcher_overpowerment = (await getPlayerStat('overpowerment', pitcher_id)) * multiplier * (1 + 0.2 * pitcher_vibes);
    multiplier = getMultiplier(pitcher_id, pitcher_team, stadium_id, game_id, season, day, 'suppression');
    const pitcher_suppression = (await getPlayerStat('suppression', pitcher_id)) * multiplier * (1 + 0.2 * pitcher_vibes);
    

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

    return threshold;
}


module.exports = {
    get_homerun_threshold
}