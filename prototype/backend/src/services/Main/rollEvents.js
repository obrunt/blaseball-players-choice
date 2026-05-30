

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






*/


function throwPitch(){
    /**
     * def throw_pitch(self, known_result=None):
        meta = self.get_stat_meta()
        threshold = get_strike_threshold(
            self.batter, self.batting_team, self.pitcher, self.pitching_team, self.stadium, meta, self.is_flinching()
        )
        if self.batter.undefined():
            # musc and mox
            self.roll("undefined (strike formula)")
            self.roll("undefined (strike formula)")
            self.print(f"--- threshold is {threshold}")

        passed_check = None
        if known_result == "ball":
            passed_check = False
        elif known_result == "strike":
            passed_check = True

        roll = self.roll("strike", threshold=threshold, passed=passed_check)
        if self.pitching_team.has_mod(Mod.ACIDIC):
            acidic_roll = self.roll("acidic")
            success = "Acidic pitch" in self.desc
            self.log_roll(Csv.MODPROC, "Acidic Pitch" if success else "Not Acidic Pitch", acidic_roll, success)

        self.is_strike = roll < threshold
        self.strike_roll = roll
        self.strike_threshold = threshold

        if known_result == "strike" and roll > threshold:
            self.print(f"!!! warn: too high strike roll (threshold {threshold})")
            self.is_strike = True
        elif known_result == "ball" and roll < threshold:
            self.print(f"!!! warn: too low strike roll (threshold {threshold})")
            self.is_strike = False

        known_result_overrides = {
            "2021-06-21T20:17:23.768Z": True,
            "2021-06-24T03:00:24.613Z": True,
            "2021-06-24T04:12:06.096Z": True,
            "2021-06-21T23:09:15.837Z": True,
            "2021-06-26T03:06:40.110Z": True,
            "2021-06-24T05:15:00.980Z": True,
            "2021-06-24T08:12:41.052Z": True,
            "2021-06-24T09:20:42.736Z": True,
            "2021-06-24T11:10:24.784Z": True,
        }
        if self.event["created"] in known_result_overrides:
            self.is_strike = known_result_overrides[self.event["created"]]

        if self.pitching_team.has_mod("FIERY") and self.strikes < self.max_strikes - 1:
            # event where our formula registers a ball but we know it's a strike by roll count
            # ideally we'd get rid of these and our formula would just guess right but alas
            double_strike_overrides = {
                #"2021-05-21T05:32:00.224Z": True, now unnecessary due to strike formula improvements
                #"2021-06-16T01:14:32.242Z": True, Last Double strike override goodbye!
                # "2021-07-22T10:07:27.012Z": False, # removed as realigns later with a party roll
                # "2021-06-22T17:19:20.764Z": True,
            }

            if self.event["created"] in double_strike_overrides:
                override_is_strike = double_strike_overrides[self.event["created"]]
                if override_is_strike != self.is_strike:
                    self.is_strike = override_is_strike
                    self.print("!!! overriding double strike to {}".format(override_is_strike))
                else:
                    self.print("!!! unnecessary double strike override")

            if self.is_strike:
                double_strike_roll = self.roll("double strike")
                success = "fires a Double Strike" in self.desc
                self.log_roll(Csv.MODPROC, "Double Strike" if success else "Single Strike", double_strike_roll, success)
            else:
                self.print("!!! double strike eligible! (threshold is {})".format(threshold))

        return roll

     */
}





/**
*
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




module.export = {
    
};