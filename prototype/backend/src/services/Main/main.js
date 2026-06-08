
const { send_game_event } = require("sendEvent");

const { fetch_previous_date } = require("../database/fetchPreviousDay");
const { fetch_game_order } = require("../database/fetchSeasonDayGames");

const { start_game_day } = require("../games/handleStartGame");


function main (){
    //Start day
        //This is under handle misc
    let todayGames = start();
    //Run day
    run(todayGames);
    //End day
        //This is under handle misc
}


function start(){

  //Getting the last game played so we can get the current day
  let date = fetch_previous_date();
  date.day += 1;

  //Fetching the currently constructed games
  let games = fetch_game_order(date.season, date.day);

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
