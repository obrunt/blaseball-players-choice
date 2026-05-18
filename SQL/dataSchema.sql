-- Table: data.applied_patches

-- DROP TABLE IF EXISTS data.applied_patches;

CREATE TABLE IF NOT EXISTS data.applied_patches
(
    patch_id integer NOT NULL DEFAULT nextval('data.applied_patches_patch_id_seq'::regclass),
    patch_hash uuid,
    CONSTRAINT applied_patches_pkey PRIMARY KEY (patch_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS data.applied_patches
    OWNER to postgres;

REVOKE ALL ON TABLE data.applied_patches FROM guest;

GRANT SELECT ON TABLE data.applied_patches TO guest;

GRANT ALL ON TABLE data.applied_patches TO postgres;



-- Table: data.chronicler_hash_game_event

-- DROP TABLE IF EXISTS data.chronicler_hash_game_event;

CREATE TABLE IF NOT EXISTS data.chronicler_hash_game_event
(
    chronicler_hash_game_event_id integer NOT NULL DEFAULT nextval('data.chronicler_hash_game_event_chronicler_hash_game_event_id_seq'::regclass),
    update_hash uuid,
    game_event_id integer,
    CONSTRAINT chronicler_hash_game_event_pkey PRIMARY KEY (chronicler_hash_game_event_id),
    CONSTRAINT chronicler_hash_game_event_game_event_id_fkey FOREIGN KEY (game_event_id)
        REFERENCES data.game_events (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS data.chronicler_hash_game_event
    OWNER to postgres;

REVOKE ALL ON TABLE data.chronicler_hash_game_event FROM guest;

GRANT SELECT ON TABLE data.chronicler_hash_game_event TO guest;

GRANT ALL ON TABLE data.chronicler_hash_game_event TO postgres;

COMMENT ON TABLE data.chronicler_hash_game_event
    IS 'Base table populated by Prophesizer.  Used to link data.game_events to Reblase.';
-- Index: chronicler_hash_game_event_indx_game_event_id

-- DROP INDEX IF EXISTS data.chronicler_hash_game_event_indx_game_event_id;

CREATE INDEX IF NOT EXISTS chronicler_hash_game_event_indx_game_event_id
    ON data.chronicler_hash_game_event USING btree
    (game_event_id ASC NULLS LAST)
    TABLESPACE pg_default;



-- Table: data.chronicler_meta

-- DROP TABLE IF EXISTS data.chronicler_meta;

CREATE TABLE IF NOT EXISTS data.chronicler_meta
(
    id smallint NOT NULL,
    season numeric NOT NULL,
    day numeric NOT NULL,
    game_timestamp timestamp without time zone,
    team_timestamp timestamp without time zone,
    player_timestamp timestamp without time zone,
    division_timestamp timestamp without time zone,
    stadium_timestamp timestamp without time zone,
    CONSTRAINT chronicler_meta_pk PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS data.chronicler_meta
    OWNER to postgres;

REVOKE ALL ON TABLE data.chronicler_meta FROM guest;

GRANT SELECT ON TABLE data.chronicler_meta TO guest;

GRANT ALL ON TABLE data.chronicler_meta TO postgres;

-- Table: data.division_teams

-- DROP TABLE IF EXISTS data.division_teams;

CREATE TABLE IF NOT EXISTS data.division_teams
(
    division_teams_id integer NOT NULL DEFAULT nextval('data.division_teams_division_teams_id_seq'::regclass),
    league_id character varying(36) COLLATE pg_catalog."default",
    subleague_id character varying(36) COLLATE pg_catalog."default",
    division_id character varying(36) COLLATE pg_catalog."default",
    team_id character varying COLLATE pg_catalog."default",
    valid_from timestamp without time zone,
    valid_until timestamp without time zone
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS data.division_teams
    OWNER to postgres;

REVOKE ALL ON TABLE data.division_teams FROM guest;

GRANT SELECT ON TABLE data.division_teams TO guest;

GRANT ALL ON TABLE data.division_teams TO postgres;

-- Table: data.divisions

-- DROP TABLE IF EXISTS data.divisions;

CREATE TABLE IF NOT EXISTS data.divisions
(
    division_db_id integer NOT NULL DEFAULT nextval('data.divisions_division_db_id_seq'::regclass),
    division_id character varying(36) COLLATE pg_catalog."default",
    division_name character varying COLLATE pg_catalog."default",
    league_id character varying(36) COLLATE pg_catalog."default",
    subleague_id character varying(36) COLLATE pg_catalog."default",
    valid_from timestamp without time zone,
    valid_until timestamp without time zone
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS data.divisions
    OWNER to postgres;

REVOKE ALL ON TABLE data.divisions FROM guest;

GRANT SELECT ON TABLE data.divisions TO guest;

GRANT ALL ON TABLE data.divisions TO postgres;

-- Table: data.game_event_base_runners

-- DROP TABLE IF EXISTS data.game_event_base_runners;

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
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS data.game_event_base_runners
    OWNER to postgres;

REVOKE ALL ON TABLE data.game_event_base_runners FROM guest;

GRANT SELECT ON TABLE data.game_event_base_runners TO guest;

GRANT ALL ON TABLE data.game_event_base_runners TO postgres;

COMMENT ON TABLE data.game_event_base_runners
    IS '2nd level table populated by Prophesizer.  Child of data.game_events.';

-- Table: data.game_events

-- DROP TABLE IF EXISTS data.game_events;

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
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS data.game_events
    OWNER to postgres;

REVOKE ALL ON TABLE data.game_events FROM guest;

GRANT SELECT ON TABLE data.game_events TO guest;

GRANT ALL ON TABLE data.game_events TO postgres;

COMMENT ON TABLE data.game_events
    IS '2nd level table populated by Prophesizer.  Child of data.games.';
-- Index: game_events_indx_event_type

-- DROP INDEX IF EXISTS data.game_events_indx_event_type;

CREATE INDEX IF NOT EXISTS game_events_indx_event_type
    ON data.game_events USING btree
    (event_type COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: game_events_indx_game_id

-- DROP INDEX IF EXISTS data.game_events_indx_game_id;

CREATE INDEX IF NOT EXISTS game_events_indx_game_id
    ON data.game_events USING btree
    (game_id COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;


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
    CONSTRAINT game_pkey PRIMARY KEY (game_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS data.games
    OWNER to postgres;

REVOKE ALL ON TABLE data.games FROM guest;

GRANT SELECT ON TABLE data.games TO guest;

GRANT ALL ON TABLE data.games TO postgres;

COMMENT ON TABLE data.games
    IS 'Base table populated by Prophesizer.';


-- Table: data.imported_logs

-- DROP TABLE IF EXISTS data.imported_logs;

CREATE TABLE IF NOT EXISTS data.imported_logs
(
    id integer NOT NULL DEFAULT nextval('data.imported_logs_id_seq'::regclass),
    key text COLLATE pg_catalog."default",
    imported_at timestamp without time zone,
    CONSTRAINT imported_logs_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS data.imported_logs
    OWNER to postgres;

REVOKE ALL ON TABLE data.imported_logs FROM guest;

GRANT SELECT ON TABLE data.imported_logs TO guest;

GRANT ALL ON TABLE data.imported_logs TO postgres;


-- Table: data.leagues

-- DROP TABLE IF EXISTS data.leagues;

CREATE TABLE IF NOT EXISTS data.leagues
(
    league_db_id integer NOT NULL DEFAULT nextval('data.leagues_league_db_id_seq'::regclass),
    league_id character varying(36) COLLATE pg_catalog."default",
    league_name character varying COLLATE pg_catalog."default",
    valid_from timestamp without time zone,
    valid_until timestamp without time zone
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS data.leagues
    OWNER to postgres;

REVOKE ALL ON TABLE data.leagues FROM guest;

GRANT SELECT ON TABLE data.leagues TO guest;

GRANT ALL ON TABLE data.leagues TO postgres;



-- Table: data.outcomes

-- DROP TABLE IF EXISTS data.outcomes;

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

TABLESPACE pg_default;

ALTER TABLE IF EXISTS data.outcomes
    OWNER to postgres;

REVOKE ALL ON TABLE data.outcomes FROM guest;

GRANT SELECT ON TABLE data.outcomes TO guest;

GRANT ALL ON TABLE data.outcomes TO postgres;

COMMENT ON TABLE data.outcomes
    IS '2nd level table populated by Prophesizer.  Child of data.game_events.';


-- Table: data.player_items

-- DROP TABLE IF EXISTS data.player_items;

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
    valid_from timestamp without time zone,
    valid_until timestamp without time zone
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS data.player_items
    OWNER to postgres;

REVOKE ALL ON TABLE data.player_items FROM guest;

GRANT SELECT ON TABLE data.player_items TO guest;

GRANT ALL ON TABLE data.player_items TO postgres;


-- Table: data.player_modifications

-- DROP TABLE IF EXISTS data.player_modifications;

CREATE TABLE IF NOT EXISTS data.player_modifications
(
    player_modifications_id integer NOT NULL DEFAULT nextval('data.player_modifications_player_modifications_id_seq'::regclass),
    player_id character varying COLLATE pg_catalog."default",
    modification character varying COLLATE pg_catalog."default",
    valid_from timestamp without time zone,
    valid_until timestamp without time zone,
    tournament integer DEFAULT '-1'::integer,
    CONSTRAINT player_modifications_pkey PRIMARY KEY (player_modifications_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS data.player_modifications
    OWNER to postgres;

REVOKE ALL ON TABLE data.player_modifications FROM guest;

GRANT SELECT ON TABLE data.player_modifications TO guest;

GRANT ALL ON TABLE data.player_modifications TO postgres;

COMMENT ON TABLE data.player_modifications
    IS '2nd level table populated by Prophesizer.  Child of data.players.';
-- Index: player_modifications_indx_player_id_timespan

-- DROP INDEX IF EXISTS data.player_modifications_indx_player_id_timespan;

CREATE INDEX IF NOT EXISTS player_modifications_indx_player_id_timespan
    ON data.player_modifications USING btree
    (player_id COLLATE pg_catalog."default" ASC NULLS LAST, valid_from ASC NULLS LAST, valid_until DESC NULLS FIRST)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS data.player_modifications
    CLUSTER ON player_modifications_indx_player_id_timespan;


-- Table: data.players

-- DROP TABLE IF EXISTS data.players;

CREATE TABLE IF NOT EXISTS data.players
(
    id integer NOT NULL DEFAULT nextval('data.players_id_seq'::regclass),
    player_id character varying(36) COLLATE pg_catalog."default",
    valid_from timestamp without time zone,
    valid_until timestamp without time zone,
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
    total_fingers smallint,
    soul smallint,
    fate smallint,
    peanut_allergy boolean,
    armor text COLLATE pg_catalog."default",
    bat text COLLATE pg_catalog."default",
    ritual text COLLATE pg_catalog."default",
    coffee smallint,
    blood smallint,
    url_slug character varying COLLATE pg_catalog."default",
    tournament integer DEFAULT '-1'::integer,
    evolution integer DEFAULT 0,
    batting_rating numeric DEFAULT '-1'::integer,
    pitching_rating numeric DEFAULT '-1'::integer,
    baserunning_rating numeric DEFAULT '-1'::integer,
    defense_rating numeric DEFAULT '-1'::integer,
    CONSTRAINT players_pkey PRIMARY KEY (id),
    CONSTRAINT players_no_dupes UNIQUE (player_id, valid_from)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS data.players
    OWNER to postgres;

REVOKE ALL ON TABLE data.players FROM guest;

GRANT SELECT ON TABLE data.players TO guest;

GRANT ALL ON TABLE data.players TO postgres;

COMMENT ON TABLE data.players
    IS 'Base table populated by Prophesizer.';
-- Index: players_indx_player_id_timespan

-- DROP INDEX IF EXISTS data.players_indx_player_id_timespan;

CREATE INDEX IF NOT EXISTS players_indx_player_id_timespan
    ON data.players USING btree
    (player_id COLLATE pg_catalog."default" ASC NULLS LAST, valid_from ASC NULLS LAST, valid_until DESC NULLS FIRST)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS data.players
    CLUSTER ON players_indx_player_id_timespan;

-- Trigger: player_insert

-- DROP TRIGGER IF EXISTS player_insert ON data.players;

CREATE TRIGGER player_insert
    AFTER INSERT
    ON data.players
    FOR EACH ROW
    EXECUTE FUNCTION data.player_slug_creation();


-- Table: data.prophesizer_meta

-- DROP TABLE IF EXISTS data.prophesizer_meta;

CREATE TABLE IF NOT EXISTS data.prophesizer_meta
(
    prophesizer_meta_id integer NOT NULL DEFAULT nextval('data.prophesizer_meta_prophesizer_meta_id_seq'::regclass),
    major_version integer,
    minor_version integer,
    patch_version integer,
    run_started timestamp without time zone,
    run_finished timestamp without time zone,
    first_game_event integer,
    last_game_event integer,
    refreshed_matviews boolean DEFAULT false,
    CONSTRAINT prophesizer_meta_pkey PRIMARY KEY (prophesizer_meta_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS data.prophesizer_meta
    OWNER to postgres;

REVOKE ALL ON TABLE data.prophesizer_meta FROM guest;

GRANT SELECT ON TABLE data.prophesizer_meta TO guest;

GRANT ALL ON TABLE data.prophesizer_meta TO postgres;



-- Table: data.stadium_modifications

-- DROP TABLE IF EXISTS data.stadium_modifications;

CREATE TABLE IF NOT EXISTS data.stadium_modifications
(
    id integer NOT NULL DEFAULT nextval('data.stadium_modifications_id_seq'::regclass),
    stadium_id character varying(36) COLLATE pg_catalog."default" NOT NULL,
    modification character varying COLLATE pg_catalog."default",
    level integer,
    valid_from timestamp without time zone,
    valid_until timestamp without time zone
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS data.stadium_modifications
    OWNER to postgres;

REVOKE ALL ON TABLE data.stadium_modifications FROM guest;

GRANT SELECT ON TABLE data.stadium_modifications TO guest;

GRANT ALL ON TABLE data.stadium_modifications TO postgres;

COMMENT ON TABLE data.stadium_modifications
    IS '2nd level table populated by Prophesizer.  Child of data.stadiums.';



-- Table: data.stadiums

-- DROP TABLE IF EXISTS data.stadiums;

CREATE TABLE IF NOT EXISTS data.stadiums
(
    id integer NOT NULL DEFAULT nextval('data.stadiums_id_seq'::regclass),
    stadium_id character varying(36) COLLATE pg_catalog."default" NOT NULL,
    hype numeric,
    name text COLLATE pg_catalog."default",
    birds integer,
    model integer,
    team_id character varying(36) COLLATE pg_catalog."default" NOT NULL,
    nickname text COLLATE pg_catalog."default",
    main_color character varying(10) COLLATE pg_catalog."default",
    secondary_color character varying(10) COLLATE pg_catalog."default",
    tertiary_color character varying(10) COLLATE pg_catalog."default",
    mysticism numeric,
    viscosity numeric,
    elongation numeric,
    obtuseness numeric,
    forwardness numeric,
    grandiosity numeric,
    ominousness numeric,
    fortification numeric,
    inconvenience numeric,
    luxuriousness numeric,
    valid_from timestamp without time zone,
    valid_until timestamp without time zone,
    hash uuid
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS data.stadiums
    OWNER to postgres;

REVOKE ALL ON TABLE data.stadiums FROM guest;

GRANT SELECT ON TABLE data.stadiums TO guest;

GRANT ALL ON TABLE data.stadiums TO postgres;

COMMENT ON TABLE data.stadiums
    IS 'Base table populated by Prophesizer.';


-- Table: data.subleagues

-- DROP TABLE IF EXISTS data.subleagues;

CREATE TABLE IF NOT EXISTS data.subleagues
(
    subleague_db_id integer NOT NULL DEFAULT nextval('data.subleagues_subleague_db_id_seq'::regclass),
    league_id character varying(36) COLLATE pg_catalog."default",
    subleague_id character varying(36) COLLATE pg_catalog."default",
    subleague_name character varying COLLATE pg_catalog."default",
    valid_from timestamp without time zone,
    valid_until timestamp without time zone
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS data.subleagues
    OWNER to postgres;

REVOKE ALL ON TABLE data.subleagues FROM guest;

GRANT SELECT ON TABLE data.subleagues TO guest;

GRANT ALL ON TABLE data.subleagues TO postgres;



-- Table: data.team_modifications

-- DROP TABLE IF EXISTS data.team_modifications;

CREATE TABLE IF NOT EXISTS data.team_modifications
(
    team_modifications_id integer NOT NULL DEFAULT nextval('data.team_modifications_team_modifications_id_seq'::regclass),
    team_id character varying COLLATE pg_catalog."default",
    modification character varying COLLATE pg_catalog."default",
    valid_from timestamp without time zone,
    valid_until timestamp without time zone,
    CONSTRAINT team_modifications_pkey PRIMARY KEY (team_modifications_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS data.team_modifications
    OWNER to postgres;

REVOKE ALL ON TABLE data.team_modifications FROM guest;

GRANT SELECT ON TABLE data.team_modifications TO guest;

GRANT ALL ON TABLE data.team_modifications TO postgres;

COMMENT ON TABLE data.team_modifications
    IS '2nd level table populated by Prophesizer.  Child of data.teams.';



-- Table: data.team_roster

-- DROP TABLE IF EXISTS data.team_roster;

CREATE TABLE IF NOT EXISTS data.team_roster
(
    team_roster_id integer NOT NULL DEFAULT nextval('data.team_positions_team_position_id_seq'::regclass),
    team_id character varying COLLATE pg_catalog."default",
    position_id integer,
    valid_from timestamp without time zone,
    valid_until timestamp without time zone,
    player_id character varying COLLATE pg_catalog."default",
    position_type_id numeric,
    tournament integer DEFAULT '-1'::integer,
    CONSTRAINT team_roster_pkey PRIMARY KEY (team_roster_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS data.team_roster
    OWNER to postgres;

REVOKE ALL ON TABLE data.team_roster FROM guest;

GRANT SELECT ON TABLE data.team_roster TO guest;

GRANT ALL ON TABLE data.team_roster TO postgres;

COMMENT ON TABLE data.team_roster
    IS '2nd level table populated by Prophesizer.  Child of data.players and data.teams.';
-- Index: team_roster_idx

-- DROP INDEX IF EXISTS data.team_roster_idx;

CREATE INDEX IF NOT EXISTS team_roster_idx
    ON data.team_roster USING btree
    (valid_until ASC NULLS FIRST, team_id COLLATE pg_catalog."default" ASC NULLS LAST, position_id ASC NULLS LAST, position_type_id ASC NULLS LAST)
    INCLUDE(team_id, position_id, valid_until, position_type_id)
    TABLESPACE pg_default;
-- Index: team_roster_indx_player_id_timespan

-- DROP INDEX IF EXISTS data.team_roster_indx_player_id_timespan;

CREATE INDEX IF NOT EXISTS team_roster_indx_player_id_timespan
    ON data.team_roster USING btree
    (player_id COLLATE pg_catalog."default" ASC NULLS LAST, valid_from ASC NULLS LAST, valid_until DESC NULLS FIRST)
    TABLESPACE pg_default;



-- Table: data.teams

-- DROP TABLE IF EXISTS data.teams;

CREATE TABLE IF NOT EXISTS data.teams
(
    id integer NOT NULL DEFAULT nextval('data.teams_id_seq'::regclass),
    team_id character varying(36) COLLATE pg_catalog."default",
    location text COLLATE pg_catalog."default",
    nickname text COLLATE pg_catalog."default",
    full_name text COLLATE pg_catalog."default",
    valid_from timestamp without time zone,
    valid_until timestamp without time zone,
    hash uuid,
    url_slug character varying COLLATE pg_catalog."default",
    card integer,
    stadium_id character varying(36) COLLATE pg_catalog."default" DEFAULT ''::character varying,
    team_abbreviation character varying(10) COLLATE pg_catalog."default" DEFAULT ''::character varying,
    team_main_color character varying(10) COLLATE pg_catalog."default" DEFAULT ''::character varying,
    team_secondary_color character varying(10) COLLATE pg_catalog."default" DEFAULT ''::character varying,
    team_emoji character varying COLLATE pg_catalog."default" DEFAULT ''::character varying,
    team_slogan character varying COLLATE pg_catalog."default" DEFAULT ''::character varying,
    deceased boolean NOT NULL DEFAULT false,
    CONSTRAINT teams_pkey PRIMARY KEY (id),
    CONSTRAINT teams_no_dupes UNIQUE (team_id, valid_from)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS data.teams
    OWNER to postgres;

REVOKE ALL ON TABLE data.teams FROM guest;

GRANT SELECT ON TABLE data.teams TO guest;

GRANT ALL ON TABLE data.teams TO postgres;

COMMENT ON TABLE data.teams
    IS 'Base table populated by Prophesizer.';

-- Trigger: team_insert

-- DROP TRIGGER IF EXISTS team_insert ON data.teams;

CREATE TRIGGER team_insert
    AFTER INSERT
    ON data.teams
    FOR EACH ROW
    EXECUTE FUNCTION data.team_slug_creation();



-- Table: data.time_map

-- DROP TABLE IF EXISTS data.time_map;

CREATE TABLE IF NOT EXISTS data.time_map
(
    season integer NOT NULL,
    day integer NOT NULL,
    first_time timestamp without time zone,
    time_map_id integer NOT NULL DEFAULT nextval('data.time_map_time_map_id_seq'::regclass),
    phase_id integer,
    CONSTRAINT time_map_pkey PRIMARY KEY (time_map_id),
    CONSTRAINT season_day_unique UNIQUE (season, day, phase_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS data.time_map
    OWNER to postgres;

REVOKE ALL ON TABLE data.time_map FROM guest;

GRANT SELECT ON TABLE data.time_map TO guest;

GRANT ALL ON TABLE data.time_map TO postgres;

COMMENT ON TABLE data.time_map
    IS 'Base table populated by Prophesizer.  Used to determine start/end times for games, phases, seasons.';