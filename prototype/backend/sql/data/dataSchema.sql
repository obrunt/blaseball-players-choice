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
    url_slug VARCHAR,
    card_id INT,
    stadium_id VARCHAR(36),
    team_abbreviation VARCHAR(10),
    team_main_color VARCHAR(10),
    team_secondary_color VARCHAR(10),
    team_emoji VARCHAR,
    team_slogan VARCHAR,
    deceased BOOLEAN NOT NULL DEFAULT false,
	
	CONSTRAINT teams_pkey PRIMARY KEY (id),
    CONSTRAINT teams_no_dupes UNIQUE (team_id, valid_from),

	CONSTRAINT teams_card_id_fkey FOREIGN KEY (card_id)
        REFERENCES taxa.card (card_id) MATCH SIMPLE,	
    
    CONSTRAINT teams_stadium_id_fkey FOREIGN KEY (stadium_id)
        REFERENCES data.stadiums (stadium_id) MATCH SIMPLE
)

CREATE OR ALTER TRIGGER team_insert
    AFTER INSERT
    ON data.teams
    FOR EACH ROW
    BEGIN
		UPDATE data.teams SET url_slug = 'crabs-2' WHERE team_id = '9494152b-99f6-4adb-9573-f9e084bc813f';
		UPDATE data.teams SET url_slug = 'artists-2' WHERE team_id = 'd6a352fc-b675-40a0-864d-f4fd50aaeea0'; 
		UPDATE data.teams SET url_slug = replace(regexp_replace(lower(unaccent(replace(new.nickname,'&','and'))), '[^A-Za-z'' ]', '','g'),' ','-')
			WHERE coalesce(url_slug,'') = '';	
	END;












CREATE TABLE IF NOT EXISTS data.team_modifications
(
    team_modifications_id INT NOT NULL,
    team_id VARCHAR(36),
    modification VARCHAR,
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP,

    CONSTRAINT team_modifications_pkey PRIMARY KEY (team_modifications_id),
	CONSTRAINT teams_modification_fkey FOREIGN KEY (modification)
        REFERENCES taxa.modifications (modification) MATCH SIMPLE,
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
    name text COLLATE pg_catalog."default",
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
    id integer NOT NULL DEFAULT,
    player_id character varying(36) COLLATE pg_catalog."default",
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP,
    player_name character varying COLLATE pg_catalog."default",
    deceased boolean,
    hash uuid,
    anticapitalism numeric,
    base_thirst numeric,
    buoyancy numeric,
    chasiness numeric,
    coldness numeric,
    continuation numeric,
    divinity numeric,
    ground_friction numeric,
    indulgence numeric,
    laserlikeness numeric,
    martyrdom numeric,
    moxie numeric,
    musclitude numeric,
    omniscience numeric,
    overpowerment numeric,
    patheticism numeric,
    ruthlessness numeric,
    shakespearianism numeric,
    suppression numeric,
    tenaciousness numeric,
    thwackability numeric,
    tragicness numeric,
    unthwackability numeric,
    watchfulness numeric,
    pressurization numeric,
    cinnamon numeric,
    total_fingers SMALLINT,
    soul SMALLINT,
    fate SMALLINT,
    peanut_allergy boolean,
    armor text COLLATE pg_catalog."default",
    bat text COLLATE pg_catalog."default",
    ritual text COLLATE pg_catalog."default",
    coffee SMALLINT,
    blood SMALLINT,
    url_slug VARCHAR,
    tournament integer DEFAULT '-1'::integer,
    evolution integer DEFAULT 0,
    batting_rating numeric DEFAULT '-1'::integer,
    pitching_rating numeric DEFAULT '-1'::integer,
    baserunning_rating numeric DEFAULT '-1'::integer,
    defense_rating numeric DEFAULT '-1'::integer,

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
    player_modifications_id integer NOT NULL DEFAULT nextval('data.player_modifications_player_modifications_id_seq'::regclass),
    player_id character varying COLLATE pg_catalog."default",
    modification character varying COLLATE pg_catalog."default",
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP,
    tournament integer DEFAULT '-1'::integer,

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
    id integer NOT NULL DEFAULT nextval('data.player_items_id_seq'::regclass),
    player_id character varying(36) COLLATE pg_catalog."default" NOT NULL,
    item_id character varying(36) COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default",
    health integer,
    durability integer,
    defense_rating numeric,
    hitting_rating numeric,
    pitching_rating numeric,
    baserunning_rating numeric,
    forger_name text COLLATE pg_catalog."default",
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
    team_roster_id integer NOT NULL DEFAULT nextval('data.team_positions_team_position_id_seq'::regclass),
    team_id character varying COLLATE pg_catalog."default",
    position_id integer,
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP,
    player_id character varying COLLATE pg_catalog."default",
    position_type_id numeric,
    tournament integer DEFAULT '-1'::integer,

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









-- Table: data.games

-- DROP TABLE IF EXISTS data.games;

CREATE TABLE IF NOT EXISTS data.games
(
    game_id character varying(36) COLLATE pg_catalog."default" NOT NULL,
    day integer,
    season integer,
    last_game_event integer,
    home_odds numeric,
    away_odds numeric,
    weather integer,
    series_index integer,
    series_length integer,
    is_postseason boolean,
    home_team character varying(36) COLLATE pg_catalog."default",
    away_team character varying(36) COLLATE pg_catalog."default",
    home_score numeric,
    away_score numeric,
    number_of_innings integer,
    ended_on_top_of_inning boolean,
    ended_in_shame boolean,
    terminology_id character varying(36) COLLATE pg_catalog."default",
    rules_id character varying(36) COLLATE pg_catalog."default",
    statsheet_id character varying(36) COLLATE pg_catalog."default",
    winning_pitcher_id character varying COLLATE pg_catalog."default",
    losing_pitcher_id character varying COLLATE pg_catalog."default",
    tournament integer,
    outcomes text[] COLLATE pg_catalog."default",

    CONSTRAINT game_pkey PRIMARY KEY (game_id),

    CONSTRAINT game_home_team_id_fkey FOREIGN KEY (home_team)
        REFERENCES data.teams (team_id) MATCH SIMPLE,
    CONSTRAINT game_away_team_id_fkey FOREIGN KEY (away_team)
        REFERENCES data.teams (team_id) MATCH SIMPLE,

    CONSTRAINT game_weather_id_fkey FOREIGN KEY (weather)
        REFERENCES taxa.weather (weather_id) MATCH SIMPLE,

    CONSTRAINT game_winning_pitcher_fkey FOREIGN KEY (winning_pitcher_id)
        REFERENCES data.players (player_id) MATCH SIMPLE,
    CONSTRAINT game_losing_pitcher_fkey FOREIGN KEY (losing_pitcher_id)
        REFERENCES data.players (player_id) MATCH SIMPLE
)

















CREATE TABLE IF NOT EXISTS data.game_events
(
    id integer NOT NULL DEFAULT nextval('data.game_events_id_seq'::regclass),
    perceived_at timestamp without time zone,
    game_id character varying(36) COLLATE pg_catalog."default",
    event_type text COLLATE pg_catalog."default",
    event_index integer,
    inning smallint,
    top_of_inning boolean,
    outs_before_play smallint,
    batter_id character varying(36) COLLATE pg_catalog."default",
    batter_team_id character varying(36) COLLATE pg_catalog."default",
    pitcher_id character varying(36) COLLATE pg_catalog."default",
    pitcher_team_id character varying(36) COLLATE pg_catalog."default",
    home_score numeric,
    away_score numeric,
    home_strike_count integer DEFAULT 3,
    away_strike_count integer DEFAULT 3,
    batter_count integer,
    pitches character varying(1)[] COLLATE pg_catalog."default",
    total_strikes smallint,
    total_balls smallint,
    total_fouls smallint,
    is_leadoff boolean,
    is_pinch_hit boolean,
    lineup_position smallint,
    is_last_event_for_plate_appearance boolean,
    bases_hit smallint,
    runs_batted_in numeric,
    is_sacrifice_hit boolean,
    is_sacrifice_fly boolean,
    outs_on_play smallint,
    is_double_play boolean,
    is_triple_play boolean,
    is_wild_pitch boolean,
    batted_ball_type text COLLATE pg_catalog."default",
    is_bunt boolean,
    errors_on_play smallint,
    batter_base_after_play smallint,
    is_last_game_event boolean,
    event_text text[] COLLATE pg_catalog."default",
    additional_context text COLLATE pg_catalog."default",
    season integer,
    day integer,
    parsing_error boolean,
    parsing_error_list text[] COLLATE pg_catalog."default",
    fixed_error boolean,
    fixed_error_list text[] COLLATE pg_catalog."default",
    home_ball_count integer DEFAULT 4,
    away_ball_count integer DEFAULT 4,
    away_base_count integer DEFAULT 4,
    home_base_count integer DEFAULT 4,
    tournament integer,
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
    id integer NOT NULL DEFAULT nextval('data.player_events_id_seq'::regclass),
    game_event_id integer,
    entity_id character varying(36) COLLATE pg_catalog."default",
    event_type text COLLATE pg_catalog."default",
    original_text text COLLATE pg_catalog."default",
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
    id integer NOT NULL DEFAULT nextval('data.game_event_base_runners_id_seq'::regclass),
    game_event_id integer,
    runner_id character varying(36) COLLATE pg_catalog."default",
    responsible_pitcher_id character varying(36) COLLATE pg_catalog."default",
    base_before_play integer,
    base_after_play integer,
    was_base_stolen boolean,
    was_caught_stealing boolean,
    was_picked_off boolean,
    runner_scored boolean DEFAULT false,
    runs_scored numeric,
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
