const {  
    get_out_threshold,
    get_fly_ground_threshold,
    get_advance_base_out_fly,
    get_advance_base_out_ground
} = require('../../../../backend/src/services/formulas/getOutThreshold');


const { getMultiplier } = require('../../../../backend/src/services/formulas/getMultiplier');
const { getVibes, getPlayerStat } = require('../../../../backend/src/services/database/fetchPlayerInfo');
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


function setDefaultValueHomerun(multiplier, batter, pitcher, stadium, vibes){
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
    setDefaultValueHomerun(0, 0, 0, 0.5, 0);

    const moduleUnderTest = await get_out_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.315);
});

test('Out threshold - 0.0', async () => {
    setDefaultValueHomerun(0, 0, 0, 0, 0);

    const moduleUnderTest = await get_out_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.3065);
});

test('Out threshold - 0.5', async () => {
    setDefaultValueHomerun(0.5, 0.5, 0.5, 0.5, 0.5);

    const moduleUnderTest = await get_out_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.3013);
});

test('Out threshold - 1.0', async () => {
    setDefaultValueHomerun(1, 1, 1, 1, 1);

    const moduleUnderTest = await get_out_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.2635);
});

test('Out - Batter & Pitcher No vibes', async () => {
    setDefaultValueHomerun(1, 0, 1, 0.5, 0);

    const pitcherBetter = await get_out_threshold('');
    
    setDefaultValueHomerun(1, 1, 0, 0.5, 0);

    const batterBetter = await get_out_threshold('');
    
    allFunctionsCalled();

    expect(pitcherBetter).toBeLessThan(batterBetter);
});

test('Out - Batter & Pitcher Vibes', async () => {
    setDefaultValueHomerun(1, 0, 1, 0.5, 1);

    const pitcherBetter = await get_out_threshold('');
    
    setDefaultValueHomerun(1, 1, 0, 0.5, 0);

    const batterBetter = await get_out_threshold('');
    
    allFunctionsCalled();

    expect(pitcherBetter).toBeLessThan(batterBetter);
});

test('Out - Vibes Comparison', async () => {
    setDefaultValueHomerun(1, 0.5, 0.5, 0.5, 0);

    const excludeVibes = await get_out_threshold('');
    
    setDefaultValueHomerun(1, 0.5, 0.5, 0.5, 0);

    const includeVibes = await get_out_threshold('');
    
    allFunctionsCalled();

    expect(includeVibes).toEqual(excludeVibes);
});







/*
function setDefaultValueTriple(multiplier, batter, pitcher, stadium, vibes, inning){
    getMultiplier.mockReturnValue(multiplier);
    getPlayerStat.mockReturnValueOnce(batter).mockReturnValue(pitcher);
    getStadiumStat.mockReturnValueOnce(0).mockReturnValue(stadium);
    getVibes.mockReturnValue(vibes);
    getGameInning.mockReturnValue({top_of_inning: inning});
}

test('Triple threshold - Baseline', async () => {
    setDefaultValueTriple(0, 0, 0, 0.5, 0);

    const moduleUnderTest = await get_fly_ground_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.05);
});

test('Triple threshold - 0.0', async () => {
    setDefaultValueTriple(0, 0, 0, 0, 0);

    const moduleUnderTest = await get_fly_ground_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.0133);
});

test('Triple threshold - 0.5', async () => {
    setDefaultValueTriple(0.5, 0.5, 0.5, 0.5, 0.5);

    const moduleUnderTest = await get_fly_ground_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.0775);
});

test('Triple threshold - 1.0', async () => {
    setDefaultValueTriple(1, 1, 1, 1, 1);

    const moduleUnderTest = await get_fly_ground_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.2067);
});

test('Triple - Batter & Pitcher No vibes', async () => {
    setDefaultValueTriple(1, 0, 1, 0.5, 0);

    const pitcherBetter = await get_fly_ground_threshold('');
    
    setDefaultValueTriple(1, 1, 0, 0.5, 0);

    const batterBetter = await get_fly_ground_threshold('');
    
    allFunctionsCalled();

    expect(pitcherBetter).toBeLessThan(batterBetter);
});

test('Triple - Batter & Pitcher Vibes', async () => {
    setDefaultValueTriple(1, 0, 1, 0.5, 1);

    const pitcherBetter = await get_fly_ground_threshold('');
    
    setDefaultValueTriple(1, 1, 0, 0.5, 0);

    const batterBetter = await get_fly_ground_threshold('');
    
    allFunctionsCalled();

    expect(pitcherBetter).toBeLessThan(batterBetter);
});

test('Triple - Vibes Comparison', async () => {
    setDefaultValueTriple(1, 0.5, 0.5, 0.5, 0);

    const excludeVibes = await get_fly_ground_threshold('');
    
    setDefaultValueTriple(1, 0.5, 0.5, 0.5, 0);

    const includeVibes = await get_fly_ground_threshold('');
    
    allFunctionsCalled();

    expect(includeVibes).toEqual(excludeVibes);
});

*/



function setDefaultValueAdvance(multiplier, batter, pitcher, stadium, vibes){
    getMultiplier.mockReturnValue(multiplier);
    getPlayerStat.mockReturnValueOnce(batter).mockReturnValue(pitcher);
    getStadiumStat.mockReturnValue(stadium);
    getVibes.mockReturnValue(vibes);
}

test('Advance out ground threshold - Baseline', async () => {
    setDefaultValueAdvance(0, 0, 0, 0.5, 0);

    const moduleUnderTest = await get_advance_base_out_ground('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.5);
});

test('Advance out threshold - 0.0', async () => {
    setDefaultValueAdvance(0, 0, 0, 0, 0);

    const moduleUnderTest = await get_advance_base_out_ground('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.6);
});

test('Advance out ground threshold - 0.5', async () => {
    setDefaultValueAdvance(0.5, 0.5, 0.5, 0.5, 0.5);

    const moduleUnderTest = await get_advance_base_out_ground('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.5687);
});

test('Advance out ground threshold - 1.0', async () => {
    setDefaultValueAdvance(1, 1, 1, 1, 1);

    const moduleUnderTest = await get_advance_base_out_ground('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.7);
});

test('Advance out ground - Min value', async () => {
    setDefaultValueAdvance(1, 0, 1, 1, 0);

    const pitcherBetter = await get_advance_base_out_ground('');
    
    
    allFunctionsCalled();

    expect(pitcherBetter).toEqual(0.3);
});

test('Advance out ground - Max value', async () => {
    setDefaultValueAdvance(1, 1, 0, 0, 0);

    const pitcherBetter = await get_advance_base_out_ground('');
    
    allFunctionsCalled();

    expect(pitcherBetter).toEqual(0.95);
});
