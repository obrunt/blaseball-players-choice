CREATE DATABASE blaseball;

USE blaseball;

CREATE TABLE players (
    id VARCHAR(30) NOT NULL PRIMARY KEY,
    name VARCHAR(30),

    /*Basic attributes*/
    peanutAllergy BOOLEAN, /*determines whether a player is allergic to peanuts*/
    cinnamon INT, /*upper bounds of a players vibes*/
    pressurization INT, /*lower bounds of a players vibes*/
    soul INT, /*range of 2-9, determines a players soulscream*/
    fate INT, /*range of 0-99, no known effect*/
    blood VARCHAR(15), /*cosmetic but added motification*/
    coffee VARCHAR(15), /*players were sotred into coffee cup teams, no known effect*/
    ritual VARCHAR(30), /*individual retituals players have, no known effect*/

    /*Batting attributes*/

    boyancy INT, /*turns feilded outs into flyouts*/
    divinity INT, /*ability to hit home runs*/
    martyrdom INT, /*batter ground out, decides if on base is able to advance*/
    moxie INT, /*'plate discipline' swing at balls outside strike zone*/
    musclitude INT, /*hits turn into double and batted ball into foul*/
    patheticism INT, /*negative stat, determines ball contact*/
    thwacability INT, /*'quality of contact' reduces ground/fly outs and increases hits*/
    tragicness INT, /*ingame effect currently unknown*/

    /*Pitching attributes*/

    ruthlessness INT, /*inside strike zone, decreases walks and increases strikeouts*/
    overpowerment INT, /*reduce power of batted balls lowers homeruns*/
    unthwackability INT, /*lowers hits allowed, increases ground/fly outs*/
    shakespearianism INT, /*converts fielder's choice into double plays*/
    suppression INT, /*counter batter buoyancy and convers flyouts to groundouts*/
    coldness INT, /*better pitcher preformance after bad outcomes*/

    /*Blaserunning attributes*/

    baseThirst INT, /*likelyhood of stealing base attempts, but not success rate*/
    laserlikeness INT, /*generel measure of baseruning skill*/
    continuation INT, /*runner advancements on hits, both how often and many bases*/
    groundFriction INT, /*determines triple instead of a single*/
    indulgence INT, /*runner advancements on an out*/

    /*Defense attributes*/

    /* 
    Defense appears to be handled by the team as a whole
    possibly taking the average of each of these values
    for the entire fielding team.
    On outs that name the fielding player
    every player seems to field the ball at an equal rate
    not correlating to that player's individual stats.

    It's likely that the simulation first decides that an out happens
    and then picks a player at random to attribute that out to. 
    */

    anticapitalism INT, /*defend against base theft*/
    chasiness INT, /*defend against extra base hits, holding runners to first base*/
    omniscience INT, /*turns batter hits into outs*/
    tenaciousness INT, /*related to steal attempts in some form*/
    watchfulness INT /*reduces baserunning attempts*/
);

INSERT INTO players (id, name, peanutAllergy, cinnamon, pressurization, soul, fate, blood, coffee, ritual) VALUES (
"a1a1a2",
"Chorby Soul",
false,
0.001,
0.500,
1777,
78,
"AA",
"Flat White",
"Staying alive"
);