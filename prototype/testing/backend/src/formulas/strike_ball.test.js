const {  
    get_foul_threshold
} = require('../../../../backend/src/services/formulas/getFoulThreshold');

const {  
    get_strike_threshold
} = require('../../../../backend/src/services/formulas/getStrikeThreshold');


const {  
    get_contact_ball_threshold,
    get_contact_strike_threshold
} = require('../../../../backend/src/services/formulas/getContactThreshold');


const {  
    get_swing_ball_threshold,
    get_swing_strike_threshold
} = require('../../../../backend/src/services/formulas/getSwingThreshold');



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



function setDefaultValue(multiplier, batter, pitcher, stadium, vibes){
    getMultiplier.mockReturnValue(multiplier);
    getPlayerStat
        .mockReturnValueOnce(batter)

        .mockReturnValue(pitcher);
    getStadiumStat.mockReturnValue(stadium);
    getVibes.mockReturnValue(vibes);
}

let runningTests = [];


const testObj = {
    testCatagory: '',
    testFunction: '',
    testTypes: '',
    defaultValues:[],
    expectedValues: ''
}

let foulTestBaseline = { ...testObj };

    foulTestBaseline.testCatagory = 'Foul threshold';
    foulTestBaseline.testFunction = 'get_foul_threshold';
    foulTestBaseline.testTypes = 'Baseline';
    foulTestBaseline.defaultValues = [0, 0, 0, 0, 0];
    foulTestBaseline.expectedValues = 0.25;


    runningTests.push(foulTestBaseline);


    let foulTestZero = { ...foulTestBaseline };

    foulTestZero.testTypes = '0.0';
    foulTestZero.defaultValues = [0, 0, 0, 0, 0];
    foulTestZero.expectedValues = 0.25;

    runningTests.push(foulTestZero);


    let foulTestHalf = { ...foulTestBaseline };

    foulTestHalf.testTypes = '0.5';
    foulTestHalf.defaultValues = [0.5, 0.5, 0.5, 0.5, 0.5];
    foulTestHalf.expectedValues = 0.2665;

    runningTests.push(foulTestHalf);


    let foulTestOne = { ...foulTestBaseline };

    foulTestOne.testTypes = '1.0';
    foulTestOne.defaultValues = [1, 1, 1, 1, 1];
    foulTestOne.expectedValues = 0.346;


    runningTests.push(foulTestOne);



let strikeTestBaseline = { ...testObj };

    strikeTestBaseline.testCatagory = 'Strike threshold';
    strikeTestBaseline.testFunction = 'get_strike_threshold';
    strikeTestBaseline.testTypes = 'Baseline';
    strikeTestBaseline.defaultValues = [0, 0, 0, 0, 0];
    strikeTestBaseline.expectedValues = 0.2;


    runningTests.push(strikeTestBaseline);


    let strikeTestZero = { ...strikeTestBaseline };

    strikeTestZero.testTypes = '0.0';
    strikeTestZero.defaultValues = [0, 0, 0, 0, 0];
    strikeTestZero.expectedValues = 0.2;

    runningTests.push(strikeTestZero);


    let strikeTestHalf = { ...strikeTestBaseline };

    strikeTestHalf.testTypes = '0.5';
    strikeTestHalf.defaultValues = [0.5, 0.5, 0.5, 0.5, 0.5];
    strikeTestHalf.expectedValues = 0.4213;

    runningTests.push(strikeTestHalf);


    let strikeTestOne = { ...strikeTestBaseline };

    strikeTestOne.testTypes = '1.0';
    strikeTestOne.defaultValues = [1, 1, 1, 1, 1];
    strikeTestOne.expectedValues = 0.9;


    runningTests.push(strikeTestOne);



   
let swingBallTestBaseline = { ...testObj };

    swingBallTestBaseline.testCatagory = 'Swing (ball) threshold';
    swingBallTestBaseline.testFunction = 'get_swing_ball_threshold';
    swingBallTestBaseline.testTypes = 'Baseline';
    swingBallTestBaseline.defaultValues = [0, 0, 0, 0, 0];
    swingBallTestBaseline.expectedValues = 0.1;


    runningTests.push(swingBallTestBaseline);


    let swingBallTestZero = { ...swingBallTestBaseline };

    swingBallTestZero.testTypes = '0.0';
    swingBallTestZero.defaultValues = [0, 0, 0, 0, 0];
    swingBallTestZero.expectedValues = 0.1;

    runningTests.push(swingBallTestZero);


    let swingBallTestHalf = { ...swingBallTestBaseline };

    swingBallTestHalf.testTypes = '0.5';
    swingBallTestHalf.defaultValues = [0.5, 0.5, 0.5, 0.5, 0.5];
    swingBallTestHalf.expectedValues = 0.2981;

    runningTests.push(swingBallTestHalf);


    let swingBallTestOne = { ...swingBallTestBaseline };

    swingBallTestOne.testTypes = '1.0';
    swingBallTestOne.defaultValues = [1, 1, 1, 1, 1];
    swingBallTestOne.expectedValues = 0.8115;


    runningTests.push(swingBallTestOne);



   
let swingStrikeTestBaseline = { ...testObj };

    swingStrikeTestBaseline.testCatagory = 'Swing (strike) threshold';
    swingStrikeTestBaseline.testFunction = 'get_swing_strike_threshold';
    swingStrikeTestBaseline.testTypes = 'Baseline';
    swingStrikeTestBaseline.defaultValues = [1, 1, 0, 0.5, 0];
    swingStrikeTestBaseline.expectedValues = 0.7;


    runningTests.push(swingStrikeTestBaseline);


    let swingStrikeTestZero = { ...swingStrikeTestBaseline };

    swingStrikeTestZero.testTypes = '0.0';
    swingStrikeTestZero.defaultValues = [0, 0, 0, 0, 0];
    swingStrikeTestZero.expectedValues = 0.001;

    runningTests.push(swingStrikeTestZero);


    let swingStrikeTestHalf = { ...swingStrikeTestBaseline };

    swingStrikeTestHalf.testTypes = '0.5';
    swingStrikeTestHalf.defaultValues = [0.5, 0.5, 0.5, 0.5, 0.5];
    swingStrikeTestHalf.expectedValues = 0.6622;

    runningTests.push(swingStrikeTestHalf);


    let swingStrikeTestOne = { ...swingStrikeTestBaseline };

    swingStrikeTestOne.testTypes = '1.0';
    swingStrikeTestOne.defaultValues = [1, 1, 1, 1, 1];
    swingStrikeTestOne.expectedValues = 0.635;


    runningTests.push(swingStrikeTestOne);





    
let contactBallTestBaseline = { ...testObj };

    contactBallTestBaseline.testCatagory = 'Contact (ball) threshold';
    contactBallTestBaseline.testFunction = 'get_contact_ball_threshold';
    contactBallTestBaseline.testTypes = 'Baseline';
    contactBallTestBaseline.defaultValues = [0, 1, 0, 0.5, 0];
    contactBallTestBaseline.expectedValues = 0.35;


    runningTests.push(contactBallTestBaseline);


    let contactBallTestZero = { ...contactBallTestBaseline };

    contactBallTestZero.testTypes = '0.0';
    contactBallTestZero.defaultValues = [0, 0, 0, 0, 0];
    contactBallTestZero.expectedValues = 0.001;

    runningTests.push(contactBallTestZero);


    let contactBallTestHalf = { ...contactBallTestBaseline };

    contactBallTestHalf.testTypes = '0.5';
    contactBallTestHalf.defaultValues = [0.5, 0.5, 0.5, 0.5, 0.5];
    contactBallTestHalf.expectedValues = 0.3225;

    runningTests.push(contactBallTestHalf);


    let contactBallTestOne = { ...contactBallTestBaseline };

    contactBallTestOne.testTypes = '1.0';
    contactBallTestOne.defaultValues = [1, 1, 1, 1, 1];
    contactBallTestOne.expectedValues = 0.216;


    runningTests.push(contactBallTestOne);



let contactStrikeTestBaseline = { ...testObj };

    contactStrikeTestBaseline.testCatagory = 'Contact (strike) threshold';
    contactStrikeTestBaseline.testFunction = 'get_contact_strike_threshold';
    contactStrikeTestBaseline.testTypes = 'Baseline';
    contactStrikeTestBaseline.defaultValues = [1, 0, 0, 0.5, 0];
    contactStrikeTestBaseline.expectedValues = 0.8;


    runningTests.push(contactStrikeTestBaseline);


    let contactStrikeTestZero = { ...contactStrikeTestBaseline };

    contactStrikeTestZero.testTypes = '0.0';
    contactStrikeTestZero.defaultValues = [0, 0, 0, 0, 0];
    contactStrikeTestZero.expectedValues = 0.001;

    runningTests.push(contactStrikeTestZero);


    let contactStrikeTestHalf = { ...contactStrikeTestBaseline };

    contactStrikeTestHalf.testTypes = '0.5';
    contactStrikeTestHalf.defaultValues = [0.5, 0.5, 0.5, 0.5, 0.5];
    contactStrikeTestHalf.expectedValues = 0.001;

    runningTests.push(contactStrikeTestHalf);


    let contactStrikeTestOne = { ...contactStrikeTestBaseline };

    contactStrikeTestOne.testTypes = '1.0';
    contactStrikeTestOne.defaultValues = [1, 1, 1, 1, 1];
    contactStrikeTestOne.expectedValues = 0.8871;


    runningTests.push(contactStrikeTestOne);






test.each(runningTests)(`$testCatagory - $testTypes`, async ({testFunction, defaultValues, expectedValues}) => {
    setDefaultValue(defaultValues[0], defaultValues[1], defaultValues[2], defaultValues[3], defaultValues[4]);

    const moduleUnderTest = await eval(`${testFunction}()`);
    
    allFunctionsCalled();

    expect(moduleUnderTest).toEqual(expectedValues);
});