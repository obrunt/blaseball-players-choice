const { getBattingTeam, isMaximumBaseball, getBatterAppearanceCount, getGameWeather } = require("../database/Reterive/fetchGameInfo");
const { getPlayerMods, getPlayerTeam, getPlayerPosition } = require("../database/Reterive/fetchPlayerInfo");
const { getTeamMods, getTeamActivePlayers } = require("../database/Reterive/fetchTeamInfo");



function getMultiplier(player_id, team_id, stadium_id, game_id, season, day, attribute){

    let multiplier = 1;

    const playerMods = await getPlayerMods(player_id);
    const teamMods = await getTeamMods(team_id);

    //Combining all of the mods and removing duplicates to prevent problems
    let allMods = [...new Set(player_mods.concat(team_mods))];


    for(mod in allMods){
        switch(mod){
            case 'LATE_TO_PARTY':
                if(day > 71){   //Making sure we're in the late season
                    if(!teamMods.includes("OVERPERFORMING")){   //Preventing double multiplication
                        multiplier += 0.2;
                    }
                }
                break;
            case 'OVERPERFORMING':
                multiplier += 0.2;
                break;
            case 'UNDERPERFORMING':
                multiplier -= 0.2;
                break;
            case 'GROWTH':
                //There was an issue with this where it only applied for some attributes
                    //patheticism, thwackability, bouyancy, ruthlessness
                //This was fixed in season 19
                //Just decided to put it straight up in this
                multiplier += min(0.05, 0.05 * (day / 99));
                break;
            case 'HIGH_PRESSURE':
                const weather = await getGameWeather(game_id);
                const runnersOnBase = await getBaseSpots(game_id);
                const position = await getPlayerPosition(player_id, team_id);

                //Checking to see if there are people on the bases while weather is flooding
                    //Need to check that this doesn't apply to pitchers
                        //It's for your own team being on base, 
                        //so pitcher cnanot have their own team while they're playing
                if (weather == 18 && runnersOnBase.length() != '[]' && position != 1) {
                    multiplier += 0.25;
                }
                break;
            case 'TRAVELING':
                //Apperntly the travelling mod never applied to players even when it should
                //Will just be applying regardless
                    //Only once if both player and team have it because duplicates are removed
                
                //Checking to see where the player should be
                const position = await getPlayerPosition(player_id, team_id);
                const inning = await getGameInning(game_id);

                if(
                    inning.top_of_inning && position == 0 ||  //If the player is a batter on away team
                    !inning.top_of_inning && position == 1    //If player is pitching while away
                ){
                    const arrs = ["patheticism", "thwackability", "ruthlessness", "buoyancy"];
                    if (!arrs.includes(attribute)){ //Only increasing if it is not one of above
                        multiplier += 0.05;
                    }
                }
                //Technically there should be checks for if they're a fielder
                //But I don't think that is part of any rolls
                    //If there are, then remove the position check for bottom of the inning situation
                break;
            case 'SINKING_SHIP':
                //Getting the length of the active roster
                const rosterSize = (await getTeamActivePlayers()).length();

                //Does go negative, but that's the point
                    //No need to add limiter
                multiplier += (14 - rosterSize) * 0.01;
                break;
            case 'AFFINITY_FOR_CROWS':
                const weather = await getGameWeather(game_id);

                //Checking that weather is birds first
                if(weather == 11){
                    const position = await getPlayerPosition(player_id, team_id);
                    const battingTeam = await getBattingTeam(team_id);

                    if(
                        (position == 0 && battingTeam == team_id) || //If they're an active batter
                        (position == 1 && battingTeam != team_id)    //If they're an active pitcher
                    ){
                        const arrs = ["buoyancy", "omniscience"];
                        if (!arrs.includes(attribute)){ //Only increasing if it is not one of above
                            multiplier += 0.5;
                        }
                    }
                }
                break;
            case 'CHUNKY':
                const weather = await getGameWeather(game_id);

                //Checking that weather is peanuts first
                if(weather == 10){
                    const arrs = ["buoyancy", "omniscience"];
                    //Apperently ground friction only gets bosted by half of other power stats
                        //Need to look over other power boosters, but assuming it's truw
                    if (arrs.includes(attribute)){
                        multiplier += 1.0;
                    }
                    else if(attribute == 'ground_friction'){
                        multiplier += 0.5;
                    }
                }
                break;
            case 'SMOOTH':
                const weather = await getGameWeather(game_id);

                //Checking that weather is peanuts first
                if(weather == 10){
                    //Everything here is just funky
                        //Apperntly boosting anything speed related gives weird 8ths for increases
                        //Trust the person who did the math
                    if (attribute == 'musclitude'){
                        multiplier += 0.15;
                    }
                    else if (attribute = 'continuation' || 'ground_friction'){
                        multiplier += 0.5;
                    }
                    else if (attribute = 'laserlikeness'){
                        multiplier += 0.8;
                    }
                }
                break;
            case 'ON_FIRE': //This is officalilly called Red Hot
                if (attribute == 'thwackability'){
                    if (season >= 13) {
                        multiplier += 4.0;
                    }
                    else {
                        multiplier += 3.0;
                    }
                }
                else if (attribute = 'moxie'){
                    if (season >= 13) {
                        multiplier += 2.0;
                    }
                    else {
                        multiplier += 1.0;
                    }
                }
                break;
            case 'MINIMALIST':
                const maxBall = await isMaximumBaseball(game_id);

                if(maxBall){
                    multiplier -= 0.75;
                }
                break;
            case 'MAXIMALIST':
                const maxBall = await isMaximumBaseball(game_id);

                if(maxBall){
                    multiplier += 2.5;
                }
                break;
            case 'SLOW_BUILD':
                const position = await getPlayerPosition(player_id, team_id);

                //Checking if the player is a batter
                if(position == 0){
                    //Getting the times they've been batter up events in the game
                    const batCount = await getBatterAppearanceCount(game_id, player_id);
                    
                    //This is an assumption on how this works
                    multiplier += batCount * 0.01;
                }
                break;
            case 'SHELLED':
                const position = await getPlayerPosition(player_id, team_id);
                const battingTeam = await getBattingTeam(team_id);

                //Cheking to see if they're a fielder
                if(position == 0 && team_id != battingTeam){
                    return 0;
                }
                break;
            case 'GUARDED':
                const fortification = await getStadiumStat('fortification', stadium_id);

                //The original doesn't have the minus
                //Description says that player should play worse in low fortification
                //So added the minus by discression
                    //Can change/remove later 
                multiplier += 0.2 * (fortification - 0.5);

                break;
            case 'OUTDOORSY':
                const grandiosity = await getStadiumStat('grandiosity', stadium_id);

                //The original doesn't have the minus
                //Description says that player should play worse in low grandiosity
                //So added the minus by discression
                    //Can change/remove later 
                multiplier += 0.2 * (grandiosity - 0.5);

                break;
            case 'GAUDY':
                const stadiumMods = (await getStadiumMods(stadium_id)).length();

                multiplier += 0.2 * stadiumMods;
                break;
            case 'CLUTTERED':
                const filthiness = await getStadiumStat('filthiness', stadium_id);

                multiplier += 0.2 * filthiness;

                break;
            case 'NIGHT_VISION':
                const weather = await getGameWeather(game_id);

                if(weather == 7){
                    multiplier += 0.5;
                }
                break;
            case 'MINIMIZED':
                //Wiki claims that is should be always zero
                //Also says that inverse stats aren't known if they should also be 0
                    //Maybe add check for what attribute we're multiplying

                //The formulas might be dividing by this, so just set it to be very, very small
                return 0.00001;
            case 'GREEN_LIGHT':
                const weather = await getGameWeather(game_id);

                //Polarity plus
                if(weather == 20){
                    multiplier += 0.5;
                }
                //Polarity minus
                else if(weather == 21){
                    multiplier -= 0.5;
                }
                break;
        }
    }

    return multiplier;


    /**
    *if player.bat == "NIGHT_VISION_GOGGLES" and meta.weather == Weather.ECLIPSE:
        # Blessing description: Item. Random player on your team hits 50% better during Solar Eclipses.
        if attr == "thwackability":
            multiplier += 0.5
    return multiplier

     */
}


