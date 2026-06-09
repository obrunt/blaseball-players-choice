

CREATE SCHEMA taxa;


#TODO: all of the values auto increment starting at 1
    #See if this will cause issues
        #It probably will

#TODO: see if this table is needed, the switch statement covers the event types
#It does mean that they're hardcoded into the program, but it makes the code a lot more readable when sending the events in the rollEvents file'

CREATE TABLE taxa.event_types (
    event_type_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    event_type VARCHAR(100),
    plate_appearance INT,
    at_bat INT,
    hit INT,
    total_bases INT,
    outs INT,
    
    CONSTRAINT event_types_event_type_key UNIQUE (event_type)
);





CREATE TABLE taxa.tournament_teams (
    tournament_team_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tournament_db_id INT,
    team_id VARCHAR(36),
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP
);





CREATE TABLE taxa.blood (
    blood_id INT NOT NULL PRIMARY KEY,
    blood_type VARCHAR(200)
);




CREATE TABLE taxa.coffee (
    coffee_id INT NOT NULL PRIMARY KEY,
    coffee_text VARCHAR(200)
);



CREATE TABLE taxa.position_types (
    position_type_id INT NOT NULL PRIMARY KEY,
    position_type VARCHAR(200)
);



CREATE TABLE taxa.weather (
    weather_id INT NOT NULL PRIMARY KEY,
    weather_text VARCHAR(200)
);


CREATE TABLE taxa.attributes (
    attribute_id INT NOT NULL PRIMARY KEY,
    attribute VARCHAR(100),
    attribute_desc VARCHAR(200),
    attribute_category VARCHAR(15),
    attribute_short VARCHAR(5),
    attribute_datatype VARCHAR(10),
    attribute_directionality VARCHAR(15)
);





CREATE TABLE taxa.card (
    card_id INT NOT NULL PRIMARY KEY,
    card VARCHAR(200),
    card_desc VARCHAR(200)
);


CREATE TABLE taxa.modifications (
    modification_db_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    modification VARCHAR(200),
    color VARCHAR(7),
    text_color VARCHAR(7),
    background VARCHAR(7),
    title VARCHAR(200),
    description VARCHAR(300),
    modification_entity VARCHAR(200)
);




CREATE TABLE taxa.phases (
    phase_id INT NOT NULL,
    phase_type VARCHAR(100),
    phase_type_id INT,
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP,
    CONSTRAINT active_phase_data UNIQUE (phase_id, valid_until) 
);


CREATE TABLE taxa.pitch_types (
    pitch_type VARCHAR(1) PRIMARY KEY,
    pitch VARCHAR(100),
    is_ball INT DEFAULT 0,
    is_strike INT DEFAULT 0
);




CREATE TABLE taxa.vibe_to_arrows (
    vibe_to_arrow_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    arrow_count INT,
    min_vibe FLOAT,
    max_vibe FLOAT
);
