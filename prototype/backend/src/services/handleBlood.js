
function handle_A (){
    //A Team or Player with blood type A will play each gae with a random blood ability
}

function handle_AA (){
    //When this player hits a double, they'll have a chance of Overpreforming for the rest of the game
}

function handle_AAA (){
    //When this player nits a triple, theyl'll have a chance of Overpreforming for the rest of the gae
}

function handle_Acidic (){
    //Acidic pitchers occasionally throw acidic pitches, which canses any runs scored on the play to be worth .1 less
}

function handle_Basic (){
    //Batters with Basic will have a chanve of heading past first base when getting walked
}

function handle_Electric (){
    //Team: when this team is batting, they have a chance of zaaping away strikes
    //When this team is pitching, they'll have a chanve of zapping away balls

    //Player: when this player is batting, they have a chance of zaaping away strikes
    //When this player is pitching, they'll have a chance of zapping away balls

    /*
        def handle_electric(self):
        # todo: don't roll this if <s15 and batter doesn't have electric blood?
        # only case here would be baldwin breadwinner in s14 but it seems to work okay?
        if self.batting_team.has_mod(Mod.ELECTRIC) and self.update["atBatStrikes"] > 0:
            electric_roll = self.roll("electric")
            if self.ty == EventType.STRIKE_ZAPPED:
                self.log_roll(Csv.MODPROC, "Zap", electric_roll, True)
            if self.ty != EventType.STRIKE_ZAPPED:
                self.log_roll(Csv.MODPROC, "NoZap", electric_roll, False)

        if self.ty == EventType.STRIKE_ZAPPED:
            # successful zap!
            return True
    */
}

function handle_Fire (){
    //Players have a chance of throwing double strikes
}

function handle_Grass (){
    //Will play better as the seasin goes on, up to a 5% global boost by season's end
}

function handle_H2O (){
    //Will always swing at strikes while there are 2 outs
}

function handle_Love (){
    //Have a chance of convincing their opponents to fail
        //Charmed batters may willing strike out
        //charmed pitchers may willing walk a batter


    /**
     *  def handle_charm(self):
        pitch_charm_eligible = self.update["atBatBalls"] == 0 and self.update["atBatStrikes"] == 0
        batter_charm_eligible = self.batting_team.has_mod(Mod.LOVE) and pitch_charm_eligible
        pitcher_charm_eligible = self.pitching_team.has_mod(Mod.LOVE) and pitch_charm_eligible

        # before season 16, love blood only proc'd when the player also had love blood
        if self.event["season"] < 15:
            if self.batter.blood != Blood.LOVE:
                batter_charm_eligible = False

            if self.pitcher.blood != Blood.LOVE:
                pitcher_charm_eligible = False

        if pitcher_charm_eligible:
            charm_roll = self.roll("charm")

            if self.batter.undefined():
                pass
                # self.roll("undefined (charm)")
                # self.roll("undefined (charm)")
                # self.roll("undefined (charm)")


            if " charmed " in self.desc:
                self.log_roll(
                    Csv.MODPROC,
                    "Charmed",
                    charm_roll,
                    True,
                )

                if not self.batter.has_mod(Mod.CAREFUL):
                    self.damage(self.batter, "batter")
                if self.season >= 15:
                    # i thought we rolled item damage 3 times
                    # but undefined tells us it's only once (for the batter)
                    # so this might be 3 rolls and 2 of them are the pitcher or something
                    self.roll("charm item damage???")
                    self.roll("charm item damage???")

                self.handle_batter_reverb()

                if self.batting_team.has_mod(Mod.PSYCHIC):
                    if self.batter.undefined():
                        self.roll("undefined (strikeout-walk)")
                        self.roll("undefined (strikeout-walk)")

                    bpsychic_roll = self.roll("strikeout-walk")
                    bpsychic_success = "uses a Mind Trick" in self.desc

                    self.log_roll(
                        Csv.BSYCHIC,
                        "Success" if bpsychic_success else "Fail",
                        bpsychic_roll,
                        bpsychic_success,
                    )
                    if bpsychic_success:
                        self.roll("charm-bpsychic item damage??")
                return True

            else:
                self.log_roll(
                    Csv.MODPROC,
                    "NoCharm",
                    charm_roll,
                    False,
                )

        if batter_charm_eligible:
            charm_roll = self.roll("charm")
            if " charms " in self.desc:
                self.log_roll(
                    Csv.MODPROC,
                    "Charmed",
                    charm_roll,
                    True,
                )
                self.damage(self.batter, "batter")
                self.damage(self.batter, "batter")
                self.damage(self.pitcher, "pitcher")
                self.damage(self.pitcher, "pitcher")

                if "scores!" in self.desc:
                    last_runner = self.data.get_player(self.update["baseRunners"][0])
                    self.damage(last_runner, "runner")

                self.handle_batter_reverb()  # apparently don mitchell can do this.
                return True
     */
}

function handle_O (){
    //Players will always swing at strikes while there are 0 balls and 0 strikes in the At Bat
}

function handle_O_No (){
    //Cannot be struck out when there are 0 balls in the count
}

function handle_Psychic (){
    //Have a chance of reversing a bad outcome with a mind trick
}