CREATE DATABASE blaseball;

USE blaseball;

CREATE TABLE players (
    /*Identifying Information*/
    
    id INT NOT NULL PRIMARY KEY,
    player_id VARCHAR(36) UNIQUE,
    valid_from DATETIME,
    valid_to DATETIME,

    /*Generic Information*/

    player_name VARCHAR(100),
    deceased BOOLEAN,
    total_fingers SMALLINT,
    soul SMALLINT,
    fate SMALLINT,
    ritual TEXT,
    coffee SMALLINT,
    blood SMALLINT,

    /*Basic attributes*/

    peanutAllergy BOOLEAN, /*determines whether a player is allergic to peanuts*/
    cinnamon FLOAT, /*upper bounds of a players vibes*/
    pressurization FLOAT, /*lower bounds of a players vibes*/

    /*Batting attributes*/

    boyancy FLOAT, /*turns feilded outs into flyouts*/
    divinity FLOAT, /*ability to hit home runs*/
    martyrdom FLOAT, /*batter ground out, decides if on base is able to advance*/
    moxie FLOAT, /*'plate discipline' swing at balls outside strike zone*/
    musclitude FLOAT, /*hits turn into double and batted ball into foul*/
    patheticism FLOAT, /*negative stat, determines ball contact*/
    thwacability FLOAT, /*'quality of contact' reduces ground/fly outs and increases hits*/
    tragicness FLOAT, /*ingame effect currently unknown*/

    /*Pitching attributes*/

    ruthlessness FLOAT, /*inside strike zone, decreases walks and increases strikeouts*/
    overpowerment FLOAT, /*reduce power of batted balls lowers homeruns*/
    unthwackability FLOAT, /*lowers hits allowed, increases ground/fly outs*/
    shakespearianism FLOAT, /*converts fielder's choice into double plays*/
    suppression FLOAT, /*counter batter buoyancy and convers flyouts to groundouts*/
    coldness FLOAT, /*better pitcher preformance after bad outcomes*/

    /*Blaserunning attributes*/

    baseThirst FLOAT, /*likelyhood of stealing base attempts, but not success rate*/
    laserlikeness FLOAT, /*generel measure of baseruning skill*/
    continuation FLOAT, /*runner advancements on hits, both how often and many bases*/
    groundFriction FLOAT, /*determines triple instead of a single*/
    indulgence FLOAT, /*runner advancements on an out*/

    /*Defense attributes*/

    anticapitalism FLOAT, /*defend against base theft*/
    chasiness FLOAT, /*defend against extra base hits, holding runners to first base*/
    omniscience FLOAT, /*turns batter hits into outs*/
    tenaciousness FLOAT, /*related to steal attempts in some form*/
    watchfulness FLOAT /*reduces baserunning attempts*/
);
INSERT INTO players VALUES (
 100000,
 'a1a1a1',
 '2025-05-14 6:51:23',
  null,
  "Chorby Soul",
  false,
  10,
  1678,
  78,
  null,
  -1,
  -1, 
  false,
  0.523,
  0.162,
  0.264,
  0.487,
  0.126,
  0.054,
  0.001,
  0.458,
  0.813,
  0.119,
  0.254,
  0.184,
  0.746,
  0.641,
  0.132,
  0.354,
  0.813,
  0.119,
  0.254,
  0.184,
  0.746,
  0.054,
  0.001,
  0.054,
  0.001,
  0.372
 );
 
 select * from players;