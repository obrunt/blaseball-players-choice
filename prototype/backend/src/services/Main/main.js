
const { send_game_event } = require("sendEvent");

const { fetch_previous_date } = require("../database/fetchPreviousDay");
const { getSeasonDayGames } = require("../database/fetchSeasonDayGames");

const { start_game_day } = require("../games/handleStartGame");


//Everything here is what's needed to run just one day of the game simulation
//It would need to be continously until it receives a false from the end games
  //From there it then starts the output of the sim


function main(){
    //Start day
        //This is under handle misc
    let todayGames = start();
    //Run day
    run(todayGames);

    let continueSim = endGames(todayGames);
    //End day
      //There needs to be a way to send the trigger that the championship has been decided
  return continueSim;
}


function start(){

  //Getting the last game played so we can get the current day
  let { day, season } = await getLastGameDate();
  day += 1;

  let games;
  //TODO: check to see if this is actually useful, or just some straight nonsense
    //Creating games should be done after the previous 

  //This tells us if we're in the post season
  /*if(day > 98){
    games = await getPostSeasonDayGames(season, day);
  }
  //These are just normal season games
  else{*/
    //Fetching the currently constructed games
    games = await getSeasonDayGames(season, day);
  //}


  games.forEach(game => {
    //This sets up
      //Pitchers for both teams
      //Home and away odds for the next game
      //Weather
      //Stadium
    start_game_day(season, day);
  });

  return games;

}

/**
 * def handle_misc(self):

        if self.ty in [
            EventType.HALF_INNING,
            EventType.SUN_30,
            EventType.HOLIDAY_INNING,
            EventType.SALMON_SWIM,
        ]:
            self.handle_inning_start()
            return True

        if self.ty in [EventType.INNING_END]:
            # skipping inning outing
            if self.update["inning"] == 2:
                # so if this *is* a coffee 3s game the pitchers are definitely gonna have the mod
                # even if we pulled too early to catch it getting added. so i'm cheating here who cares

                # it's also specifically permanent mods, not seasonal mods that may or may not be echoed/received
                self.print(
                    f"home pitcher mods: {self.home_pitcher.print_mods(ModType.PERMANENT)} "
                    f"({self.home_pitcher.name})"
                )
                self.print(
                    f"away pitcher mods: {self.away_pitcher.print_mods(ModType.PERMANENT)} "
                    f"({self.away_pitcher.name})"
                )
                if self.home_pitcher.has_mod(Mod.TRIPLE_THREAT, ModType.PERMANENT) or self.weather == Weather.COFFEE_3S:
                    self.roll("remove home pitcher triple threat")
                if self.away_pitcher.has_mod(Mod.TRIPLE_THREAT, ModType.PERMANENT) or self.weather == Weather.COFFEE_3S:
                    self.roll("remove away pitcher triple threat")
            # todo: salmon
            return True
 
        if self.ty in [EventType.PLAY_BALL]:
            # play ball (already handled above but we want to fetch a tiny tick later)
            if self.event["day"] not in self.fetched_days:
                self.fetched_days.add(self.event["day"])

                timestamp = self.event["created"]
                self.data.fetch_league_data(timestamp, 20)

            self.print(self.stadium.mods)

            return True


 */



function run(games){
  
  var gamesSetUp = new Promise((resolve, reject) => {
    games.forEach(game => {
      
      send_game_event(game.game_id, "GAME_START", game);
      send_game_event(game.game_id, "INNING_TOP", game);
      //Will still have to set up this up
      send_game_event(game.game_id, "BATTER_UP", game);
      resolve();
    });
  })
  .then(() => {
    console.log('Games initlized');
  });
4

  var gamesComplete = new Promise((resolve, reject) => {
    games.forEach(game => {
      let gameOver = false;
        
      while(!gameOver){

        createEvent(game);

        gameOver = await getCheckGameOver(game.game_id);
      } 
        
      resolve();
    });
  });
  gamesComplete.then(() => {
    console.log('All done!');
  });

  return;
}



function endGames(games){
  const day = games[0].day;

  if (day == 98){
    var postSeasonSetUp = new Promise((resolve, reject) => {
      
      
      resolve();
    })
    .then(() => {
      console.log('Continue season games');
    });

    return false;
  }
  //Have to update the current face offs, carry over any round wins or end the series
  else if (day > 98){

    return false;
  }
  //Just update the games and prep the next ones(?)
  else{
    //Nothing needs to happen
    //Except pass a continue

  }
  return true;
}