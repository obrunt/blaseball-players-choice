const { getMultiplier } = require("getMultiplier");

const { getVibes, getPlayerStat, isFlinching } = require("../database/Reterive/fetchPlayerInfo");
const { fetchGameSeason, fetchGameDay } = require("../database/Reterive/fetchSeasonDayGames");
const { getGameStadium, getGameInning } = require("../database/Reterive/fetchGameInfo");
const { getStadiumStat } = require("../database/Reterive/fetchStadiumInfo");


//Assume that the unknown season were just the most/lest recent
const strike_threshold_look_up_table = [
    {       //Season 1
        constant: 0.2,
        ruth_factor: 0.35,
        fwd_factor: 0.2,
        musc_factor: 0.1,
        mox_factor: 0,
        abs_factor: 0,
        roll_cap: 0.9
    },
    {       //Season 2
        constant: 0.2,
        ruth_factor: 0.35,
        fwd_factor: 0.2,
        musc_factor: 0.1,
        mox_factor: 0,
        abs_factor: 0,
        roll_cap: 0.9
    },
    {       //Season 3
        constant: 0.2,
        ruth_factor: 0.35,
        fwd_factor: 0.2,
        musc_factor: 0.1,
        mox_factor: 0,
        abs_factor: 0,
        roll_cap: 0.9
    },
    {       //Season 4
        constant: 0.2,
        ruth_factor: 0.35,
        fwd_factor: 0.2,
        musc_factor: 0.1,
        mox_factor: 0,
        abs_factor: 0,
        roll_cap: 0.9
    },
    {       //Season 5
        constant: 0.2,
        ruth_factor: 0.35,
        fwd_factor: 0.2,
        musc_factor: 0.1,
        mox_factor: 0,
        abs_factor: 0,
        roll_cap: 0.9
    },
    {       //Season 6
        constant: 0.2,
        ruth_factor: 0.35,
        fwd_factor: 0.2,
        musc_factor: 0.1,
        mox_factor: 0,
        abs_factor: 0,
        roll_cap: 0.9
    },
    {       //Season 7
        constant: 0.2,
        ruth_factor: 0.35,
        fwd_factor: 0.2,
        musc_factor: 0.1,
        mox_factor: 0,
        abs_factor: 0,
        roll_cap: 0.9
    },
    {       //Season 8
        constant: 0.2,
        ruth_factor: 0.35,
        fwd_factor: 0.2,
        musc_factor: 0.1,
        mox_factor: 0,
        abs_factor: 0,
        roll_cap: 0.9
    },
    {       //Season 9
        constant: 0.2,
        ruth_factor: 0.35,
        fwd_factor: 0.2,
        musc_factor: 0.1,
        mox_factor: 0,
        abs_factor: 0,
        roll_cap: 0.9
    },
    {       //Season 10
        constant: 0.2,
        ruth_factor: 0.35,
        fwd_factor: 0.2,
        musc_factor: 0.1,
        mox_factor: 0,
        abs_factor: 0,
        roll_cap: 0.9
    },
    {       //Season 11
        constant: 0.2,
        ruth_factor: 0.35,
        fwd_factor: 0.2,
        musc_factor: 0.1,
        mox_factor: 0,
        abs_factor: 0,
        roll_cap: 0.9
    },
    {       //Season 12
        constant: 0.2,
        ruth_factor: 0.3,
        fwd_factor: 0.2,
        musc_factor: 0.1,
        mox_factor: 0,
        abs_factor: 0,
        roll_cap: 0.85
    },
    {       //Season 13
        constant: 0.2,
        ruth_factor: 0.3,
        fwd_factor: 0.2,
        musc_factor: 0.1,
        mox_factor: 0,
        abs_factor: 0,
        roll_cap: 0.85
    },
    {       //Season 14
        constant: 0.2,
        ruth_factor: 0.285,
        fwd_factor: 0.2,
        musc_factor: 0.1,
        mox_factor: 0,
        abs_factor: 0,
        roll_cap: 0.86
    },
    {       //Season 15
        constant: 0.2,
        ruth_factor: 0.285,
        fwd_factor: 0.2,
        musc_factor: 0.1,
        mox_factor: 0,
        abs_factor: 0,
        roll_cap: 0.86
    },
    {       //Season 16
        constant: 0.2,
        ruth_factor: 0.285,
        fwd_factor: 0.2,
        musc_factor: 0.1,
        mox_factor: 0,
        abs_factor: 0,
        roll_cap: 0.86
    },
    {       //Season 17
        constant: 0.2,
        ruth_factor: 0.285,
        fwd_factor: 0.2,
        musc_factor: 0.1,
        mox_factor: 0,
        abs_factor: 0,
        roll_cap: 0.86
    },
    {       //Season 18
        constant: 0.25,
        ruth_factor: 0.285,
        fwd_factor: 0.2,
        musc_factor: 0.085,
        mox_factor: -0.085,
        abs_factor: -0.035,
        roll_cap: 0.86
    },
    {       //Season 19
        constant: 0.25,
        ruth_factor: 0.28,
        fwd_factor: 0.2,
        musc_factor: 0.085,
        mox_factor: -0.085,
        abs_factor: -0.035,
        roll_cap: 0.86
    },
    {       //Season 20
        constant: 0.25,
        ruth_factor: 0.28,
        fwd_factor: 0.2,
        musc_factor: 0.085,
        mox_factor: -0.085,
        abs_factor: -0.035,
        roll_cap: 0.86
    },
    {       //Season 21
        constant: 0.25,
        ruth_factor: 0.28,
        fwd_factor: 0.2,
        musc_factor: 0.085,
        mox_factor: -0.085,
        abs_factor: -0.035,
        roll_cap: 0.86
    },
    {       //Season 22
        constant: 0.25,
        ruth_factor: 0.28,
        fwd_factor: 0.2,
        musc_factor: 0.085,
        mox_factor: -0.085,
        abs_factor: -0.035,
        roll_cap: 0.86
    },
    {       //Season 23
        constant: 0.25,
        ruth_factor: 0.28,
        fwd_factor: 0.2,
        musc_factor: 0.085,
        mox_factor: -0.085,
        abs_factor: -0.035,
        roll_cap: 0.86
    },
    {       //Season 24
        constant: 0.25,
        ruth_factor: 0.28,
        fwd_factor: 0.2,
        musc_factor: 0.085,
        mox_factor: -0.085,
        abs_factor: -0.035,
        roll_cap: 0.86
    }
];




function get_strike_threshold(batter_id, pitcher_id, batter_team, pitcher_team, game_id){
    const season = await fetchGameSeason(game_id);
    const day = await fetchGameDay(game_id);
    const stadium_id = await getGameStadium(game_id);
    const inning = await getGameInning(game_id);
    

    const pitcher_vibes = await getVibes(pitcher_id, game_id);

    //Getting all of the multiplied stats for the pitcher
    let multiplier = getMultiplier(pitcher_id, pitcher_team, stadium_id, game_id, season, day, 'ruthlessness');
    const pitcher_ruthlessness = (await getPlayerStat('ruthlessness', pitcher_id)) * multiplier;
    multiplier = getMultiplier(pitcher_id, pitcher_team, stadium_id, game_id, season, day, 'coldness');
    const pitcher_coldness = (await getPlayerStat('coldness', pitcher_id)) * multiplier;
    
    
    //Getting all of the multiplied stats for the batter
    multiplier = getMultiplier(batter_id, batter_team, stadium_id, game_id, season, day, 'musclitude');
    const batter_musclitude = (await getPlayerStat('musclitude', batter_id)) * multiplier;
    multiplier = getMultiplier(batter_id, batter_team, stadium_id, game_id, season, day, 'moxie');
    const batter_moxie = (await getPlayerStat('moxie', batter_id)) * multiplier;
    
    const stadium_forwardness = await getStadiumStat('forwardness', stadium_id);

    //Checking who is on the home team
    //And assigning the stadium hype to them
    if(inning.top_of_inning){
        const hype = await getStadiumStat('hype', stadium_id);
    }
    else {
        const hype = -1 * await getStadiumStat('hype', stadium_id);
    }

    let factors = strike_threshold_look_up_table[season];

    if (isFlinching(batter_id, game_id)){
        factors.constant += 0.2;
    }

    let threshold = 0;

    if (season >= 18){

        let ruth_cold_hype;

        if (season == 18){
            ruth_cold_hype = (10 * pitcher_ruthlessness + 1 * pitcher_coldness) / 11 + 0.2 * hype;
        }
        else {
            ruth_cold_hype = (20 * pitcher_ruthlessness + 3 * pitcher_coldness + 3 * hype) / 23;
        }

        if(stadium_forwardness >= 0.5){
            factors.constant += 0.05;
        }

        threshold += factors.constant;
        threshold += factors.ruth_factor * ruth_cold_hype * (1 + 0.2 * pitcher_vibes);

        if(stadium_forwardness < 0.5){
            threshold += factors.fwd_factor * stadium_forwardness;
        }
        else {
            threshold += (factors.fwd_factor - 0.1) * stadium_forwardness;
        }

        threshold += factors.musc_factor * batter_musclitude;
        threshold += factors.mox_factor * batter_moxie;
        threshold += factors.abs_factor * abs(batter_musclitude - batter_moxie);
    }
    else {
        threshold = factors.constant + factors.ruth_factor * (pitcher_ruthlessness * (1 + 0.2 * pitcher_vibes)) + factors.fwd_factor * stadium_forwardness + factors.musc_factor * batter_musclitude;
    }

    threshold = min(threshold, factors.roll_cap);
    return threshold;
}

/**
 * 
    if meta.season >= 18:
        if meta.season == 18:
            ruth_cold_hypediff = (10 * ruth + 1 * cold) / 11 + 0.2 * hypediff
        else:
            ruth_cold_hypediff = (20 * ruth + 3 * cold + 3 * hypediff) / 23
        threshold = (
            (constant if fwd < 0.5 else constant + 0.05)
            + ruth_factor * ruth_cold_hypediff * (1 + 0.2 * vibes)
            + (fwd_factor * fwd if fwd < 0.5 else (fwd_factor - 0.1) * fwd)
            + musc_factor * musc
            + mox_factor * mox
            + abs_factor * abs(musc - mox)
        )
    else:
        threshold = constant + ruth_factor * (ruth * (1 + 0.2 * vibes)) + fwd_factor * fwd + musc_factor * musc
    threshold = min(threshold, roll_cap)
    return threshold
 */

