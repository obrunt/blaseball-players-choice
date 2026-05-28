
const { fetch_previous_date } = require("../Reterive/fetchPreviousDay");
const { fetch_game_order } = require("../Reterive/fetchSeasonDayGames");

const { start_game_day } = require("/Events/handleStartGame");

function main (){
    //Start day
        //This is under handle misc
    start();
    //Run day
    run();
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


    /*
    //game start
    if self.update["gameStartPhase"] != self.next_update["gameStartPhase"]:
            self.print(f"GAME START PHASE: {self.update['gameStartPhase']} -> {self.next_update['gameStartPhase']} phase")
    //inning start
    if self.update["newInningPhase"] != self.next_update["newInningPhase"]:
            self.print(f"NEW INNING PHASE: {self.update['newInningPhase']} -> {self.next_update['newInningPhase']} inphase")
    */
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


















function run(){
    /**
     * roll for return-from-elsewhere (end event if it procs) and name unscattering (thresholds TODO?)
roll for weather, end event if it procs (thresholds TODO)
roll for party, end event if it procs (threshold known)
if weather is flooding:
  roll for flooding, end event if it procs (thresholds TODO)
roll for consumers, end event if it procs (threshold in progress)
if ballpark has peanut mister:
  roll for peanut mister, end event if it procs (threshold TODO)
if ballpark has smithy:
  roll for smithy, end event if it procs (threshold TODO)
if ballpark has secret base:
  roll for secret base, end event if it procs (regular and attractors; thresholds TODO)
if ballpark has grind rail:
  roll for grind rail, end event if it procs (thresholds TODO?)
if ballpark has tunnels:
  roll for tunnels, end event if it procs (threshold TODO)
roll to choose steal fielder (not confirmed)
for each steal-eligible player:
  roll for steal, end event if it procs (thresholds in progress)
if batter has electric blood mod:
  roll for zap, end event if it procs (threshold TODO)
if pitcher has debt and batter is not observed:
  roll for HBP, end event if it procs (threshold TODO)
if weather is birds:
  roll for bird ambush, end event if it procs (threshold TODO)
roll for mild, end event if it procs (roll regardless if the pitcher has the mod; threshold TODO)
if the count is 0-0 and batter or pitcher has charm blood mod:
  roll for charm, end event if it procs (threshold and exact logic TODO)
if batter is magmatic:
  roll for unknown reasons, possibly unused
  automatic home run, end event
  if ballpark has big buckets:
    roll for big buckets (threshold TODO)
roll for strike zone (threshold known)
if pitcher has acidic blood mod:
  roll for acidic blood (threshold TODO)
if batter has flinch and strike count is 0:
  automatic no-swing
else:
  roll for swing (threshold differs based on strike zone roll; both thresholds known)
if batter didn't swing:
  if ball out of zone:
    ball count += 1
    if ball count == # of balls in a walk:
      result is walk
      if batter has base instincts:
        roll for base instincts (thresholds TODO)
    else:
      result is a ball
  else:
    strike count += 1
    if strike count == # of strikes in a strikeout:
      result is strikeout looking
    else:
      result is strike looking/flinching
else:  # batter did swing
  roll for contact (threshold differs based on strike zone roll; both thresholds known)
  if no contact:
    strike count += 1
    if strike count == # of strikes in a strikeout:
      result is strikeout swinging
    else:
      result is strike swinging
  else:  # yes contact
    roll for foul (threshold known)
    if foul:
      result is foul
    else:
      roll to choose a fielder (known)
      roll for out (threshold in progress)
      if out:
        num outs += 1
        roll to choose a flyout assigned fielder (known)
        roll for fly (threshold known)
        if fly:
          if num outs < # of outs in a half-inning:
            for each runner in reverse order:
              if the next base is open:
                roll for runner advancement (threshold in progress)
          result is flyout with flyout assigned fielder responsible
        else:
          roll to choose a ground out assigned fielder (known)
          if num outs < # of outs in a half-inning:
            refer to https://github.com/xSke/resim/blob/83cb0d6165da8e099bc41e634272fcce8efe55d8/resim.py#L871 for double play, fielders choice, and runner advancement logic (all thresholds known)
          else:
            result is groundout with ground out assigned fielder responsible
        if batter has debt, result is a simple ground out or flyout, and assigned fielder is not already observed:
          roll for debt (threshold TODO)
      else:  # not an out
        roll for home run (threshold known)
        if home run:
          result is home run
          roll buckets (threshold unknown)
        else:  # base hit
          roll for fielder (known)
          roll for double (threshold known)
          roll for triple (threshold known)
          if triples roll passed:
            result is triple
          else if doubles roll passed:
            result is double
          else:
            result is single
          apply automatic advancement based on the hit type
          for each runner in reverse order:
            if the next base is open:
              roll for extra runner advancement (threshold TODO)
if batter is reverberating and this event ends the PA and it wasn't a hit or HR:
  roll for reverberating (threshold TODO)
if the attractor async thing happened:  # idk ask astrid
  roll for attractor's fake stars (formula known)
     */



    /**
     * def run(self, start_timestamp, end_timestamp, progress_callback):
        self.data.fetch_league_data(start_timestamp)    --This is pre-exsisting things
        feed_events = get_feed_between(start_timestamp, end_timestamp)  ----This is pre-exsisting things

        for event in feed_events:   ----This is pre-exsisting things
            if progress_callback:
                progress_callback()
            event["type"] = EventType(event["type"])
            
            
            
            self.handle(event)  --This is probably the most important thing

        self.save_data()
     */
}

/**
 * roll for return-from-elsewhere (end event if it procs) and name unscattering (thresholds TODO?)
roll for weather, end event if it procs (thresholds TODO)
roll for party, end event if it procs (threshold known)
if weather is flooding:
  roll for flooding, end event if it procs (thresholds TODO)
roll for consumers, end event if it procs (threshold in progress)
if ballpark has peanut mister:
  roll for peanut mister, end event if it procs (threshold TODO)
if ballpark has smithy:
  roll for smithy, end event if it procs (threshold TODO)
if ballpark has secret base:
  roll for secret base, end event if it procs (regular and attractors; thresholds TODO)
if ballpark has grind rail:
  roll for grind rail, end event if it procs (thresholds TODO?)
if ballpark has tunnels:
  roll for tunnels, end event if it procs (threshold TODO)
roll to choose steal fielder (not confirmed)
for each steal-eligible player:
  roll for steal, end event if it procs (thresholds in progress)
if batter has electric blood mod:
  roll for zap, end event if it procs (threshold TODO)
if pitcher has debt and batter is not observed:
  roll for HBP, end event if it procs (threshold TODO)
if weather is birds:
  roll for bird ambush, end event if it procs (threshold TODO)
roll for mild, end event if it procs (roll regardless if the pitcher has the mod; threshold TODO)
if the count is 0-0 and batter or pitcher has charm blood mod:
  roll for charm, end event if it procs (threshold and exact logic TODO)
if batter is magmatic:
  roll for unknown reasons, possibly unused
  automatic home run, end event
  if ballpark has big buckets:
    roll for big buckets (threshold TODO)
roll for strike zone (threshold known)
if pitcher has acidic blood mod:
  roll for acidic blood (threshold TODO)
if batter has flinch and strike count is 0:
  automatic no-swing
else:
  roll for swing (threshold differs based on strike zone roll; both thresholds known)
if batter didn't swing:
  if ball out of zone:
    ball count += 1
    if ball count == # of balls in a walk:
      result is walk
      if batter has base instincts:
        roll for base instincts (thresholds TODO)
    else:
      result is a ball
  else:
    strike count += 1
    if strike count == # of strikes in a strikeout:
      result is strikeout looking
    else:
      result is strike looking/flinching
else:  # batter did swing
  roll for contact (threshold differs based on strike zone roll; both thresholds known)
  if no contact:
    strike count += 1
    if strike count == # of strikes in a strikeout:
      result is strikeout swinging
    else:
      result is strike swinging
  else:  # yes contact
    roll for foul (threshold known)
    if foul:
      result is foul
    else:
      roll to choose a fielder (known)
      roll for out (threshold in progress)
      if out:
        num outs += 1
        roll to choose a flyout assigned fielder (known)
        roll for fly (threshold known)
        if fly:
          if num outs < # of outs in a half-inning:
            for each runner in reverse order:
              if the next base is open:
                roll for runner advancement (threshold in progress)
          result is flyout with flyout assigned fielder responsible
        else:
          roll to choose a ground out assigned fielder (known)
          if num outs < # of outs in a half-inning:
            refer to https://github.com/xSke/resim/blob/83cb0d6165da8e099bc41e634272fcce8efe55d8/resim.py#L871 for double play, fielders choice, and runner advancement logic (all thresholds known)
          else:
            result is groundout with ground out assigned fielder responsible
        if batter has debt, result is a simple ground out or flyout, and assigned fielder is not already observed:
          roll for debt (threshold TODO)
      else:  # not an out
        roll for home run (threshold known)
        if home run:
          result is home run
          roll buckets (threshold unknown)
        else:  # base hit
          roll for fielder (known)
          roll for double (threshold known)
          roll for triple (threshold known)
          if triples roll passed:
            result is triple
          else if doubles roll passed:
            result is double
          else:
            result is single
          apply automatic advancement based on the hit type
          for each runner in reverse order:
            if the next base is open:
              roll for extra runner advancement (threshold TODO)
if batter is reverberating and this event ends the PA and it wasn't a hit or HR:
  roll for reverberating (threshold TODO)
if the attractor async thing happened:  # idk ask astrid
  roll for attractor's fake stars (formula known)
   */