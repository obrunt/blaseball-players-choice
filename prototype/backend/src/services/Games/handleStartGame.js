/**
 * def start_game_day(self, season, day):
        # happens end of last game day, really
        self.print(f"=== starting game day s{season+1}d{day+1} ({season,day})")
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