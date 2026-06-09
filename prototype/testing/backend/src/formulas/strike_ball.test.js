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
