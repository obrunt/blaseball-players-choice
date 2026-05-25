const { fetch_game_order } = require("../Timings/handleSeasonOrder");
const { fetch_pitcher, fetcher_batter } = require("handlePlayers");

function start_game_day(season, day){

    console.log(`Starting game day s${season+1}d${day+1}`);

    let current_game_order = fetch_game_order(season, day);

    for(let i = 0; i < current_game_order.length(); i++){
        current_game_order
    }

}


/**
 * def start_game_day(self, season, day):
        # happens end of last game day, really

        current_game_order = self.data.fetch_game_order(season, day)

        has_mismatch = False

        for game_id in current_game_order: 

            raw_updates = self.data.get_raw_game_updates(game_id)

            predicted_home_pitcher = [u["data"]["homePitcher"] for u in raw_updates if u["data"]["homePitcher"]][0]
            real_home_pitcher = [u["data"]["homePitcher"] for u in raw_updates if u["data"]["homePitcher"] and u["data"]["gameStart"]][0]
            
            predicted_away_pitcher = [u["data"]["awayPitcher"] for u in raw_updates if u["data"]["awayPitcher"]][0]
            real_away_pitcher = [u["data"]["awayPitcher"] for u in raw_updates if u["data"]["awayPitcher"] and u["data"]["gameStart"]][0]
            
            self.print(f"predicted home pitcher: {predicted_home_pitcher}, predicted away pitcher: {predicted_away_pitcher}")
            self.print(f"real home pitcher: {real_home_pitcher}, real away pitcher: {real_away_pitcher}")
            mismatch = predicted_home_pitcher != real_home_pitcher or predicted_away_pitcher != real_away_pitcher

            if mismatch:
                self.print(f"!!! warn: mispredicted pitchers on {season, day}")
                has_mismatch = True
                self.calc_next_game_odds(game_id, use_early_data=False, data_invalid=True)



        if day >= 99:
            for game_id in current_game_order:
                game = self.data.get_update(game_id, 5)
                weather = Weather(game["weather"])
                stadium = self.data.get_stadium(game['stadiumId'])
                self.roll(f"postseason weather ({weather.name}) day {day}, upgrades: {stadium.weather}")

                self.calc_next_game_odds(game_id, use_early_data=False)


        # happens start of game day
        # calculating odds for the upcoming batch of games (hence: not on day 99)
        if day < 98:
            upcoming_game_order = self.data.fetch_game_order(season, day+1)
            self.print(f"next day order: {upcoming_game_order}")
            for upcoming_game_id in upcoming_game_order:
                self.calc_next_game_odds(upcoming_game_id, data_invalid=has_mismatch)
        pass

 */



/**
 * def calc_next_game_odds(self, game_id, use_early_data=True, data_invalid=False):
        # todo: merge this into data.py, it belongs there
        # yes we are intentionally fetching standings for the "previous" day
        # when doing upcoming-game odds, because that's what it'd have available
        season = self.data.fetch_season_at(self.data.sim["seasonId"], self.event["created"])["data"]
        standings = self.data.fetch_standings_at(season["standings"], self.event["created"])["data"]

        raw_updates = self.data.get_raw_game_updates(game_id)

        game_data = [u['data'] for u in raw_updates if u['data']['homeOdds'] > 0 and u['data']['homePitcher']][0]
        if not use_early_data:
            game_data = [u['data'] for u in raw_updates if u['data']['gameStart'] and u['data']['homePitcher']][0]
        
        data_known_invalid = data_invalid
        # missing the "early" event so we don't get the wrong odds
        if game_id == "c8bfd47f-3fbb-48fb-a1f7-5c95daf26f81" and use_early_data:
            data_known_invalid = True
        if len(self.started_days) < 2:
            # first rolls of each fragment seem broken, this is our heuristic
            data_known_invalid = True
        if self.day in [0, 27, 72, 99]:
            # skip problematic roll ordering for now
            data_known_invalid = True

        home_odds = game_data['homeOdds']
        away_odds = game_data['awayOdds']

        self.print("===")

        fuzz_roll = self.roll("odds fuzzing")
        delta = (0.03+fuzz_roll*0.07)-0.05

        self.print(f"=== matchup: s{game_data['season']+1}d{game_data['day']+1}, game {game_id}, {game_data['awayTeamNickname']}@{game_data['homeTeamNickname']}")
        self.print(f"=== {game_data['awayPitcherName']} @ {game_data['homePitcherName']}")
        self.print(f"home odds: {game_data['homeOdds']}")
        self.print(f"away odds: {game_data['awayOdds']}")

        home_wins = standings["wins"].get(game_data["homeTeam"], 0)
        away_wins = standings["wins"].get(game_data["awayTeam"], 0)

        # assuming team data will be correct as of time-of-call
        home_team = self.data.get_team(game_data["homeTeam"])
        away_team = self.data.get_team(game_data["awayTeam"])

        # make sure players have right hitting ratings?
        self.data.fetch_players(self.event['created'])

        def batting_stars(p):
            return p.data['hittingRating']
            # return ((1 - p.data['tragicness']) ** 0.01) * (p.data['thwackability'] ** 0.35) * (p.data['moxie'] ** 0.075) * (p.data['divinity'] ** 0.35) * (p.data['musclitude'] ** 0.075) * ((1 - p.data['patheticism']) ** 0.05) * (p.data['martyrdom'] ** 0.02)

        def pitching_stars(p):
            return p.data['pitchingRating']
            # return (p.data["shakespearianism"] ** 0.1) * (p.data["unthwackability"] ** 0.5) * (p.data["coldness"] ** 0.025) * (p.data["overpowerment"] ** 0.15) * (p.data["ruthlessness"] ** 0.4)
        def running_stars(p):
            return p.data['baserunningRating']
        def defense_stars(p):
            return p.data['defenseRating']
        
        def geom(vals):
            prod = 1
            count = 0
            for v in vals:
                prod *= v
                count += 1
            return prod**(1/count)

        home_batting_stars = sum(batting_stars(self.data.get_player(batter_id)) for batter_id in home_team.lineup)
        away_batting_stars = sum(batting_stars(self.data.get_player(batter_id)) for batter_id in away_team.lineup)
        home_batting_stars_geom = geom(batting_stars(self.data.get_player(batter_id)) for batter_id in home_team.lineup)
        away_batting_stars_geom = geom(batting_stars(self.data.get_player(batter_id)) for batter_id in away_team.lineup)
        home_batting_stars_csv = ",".join(str(batting_stars(self.data.get_player(batter_id))) for batter_id in home_team.lineup)
        away_batting_stars_csv = ",".join(str(batting_stars(self.data.get_player(batter_id))) for batter_id in away_team.lineup)
        home_pitching_stars = pitching_stars(self.data.get_player(game_data['homePitcher']))
        away_pitching_stars = pitching_stars(self.data.get_player(game_data['awayPitcher']))
                
        home_running_stars = sum(running_stars(self.data.get_player(batter_id)) for batter_id in home_team.lineup)
        away_running_stars = sum(running_stars(self.data.get_player(batter_id)) for batter_id in away_team.lineup)
        home_defense_stars = sum(defense_stars(self.data.get_player(batter_id)) for batter_id in home_team.lineup)
        away_defense_stars = sum(defense_stars(self.data.get_player(batter_id)) for batter_id in away_team.lineup)

        self.print(f"home wins: {home_wins}, away wins: {away_wins}")
        self.print(f"home bstars: {home_batting_stars}, away bstars: {away_batting_stars}")
        self.print(f"home pstars: {home_pitching_stars}, away pstars: {away_pitching_stars}")
        self.print(f"fuzz roll: {fuzz_roll} (delta: {delta})")

        if abs(delta) < abs(home_odds-0.5) or delta > 0:
            # unambiguous
            if home_odds > away_odds:
                unfuzzed_home_odds = home_odds - delta
                unfuzzed_away_odds = away_odds + delta
            else:
                unfuzzed_home_odds = home_odds + delta
                unfuzzed_away_odds = away_odds - delta

            self.print(f"unambiguous unfuzzed home odds: {unfuzzed_home_odds}")
            self.print(f"unambiguous unfuzzed away odds: {unfuzzed_away_odds}")

            if not data_known_invalid:
                self.odds_log.append(OddsLog(
                    game_id=game_id,
                    season=game_data["season"],
                    day=game_data["day"],
                    home_batting_stars=home_batting_stars,
                    away_batting_stars=away_batting_stars,
                    home_batting_stars_geom=home_batting_stars_geom,
                    away_batting_stars_geom=away_batting_stars_geom,
                    home_batting_stars_csv=home_batting_stars_csv,
                    away_batting_stars_csv=away_batting_stars_csv,
                    home_pitching_stars=home_pitching_stars,
                    away_pitching_stars=away_pitching_stars,
                    home_wins=home_wins,
                    away_wins=away_wins,
                    home_odds=unfuzzed_home_odds,
                    away_odds=unfuzzed_away_odds,
                    home_batters=len(home_team.lineup),
                    away_batters=len(away_team.lineup),
                    home_pitcher_id=game_data['homePitcher'],
                    away_pitcher_id=game_data['awayPitcher'],
                    home_team=home_team.id,
                    away_team=away_team.id,
                    home_team_name=game_data['homeTeamNickname'],
                    away_team_name=game_data['awayTeamNickname'],
                    home_pitcher_name=game_data['homePitcherName'],
                    away_pitcher_name=game_data['awayPitcherName'],
                    fuzz_roll=fuzz_roll,
                    delta=delta,
                    home_baserunning_stars=home_running_stars,
                    away_baserunning_stars=away_running_stars,
                    home_defense_stars=home_defense_stars,
                    away_defense_stars=away_defense_stars
                ))

            for odd in [unfuzzed_home_odds, unfuzzed_away_odds]:
                rounded = str(odd)[:10]
                if rounded in seen_odds:
                    self.print(f"odds {rounded} already seen at: {seen_odds[rounded]}")
                    seen_odds[rounded].append(game_id)
                else:
                    seen_odds[rounded] = [game_id]
        else:
            # ambiguous
            for sign in [-1, 1]:
                unfuzzed_home_odds = home_odds + delta*sign
                unfuzzed_away_odds = away_odds - delta*sign
                self.print(f"*possible* unfuzzed home odds: {unfuzzed_home_odds}")
                self.print(f"*possible* unfuzzed away odds: {unfuzzed_away_odds}")
                for odd in [unfuzzed_home_odds, unfuzzed_away_odds]:
                    rounded = str(odd)[:10]
                    if rounded in seen_odds:
                        self.print(f"odds {rounded} already seen at: {seen_odds[rounded]}")
                        seen_odds[rounded].append(game_id)
                    else:
                        seen_odds[rounded] = [game_id]

 */




/**
 * def roll(
        self,
        label,
        lower: float = 0,
        upper: float = 1,
        passed: Optional[bool] = None,
        threshold: Optional[float] = None,
    ) -> float:
        value = self.rng.next()
        self.print(f"{label}: {value}")
        self.emit_roll_to_stream(label, value, passed, threshold)

        if threshold is not None and passed is not None:
            if passed:
                upper = threshold
            else:
                lower = threshold

        if value < lower or value > upper:
            self.print(
                "!!! warn: value {}={} out of bounds (should be within {}-{})".format(label, value, lower, upper)
            )

        # hacky way to figure out what index this roll is in the overall list
        idx = 0
        if self.roll_log:
            if self.roll_log[-1].event_id == self.event["id"]:
                idx = self.roll_log[-1].index + 1

        log_obj = LoggedRoll(self.event["id"], idx, self.event["created"], label, lower, upper)
        self.roll_log.append(log_obj)
        return value

 */