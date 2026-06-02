

/**
 * 
    def fetch_league_data(self, timestamp, delta_secs: float = 0):
        self.fetch_sim(timestamp, delta_secs)
        self.fetch_teams(timestamp, delta_secs)
        self.fetch_players(timestamp, delta_secs)
        self.fetch_stadiums(timestamp, delta_secs)
 */



/**
 * 
    def fetch_sim(self, timestamp, delta_secs: float = 0):
        timestamp = offset_timestamp(timestamp, delta_secs)
        key = f"sim_at_{timestamp}"
        resp = get_cached(
            key,
            f"{CHRONICLER_URI}/v2/entities?type=sim&at={timestamp}",
        )
        self.sim = resp["items"][0]["data"]
*/


/**
 *  def fetch_teams(self, timestamp, delta_secs: float = 0):
        timestamp = offset_timestamp(timestamp, delta_secs)
        key = f"teams_at_{timestamp}"
        resp = get_cached(
            key,
            f"{CHRONICLER_URI}/v2/entities?type=team&at={timestamp}&count=1000",
        )
        self.teams = {
            e["entityId"]: TeamData.from_chron(e["data"], e["validFrom"], self.teams.get(e["entityId"]))
            for e in resp["items"]
        }
*/


/**
 * 
    def fetch_players(self, timestamp, delta_secs: float = 0):
        timestamp = offset_timestamp(timestamp, delta_secs)
        key = f"players_at_{timestamp}"
        resp = get_cached(
            key,
            f"{CHRONICLER_URI}/v2/entities?type=player&at={timestamp}&count=2000",
        )
        self.players = {
            e["entityId"]: PlayerData.from_chron(e["data"], e["validFrom"], self.players.get(e["entityId"]))
            for e in resp["items"]
        }
*/


/**
 * 
    def fetch_stadiums(self, timestamp, delta_secs: float = 0):
        timestamp = offset_timestamp(timestamp, delta_secs)
        key = f"stadiums_at_{timestamp}"
        resp = get_cached(
            key,
            f"{CHRONICLER_URI}/v2/entities?type=stadium&at={timestamp}&count=1000",
        )
        self.stadiums = {
            e["entityId"]: StadiumData.from_chron(e["data"], e["validFrom"], self.stadiums.get(e["entityId"]))
            for e in resp["items"]
        }
 */