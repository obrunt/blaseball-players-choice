const {  
    sum,
    get_homerun_threshold,
    get_triple_threshold,
    get_double_threshold,
    get_base_advancement_threshold
} = require('../../../../backend/src/services/formulas/getAdvanceThreshold');


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
    expect(getGameInning).toHaveBeenCalled();

    expect(getVibes).toHaveBeenCalled();
    expect(getPlayerStat).toHaveBeenCalled();

    expect(getStadiumStat).toHaveBeenCalled();
}

test('Home run threshold - Baseline', async () => {
    setDefaultValueHomerun(0, 0, 0, 0.5, 0);

    const moduleUnderTest = await get_homerun_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.12);
});

test('Home run threshold - 0.0', async () => {
    setDefaultValueHomerun(0, 0, 0, 0, 0);

    const moduleUnderTest = await get_homerun_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.1668);
});

test('Home run threshold - 0.5', async () => {
    setDefaultValueHomerun(0.5, 0.5, 0.5, 0.5, 0.5);

    const moduleUnderTest = await get_homerun_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.142);
});

test('Home run threshold - 1.0', async () => {
    setDefaultValueHomerun(1, 1, 1, 1, 1);

    const moduleUnderTest = await get_homerun_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.1692);
});

test('Home run - Batter & Pitcher No vibes', async () => {
    setDefaultValueHomerun(1, 0, 1, 0.5, 0);

    const pitcherBetter = await get_homerun_threshold('');
    
    setDefaultValueHomerun(1, 1, 0, 0.5, 0);

    const batterBetter = await get_homerun_threshold('');
    
    allFunctionsCalled();

    expect(pitcherBetter).toBeLessThan(batterBetter);
});

test('Home run - Batter & Pitcher Vibes', async () => {
    setDefaultValueHomerun(1, 0, 1, 0.5, 1);

    const pitcherBetter = await get_homerun_threshold('');
    
    setDefaultValueHomerun(1, 1, 0, 0.5, 0);

    const batterBetter = await get_homerun_threshold('');
    
    allFunctionsCalled();

    expect(pitcherBetter).toBeLessThan(batterBetter);
});

test('Home run - Vibes Comparison', async () => {
    setDefaultValueHomerun(1, 0.5, 0.5, 0.5, 0);

    const excludeVibes = await get_homerun_threshold('');
    
    setDefaultValueHomerun(1, 0.5, 0.5, 0.5, 0);

    const includeVibes = await get_homerun_threshold('');
    
    allFunctionsCalled();

    expect(includeVibes).toEqual(excludeVibes);
});








function setDefaultValueTriple(multiplier, batter, pitcher, stadium, vibes, inning){
    getMultiplier.mockReturnValue(multiplier);
    getPlayerStat.mockReturnValueOnce(batter).mockReturnValue(pitcher);
    getStadiumStat.mockReturnValueOnce(0).mockReturnValue(stadium);
    getVibes.mockReturnValue(vibes);
    getGameInning.mockReturnValue({top_of_inning: inning});
}

test('Triple threshold - Baseline', async () => {
    setDefaultValueTriple(0, 0, 0, 0.5, 0);

    const moduleUnderTest = await get_triple_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.05);
});

test('Triple threshold - 0.0', async () => {
    setDefaultValueTriple(0, 0, 0, 0, 0);

    const moduleUnderTest = await get_triple_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.0133);
});

test('Triple threshold - 0.5', async () => {
    setDefaultValueTriple(0.5, 0.5, 0.5, 0.5, 0.5);

    const moduleUnderTest = await get_triple_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.0775);
});

test('Triple threshold - 1.0', async () => {
    setDefaultValueTriple(1, 1, 1, 1, 1);

    const moduleUnderTest = await get_triple_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.2067);
});

test('Triple - Batter & Pitcher No vibes', async () => {
    setDefaultValueTriple(1, 0, 1, 0.5, 0);

    const pitcherBetter = await get_triple_threshold('');
    
    setDefaultValueTriple(1, 1, 0, 0.5, 0);

    const batterBetter = await get_triple_threshold('');
    
    allFunctionsCalled();

    expect(pitcherBetter).toBeLessThan(batterBetter);
});

test('Triple - Batter & Pitcher Vibes', async () => {
    setDefaultValueTriple(1, 0, 1, 0.5, 1);

    const pitcherBetter = await get_triple_threshold('');
    
    setDefaultValueTriple(1, 1, 0, 0.5, 0);

    const batterBetter = await get_triple_threshold('');
    
    allFunctionsCalled();

    expect(pitcherBetter).toBeLessThan(batterBetter);
});

test('Triple - Vibes Comparison', async () => {
    setDefaultValueTriple(1, 0.5, 0.5, 0.5, 0);

    const excludeVibes = await get_triple_threshold('');
    
    setDefaultValueTriple(1, 0.5, 0.5, 0.5, 0);

    const includeVibes = await get_triple_threshold('');
    
    allFunctionsCalled();

    expect(includeVibes).toEqual(excludeVibes);
});




function setDefaultValueDouble(multiplier, batter, pitcher, stadium, vibes){
    getMultiplier.mockReturnValue(multiplier);
    getPlayerStat.mockReturnValueOnce(batter).mockReturnValue(pitcher);
    getStadiumStat.mockReturnValue(stadium);
    getVibes.mockReturnValue(vibes);
}

test('Double threshold - Baseline', async () => {
    setDefaultValueDouble(0, 0, 0, 0.5, 0);

    const moduleUnderTest = await get_double_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.17);
});

test('Double threshold - 0.0', async () => {
    setDefaultValueDouble(0, 0, 0, 0, 0);

    const moduleUnderTest = await get_double_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.173);
});

test('Double threshold - 0.5', async () => {
    setDefaultValueDouble(0.5, 0.5, 0.5, 0.5, 0.5);

    const moduleUnderTest = await get_double_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.1865);
});

test('Double threshold - 1.0', async () => {
    setDefaultValueDouble(1, 1, 1, 1, 1);

    const moduleUnderTest = await get_double_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.239);
});

test('Double - Batter & Pitcher No vibes', async () => {
    setDefaultValueDouble(1, 0, 1, 0.5, 0);

    const pitcherBetter = await get_double_threshold('');
    
    setDefaultValueDouble(1, 1, 0, 0.5, 0);

    const batterBetter = await get_double_threshold('');
    
    allFunctionsCalled();

    expect(pitcherBetter).toBeLessThan(batterBetter);
});

test('Double - Batter & Pitcher Vibes', async () => {
    setDefaultValueDouble(1, 0, 1, 0.5, 1);

    const pitcherBetter = await get_double_threshold('');
    
    setDefaultValueDouble(1, 1, 0, 0.5, 0);

    const batterBetter = await get_double_threshold('');
    
    allFunctionsCalled();

    expect(pitcherBetter).toBeLessThan(batterBetter);
});

test('Double - Vibes Comparison', async () => {
    setDefaultValueDouble(1, 0.5, 0.5, 0.5, 0);

    const excludeVibes = await get_double_threshold('');
    
    setDefaultValueDouble(1, 0.5, 0.5, 0.5, 0);

    const includeVibes = await get_double_threshold('');
    
    allFunctionsCalled();

    expect(includeVibes).toEqual(excludeVibes);
});








function setDefaultValueAdvance(multiplier, batter, pitcher, vibes){
    getMultiplier.mockReturnValue(multiplier);
    getPlayerStat.mockReturnValueOnce(batter).mockReturnValue(pitcher);
    getVibes.mockReturnValue(vibes);
}

test('Advance threshold - Baseline', async () => {
    setDefaultValueAdvance(0, 0, 0, 0);

    const moduleUnderTest = await get_base_advancement_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.7);
});

test('Advance threshold - 0.0', async () => {
    setDefaultValueAdvance(0, 0, 0, 0);

    const moduleUnderTest = await get_base_advancement_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.7);
});

test('Advance threshold - 0.5', async () => {
    setDefaultValueAdvance(0.5, 0.5, 0.5, 0.5);

    const moduleUnderTest = await get_base_advancement_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.59);
});

test('Advance threshold - 1.0', async () => {
    setDefaultValueAdvance(1, 1, 1, 1);

    const moduleUnderTest = await get_base_advancement_threshold('');
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(0.22);
});

test('Advance - Min value', async () => {
    setDefaultValueAdvance(1, 0, 1, 0);

    const pitcherBetter = await get_base_advancement_threshold('');
    
    
    allFunctionsCalled();

    expect(pitcherBetter).toEqual(0.01);
});

test('Advance - Max value', async () => {
    setDefaultValueAdvance(1, 1, 0, 0);

    const pitcherBetter = await get_base_advancement_threshold('');
    
    allFunctionsCalled();

    expect(pitcherBetter).toEqual(0.95);
});
