const {  
    get_out_threshold,
    get_fly_ground_threshold,
    get_advance_base_out_fly,
    get_advance_base_out_ground
} = require('../../../../backend/src/services/formulas/getOutThreshold');

const {
    get_double_play_threshold,
    get_sacrifice,
    get_sacrifice_attempt_threshold
} = require('../../../../backend/src/services/formulas/getGroundOut');



const { getMultiplier } = require('../../../../backend/src/services/formulas/getMultiplier');
const { getVibes, getPlayerStat, getPlayerTeam } = require('../../../../backend/src/services/database/fetchPlayerInfo');
const { getGameSeason, getGameDay } = require('../../../../backend/src/services/database/fetchSeasonDayGames');
const { getGameStadium, getGameInning, getPlayersTeams } = require('../../../../backend/src/services/database/fetchGameInfo');
const { getStadiumStat } = require('../../../../backend/src/services/database/fetchStadiumInfo');


jest.mock('../../../../backend/src/services/formulas/getMultiplier');
jest.mock('../../../../backend/src/services/database/fetchPlayerInfo');
jest.mock('../../../../backend/src/services/database/fetchSeasonDayGames');
jest.mock('../../../../backend/src/services/database/fetchGameInfo');
jest.mock('../../../../backend/src/services/database/fetchStadiumInfo');


getPlayersTeams.mockReturnValue({
        batter: '',
        pitcher: '',
        batting_team: '',
        pitching_team: ''
    });

getGameInning.mockReturnValue({top_of_inning: true});

getGameDay.mockReturnValue(0);
getGameSeason.mockReturnValue(0);
getGameStadium.mockReturnValue('');


function setDefaultValueOut(multiplier, batter, pitcher, stadium, vibes){
    getMultiplier.mockReturnValue(multiplier);
    getPlayerStat.mockReturnValueOnce(batter).mockReturnValue(pitcher);
    getStadiumStat.mockReturnValue(stadium);
    getVibes.mockReturnValue(vibes);
}


function allFunctionsCalled(){
    expect(getMultiplier).toHaveBeenCalled();

    expect(getPlayersTeams).toHaveBeenCalled();
    expect(getGameSeason).toHaveBeenCalled();
    expect(getGameDay).toHaveBeenCalled();
    expect(getGameStadium).toHaveBeenCalled();

    expect(getVibes).toHaveBeenCalled();
    expect(getPlayerStat).toHaveBeenCalled();

    expect(getStadiumStat).toHaveBeenCalled();
}


test('Out threshold - Baseline', async () => {
    setDefaultValueOut(0, 0, 0, 0.5, 0);

    const moduleUnderTest = await get_out_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.315);
});

test('Out threshold - 0.0', async () => {
    setDefaultValueOut(0, 0, 0, 0, 0);

    const moduleUnderTest = await get_out_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.3065);
});

test('Out threshold - 0.5', async () => {
    setDefaultValueOut(0.5, 0.5, 0.5, 0.5, 0.5);

    const moduleUnderTest = await get_out_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.3013);
});

test('Out threshold - 1.0', async () => {
    setDefaultValueOut(1, 1, 1, 1, 1);

    const moduleUnderTest = await get_out_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.2635);
});

test('Out - Batter & Pitcher No vibes', async () => {
    setDefaultValueOut(1, 0, 1, 0.5, 0);

    const pitcherBetter = await get_out_threshold('');
    
    setDefaultValueOut(1, 1, 0, 0.5, 0);

    const batterBetter = await get_out_threshold('');
    
    allFunctionsCalled();

    expect(pitcherBetter).toBeLessThan(batterBetter);
});

test('Out - Batter & Pitcher Vibes', async () => {
    setDefaultValueOut(1, 0, 1, 0.5, 1);

    const pitcherBetter = await get_out_threshold('');
    
    setDefaultValueOut(1, 1, 0, 0.5, 0);

    const batterBetter = await get_out_threshold('');
    
    allFunctionsCalled();

    expect(pitcherBetter).toBeLessThan(batterBetter);
});

test('Out - Vibes Comparison', async () => {
    setDefaultValueOut(1, 0.5, 0.5, 0.5, 0);

    const excludeVibes = await get_out_threshold('');
    
    setDefaultValueOut(1, 0.5, 0.5, 0.5, 0);

    const includeVibes = await get_out_threshold('');
    
    allFunctionsCalled();

    expect(includeVibes).toEqual(excludeVibes);
});








function setDefaultValueFlyGround(multiplier, batter, pitcher, stadium, vibes, inning){
    getMultiplier.mockReturnValue(multiplier);
    getPlayerStat.mockReturnValueOnce(batter).mockReturnValue(pitcher);
    getStadiumStat.mockReturnValueOnce(0).mockReturnValue(stadium);
    getVibes.mockReturnValue(vibes);
    getGameInning.mockReturnValue({top_of_inning: inning});
}

test('Fly ground threshold - Baseline', async () => {
    setDefaultValueFlyGround(1, 0, 0, 0.5, 0);

    const moduleUnderTest = await get_fly_ground_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.18);
});

test('Fly ground threshold - 0.0', async () => {
    setDefaultValueFlyGround(0, 0, 0, 0, 0);

    const moduleUnderTest = await get_fly_ground_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.001);
});

test('Fly ground threshold - 0.5', async () => {
    setDefaultValueFlyGround(0.5, 0.5, 0.5, 0.5, 0.5);

    const moduleUnderTest = await get_fly_ground_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.44);
});

test('Fly ground threshold - 1.0', async () => {
    setDefaultValueFlyGround(1, 1, 1, 1, 1);

    const moduleUnderTest = await get_fly_ground_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.27);
});

test('Fly ground - Batter & Pitcher No vibes', async () => {
    setDefaultValueFlyGround(1, 0, 1, 0.5, 0);

    const pitcherBetter = await get_fly_ground_threshold('');
    
    setDefaultValueFlyGround(1, 1, 0, 0.5, 0);

    const batterBetter = await get_fly_ground_threshold('');
    
    allFunctionsCalled();

    expect(pitcherBetter).toBeLessThan(batterBetter);
});

test('Fly ground - Batter & Pitcher Vibes', async () => {
    setDefaultValueFlyGround(1, 0, 1, 0.5, 1);

    const pitcherBetter = await get_fly_ground_threshold('');
    
    setDefaultValueFlyGround(1, 1, 0, 0.5, 0);

    const batterBetter = await get_fly_ground_threshold('');
    
    allFunctionsCalled();

    expect(pitcherBetter).toBeLessThan(batterBetter);
});

test('Fly ground - Vibes Comparison', async () => {
    setDefaultValueFlyGround(1, 0.5, 0.5, 0.5, 0);

    const excludeVibes = await get_fly_ground_threshold('');
    
    setDefaultValueFlyGround(1, 0.5, 0.5, 0.5, 0);

    const includeVibes = await get_fly_ground_threshold('');
    
    allFunctionsCalled();

    expect(includeVibes).toEqual(excludeVibes);
});






function setDefaultValueAdvanceGround(multiplier, batter, pitcher, stadium, vibes){
    getMultiplier.mockReturnValue(multiplier);
    getPlayerStat.mockReturnValueOnce(batter).mockReturnValue(pitcher);
    getStadiumStat.mockReturnValue(stadium);
    getVibes.mockReturnValue(vibes);
}

test('Advance out ground threshold - Baseline', async () => {
    setDefaultValueOut(0, 0, 0, 0.5, 0);

    const moduleUnderTest = await get_advance_base_out_ground('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.5);
});

test('Advance out ground threshold - 0.0', async () => {
    setDefaultValueOut(0, 0, 0, 0, 0);

    const moduleUnderTest = await get_advance_base_out_ground('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.6);
});

test('Advance out ground threshold - 0.5', async () => {
    setDefaultValueOut(0.5, 0.5, 0.5, 0.5, 0.5);

    const moduleUnderTest = await get_advance_base_out_ground('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.5687);
});

test('Advance out ground threshold - 1.0', async () => {
    setDefaultValueOut(1, 1, 1, 1, 1);

    const moduleUnderTest = await get_advance_base_out_ground('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.7);
});

test('Advance out ground - Min value', async () => {
    setDefaultValueOut(1, 0, 1, 1, 0);

    const pitcherBetter = await get_advance_base_out_ground('');
    
    
    allFunctionsCalled();

    expect(pitcherBetter).toEqual(0.3);
});

test('Advance out ground - Max value', async () => {
    setDefaultValueOut(1, 1, 0, 0, 0);

    const pitcherBetter = await get_advance_base_out_ground('');
    
    allFunctionsCalled();

    expect(pitcherBetter).toEqual(0.95);
});






function setDefaultValueAdvanceFly(multiplier, batter, stadium, vibes){
    getMultiplier.mockReturnValue(multiplier);
    getPlayerStat.mockReturnValue(batter);
    getStadiumStat.mockReturnValue(stadium);
    getVibes.mockReturnValue(vibes);
}

test('Advance out fly threshold - Baseline', async () => {
    setDefaultValueAdvanceFly(0, 0, 0.5, 0);

    const moduleUnderTest = await get_advance_base_out_fly('', 0);
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.001);
});

test('Advance out fly threshold - 1st base', async () => {
    setDefaultValueAdvanceFly(0.5, 0.5, 0.5, 0.5);

    const moduleUnderTest = await get_advance_base_out_fly('', 0);
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.001);
});

test('Advance out fly threshold - 2nd base', async () => {
    setDefaultValueAdvanceFly(0.5, 0.5, 0.5, 0.5);

    const moduleUnderTest = await get_advance_base_out_fly('', 1);
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.0856);
});

test('Advance out fly threshold - 3rd base', async () => {
    setDefaultValueAdvanceFly(0.5, 0.5, 0.5, 0.5);

    const moduleUnderTest = await get_advance_base_out_fly('', 2);
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.5463);
});









function setDefaultValueDoublePlay(multiplier, batter, pitcher, stadium, vibes){
    getMultiplier.mockReturnValue(multiplier);
    getPlayerStat.mockReturnValueOnce(batter).mockReturnValue(pitcher);
    getStadiumStat.mockReturnValue(stadium);
    getVibes.mockReturnValue(vibes);
}


test('Double play threshold - Baseline', async () => {
    setDefaultValueOut(1, 0, 0, 0.5, 0);

    const moduleUnderTest = await get_double_play_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.001);
});

test('Double play threshold - 0.0', async () => {
    setDefaultValueOut(0, 0, 0, 0, 0);

    const moduleUnderTest = await get_double_play_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.001);
});

test('Double play threshold - 0.5', async () => {
    setDefaultValueOut(0.5, 0.5, 0.5, 0.5, 0.5);

    const moduleUnderTest = await get_double_play_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.0875);
});

test('Double play threshold - 1.0', async () => {
    setDefaultValueOut(1, 1, 1, 1, 1);

    const moduleUnderTest = await get_double_play_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.47);
});

test('Double play - Batter & Pitcher No vibes', async () => {
    setDefaultValueOut(1, 0, 1, 0.5, 0);

    const pitcherBetter = await get_double_play_threshold('');
    
    setDefaultValueOut(1, 1, 0, 0.5, 0);

    const batterBetter = await get_double_play_threshold('');
    
    allFunctionsCalled();

    expect(pitcherBetter).toBeGreaterThan(batterBetter);
});

test('Double play - Batter & Pitcher Vibes', async () => {
    setDefaultValueOut(1, 0, 1, 0.5, 1);

    const pitcherBetter = await get_double_play_threshold('');
    
    setDefaultValueOut(1, 1, 0, 0.5, 0);

    const batterBetter = await get_double_play_threshold('');
    
    allFunctionsCalled();

    expect(pitcherBetter).toBeGreaterThan(batterBetter);
});

test('Double play - Vibes Comparison', async () => {
    setDefaultValueOut(1, 0.5, 0.5, 0.5, 0);

    const excludeVibes = await get_double_play_threshold('');
    
    setDefaultValueOut(1, 0.5, 0.5, 0.5, 0);

    const includeVibes = await get_double_play_threshold('');
    
    allFunctionsCalled();

    expect(includeVibes).toEqual(excludeVibes);
});














test('Sacrifice attempt threshold - Baseline', async () => {
    setDefaultValueOut(1, 0, 0, 0.5, 0);

    const moduleUnderTest = await get_sacrifice_attempt_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.001);
});

test('Sacrifice attempt threshold - 0.0', async () => {
    setDefaultValueOut(0, 0, 0, 0, 0);

    const moduleUnderTest = await get_sacrifice_attempt_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.001);
});

test('Sacrifice attempt threshold - 0.5', async () => {
    setDefaultValueOut(0.5, 0.5, 0.5, 0.5, 0.5);

    const moduleUnderTest = await get_sacrifice_attempt_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.0875);
});

test('Sacrifice attempt threshold - 1.0', async () => {
    setDefaultValueOut(1, 1, 1, 1, 1);

    const moduleUnderTest = await get_sacrifice_attempt_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.47);
});

test('Sacrifice attempt - Batter & Pitcher No vibes', async () => {
    setDefaultValueOut(1, 0, 1, 0.5, 0);

    const pitcherBetter = await get_sacrifice_attempt_threshold('');
    
    setDefaultValueOut(1, 1, 0, 0.5, 0);

    const batterBetter = await get_sacrifice_attempt_threshold('');
    
    allFunctionsCalled();

    expect(pitcherBetter).toBeGreaterThan(batterBetter);
});

test('Sacrifice attempt - Batter & Pitcher Vibes', async () => {
    setDefaultValueOut(1, 0, 1, 0.5, 1);

    const pitcherBetter = await get_sacrifice_attempt_threshold('');
    
    setDefaultValueOut(1, 1, 0, 0.5, 0);

    const batterBetter = await get_sacrifice_attempt_threshold('');
    
    allFunctionsCalled();

    expect(pitcherBetter).toBeGreaterThan(batterBetter);
});

test('Sacrifice attempt - Vibes Comparison', async () => {
    setDefaultValueOut(1, 0.5, 0.5, 0.5, 0);

    const excludeVibes = await get_sacrifice_attempt_threshold('');
    
    setDefaultValueOut(1, 0.5, 0.5, 0.5, 0);

    const includeVibes = await get_sacrifice_attempt_threshold('');
    
    allFunctionsCalled();

    expect(includeVibes).toEqual(excludeVibes);
});





test('Sacrifice threshold - Baseline', async () => {
    setDefaultValueFlyGround(1, 0, 0, 0.5, 0);

    const moduleUnderTest = await get_sacrifice('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.05);
});

test('Sacrifice threshold - 0.0', async () => {
    setDefaultValueFlyGround(0, 0, 0, 0, 0);

    const moduleUnderTest = await get_sacrifice('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.001);
});

test('Sacrifice threshold - 0.5', async () => {
    setDefaultValueFlyGround(0.5, 0.5, 0.5, 0.5, 0.5);

    const moduleUnderTest = await get_sacrifice('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.3);
});

test('Sacrifice threshold - 1.0', async () => {
    setDefaultValueFlyGround(1, 1, 1, 1, 1);

    const moduleUnderTest = await get_sacrifice('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.3);
});

test('Sacrifice threshold - Flat multiplier', async () => {
    setDefaultValueFlyGround(1, 0.5, 0.5, 0.5, 0.5);

    const moduleUnderTest = await get_sacrifice('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.175);
});
