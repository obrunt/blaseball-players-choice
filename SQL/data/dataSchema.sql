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
    valid_from timestamp without time zone,
    valid_until timestamp without time zone,
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
    valid_from timestamp without time zone,
    valid_until timestamp without time zone,

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

