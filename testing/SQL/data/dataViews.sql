



-- View: data.games_info_expanded_all

-- DROP MATERIALIZED VIEW IF EXISTS data.games_info_expanded_all;

CREATE MATERIALIZED VIEW IF NOT EXISTS data.games_info_expanded_all
TABLESPACE pg_default
AS
 SELECT nextval('data.games_info_expanded_all_id_seq'::regclass) AS games_info_expanded_all_id,
    ga.game_id,
    ga.day,
    ga.season,
    ga.home_score,
    ga.away_score,
    (( SELECT count(1) AS count
           FROM data.game_events ge
          WHERE ge.event_type = 'SUN_2'::text AND ge.batter_team_id::text = ga.home_team::text AND ge.game_id::text = ga.game_id::text)) + (( SELECT count(1) * '-1'::integer
           FROM data.game_events ge
          WHERE ge.event_type = 'BLACK_HOLE'::text AND ge.batter_team_id::text = ga.away_team::text AND ge.game_id::text = ga.game_id::text)) +
        CASE
            WHEN ga.home_score > ga.away_score THEN 1
            ELSE 0
        END *
        CASE
            WHEN ga.season = 18 THEN '-1'::integer
            ELSE 1
        END AS home_win_objects,
    (( SELECT count(1) AS count
           FROM data.game_events ge
          WHERE ge.event_type = 'SUN_2'::text AND ge.batter_team_id::text = ga.away_team::text AND ge.game_id::text = ga.game_id::text)) + (( SELECT count(1) * '-1'::integer
           FROM data.game_events ge
          WHERE ge.event_type = 'BLACK_HOLE'::text AND ge.batter_team_id::text = ga.home_team::text AND ge.game_id::text = ga.game_id::text)) +
        CASE
            WHEN ga.home_score < ga.away_score THEN 1
            ELSE 0
        END *
        CASE
            WHEN ga.season = 18 THEN '-1'::integer
            ELSE 1
        END AS away_win_objects,
    ga.is_postseason,
    ga.home_team,
    ga.away_team,
    ga.home_odds,
    ga.away_odds,
    xw.weather_id,
        CASE
            WHEN ga.season = 0 THEN 'Sunny'::character varying
            ELSE xw.weather_text
        END AS weather,
    s.stadium_id,
    s.hype,
    s.name AS stadium_name,
    s.birds,
    s.nickname AS stadium_nickname,
    s.mysticism,
    s.viscosity,
    s.elongation,
    s.obtuseness,
    s.forwardness,
    s.grandiosity,
    s.ominousness,
    s.fortification,
    s.inconvenience
   FROM data.games ga
     JOIN taxa.weather xw ON ga.weather = xw.weather_id
     LEFT JOIN data.stadiums s ON ga.home_team::text = s.team_id::text AND data.timestamp_from_gameday(ga.season, ga.day) >= s.valid_from AND data.timestamp_from_gameday(ga.season, ga.day) <= COALESCE(s.valid_until::timestamp with time zone, now())
  WHERE ga.home_score <> ga.away_score AND ga.tournament = '-1'::integer
WITH DATA;

ALTER TABLE IF EXISTS data.games_info_expanded_all
    OWNER TO postgres;

GRANT SELECT ON TABLE data.games_info_expanded_all TO guest;
GRANT ALL ON TABLE data.games_info_expanded_all TO postgres;

CREATE UNIQUE INDEX games_info_expanded_all_games_info_expanded_all_id_idx
    ON data.games_info_expanded_all USING btree
    (games_info_expanded_all_id)
    TABLESPACE pg_default;