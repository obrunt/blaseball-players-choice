const { getMultiplier } = require("getMultiplier");

const { getVibes } = require("../database/Reterive/fetchPlayerInfo");
const { fetchGameSeason, fetchGameDay } = require("../database/Reterive/fetchSeasonDayGames");



function get_strike_threshold(batter_id, pitcher_id, batter_team, pitcher_team, stadium_id, game_id){
    const season = await fetchGameSeason(game_id);
    const day = await fetchGameDay(game_id);
    
    const pitcher_vibes = getVibes(pitcher_id, game_id);
    //const pitcher_ruthlessness = ;

}

/**
 * 
def get_strike_threshold(
    meta: StatRelevantData,
    is_flinching: bool,
):
    vibes = pitcher.vibes(meta.day)
    ruth = pitcher.multiplied(
        "ruthlessness", get_multiplier(pitcher, pitching_team, "pitcher", "ruthlessness", meta, stadium)
    )

    # todo: do this to the rest?
    cold = pitcher.multiplied("coldness", get_multiplier(pitcher, pitching_team, "pitcher", "coldness", meta, stadium))
    musc = batter.multiplied("musclitude", get_multiplier(batter, batting_team, "batter", "musclitude", meta, stadium))
    mox = batter.multiplied("moxie", get_multiplier(batter, batting_team, "batter", "moxie", meta, stadium))
    fwd = stadium.forwardness

    batter_hype = stadium.hype if not meta.top_of_inning else 0
    pitcher_hype = stadium.hype if meta.top_of_inning else 0
    hypediff = pitcher_hype - batter_hype

    # fmt: off
    constant, ruth_factor, fwd_factor, musc_factor, mox_factor, abs_factor, roll_cap = {
        11: (0.2,  0.35,    0.2,   0.1,    0,   0,  0.9),
        12: (0.2,  0.3,     0.2,   0.1,    0,   0,  0.85),
        13: (0.2,  0.3,     0.2,   0.1,    0,   0,  0.85),
        14: (0.2,  0.285,   0.2,   0.1,    0,   0,  0.86),
        15: (0.2,  0.285,   0.2,   0.1,    0,   0,  0.86),  
        16: (0.2,  0.285,   0.2,   0.1,    0,   0,  0.86),  
        17: (0.2,  0.285,   0.2,   0.1,    0,   0,  0.86),  
        18: (0.25, 0.285,   0.2, 0.085, -0.085, -0.035,  0.86), 
        19: (0.25, 0.28,   0.2, 0.085, -0.085, -0.035,  0.86),
        20: (0.25, 0.28,   0.2, 0.085, -0.085, -0.035,  0.86),
        21: (0.25, 0.28,   0.2, 0.085, -0.085, -0.035,  0.86), 
        22: (0.25, 0.28,   0.2, 0.085, -0.085, -0.035,  0.86), 
        23: (0.25, 0.28,   0.2, 0.085, -0.085, -0.035,  0.86), # No longer guessing :D
    }[meta.season]
    # fmt: on

    if is_flinching:
        constant += 0.2

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

