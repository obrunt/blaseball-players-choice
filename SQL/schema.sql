CREATE DATABASE blaseball;

CREATE TABLE players {
    id VARCHAR(30) NOT NULL PRIMARY KEY,
    name VARCHAR(30),
    batting INT,
    pitching INT,
    defense INT,
    running INT

}