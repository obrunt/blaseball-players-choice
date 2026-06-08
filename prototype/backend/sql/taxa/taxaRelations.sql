


CREATE TABLE taxa.team_additional_info (
    team_additional_info_id INT NOT NULL AUTO_INCREMENT,
    team_id VARCHAR(36),
    team_abbreviation VARCHAR(20),
    team_current_status VARCHAR(20),

    CONSTRAINT teams_id_fkey FOREIGN KEY (team_id)
        REFERENCES data.teams (team_id) MATCH SIMPLE
);



CREATE TABLE taxa.team_divine_favor (
    team_divine_favor_id INT NOT NULL AUTO_INCREMENT,
    team_id character varying,
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP,
    divine_favor INT
);


