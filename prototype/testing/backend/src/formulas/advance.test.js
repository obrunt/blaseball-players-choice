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

getGameDay.mockReturnValue(0);
getGameSeason.mockReturnValue(0);
getGameStadium.mockReturnValue('');


jest.mock('../../../../backend/src/services/formulas/getMultiplier');

//console.log(getMultiplier);

test('Home run threshold less than 1', async () => {
    getMultiplier.mockReturnValue(2);

    const moduleUnderTest = await sum(1,2);
    
    expect(moduleUnderTest).toEqual(6);
    //expect(getMultiplier).toBeCalledWith({});
});
