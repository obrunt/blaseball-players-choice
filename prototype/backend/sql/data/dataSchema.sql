CREATE TABLE IF NOT EXISTS data.leagues
(
    league_db_id INT NOT NULL DEFAULT,
    league_id VARCHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    league_name VARCHAR,
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP,

    CONSTRAINT leagues_pkey PRIMARY KEY (league_id)
)

CREATE SEQUENCE IF NOT EXISTS data.leagues_league_db_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE data.leagues_league_db_id_seq
    OWNED BY data.leagues.league_db_id;

ALTER TABLE ONLY data.leagues ALTER COLUMN league_db_id SET DEFAULT nextval('data.leagues_league_db_id_seq');













CREATE TABLE IF NOT EXISTS data.subleagues
(
    subleague_db_id INT NOT NULL DEFAULT,
    league_id VARCHAR(36),
    subleague_id VARCHAR(36) DEFAULT (UUID()),
    subleague_name VARCHAR,
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP,

    CONSTRAINT subleagues_pkey PRIMARY KEY (subleague_id),
    CONSTRAINT subleagues_leagues_id_fkey FOREIGN KEY (league_id)
        REFERENCES data.leagues (league_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)


CREATE SEQUENCE IF NOT EXISTS data.subleagues_subleague_db_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE data.subleagues_subleague_db_id_seq
    OWNED BY data.subleagues.subleague_db_id;

ALTER TABLE ONLY data.subleagues ALTER COLUMN subleague_db_id SET DEFAULT nextval('data.subleagues_subleague_db_id_seq');










CREATE TABLE IF NOT EXISTS data.divisions
(
    division_db_id INT NOT NULL,
    division_id VARCHAR(36) DEFAULT (UUID()),
    division_name VARCHAR,
    league_id VARCHAR(36),
    subleague_id VARCHAR(36),
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP,

    CONSTRAINT divisions_pkey PRIMARY KEY (divisionse_id),
    CONSTRAINT divisions_leagues_id_fkey FOREIGN KEY (league_id)
        REFERENCES data.leagues (league_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT divisions_subleagues_id_fkey FOREIGN KEY (subleague_id)
        REFERENCES data.subleagues (subleague_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

CREATE SEQUENCE IF NOT EXISTS data.divisions_division_db_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE data.divisions_division_db_id_seq
    OWNED BY data.divisions.division_db_id;

ALTER TABLE ONLY data.divisions ALTER COLUMN division_db_id SET DEFAULT nextval('data.divisions_division_db_id_seq');













CREATE TABLE IF NOT EXISTS data.teams
(
    id INT NOT NULL,
    team_id VARCHAR(36) DEFAULT (UUID()),
    location TEXT,
    nickname TEXT,
    full_name TEXT,
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP,
    hash VARCHAR(36) DEFAULT (UUID()),
    url_slug VARCHAR(30),
    card_id INT,
    stadium_id VARCHAR(36),
    team_abbreviation VARCHAR(10),
    team_main_color VARCHAR(10),
    team_secondary_color VARCHAR(10),
    team_emoji VARCHAR(1),
    team_slogan VARCHAR(50),
    deceased BOOL NOT NULL DEFAULT false,
	
	CONSTRAINT teams_pkey PRIMARY KEY (id),
    CONSTRAINT teams_no_dupes UNIQUE (team_id, valid_from),

	CONSTRAINT teams_card_id_fkey FOREIGN KEY (card_id)
        REFERENCES taxa.card (card_id) MATCH SIMPLE
);

CREATE TRIGGER team_insert
    AFTER INSERT
    ON data.teams FOR EACH ROW
		UPDATE data.teams 
        SET url_slug = REPLACE(REGEXP_REPLACE(LOWER(REPLACE(nickname,'&','and')), '[^A-Za-z'' ]', '','g'),' ','-')
		WHERE url_slug IS NULL;	



/*
CREATE OR ALTER TRIGGER team_insert
    AFTER INSERT
    ON data.teams
    FOR EACH ROW
    BEGIN
		UPDATE data.teams SET url_slug = replace(regexp_replace(lower(unaccent(replace(new.nickname,'&','and'))), '[^A-Za-z'' ]', '','g'),' ','-')
			WHERE coalesce(url_slug,'') = '';	
	END;
*/











CREATE TABLE IF NOT EXISTS data.team_modifications
(
    team_modifications_id INT NOT NULL,
    team_id VARCHAR(36),
    modification VARCHAR,
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP,

    CONSTRAINT team_modifications_pkey PRIMARY KEY (team_modifications_id),
	CONSTRAINT teams_modification_fkey FOREIGN KEY (modification)
        REFERENCES taxa.modifications (modification) MATCH SIMPLE
)


CREATE SEQUENCE IF NOT EXISTS data.team_modifications_team_modifications_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE data.team_modifications_team_modifications_id_seq
    OWNED BY data.team_modifications.team_modifications_id;

ALTER TABLE ONLY data.team_modifications ALTER COLUMN id SET DEFAULT nextval('data.team_modifications_team_modifications_id_seq');













CREATE TABLE IF NOT EXISTS data.stadiums
(
    id INT NOT NULL,
    stadium_id VARCHAR(36) DEFAULT (UUID()),
    hype FLOAT,
    name TEXT,
    birds INT,
    model INT,
    team_id VARCHAR(36),
    nickname TEXT,
    main_color character varying(10) COLLATE pg_catalog."default",
    secondary_color character varying(10) COLLATE pg_catalog."default",
    tertiary_color character varying(10) COLLATE pg_catalog."default",
    mysticism FLOAT,
    viscosity FLOAT,
    elongation FLOAT,
    obtuseness FLOAT,
    forwardness FLOAT,
    grandiosity FLOAT,
    ominousness FLOAT,
    fortification FLOAT,
    inconvenience FLOAT,
    luxuriousness FLOAT,
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP,
    hash uuid,

	
	CONSTRAINT stadium_team_id_fkey FOREIGN KEY (team_id)
        REFERENCES data.teams (team_id) MATCH SIMPLE,
)

CREATE SEQUENCE IF NOT EXISTS data.stadiums_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE data.stadiums_id_seq
    OWNED BY data.stadiums.id;

ALTER TABLE ONLY data.stadiums ALTER COLUMN id SET DEFAULT nextval('data.stadiums_id_seq');









CREATE TABLE IF NOT EXISTS data.stadium_modifications
(
    id INT NOT NULL,
    stadium_id VARCHAR(36),
    modification VARCHAR,
    level INT,
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP,

	CONSTRAINT teams_modification_fkey FOREIGN KEY (modification)
        REFERENCES taxa.modifications (modification) MATCH SIMPLE,
)

CREATE SEQUENCE IF NOT EXISTS data.stadium_modifications_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE data.stadium_modifications_id_seq
    OWNED BY data.stadium_modifications.id;

ALTER TABLE ONLY data.stadium_modifications ALTER COLUMN id SET DEFAULT nextval('data.stadium_modifications_id_seq');











CREATE TABLE IF NOT EXISTS data.players
(
    id INT NOT NULL DEFAULT,
    player_id VARCHAR(36),
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP,
    player_name VARCHAR,
    deceased BOOL,
    hash uuid,
    anticapitalism FLOAT,
    base_thirst FLOAT,
    buoyancy FLOAT,
    chasiness FLOAT,
    coldness FLOAT,
    continuation FLOAT,
    divinity FLOAT,
    ground_friction FLOAT,
    indulgence FLOAT,
    laserlikeness FLOAT,
    martyrdom FLOAT,
    moxie FLOAT,
    musclitude FLOAT,
    omniscience FLOAT,
    overpowerment FLOAT,
    patheticism FLOAT,
    ruthlessness FLOAT,
    shakespearianism FLOAT,
    suppression FLOAT,
    tenaciousness FLOAT,
    thwackability FLOAT,
    tragicness FLOAT,
    unthwackability FLOAT,
    watchfulness FLOAT,
    pressurization FLOAT,
    cinnamon FLOAT,
    total_fingers SMALLINT,
    soul SMALLINT,
    fate SMALLINT,
    peanut_allergy BOOL,
    armor TEXT,
    bat TEXT,
    ritual TEXT,
    coffee SMALLINT,
    blood SMALLINT,
    url_slug VARCHAR,
    tournament INT DEFAULT '-1'::INT,
    evolution INT DEFAULT 0,
    batting_rating FLOAT DEFAULT '-1'::INT,
    pitching_rating FLOAT DEFAULT '-1'::INT,
    baserunning_rating FLOAT DEFAULT '-1'::INT,
    defense_rating FLOAT DEFAULT '-1'::INT,

    CONSTRAINT players_pkey PRIMARY KEY (id),
    CONSTRAINT players_no_dupes UNIQUE (player_id, valid_from),
    CONSTRAINT player_coffee_fkey FOREIGN KEY (coffee)
        REFERENCES taxa.coffee (coffee_id) MATCH SIMPLE,
    CONSTRAINT player_blood_fkey FOREIGN KEY (blood)
        REFERENCES taxa.modifications (blood_id) MATCH SIMPLE
)


CREATE SEQUENCE IF NOT EXISTS data.players_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE data.players_id_seq
    OWNED BY data.players.id;

ALTER TABLE ONLY data.players ALTER COLUMN id SET DEFAULT nextval('data.players_id_seq');


CREATE INDEX ON data.players
    (valid_from ASC NULLS LAST, valid_until DESC NULLS FIRST);


CREATE TRIGGER player_insert
    AFTER INSERT
    ON data.players
    FOR EACH ROW
    BEGIN        
        UPDATE data.players SET url_slug = 'pitching-machine-2' WHERE player_id = '5d063a91-31b3-4688-97a7-e34a7181da30';
        UPDATE data.players SET url_slug = replace(regexp_replace(lower(unaccent(replace(new.player_name,',',' comma'))), '[^A-Za-z'' ]', '','g'),' ','-')
            WHERE coalesce(url_slug,'') = '';
    END;










CREATE TABLE IF NOT EXISTS data.player_modifications
(
    player_modifications_id INT NOT NULL DEFAULT nextval('data.player_modifications_player_modifications_id_seq'::regclass),
    player_id VARCHAR,
    modification VARCHAR,
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP,
    tournament INT DEFAULT '-1'::INT,

    CONSTRAINT player_modifications_pkey PRIMARY KEY (player_modifications_id),
    CONSTRAINT player_modifications_player_id_fkey FOREIGN KEY (player_id)
        REFERENCES data.players (player_id) MATCH SIMPLE,
    CONSTRAINT player_modification_fkey FOREIGN KEY (modification)
        REFERENCES taxa.modifications (modification) MATCH SIMPLE
)


CREATE INDEX ON data.player_modifications
    (valid_from ASC NULLS LAST, valid_until DESC NULLS FIRST);













CREATE TABLE IF NOT EXISTS data.player_items
(
    id INT NOT NULL DEFAULT nextval('data.player_items_id_seq'::regclass),
    player_id VARCHAR(36) NOT NULL,
    item_id VARCHAR(36) NOT NULL,
    name TEXT,
    health INT,
    durability INT,
    defense_rating FLOAT,
    hitting_rating FLOAT,
    pitching_rating FLOAT,
    baserunning_rating FLOAT,
    forger_name TEXT,
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP,

    CONSTRAINT player_items_player_id_fkey FOREIGN KEY (player_id)
        REFERENCES data.players (player_id) MATCH SIMPLE
)



CREATE SEQUENCE IF NOT EXISTS data.player_items_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE data.player_items_id_seq
    OWNED BY data.player_items.id;

ALTER TABLE ONLY data.player_items ALTER COLUMN id SET DEFAULT nextval('data.player_items_id_seq');












CREATE TABLE IF NOT EXISTS data.team_roster
(
    team_roster_id INT NOT NULL DEFAULT nextval('data.team_positions_team_position_id_seq'::regclass),
    team_id VARCHAR,
    position_id INT,
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP,
    player_id VARCHAR,
    position_type_id FLOAT,
    tournament INT DEFAULT '-1'::INT,

    CONSTRAINT team_roster_pkey PRIMARY KEY (team_roster_id),
    CONSTRAINT team_roster_player_id_fkey FOREIGN KEY (player_id)
        REFERENCES data.players (player_id) MATCH SIMPLE,
    CONSTRAINT team_roster_team_id_fkey FOREIGN KEY (team_id)
        REFERENCES data.teams (player_id) MATCH SIMPLE
)


CREATE INDEX IF NOT EXISTS team_roster_idx
    ON data.team_roster 
    (valid_until ASC NULLS FIRST, team_id ASC NULLS LAST, position_id ASC NULLS LAST, position_type_id ASC NULLS LAST)
    INCLUDE(team_id, position_id, valid_until, position_type_id)

    
CREATE INDEX IF NOT EXISTS team_roster_indx_player_id_timespan
    ON data.team_roster
    (player_id ASC NULLS LAST, valid_from ASC NULLS LAST, valid_until DESC NULLS FIRST)




CREATE SEQUENCE IF NOT EXISTS data.team_positions_team_position_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE data.team_positions_team_position_id_seq
    OWNED BY data.team_roster.team_roster_id;

ALTER TABLE ONLY data.team_roster ALTER COLUMN id SET DEFAULT nextval('data.team_positions_team_position_id_seq');












CREATE TABLE IF NOT EXISTS data.games
(
    game_id VARCHAR(36) NOT NULL DEFAULT (UUID()),
    day INT DEFAULT -1,
    season INT DEFAULT -1,
    last_game_event INT,
    home_odds FLOAT DEFAULT 0.5,
    away_odds FLOAT DEFAULT 0.5,
    weather INT DEFAULT 1,
    series_index INT DEFAULT 1,
    series_length INT DEFAULT 3,
    is_postseason BOOL DEFAULT false,
    home_team VARCHAR(36),
    away_team VARCHAR(36),
    home_score FLOAT DEFAULT 0,
    away_score FLOAT DEFAULT 0,
    number_of_innings DEFAULT 0,
    ended_on_top_of_inning BOOL DEFAULT false,
    ended_in_shame BOOL DEFAULT false,
    stadium_id VARCHAR(36),
    home_team_pitcher_id VARCHAR,
    away_team_pitcher_id VARCHAR,
    tournament INT DEAFULT -1,
    outcomes TEXT,

    CONSTRAINT game_pkey PRIMARY KEY (game_id),

    CONSTRAINT game_home_team_id_fkey FOREIGN KEY (home_team)
        REFERENCES data.teams (team_id) MATCH SIMPLE,
    CONSTRAINT game_away_team_id_fkey FOREIGN KEY (away_team)
        REFERENCES data.teams (team_id) MATCH SIMPLE,

    CONSTRAINT game_weather_id_fkey FOREIGN KEY (weather)
        REFERENCES taxa.weather (weather_id) MATCH SIMPLE,

    CONSTRAINT game_home_pitcher_fkey FOREIGN KEY (home_team_pitcher_id)
        REFERENCES data.players (player_id) MATCH SIMPLE,
    CONSTRAINT game_away_pitcher_fkey FOREIGN KEY (away_team_pitcher_id)
        REFERENCES data.players (player_id) MATCH SIMPLE
)








CREATE TABLE IF NOT EXISTS data.game_events
(
    id INT NOT NULL,
    perceived_at TIMESTAMP WITHOUT TIMEZONE DEFAULT CURRENT_TIMESTAMP,
    game_id VARCHAR(36) NOT NULL DEFAULT (UUID()),
    event_type TEXT DEFAULT 'UNKNOWN',
    event_index INT,
    inning SMALLINT DEFAULT -1,
    top_of_inning BOOL DEFAULT false,

    batter_id VARCHAR(36),
    batter_position INT,
    pitcher_id VARCHAR(36),
    pitcher_team_id VARCHAR(36),
    batter_team_id VARCHAR(36),
    home_team_id VARCHAR(36),
    away_team_id VARCHAR(36),

    home_score FLOAT DEFAULT 0,
    away_score FLOAT DEFAULT 0,
    home_strike_count INT DEFAULT 3,
    away_strike_count INT DEFAULT 3,
    bases_occupied TEXT,
    strikes SMALLINT DEFAULT 0,
    outs SMALLINT DEFAULT 0,
    balls SMALLINT DEFAULT 0,

    is_last_game_event BOOL DEFAULT false,
    event_text TEXT,
    season INT DEFAULT -1,
    day INT DEFAULT -1,

    home_ball_count INT DEFAULT 4,
    away_ball_count INT DEFAULT 4,
    home_base_count INT DEFAULT 4,
    away_base_count INT DEFAULT 4,
    home_out_count INT DEFAULT 3,
    away_out_count INT DEFAULT 3,
    home_strike_count INT DEFAULT 3,
    away_strike_count INT DEFAULT 3,
    
    tournament INT DEFAULT -1,
    CONSTRAINT game_events_pkey PRIMARY KEY (id),
    CONSTRAINT no_dupes UNIQUE (game_id, event_index),
    CONSTRAINT game_events_game_id_fkey FOREIGN KEY (game_id)
        REFERENCES data.games (game_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,

    CONSTRAINT game_batter_team_id_fkey FOREIGN KEY (batter_team_id)
        REFERENCES data.teams (team_id) MATCH SIMPLE,
    CONSTRAINT game_pitcher_team_id_fkey FOREIGN KEY (pitcher_team_id)
        REFERENCES data.teams (team_id) MATCH SIMPLE,

    CONSTRAINT game_batter_id_fkey FOREIGN KEY (batter_id)
        REFERENCES data.players (player_id) MATCH SIMPLE,
    CONSTRAINT game_pitcher_id_fkey FOREIGN KEY (pitcher_id)
        REFERENCES data.players (player_id) MATCH SIMPLE
)


CREATE SEQUENCE IF NOT EXISTS data.game_events_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE data.game_events_id_seq
    OWNED BY data.game_events.id;

ALTER TABLE ONLY data.game_events ALTER COLUMN id SET DEFAULT nextval('data.game_events_id_seq');




CREATE INDEX IF NOT EXISTS game_events_indx_event_type
    ON data.game_events (event_type ASC NULLS LAST);


CREATE INDEX IF NOT EXISTS game_events_indx_game_id
    ON data.game_events (game_id ASC NULLS LAST);












CREATE TABLE IF NOT EXISTS data.outcomes
(
    id INT NOT NULL DEFAULT nextval('data.player_events_id_seq'::regclass),
    game_event_id INT,
    entity_id VARCHAR(36),
    event_type TEXT,
    original_text TEXT,
    CONSTRAINT player_events_pkey PRIMARY KEY (id),
    CONSTRAINT player_events_game_event_id_fkey FOREIGN KEY (game_event_id)
        REFERENCES data.game_events (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

CREATE SEQUENCE IF NOT EXISTS data.player_events_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE data.player_events_id_seq
    OWNED BY data.outcomes.id;

ALTER TABLE ONLY data.outcomes ALTER COLUMN id SET DEFAULT nextval('data.player_events_id_seq');












CREATE TABLE IF NOT EXISTS data.game_event_base_runners
(
    id INT NOT NULL DEFAULT nextval('data.game_event_base_runners_id_seq'::regclass),
    game_event_id INT,
    runner_id VARCHAR(36),
    responsible_pitcher_id VARCHAR(36),
    base_before_play INT,
    base_after_play INT,
    was_base_stolen BOOL,
    was_caught_stealing BOOL,
    was_picked_off BOOL,
    runner_scored BOOL DEFAULT false,
    runs_scored FLOAT,
    CONSTRAINT game_event_base_runners_pkey PRIMARY KEY (id),
    CONSTRAINT game_event_base_runners_game_event_id_fkey FOREIGN KEY (game_event_id)
        REFERENCES data.game_events (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,

    CONSTRAINT game_batter_id_fkey FOREIGN KEY (batter_id)
        REFERENCES data.players (player_id) MATCH SIMPLE,
    CONSTRAINT game_pitcher_id_fkey FOREIGN KEY (pitcher_id)
        REFERENCES data.players (player_id) MATCH SIMPLE
)


CREATE SEQUENCE IF NOT EXISTS data.game_event_base_runners_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE data.game_event_base_runners_id_seq
    OWNED BY data.game_event_base_runners.id;

ALTER TABLE ONLY data.outcomes ALTER COLUMN id SET DEFAULT nextval('data.player_events_id_seq');










CREATE TABLE data.post_season_rounds(
    round_number INT DEFAULT 0,
    games_to_win INT DEFAULT 0,
    games_played INT DEFAULT 0,
    home_team VARCHAR(36),
    away_team VARCHAR(36),
    home_team_wins INT DEFAULT 0,
    away_team_wins INT DEFAULT 0,
    game_id VARCHAR(36)
);

