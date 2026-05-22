

CREATE SCHEMA taxa;



CREATE TABLE taxa.event_types (
    event_type_id integer NOT NULL,
    event_type text,
    plate_appearance integer,
    at_bat integer,
    hit integer,
    total_bases integer,
    "out" integer
);


CREATE SEQUENCE taxa.event_types_event_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE taxa.event_types_event_type_id_seq OWNED BY taxa.event_types.event_type_id;

ALTER TABLE ONLY taxa.event_types ALTER COLUMN event_type_id SET DEFAULT nextval('taxa.event_types_event_type_id_seq');


ALTER TABLE ONLY taxa.event_types
    ADD CONSTRAINT event_types_event_type_key UNIQUE (event_type);

ALTER TABLE ONLY taxa.event_types
    ADD CONSTRAINT event_types_pkey PRIMARY KEY (event_type_id);

INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (1, 'BLACK_HOLE', 0, 0, 0, 0, 0);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (2, 'CAUGHT_STEALING', 0, 0, 0, 0, 1);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (3, 'CHARM_STRIKEOUT', 1, 1, 0, 0, 1);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (4, 'CHARM_WALK', 1, 0, 0, 1, 0);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (5, 'DOUBLE', 1, 1, 1, 2, 0);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (6, 'ELSEWHERE_ATBAT', 0, 0, 0, 0, 0);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (7, 'FIELDERS_CHOICE', 1, 1, 0, 0, 1);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (8, 'GAME_OVER', 0, 0, 0, 0, 0);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (9, 'HIT_BY_PITCH', 1, 0, 0, 1, 0);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (10, 'HOME_RUN', 1, 1, 1, 4, 0);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (11, 'HOME_RUN_5', 1, 1, 1, 5, 0);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (12, 'IMMATERIA_SWEPT', 0, 0, 0, 0, 0);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (13, 'MIND_TRICK_STRIKEOUT', 1, 1, 0, 0, 1);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (14, 'MIND_TRICK_WALK', 1, 0, 0, 1, 0);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (16, 'OUT', 1, 1, 0, 0, 1);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (18, 'QUADRUPLE', 1, 1, 1, 4, 0);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (19, 'SACRIFICE', 1, 0, 0, 0, 1);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (20, 'SECRET_BASE_ENTER', 0, 0, 0, 0, 0);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (21, 'SECRET_BASE_EXIT', 0, 0, 0, 0, 0);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (22, 'SHELLED_ATBAT', 0, 0, 0, 0, 0);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (23, 'SINGLE', 1, 1, 1, 1, 0);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (24, 'STOLEN_BASE', 0, 0, 0, 0, 0);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (25, 'STRIKEOUT', 1, 1, 0, 0, 1);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (26, 'SUN_2', 0, 0, 0, 0, 0);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (27, 'TRIPLE', 1, 1, 1, 3, 0);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (28, 'UNKNOWN', 0, 0, 0, 0, 0);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (29, 'UNKNOWN_OUT', 0, 0, 0, 0, 1);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (30, 'WALK', 1, 0, 0, 0, 0);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (31, 'WILD_PITCH', 0, 0, 0, 0, 0);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (32, 'INTENTIONAL_WALK', 1, 0, 0, 0, 0);
    INSERT INTO taxa.event_types (event_type_id, event_type, plate_appearance, at_bat, hit, total_bases, "out") VALUES (33, 'TUNNELS_STOLEN_RUN', 0, 0, 0, 0, 0);









CREATE TABLE taxa.tournament_teams (
    tournament_team_id integer NOT NULL,
    tournament_db_id integer,
    team_id character varying,
    valid_from timestamp without time zone,
    valid_until timestamp without time zone
);





CREATE TABLE taxa.blood (
    blood_id integer,
    blood_type character varying
);

COMMENT ON TABLE taxa.blood IS 'Used to label blood text on players_info_expanded_all.';


INSERT INTO taxa.blood (blood_id, blood_type) VALUES (0, 'A');
    INSERT INTO taxa.blood (blood_id, blood_type) VALUES (1, 'AAA');
    INSERT INTO taxa.blood (blood_id, blood_type) VALUES (2, 'AA');
    INSERT INTO taxa.blood (blood_id, blood_type) VALUES (3, 'Acidic');
    INSERT INTO taxa.blood (blood_id, blood_type) VALUES (4, 'Basic');
    INSERT INTO taxa.blood (blood_id, blood_type) VALUES (5, 'O');
    INSERT INTO taxa.blood (blood_id, blood_type) VALUES (6, 'O No');
    INSERT INTO taxa.blood (blood_id, blood_type) VALUES (7, 'H₂O');
    INSERT INTO taxa.blood (blood_id, blood_type) VALUES (8, 'Electric');
    INSERT INTO taxa.blood (blood_id, blood_type) VALUES (9, 'Love');
    INSERT INTO taxa.blood (blood_id, blood_type) VALUES (10, 'Fire');
    INSERT INTO taxa.blood (blood_id, blood_type) VALUES (11, 'Psychic');
    INSERT INTO taxa.blood (blood_id, blood_type) VALUES (12, 'Grass');






CREATE TABLE taxa.coffee (
    coffee_id integer,
    coffee_text character varying
);

COMMENT ON TABLE taxa.coffee IS 'Used to label coffee text on players_info_expanded_all.';


INSERT INTO taxa.coffee (coffee_id, coffee_text) VALUES (0, 'Black');
    INSERT INTO taxa.coffee (coffee_id, coffee_text) VALUES (1, 'Light & Sweet');
    INSERT INTO taxa.coffee (coffee_id, coffee_text) VALUES (2, 'Macchiato');
    INSERT INTO taxa.coffee (coffee_id, coffee_text) VALUES (3, 'Cream & Sugar');
    INSERT INTO taxa.coffee (coffee_id, coffee_text) VALUES (4, 'Cold Brew');
    INSERT INTO taxa.coffee (coffee_id, coffee_text) VALUES (5, 'Flat White');
    INSERT INTO taxa.coffee (coffee_id, coffee_text) VALUES (6, 'Americano');
    INSERT INTO taxa.coffee (coffee_id, coffee_text) VALUES (7, 'Espresso');
    INSERT INTO taxa.coffee (coffee_id, coffee_text) VALUES (8, 'Heavy Foam');
    INSERT INTO taxa.coffee (coffee_id, coffee_text) VALUES (9, 'Latte');
    INSERT INTO taxa.coffee (coffee_id, coffee_text) VALUES (10, 'Decaf');
    INSERT INTO taxa.coffee (coffee_id, coffee_text) VALUES (11, 'Milk Substitute');
    INSERT INTO taxa.coffee (coffee_id, coffee_text) VALUES (12, 'Plenty of Sugar');
    INSERT INTO taxa.coffee (coffee_id, coffee_text) VALUES (13, 'Anything');






CREATE TABLE taxa.position_types (
    position_type_id integer,
    position_type character varying
);

COMMENT ON TABLE taxa.position_types IS 'Used to label position_type text on players_info_expanded_all.';


INSERT INTO taxa.position_types (position_type_id, position_type) VALUES (0, 'BATTER');
    INSERT INTO taxa.position_types (position_type_id, position_type) VALUES (1, 'PITCHER');
    INSERT INTO taxa.position_types (position_type_id, position_type) VALUES (2, 'SHADOWS');
    INSERT INTO taxa.position_types (position_type_id, position_type) VALUES (3, 'SHADOWS');
    INSERT INTO taxa.position_types (position_type_id, position_type) VALUES (4, 'SHADOWS');






CREATE TABLE taxa.weather (
    weather_id integer,
    weather_text character varying
);


INSERT INTO taxa.weather (weather_id, weather_text) VALUES (0, 'Void');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (1, 'Sun 2');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (2, 'Overcast');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (3, 'Rainy');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (4, 'Sandstorm');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (5, 'Snowy');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (6, 'Acidic');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (7, 'Solar Eclipse');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (8, 'Glitter');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (9, 'Blooddrain');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (10, 'Peanuts');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (11, 'Birds');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (12, 'Feedback');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (13, 'Reverb');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (14, 'Black Hole');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (15, 'Coffee');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (16, 'Coffee 2');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (17, 'Coffee 3s');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (18, 'Flooding');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (19, 'Salmon');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (20, 'Polarity +');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (21, 'Polarity -');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (22, '???');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (23, 'Sun 90');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (24, 'Sun .1');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (25, 'Sum Sun');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (26, '???');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (27, '???');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (28, 'Jazz');
    INSERT INTO taxa.weather (weather_id, weather_text) VALUES (29, 'Night');




CREATE TABLE taxa.attributes (
    attribute_id integer NOT NULL,
    attribute character varying,
    attribute_desc character varying,
    attribute_category character varying,
    attribute_short character varying,
    attribute_datatype character varying,
    attribute_directionality character varying
);

COMMENT ON TABLE taxa.attributes IS 'Player attributes.  Descriptions determined over time by SIBR research.  IDs line up to stats value on items.';

CREATE SEQUENCE taxa.attributes_attribute_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE taxa.attributes_attribute_id_seq OWNED BY taxa.attributes.attribute_id;

ALTER TABLE ONLY taxa.attributes ALTER COLUMN attribute_id SET DEFAULT nextval('taxa.attributes_attribute_id_seq');

ALTER TABLE ONLY taxa.attributes
    ADD CONSTRAINT attributes_pkey PRIMARY KEY (attribute_id);

INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (9, 'base_thirst', 'Increases stolen base attempts.', 'baserunning', 'Bt', 'NUMERIC', 'larger');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (11, 'continuation', 'Whether the runner advances 1 or 2 bases on a hit. (also linked to indulgence somewhat).', 'baserunning', 'Cn', 'NUMERIC', 'larger');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (13, 'ground_friction', 'Appears to govern the rate of triples, slight negative correlation with doubles hit, possibly by stretching them into triples instead?', 'baserunning', 'G', 'NUMERIC', 'larger');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (12, 'indulgence', 'Seems to be related to runner advancement on an out (base advancement, scoring on a sacrifice), in concert with laserlikeness.', 'baserunning', 'I', 'NUMERIC', 'larger');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (10, 'laserlikeness', 'Steal success, steal attempts (correlation stronger than base_thirst); along with Indulgence, appears to impact runner advancement on outs (and may just be a general running speed/ability).', 'baserunning', 'L', 'NUMERIC', 'larger');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (4, 'divinity', 'Home run frequency.  Also part of Soulscream formula.', 'batting', 'Dv', 'NUMERIC', 'larger');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (7, 'martyrdom', 'Determines whether a runner advances or whether an out is a Fielder’s Choice.', 'batting', 'Mr', 'NUMERIC', 'larger');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (3, 'moxie', 'Ability to draw walks - (current theory is it represents some kind of plate discipline, as opposed to impacting the rate of pitcher balls).', 'batting', 'Mo', 'NUMERIC', 'larger');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (5, 'musclitude', 'Extra base hits (specifically seems to be for doubles), also appears to impact fouls.', 'batting', 'Ms', 'NUMERIC', 'larger');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (6, 'patheticism', 'Likelihood of the batter making contact with the ball; generally correlates with high strikeout rate.', 'batting', 'Pa', 'NUMERIC', 'smaller');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (2, 'thwackability', 'Quality of contact with the ball, reducing the chance of balls being fielded (probably in some kind of thwack vs unthwack contest).', 'batting', 'Tw', 'NUMERIC', 'larger');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (0, 'tragicness', 'Direct use unknown, but gets set to 0.1 at the start of seasons and upon siestas/delays etc throughout the season.  Also part of Soulscream formula.', 'batting', 'Tr', 'NUMERIC', 'smaller');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (24, 'anticapitalism', 'Related to steal attempts in some form.', 'defense', 'A', 'NUMERIC', 'larger');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (25, 'chasiness', 'Defensive ability to prevent extra base hits (by holding runners to first?)', 'defense', 'Ch', 'NUMERIC', 'larger');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (21, 'omniscience', 'Defensive odds on turning a batted ball into an out.', 'defense', 'Om', 'NUMERIC', 'larger');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (22, 'tenaciousness', 'Related to steal attempts in some form.', 'defense', 'Te', 'NUMERIC', 'larger');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (23, 'watchfulness', 'Reduces baserunner attempts to steal (impact on success rate not known).', 'defense', 'W', 'NUMERIC', 'larger');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (17, 'coldness', 'Unknown.', 'pitching', 'Co', 'NUMERIC', 'larger');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (18, 'overpowerment', 'Lowers home runs - seems to be involved in all hit types, potentially used to counter triples and doubles as well (likely by reducing the power of batted balls).', 'pitching', 'Ov', 'NUMERIC', 'larger');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (19, 'ruthlessness', 'Reduces walks and increases strikeouts - seems to essentially determine whether a given pitch is in or out of the strike zone.  Also part of Soulscream formula.', 'pitching', 'R', 'NUMERIC', 'larger');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (14, 'shakespearianism', '“is linked to Tragicness” for whatever use that is (basically none).  Also part of Soulscream formula.  The White Whale of attributes.', 'pitching', 'S', 'NUMERIC', 'larger');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (15, 'suppression', 'Appears to be opposed to Buoyancy and helps determine if a ball in play will become a groundout or a fly out.  Not part of pitching rating formula.', 'pitching', 'Su', 'NUMERIC', 'larger');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (16, 'unthwackability', 'Lowers hits allowed - reduces “quality” of batter contact, increasing likelihood of a ball being fielded .', 'pitching', 'Un', 'NUMERIC', 'larger');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (1, 'buoyancy', 'Determines frequency of curve in Vibes.', 'vibes', 'Bu', 'NUMERIC', 'larger');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (8, 'cinnamon', 'Determines maximum level of Vibes.', 'vibes', 'Ci', 'NUMERIC', 'larger');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (20, 'pressurization', 'Determines minimum level of Vibes.  Also part of Soulscream formula.', 'vibes', 'Pr', 'NUMERIC', 'larger');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (94, 'power', 'Grouping of musclitude, ground_friction, and divinity.', 'grouping', NULL, 'N/A', NULL);
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (95, 'speed', 'Grouping of musclitude, ground_friction, continuation, and laserlikeness.', 'grouping', NULL, 'N/A', NULL);
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (96, 'fate', 'Unknown; appears to re-roll for most (but not all) stat, modification or Feedback changes.', NULL, NULL, 'INTEGER', 'See taxonomy');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (97, 'peanut_allergy', 'Determines whether a peanut interaction affects player positively or negatively.', NULL, NULL, 'BOOLEAN', '');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (98, 'soul', 'Determines length of Soulscream/Soulsong; now has Consumer/eDensity/Redacted implications. Beware Chorby Soul.', NULL, NULL, 'INTEGER', 'See taxonomy');
    INSERT INTO taxa.attributes (attribute_id, attribute, attribute_desc, attribute_category, attribute_short, attribute_datatype, attribute_directionality) VALUES (99, 'total_fingers', 'Represents instances of change to pitching stats. Players impacted by general stat buffs all receive +1 finger, regardless of the size of their buff. EPT seems to not grant fingers.', NULL, NULL, 'INTEGER', 'See taxonomy');








CREATE TABLE taxa.card (
    card_id integer NOT NULL,
    card character varying,
    card_desc character varying
);


INSERT INTO taxa.card (card_id, card, card_desc) VALUES (0, 'I The Magician', NULL);
    INSERT INTO taxa.card (card_id, card, card_desc) VALUES (1, 'II The High Priestess', NULL);
    INSERT INTO taxa.card (card_id, card, card_desc) VALUES (2, 'III The Empress', NULL);
    INSERT INTO taxa.card (card_id, card, card_desc) VALUES (3, 'IIII The Emperor', NULL);
    INSERT INTO taxa.card (card_id, card, card_desc) VALUES (4, 'V The Pope', NULL);
    INSERT INTO taxa.card (card_id, card, card_desc) VALUES (5, 'VI The Lover ', NULL);
    INSERT INTO taxa.card (card_id, card, card_desc) VALUES (6, 'VII The Chariot', NULL);
    INSERT INTO taxa.card (card_id, card, card_desc) VALUES (7, 'VIII Justice', NULL);
    INSERT INTO taxa.card (card_id, card, card_desc) VALUES (8, 'VIIII The Hermit', NULL);
    INSERT INTO taxa.card (card_id, card, card_desc) VALUES (9, 'X The Wheel of Fortune', NULL);
    INSERT INTO taxa.card (card_id, card, card_desc) VALUES (10, 'XI Strength', NULL);
    INSERT INTO taxa.card (card_id, card, card_desc) VALUES (11, 'XII The Hanged Man', NULL);
    INSERT INTO taxa.card (card_id, card, card_desc) VALUES (12, 'XIII', NULL);
    INSERT INTO taxa.card (card_id, card, card_desc) VALUES (13, 'XIIII Temperance', NULL);
    INSERT INTO taxa.card (card_id, card, card_desc) VALUES (14, 'XV The Devil', NULL);
    INSERT INTO taxa.card (card_id, card, card_desc) VALUES (15, 'XVI The Tower', NULL);
    INSERT INTO taxa.card (card_id, card, card_desc) VALUES (16, 'XVII The Star', NULL);
    INSERT INTO taxa.card (card_id, card, card_desc) VALUES (17, 'XVIII The Moon', NULL);
    INSERT INTO taxa.card (card_id, card, card_desc) VALUES (18, 'XVIIII The Sun', NULL);
    INSERT INTO taxa.card (card_id, card, card_desc) VALUES (19, 'XX Judgment', NULL);


ALTER TABLE ONLY taxa.card
    ADD CONSTRAINT card_pkey PRIMARY KEY (card_id);






CREATE TABLE taxa.modifications (
    modification_db_id integer NOT NULL,
    modification character varying,
    color character varying,
    text_color character varying,
    background character varying,
    title character varying,
    description character varying,
    modification_entity character varying
);


COMMENT ON TABLE taxa.modifications IS 'Manually pulled on occasion from main.js.  Please note some of these Modifications may still be FK. Last update: 5/4/2021';


CREATE SEQUENCE taxa.modifications_modification_db_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE taxa.modifications_modification_db_id_seq OWNED BY taxa.modifications.modification_db_id;


ALTER TABLE ONLY taxa.modifications ALTER COLUMN modification_db_id SET DEFAULT nextval('taxa.modifications_modification_db_id_seq');


INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (1, 'EXTRA_STRIKE', '#f77c9f', '#f77c9f', '#8c1839', 'The Fourth Strike', 'Those with the Fourth Strike will get an extra strike in each at bat.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (2, 'SHAME_PIT', '#b96dbd', '#b96dbd', '#3d1539', 'Targeted Shame', 'Teams with Targeted Shame will start with negative runs the game after being shamed.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (3, 'HOME_FIELD', '#f9ff54', '#f9ff54', '#4f9c30', 'Home Field Advantage', 'Teams with Home Field Advantage will start each home game with one run.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (4, 'FIREPROOF', '#a5c5f0', '#a5c5f0', '#4c77b0', 'Fireproof', 'A Fireproof player can not be incinerated.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (5, 'ALTERNATE', '#fffd85', '#fffd85', '#404040', 'Alternate', 'This player is an Alternate...', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (6, 'SOUNDPROOF', '#c92080', '#c92080', '#000000', 'Soundproof', 'A Soundproof player can not be caught in Feedback''s reality flickers.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (7, 'SHELLED', '#fffd85', '#fffd85', '#404040', 'Shelled', 'A Shelled player is trapped in a big Peanut is unable to bat or pitch.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (8, 'REVERBERATING', '#61b3ff', '#61b3ff', '#756773', 'Reverberating', 'A Reverberating player has a small chance of batting again after each of their At-Bats end.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (9, 'BLOOD_DONOR', '#ff1f3c', '#ff1f3c', '#52050f', 'Blood Donor', 'In the Blood Bath, this team will donate Stars to a division opponent that finished behind them in the standings.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (10, 'BLOOD_THIEF', '#ff1f3c', '#ff1f3c', '#52050f', 'Blood Thief', 'In the Blood Bath, this team will steal Stars from a division opponent that finished ahead of them in the standings.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (11, 'BLOOD_PITY', '#ff1f3c', '#ff1f3c', '#52050f', 'Blood Pity', 'In the Blood Bath, this team must give Stars to the team that finished last in their division.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (12, 'BLOOD_WINNER', '#ff1f3c', '#ff1f3c', '#52050f', 'Blood Winner', 'In the Blood Bath, this team must give Stars to the team that finished first in their division.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (13, 'BLOOD_FAITH', '#ff1f3c', '#ff1f3c', '#52050f', 'Blood Faith', 'In the Blood Bath, this player will receive a small boost to a random stat.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (14, 'BLOOD_LAW', '#ff1f3c', '#ff1f3c', '#52050f', 'Blood Law', 'In the Blood Bath, this team will gain or lose Stars depending on how low or high they finish in their division.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (15, 'BLOOD_CHAOS', '#ff1f3c', '#ff1f3c', '#52050f', 'Blood Chaos', 'In the Blood Bath, each player on this team will gain or lose a random amount of Stars.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (16, 'RETURNED', '#fbff8a', '#fbff8a', '#1b1c80', 'Returned', 'This player has Returned from the void. At the end of each season, this player has a chance of being called back to the Void.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (17, 'INVERTED', '#d3d8de', '#d3d8de', '#38080d', 'Inverted', 'This player has Inverted.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (18, 'MARKED', '#eaabff', '#eaabff', '#1b1c80', 'Unstable', 'Unstable players have a much higher chance of being incinerated in a Solar Eclipse.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (19, 'PARTY_TIME', '#ff66f9', '#ff66f9', '#fff947', 'Party Time', 'This team is mathematically eliminated from the Postseason, and will occasionally receive permanent stats boost in their games.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (20, 'LIFE_OF_PARTY', '#fff45e', '#fff45e', '#9141ba', 'Life of the Party', 'This team gets 10% more from their Party Time stat boosts.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (21, 'DEBT_ZERO', '#ff1f3c', '#ff1f3c', '#1b1c80', 'Debt', 'This player must fulfill a debt.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (22, 'DEBT', '#ff1f3c', '#ff1f3c', '#363738', 'Refinanced Debt', 'This player must fulfill a debt.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (23, 'DEBT_TWO', '#ff1f3c', '#ff1f3c', '#612273', 'Consolidated Debt', 'This player must fulfill a debt.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (24, 'SPICY', '#9e0022', '#9e0022', '#d15700', 'Spicy', 'Spicy batters will be Red Hot when they get three consecutive hits.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (25, 'HEATING_UP', '#9e0022', '#9e0022', '#d15700', 'Heating Up...', 'This batter needs one more consecutive hit to enter Fire mode. This mod will disappear if the batter gets out.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (26, 'ON_FIRE', '#fff982', '#fff982', '#e32600', 'Red Hot!', 'Red Hot! This player''s batting is greatly boosted. This mod will disappear if the batter gets out.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (27, 'HONEY_ROASTED', '#ffda75', '#ffda75', '#b5831f', 'Honey Roasted', 'This player has been Honey-Roasted.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (28, 'FIRST_BORN', '#fffea8', '#fffea8', '#517063', 'First Born', 'This player was the first born from the New Field of Eggs.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (29, 'SUPERALLERGIC', '#bd224e', '#bd224e', '#45003d', 'Superallergic', 'This player is Superallergic', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (30, 'SUPERYUMMY', '#ffdb59', '#ffdb59', '#c96faa', 'Superyummy', 'This player seriously loves peanuts', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (31, 'EXTRA_BASE', '#d9d9d9', '#d9d9d9', '#4a001a', 'Fifth Base', 'This team must run five bases instead of four in order to score.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (32, 'BLESS_OFF', '#e0cafa', '#e0cafa', '#7d58a8', 'Bless Off', 'This team cannot win any Blessings in the upcoming Election.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (33, 'NON_IDOLIZED', '#fffaba', '#fffaba', '#540e43', 'Idol Immune', 'Idol Immune players cannot be Idolized by Fans.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (34, 'GRAVITY', '#759bc9', '#759bc9', '#4c5052', 'Gravity', 'This player cannot be affected by Reverb.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (35, 'ELECTRIC', '#fff199', '#fff199', '#04144a', 'Electric', 'Electric teams have a chance of zapping away Strikes.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (36, 'DOUBLE_PAYOUTS', '#fffaba', '#fffaba', '#786600', 'Super Idol', 'This player will earn Fans double the rewards from all Idol Snacks.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (37, 'FIRE_PROTECTOR', '#c4ff85', '#c4ff85', '#1f474f', 'Fire Protector', 'This player will protect their team from incinerations.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (38, 'RECEIVER', '#ff007b', '#ff007b', '#383838', 'Receiver', 'This player is a Receiver.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (39, 'FLICKERING', '#ff007b', '#ff007b', '#383838', 'Flickering', 'Flickering players have a much higher chance of being Feedbacked to their opponent.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (40, 'GROWTH', '#52a17b', '#52a17b', '#13422b', 'Growth', 'Growth teams will play better as the season goes on, up to a 5% global boost by season''s end.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (41, 'BASE_INSTINCTS', '#dedede', '#dedede', '#329c98', 'Base Instincts', 'Batters with Base Instincts will have a chance of heading past first base when getting walked.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (42, 'STABLE', '#91b5a3', '#91b5a3', '#335980', 'Stable', 'Stable players cannot be made Unstable.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (43, 'AFFINITY_FOR_CROWS', '#cb80d9', '#cb80d9', '#240c36', 'Affinity for Crows', 'Players with Affinity for Crows will hit and pitch 50% better during Birds weather.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (44, 'CURSE_OF_CROWS', '#915387', '#915387', '#3d2830', 'Curse of Crows', 'This team or player will be occasionally attacked by Birds.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (45, 'SQUIDDISH', '#5988ff', '#5988ff', '#163073', 'Squiddish', 'When a Squiddish player is incinerated, they''ll be replaced by a random Hall of Flame player.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (46, 'CRUNCHY', '#f5eb5d', '#f5eb5d', '#de8123', 'Crunchy', 'The Honey-Roasted players on a Crunchy team will hit 100% better and with +200% Power.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (47, 'PITY', '#ffffff', '#ffffff', '#000000', 'Pity', 'This team is holding back, out of Pity.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (48, 'GOD', '#ff4d90', '#ff4d90', '#fffc57', 'God', 'This team will start with 1,000x the amount of Team Spirit', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (49, 'REPEATING', '#61b3ff', '#61b3ff', '#3d5982', 'Repeating', 'In Reverb Weather, this player will Repeat.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (50, 'SUBJECTION', '#d16f6f', '#d16f6f', '#2e2f33', 'Subjection', 'Players leaving a team with Subjection will gain the Liberated modification.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (51, 'LIBERATED', '#90eb07', '#90eb07', '#07a1a3', 'Liberated', 'Liberated players will be guaranteed extra bases when they get a hit.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (52, 'FIRE_EATER', '#f50a31', '#f50a31', '#e3d514', 'Fire Eater', 'Fire Eaters swallow fire instead of being incinerated.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (53, 'MAGMATIC', '#e63200', '#e63200', '#6b0004', 'Magmatic', 'Magmatic players are guaranteed to hit a home run in their next At Bat.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (54, 'LOYALTY', '#ff61a5', '#ff61a5', '#2c1240', 'Loyalty', 'Players leaving a team with Loyalty will gain the Saboteur modification.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (55, 'SABOTEUR', '#6b6a6a', '#6b6a6a', '#240c36', 'Saboteur', 'A Saboteur has a chance of intentionally failing.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (56, 'CREDIT_TO_THE_TEAM', '#fffaba', '#fffaba', '#786600', 'Credit to the Team', 'This player will earn Fans 5x the rewards from all Idol Snacks.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (57, 'LOVE', '#ff2b6b', '#ff2b6b', '#732652', 'Charm', 'Players with Charm have a chance of convincing their opponents to fail.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (58, 'PEANUT_RAIN', '#fff199', '#fff199', '#04144a', 'Peanut Rain', 'This Team weaponizes Peanut weather against their enemies.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (59, 'FLINCH', '#219ccc', '#219ccc', '#5e5e5e', 'Flinch', 'Hitters with Flinch cannot swing until a strike has been thrown in the At Bat.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (60, 'WILD', '#219ccc', '#219ccc', '#361a57', 'Mild', 'Pitchers with Mild have a chance of throwing a Mild Pitch.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (61, 'DESTRUCTION', '#ff8a24', '#ff8a24', '#802d00', 'Destruction', 'Teams with Destruction will add a bunch of Curses to their Opponent when defeating them in battle.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (62, 'SIPHON', '#e30000', '#e30000', '#2b0000', 'Siphon', 'Siphons will steal blood more often in Blooddrain and use it in more ways.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (63, 'FLIICKERRRIIING', '#80fffb', '#80fffb', '#383838', 'Fliickerrriiing', 'Fliickerrriiing players are Flickering a lot.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (64, 'FRIEND_OF_CROWS', '#ff7ae7', '#ff7ae7', '#570026', 'Friend of Crows', 'In Birds weather, pitchers with Friend of Crows will encourage the Birds to attack hitters.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (65, 'BLASERUNNING', '#fffaa3', '#fffaa3', '#570026', 'Blaserunning', 'Blaserunners will score .2 Runs for their Team whenever they steal a base.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (66, 'WALK_IN_THE_PARK', '#faff9c', '#faff9c', '#275c2a', 'Walk in the Park', 'Those with Walk in the Park will walk to first base on one less Ball.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (67, 'BIRD_SEED', '#1e0036', '#dca8f7', '#dca8f7', 'Bird Seed', 'Birds like to eat Bird Seed. They''ll peck those with Bird Seed out of peanut shells more often. Because they like to eat Bird Seed.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (68, 'HAUNTED', '#b59c9c', '#b59c9c', '#1c1c1c', 'Haunted', 'Haunted players will occasionally be Inhabited.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (69, 'TRAVELING', '#cfebff', '#cfebff', '#1c1c1c', 'Traveling', 'Traveling teams will play 5% better in Away games.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (70, 'SEALANT', '#eded91', '#eded91', '#571f26', 'Sealant', 'Players with Sealant cannot have blood drained in Blooddrain.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (71, 'O_NO', '#cffff0', '#cffff0', '#485099', '0 No', 'Players with 0 No cannot be struck out when there are 0 Balls in the Count.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (72, 'FAIRNESS', '#12b300', '#12b300', '#ffdb0f', 'Total Fairness', 'This Season, each team will win only one Blessing, and will be Happy with what they get.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (73, 'ESCAPE', '#ffe521', '#ffe521', '#0d0d0d', 'Pending', 'The players on this Team are Pending...', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (74, 'UNFLAMED', '#eaabff', '#eaabff', '#1b1c80', 'Chaotic', 'The Unstable players on a Chaotic team will hit 100% better.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (75, 'TRIBUTE', '#dbce6e', '#dbce6e', '#362803', 'Tribute', 'When Hall of Flame players join this team, they''ll add their Tribute as Team Spirit.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (76, 'SQUIDDEST', '#e6eaeb', '#e6eaeb', '#163073', 'Squiddest', 'This Team is the Squiddest. When a player joins the Team, they''ll become Squiddish.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (77, 'CONTAINMENT', '#91ab91', '#91ab91', '#023802', 'Containment', 'When an Unstable player on this team is incinerated, the Instability cannot chain to their opponent.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (78, 'RETIRED', '#d3ede5', '#d3ede5', '#000e33', 'Released', '', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (79, 'RESTING', '#5988ff', '#5988ff', '#163073', 'Resting', '', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (80, 'INHABITING', '#b59c9c', '#b59c9c', '#1c1c1c', 'Inhabiting', 'This player is temporarily Inhabiting a Haunted player.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (81, 'WIRED', '#511c00', '#511c00', '#ffffff', 'Wired', 'When a Run scores, each Wired player involved in the play (the Scoring Baserunner, Current Batter, or Current Pitcher) will make the Run worth 0.5 more.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (82, 'TIRED', '#ffffff', '#ffffff', '#511c00', 'Tired', 'When a Run scores, each Tired player involved in the play (the Scoring Baserunner, Current Batter, or Current Pitcher) with make the Run worth 0.5 less.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (83, 'COFFEE_EXIT', '#e9c4ff', '#e9c4ff', '#96afd4', 'Percolated', 'This player has been fully and completely Percolated.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (84, 'COFFEE_SHADOWS', '#f0efaa', '#f0efaa', '#031736', 'Well Rested', 'Whenever a player on this team loses the Tired modification, they''ll swap with a player in the Shadows.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (85, 'HARD_BOILED', '#9a7b4f', '#9a7b4f', '#511c00', 'Hard Boiled', 'This player was boiled a little bit before hatching.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (86, 'COFFEE_PERIL', '#9a7b4f', '#9a7b4f', '#000000', 'Observed', 'This player is being Observed carefully...', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (87, 'COFFEE_RALLY', '#2e1406', '#fffcd9', '#44c97c', 'Free Refill', 'Good for one Free Refill.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (88, 'TRIPLE_THREAT', '#cc527a', '#cc527a', '#5dbcd2', 'Triple Threat', 'This pitcher''s strikeouts score Unruns when there are 3 runners on base, a runner on 3rd, or 3 Balls in the count. Each condition met is worth .3 Unruns. At the end of the 3rd Inning, there''s a 33.33% chance that this mod will disappear.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (89, 'PERK', '#be4fff', '#be4fff', '#96afd4', 'Perk', 'This player has been rewarded Percolated energy. They will Overperform in all Coffee weathers.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (90, 'OVERPERFORMING', '#32b528', '#32b528', '#000000', 'Overperforming', 'This player will play 20% better than usual.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (91, 'SHAME_GIVER', '#ff005d', '#ff005d', '#3d1539', 'Shame Donor', 'When this team shames their opponent, that opponent will begin their next game with Unruns.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (92, 'UNDERPERFORMING', '#db3616', '#db3616', '#000000', 'Underperforming', 'This player will play 20% worse than usual.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (93, 'EGO1', '#d1c252', '#d1c252', '#383000', 'Ego+', 'This player has a boosted Ego.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (94, 'EGO2', '#d6c965', '#d6c965', '#5e5100', 'Ego++', 'This player has a boosted boosted Ego.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (95, 'EGO3', '#e3d77f', '#e3d77f', '#857300', 'Ego+++', 'This player has a boosted boosted boosted Ego.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (96, 'EGO4', '#f5eba2', '#f5eba2', '#a89200', 'Ego++++', 'This player has a boosted boosted boosted boosted Ego.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (97, 'LEGENDARY', '#fff8c7', '#fff8c7', '#bfa600', 'Legendary', 'This player is Legendary.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (98, 'ELSEWHERE', '#bdb3c3', '#bdb3c3', '#ffffff', 'Elsewhere', 'This player is Elsewhere. They''ll find their own way back.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (99, 'BOTTOM_DWELLER', '#ffd7b0', '#ffd7b0', '#705336', 'Bottom Dweller', 'If this team finishes last in their division, they''ll be boosted up to 5%.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (100, 'CARCINIZATION', '#ff4258', '#ff4258', '#38040a', 'Carcinization', 'When the Crabs activate the Black Hole, they will steal the other team''s best hitter for the remainder of the game.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (101, 'MAINTENANCE_MODE', '#ffed63', '#ffed63', '#c25429', 'Maintenance Mode', 'Whenever a player on this team is Impaired, they''ll receive the Fourth Out for the remainder of the game.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (102, 'AMBUSH', '#ff2160', '#ff2160', '#0c000f', 'Ambush', 'When a player is incinerated in a game this team is playing, a Hall of Flame player will join their Shadows.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (103, 'UNDERSEA', '#c2e1ff', '#c2e1ff', '#34516e', 'Undersea', 'If this team ever has negative Runs, they''ll Overperform for the rest of the game.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (104, 'PENANCE', '#ca0000', '#ca0000', '#4a0000', 'Penance', 'This team will start each game by accepting 3 Unruns of penance.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (105, 'EXTRA_OUT', '#5ba3eb', '#5ba3eb', '#00254a', 'Fourth Out', 'This team plays with a Fourth Out.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (106, 'STUCK', '#b5bceb', '#b5bceb', '#5f1e61', 'Stuck', 'This player cannot swing.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (107, 'SWIM_BLADDER', '#fffd6e', '#fffd6e', '#0a6154', 'Flippers', 'When immateria floods, this Runner will score instead of being cleared from the Bases.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (108, 'DEBT_THREE', '#ff1f3c', '#ff1f3c', '#3b3217', 'Debt', 'This player must fulfill a Debt.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (109, 'ECHO', '#ffffff', '#ffffff', '#9c2c46', 'Echo', 'Echo Echo Echo Echo Echo Echo Echo Echo Echo Echo Echo Echo', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (110, 'STATIC', '#ffffff', '#ffffff', '#302a2f', 'Static', '.....', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (111, 'EARLBIRDS', '#ffc2f9', '#ffc2f9', '#0a8ef5', 'Earlbirds', 'This Team or Player will Overperform in the Earlseason.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (112, 'LATE_TO_PARTY', '#addbff', '#addbff', '#700065', 'Late to the Party', 'This Team or Player will Overperform in the Lateseason.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (113, 'OVERUNDER', '#ffffff', '#ffffff', '#000000', 'Over Under', 'Whenever this pitcher''s team has Over 5 Runs, they''ll Underperform.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (114, 'UNDEROVER', '#ffffff', '#ffffff', '#000000', 'Under Over', 'Whenever this player''s team has Under 5 Runs, they''ll Overperform.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (115, 'WANDERER', '#fffeeb', '#fffeeb', '#3f1e57', 'Roamin''', 'This player has a chance of Roamin'' to a new team at the end of each season.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (116, 'SUPERWANDERER', '#fcff54', '#fcff54', '#6b3c8c', 'Super Roamin''', 'This player has a high chance of Roamin'' to a new team at the end of each season.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (117, 'NEWADVENTURE', '#caffc7', '#caffc7', '#007da3', 'On an Odyssey', 'This player is boosted 5% every team they join a team.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (118, 'SINKING_SHIP', '#78befb', '#78befb', '#00250d', 'Sinking Ship', 'This team plays 1% worse for every player above 14 players on their roster, and 1% better for every player below 14 on their roster.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (119, 'PARASITE', '#e30000', '#e30000', '#2b0000', 'Parasite', 'When this pitcher strikes out a batter in Blooddrain, they''ll drain some blood from them.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (120, 'DEFECTOR', '#ffffff', '#ffffff', '#000000', 'Defector', '', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (121, 'HOMEBODY', '#8dadb5', '#8dadb5', '#032b12', 'Homebody', 'This player will Overperform when playing in their home Ballpark and Underperform otherwise.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (122, 'KILLER_PIES', '#ace8de', '#ace8de', '#3b524e', 'Flying Pie', 'Whenever this team has lost 3 games in a Row, their pitchers will start throwing Pies.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (123, 'FRESH', '#ffffff', '#ffffff', '#000000', 'Fresh', 'When a player joins this Team, they''ll be boosted by 2%.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (124, 'PARTING_GIFT', '#ffffff', '#ffffff', '#000000', 'Parting Gift', 'When a player leaves this Team, they''ll be boosted by 2%', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (125, 'BLOCKED_BOOST', '#ffffff', '#ffffff', '#000000', 'Blocked Boost', 'If this player is protected from a Steal or Swap Will, they''ll be boosted by 2%.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (126, 'HALL_EXIT_BOOST', '#ff943d', '#ff943d', '#163073', 'Phoenix', 'When this player exits the Hall of Flame, they''ll be boosted 10% to 20%.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (127, 'FLOOD_PUMPS', '#41feff', '#41feff', '#465f63', 'Flood Pumps', 'Flood Pumps will prevent Flooding weather from making your Ballpark filthier.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (128, 'POLAR_VORTEX', '#ffffff', '#ffffff', '#000000', 'Polar Vortex', '', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (129, 'SALMON_CANNONS', '#ffb0c6', '#ffb0c6', '#2a292e', 'Salmon Cannons', 'Salmon Cannons have a chance of expelling pests from your Ballpark.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (130, 'EVENT_HORIZON', '#ec49ff', '#ec49ff', '#160626', 'Event Horizon', 'The Event Horizon will prevent the first Black Hole activation in each game, converting the Overflow to Unruns for your opponent''s next game.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (131, 'SOUNDSYSTEM', '#4be397', '#4be397', '#330a2a', 'LCD Soundsystem', 'The LCD Soundsystem will boost both players involved in a Feedback swap by 5%.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (132, 'ECHO_CHAMBER', '#61b3ff', '#61b3ff', '#1f061b', 'Echo Chamber', 'In Reverb, Echo Chambers will occasionally provide Reverberating and Repeating modifications to players for game-long use.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (133, 'FIRE_INSURANCE', '#ff2e2e', '#ff2e2e', '#020324', 'Heat Magnet', 'The Heat Magnet will absorb heat from an incineration and pass it on to the Thermal Converter.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (134, 'PEANUT_MISTER', '#f3ff54', '#f3ff54', '#423519', 'Peanut Mister', 'A Peanut Mister will occasionally cure a player of their peanut allergy.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (135, 'BLOOD_LUSTER', '#ffffff', '#ffffff', '#000000', 'Blood Luster', '', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (136, 'BIRDHOUSES', '#d4ecff', '#d4ecff', '#0a8ef5', 'Birdhouses', 'Birdhouses invite Birds to come live in your Ballpark.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (137, 'SWEETENER', '#fffcad', '#fffcad', '#4a2f40', 'Sweetener', 'Sweetener makes Beanings & Free Refills more likely in Coffee & Coffee Two weathers, and lowers the chance of losing Triple Threat.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (138, 'SECRET_BASE', '#ffffff', '#ffffff', '#363335', 'Secret Base', 'The Secret Base is a hidden base beyond 2nd that allows a baserunner to hide between innings.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (139, 'HOOPS', '#ffffff', '#ffffff', '#000000', 'Hoops', '', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (140, 'GRIND_RAIL', '#a8a8a5', '#a8a8a5', '#43474a', 'Grind Rail', 'The Grind Rail allows a chance to steal directly from first base to third base, as long as they have the skills.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (141, 'CASINO_ZONE', '#ffffff', '#ffffff', '#000000', 'Casino Zone', '777', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (142, 'CATAPULTS', '#ffffff', '#ffffff', '#000000', 'Catapults', '', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (143, 'BIG_BUCKET', '#fffb82', '#fffb82', '#083a3b', 'Big Buckets', 'If a home run lands in a Big Bucket, it scores an extra Run.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (144, 'SMALL_BUCKET', '#ffe76b', '#ffe76b', '#673e00', 'Small Bucket', 'If a home run lands in a Small Bucket, it score 5 extra Runs.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (145, 'BUMPERS', '#ffffff', '#ffffff', '#000000', 'Bumpers', '', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (146, 'BULLPEN', '#ffffff', '#ffffff', '#000000', 'Bull Pen', '', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (147, 'SEARCHLIGHTS', '#ffffff', '#ffffff', '#000000', 'Searchlights', '', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (148, 'SECRET_TUNNELS', '#ffffff', '#ffffff', '#000000', 'Secret Tunnels', '', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (149, 'SOLAR_PANELS', '#fff896', '#fff896', '#b58004', 'Solar Panels', 'Solar Panels will prevent the first Sun 2 activation in each game, converting the Overflow to Runs for your Team''s next game.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (150, 'TEMP_STOLEN', '#ffffff', '#ffffff', '#000000', 'Temp Stolen', 'This player has been temporarily stolen.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (151, 'REDACTED', '#ffffff', '#ffffff', '#000000', 'Redacted', 'This player is Redacted.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (152, 'FUGITIVE', '#ffffff', '#ffffff', '#000000', 'Fugitive', '', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (153, 'BIG_RED_BUTTON', '#ffffff', '#ffffff', '#000000', 'Supercharged', 'When this Team hits a Grand Slam, reset the number of Outs to zero.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (154, 'BASE_DEALING', '#d297f9', '#a16dc3', '#180027', 'Base Dealing', 'This Team''s lineup will advance in reverse order.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (155, 'SMOOTH', '#8ae9ff', '#8ae9ff', '#423519', 'Smooth', 'This player will have 100% more Speed in Peanut weather.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (156, 'CHUNKY', '#ff9e08', '#ff9e08', '#423519', 'Chunky', 'This player will have 100% more Power in Peanut weather.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (157, 'SUN_KISSED', '#ffe100', '#ffe100', '#5c5d45', 'Sun Dialed', 'When this Team activates Sun 2, a random player on their Team will be boosted by 1%.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (158, 'UNHOLEY', '#ffffff', '#ffffff', '#863490', 'Unholey', 'When this Team activates the Black Hole, a random player on their opponent''s Team will be impaired by 1%.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (159, 'SUPERCHARGED', '#e6ff21', '#e6ff21', '#84072a', 'Supercharged', 'This Team will play 10% better after scoring 10+ Runs the Day before.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (160, 'HIGH_PRESSURE', '#fff912', '#fff912', '#465f63', 'High Pressure', 'This Team or Player will play 25% better in Flooding weather when runners are on base.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (161, 'SCATTERED', '#bdb3c3', '#bdb3c3', '#ffffff', 'Scattered', 'This Player returned from Elsewhere a bit Scattered.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (162, 'PATIENT', '#b3ffa6', '#b3ffa6', '#2b304f', 'Patient', 'This batter will never swing when there are 0 Strikes and are 1 Ball away from a Walk.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (163, 'HUNCH', '#ffffff', '#ffffff', '#453e30', 'Hunch', 'This player has a Hunch.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (164, 'UNCERTAIN', '#d285ff', '#d285ff', '#ffffff', 'Uncertain', 'When this Player returns from Elsewhere, they''ll be adjusted by -15% to +20%.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (165, 'MUNCHIES', '#ffffff', '#ffffff', '#000000', 'Munchies', '', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (166, 'DOUBLE_DOG', '#ffffff', '#ffffff', '#000000', 'Double-Dog', '', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (167, 'BLACKHOLE_PAYOUTS', '#ffffff', '#ffffff', '#863490', 'Jam-Packed', 'When this Team triggers the Black Hole, they''ll earn double payouts for all Wet Pretzel holders.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (168, 'SUN2_PAYOUTS', '#ffe100', '#ffe100', '#5c5d45', 'Glazed', 'When this Team activates Sun 2, they''ll earn double payouts for all Doughnut holders.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (169, 'POPCORN_PAYOUTS', '#fff8bd', '#fff8bd', '#d4223a', 'Buttered Up', 'This Team earns double payouts on Popcorn.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (170, 'STALEPOPCORN_PAYOUTS', '#bababa', '#bababa', '#7a0000', 'Over Salted', 'This Team earns double payouts on Stale Popcorn.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (171, 'MAXIMALIST', '#29ffd1', '#29ffd1', '#007a87', 'Maximalist', 'This Player plays 250% better at Maximum Blaseball.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (172, 'MINIMALIST', '#80bfb2', '#80bfb2', '#2f4e52', 'Minimalist', 'This Player plays 75% worse at Maximum Blaseball.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (173, 'FREE_WILL', '#ffffff', '#ffffff', '#9e0000', 'Free Will', 'This Team will receive an Extra Will in the upcoming Election.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (174, 'CUSTOM_HATCHED', '#ffffff', '#ffffff', '#000000', 'Custom Hatched', 'This Player was hatched via Bird Rights.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (175, 'FORCE', '#ffffff', '#ffffff', '#000000', 'Force', 'This Player is Forced into position. They cannot leave or move within this Team''s roster.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (176, 'PSYCHOACOUSTICS', '#ff007b', '#ff007b', '#ffd1f1', 'PsychoAcoustics', 'In Feedback or Reverb, PsychoAcoustics will occasionally Echo one of the Away Team''s mods to the Home Team, for game-long use.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (177, 'CRIME_SCENE', '#8a8099', '#8a8099', '#2a0b40', 'Crime Scene', 'When a Hard-Boiled Player plays at a Crime Scene, they''ll Investigate.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (178, 'AFTER_PARTY', '#aba9a4', '#aba9a4', '#450043', 'Afterparty', 'This Team will occasionally receive permanent stats boost in their games (outside of Party Time), but only while they''re losing.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (179, 'MIDDLING', '#809fff', '#809fff', '#002b0f', 'Middling', 'This Team or Player will Overperform in the Midseason.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (180, '0', '#cffff0', '#cffff0', '#904899', '0', 'Players with 0 will always swing at strikes while there are 0 Balls and 0 Strikes in the At Bat.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (181, 'H20', '#cffff0', '#cffff0', '#489699', 'H20', 'Players with H20 will always swing at strikes while there are 2 Outs.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (182, 'ATTRACTOR', '#96fdff', '#96fdff', '#2e0330', 'Attractor', 'When this player scores a Run, they''ll join the Shadows of the Team that scored them, if they''re not already on their roster.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (183, 'SCRAMBLED', '#9a7b4f', '#9a7b4f', '#511c00', 'Scrambled', 'This player is Scrambled.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (184, 'CAREFUL', '#fff39c', '#fff39c', '#ad4b00', 'Careful', 'This player''s Items will not be damaged by standard game actions.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (185, 'AMBITIOUS', '#ffcf0f', '#ffcf0f', '#247d7a', 'Ambitious', 'This Team or Player will Overperform in the Postseason.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (186, 'PRO_SKATER', '#4dbd8b', '#4dbd8b', '#1a385c', 'Pro Skater', 'This player cannot bail when using the Grind Rail.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (187, 'PSYCHIC', '#ff87ff', '#ff87ff', '#230747', 'Psychic', 'Psychic players have a chance of reversing a bad outcome with a Mind Trick.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (188, 'FIERY', '#ff995e', '#ff995e', '#940101', 'Fiery', 'Players with Fiery have a small chance of throwing Double Strikes.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (189, 'AAA', '#f1ffa3', '#f1ffa3', '#192400', 'Power Chaaarge', 'When this Player hits a Triple, they''ll have a chance of Overperforming for the rest of the game.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (190, 'UNAMBITIOUS', '#ada26d', '#ada26d', '#062e2d', 'Unambitious', 'This Team or player will Underperform in the Postseason.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (191, 'COASTING', '#809fff', '#809fff', '#4a152c', 'Coasting', 'This Team or player will Underperform in the Midseason.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (192, 'EAT_THE_RICH', '#f5d64e', '#f5d64e', '#911d00', 'Eat The Rich', 'At the end of each season, the Fans with the top 1% of Coins will have their funds redistributed throughout the 99%.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (193, 'WILD_CARDS', '#dda6ed', '#dda6ed', '#291633', 'Wild Cards', 'At the end of the regular season, 1 Wild Card will be drawn at random from the remaining teams in each Sub-League to receive a Postseason Birth.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (194, 'SIM_FREE_WILL', '#ffffff', '#ffffff', '#9e0000', 'Free Wills', 'The bottom four finishing Teams in the League will receive an extra Will in that season''s election.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (195, 'SIM_ALL_YOU_CAN_EAT', '#ffffff', '#ffffff', '#06293d', 'All You Can Eat', 'Fans are free to buy and discard Snack Slots in their Snack Pack. The number of Slots they have will determine their Payout Modifier for all Snacks. The less slots, the higher the Payout Modifier.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (196, 'SIM_BASED_EVOLUTION', '#ffffff', '#ffffff', '#254027', 'Based Evolution', 'Every Third Championship a Team wins will cause the Team and its Players to Evolve. Players that round the phylogenic Bases will get to go Home.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (197, 'SIM_PARTY_TIME', '#ff66f9', '#ff66f9', '#fff947', 'Party Time', 'A Team will enter Party Time if receiving 1 Win per remaining game would not land them in the Postseason. In Party Time, they''ll receive random Stat Boosts from Partying.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (198, 'FLOOD_BATH', '#5988ff', '#5988ff', '#163073', 'Flood Bath', 'When Runners on this Team are cleared via Flooding, they''ll become Slippery for the remainder of the game.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (199, 'SLIPPERY', '#5988ff', '#5988ff', '#163073', 'Slippery', 'When a Slippery baserunner scores, and first base is available, they''ll slide to first after scoring.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (200, 'HOTEL_MOTEL', '#fd73ff', '#fd73ff', '#fffd7a', 'Hotel Motel', 'The Hotel Motel will occasionally create Holiday Innings during the Earlseason, where you Party instead of Score.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (201, 'FAX_MACHINE', '#19002b', '#ffffff', '#8b5cad', 'Fax Machine', 'The Fax Machine will swap the Home Team''s pitcher for their best Shadows Pitcher whenever they''ve allowed 10+ Runs in a game.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (202, 'SIM_COMMUNITY_CHEST', '#ffffff', '#ffffff', '#40223e', 'Community Chest', 'Anytime 3000 Runs are accumulated league-wide, every Team will receive an Item Crate for a random active Player on their Team.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (203, 'ENTANGLED', '#4b0f69', '#d285ff', '#ffffff', 'Entangled', 'Whenever this Player would return from Elsewhere, their Alternate will return instead.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (204, 'OFFWORLD', '#fffca6', '#fffca6', '#54216e', 'Offworld', 'When this Player hits a foul ball, it will fly Offworld.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (205, 'ACIDIC', '#40ff89', '#40ff89', '#015437', 'Acidic', 'Acidic pitchers occasionally throw Acidic pitches, which cause any Runs scored on the play to be worth .1 less.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (206, 'AA', '#40f9ff', '#40f9ff', '#001f2e', 'Power Chaarge', 'When this Player hits a Double, they''ll have a chance of Overperforming for the rest of the game.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (207, 'SMITHY', '#ff6c3b', '#ff6c3b', '#414445', 'Smithy', 'The Smithy will occasionally repair Items for Players playing in this Ballpark.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (208, 'COVERUP', '#9de3de', '#9de3de', '#2b2a29', 'Cover Up', 'This Player is covering something up.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (209, 'REPLICA', '#ffb452', '#ffb452', '#30140d', 'Replica', 'This Player will fade to Dust at the end of the Season.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (210, 'DUST', '#ffb452', '#ffb452', '#30140d', 'Dust', 'This Player is waiting to be Dusted off.', NULL);
    INSERT INTO taxa.modifications (modification_db_id, modification, color, text_color, background, title, description, modification_entity) VALUES (211, 'RALLY', '#00ff51', '#00ff51', '#1a0112', 'Rally', 'This Team or Player will play 5% better when losing in the 7th inning or later.', NULL);






CREATE TABLE taxa.phases (
    phase_id integer,
    phase_type character varying,
    phase_type_id integer,
    valid_from timestamp without time zone,
    valid_until timestamp without time zone
);


INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (1, 'PRESEASON', 0, '2020-07-06 12:00:01', '2021-03-01 04:06:04');
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (2, 'GAMEDAY', 1, '2020-07-06 12:00:01', '2021-03-01 04:06:04');
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (3, 'SEASON_END', 2, '2020-07-06 12:00:01', '2021-03-01 04:06:04');
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (7, 'SEASON_END', 2, '2020-07-06 12:00:01', '2021-03-01 04:06:04');
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (4, 'POSTSEASON', 3, '2020-07-06 12:00:01', '2021-03-01 04:06:04');
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (10, 'POSTSEASON', 3, '2020-07-06 12:00:01', '2021-03-01 04:06:04');
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (11, 'POSTSEASON', 3, '2020-07-06 12:00:01', '2021-03-01 04:06:04');
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (9, 'BOSS_FIGHT', 4, '2020-07-06 12:00:01', '2021-03-01 04:06:04');
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (0, 'ELECTIONS', 5, '2020-07-06 12:00:01', '2021-03-01 04:06:04');
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (5, 'POSTSEASON_END', 5, '2020-07-06 12:00:01', '2021-03-01 04:06:04');
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (6, 'POSTSEASON_END', 5, '2020-07-06 12:00:01', '2021-03-01 04:06:04');
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (8, 'UNKNOWN_THE_OCHO', 99, '2020-07-06 12:00:01', '2021-03-01 04:06:04');
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (99, 'REST', 99, '2020-07-06 12:00:01', '2021-03-01 04:06:04');
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (12, 'TOURNAMENT_PRESEASON', 6, '2020-07-06 12:00:01', '2021-03-01 04:06:04');
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (13, 'TOURNAMENT_GAMEDAY', 7, '2020-07-06 12:00:01', '2021-03-01 04:06:04');
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (14, 'TOURNAMENT_GAMEDAY', 7, '2020-07-06 12:00:01', '2021-03-01 04:06:04');
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (15, 'TOURNAMENT_POSTSEASON', 8, '2020-07-06 12:00:01', '2021-03-01 04:06:04');
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (16, 'END_TOURNAMENT', 9, '2020-07-06 12:00:01', '2021-03-01 04:06:04');
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (0, 'REST', 99, '2021-03-01 04:06:05', NULL);
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (1, 'PRESEASON', 0, '2021-03-01 04:06:05', NULL);
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (2, 'EARLSEASON', 1, '2021-03-01 04:06:05', NULL);
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (3, 'EARLYSIESTA', 2, '2021-03-01 04:06:05', NULL);
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (4, 'MIDSEASON', 1, '2021-03-01 04:06:05', NULL);
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (5, 'LATESIESTA', 2, '2021-03-01 04:06:05', NULL);
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (6, 'LATESEASON', 1, '2021-03-01 04:06:05', NULL);
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (7, 'SEASON_END', 2, '2021-03-01 04:06:05', NULL);
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (8, 'PRE_POSTSEASON', 2, '2021-03-01 04:06:05', NULL);
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (9, 'EARLY_POSTSEASON', 3, '2021-03-01 04:06:05', NULL);
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (10, 'EARLY_POSTSEASON_END', 2, '2021-03-01 04:06:05', NULL);
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (11, 'POSTSEASON', 3, '2021-03-01 04:06:05', NULL);
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (12, 'POSTSEASON_END', 2, '2021-03-01 04:06:05', NULL);
    INSERT INTO taxa.phases (phase_id, phase_type, phase_type_id, valid_from, valid_until) VALUES (13, 'ELECTIONS', 5, '2021-03-01 04:06:05', NULL);






CREATE TABLE taxa.pitch_types (
    pitch_type character varying(1),
    pitch character varying,
    is_ball integer DEFAULT 0,
    is_strike integer DEFAULT 0
);

INSERT INTO taxa.pitch_types (pitch_type, pitch, is_ball, is_strike) VALUES ('F', 'Foul Ball', 0, 0);
    INSERT INTO taxa.pitch_types (pitch_type, pitch, is_ball, is_strike) VALUES ('X', 'Ball in play', 0, 0);
    INSERT INTO taxa.pitch_types (pitch_type, pitch, is_ball, is_strike) VALUES ('A', 'Ball - Assumed', 1, 0);
    INSERT INTO taxa.pitch_types (pitch_type, pitch, is_ball, is_strike) VALUES ('B', 'Ball', 1, 0);
    INSERT INTO taxa.pitch_types (pitch_type, pitch, is_ball, is_strike) VALUES ('C', 'Called Strike', 0, 1);
    INSERT INTO taxa.pitch_types (pitch_type, pitch, is_ball, is_strike) VALUES ('K', 'Strike - Assumed', 0, 1);
    INSERT INTO taxa.pitch_types (pitch_type, pitch, is_ball, is_strike) VALUES ('S', 'Swinging Strike', 0, 1);
    INSERT INTO taxa.pitch_types (pitch_type, pitch, is_ball, is_strike) VALUES ('D', 'Double Strike', 0, 2);














CREATE TABLE taxa.vibe_to_arrows (
    vibe_to_arrow_id integer NOT NULL,
    arrow_count integer,
    min_vibe numeric,
    max_vibe numeric
);

CREATE SEQUENCE taxa.vibe_to_arrows_vibe_to_arrow_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE taxa.vibe_to_arrows_vibe_to_arrow_id_seq OWNED BY taxa.vibe_to_arrows.vibe_to_arrow_id;

ALTER TABLE ONLY taxa.vibe_to_arrows ALTER COLUMN vibe_to_arrow_id SET DEFAULT nextval('taxa.vibe_to_arrows_vibe_to_arrow_id_seq');


INSERT INTO taxa.vibe_to_arrows (vibe_to_arrow_id, arrow_count, min_vibe, max_vibe) VALUES (1, 3, 0.8, 999);
    INSERT INTO taxa.vibe_to_arrows (vibe_to_arrow_id, arrow_count, min_vibe, max_vibe) VALUES (2, 2, 0.4, 0.8);
    INSERT INTO taxa.vibe_to_arrows (vibe_to_arrow_id, arrow_count, min_vibe, max_vibe) VALUES (3, 1, 0.1, 0.4);
    INSERT INTO taxa.vibe_to_arrows (vibe_to_arrow_id, arrow_count, min_vibe, max_vibe) VALUES (6, 0, -0.1, 0.1);
    INSERT INTO taxa.vibe_to_arrows (vibe_to_arrow_id, arrow_count, min_vibe, max_vibe) VALUES (7, -1, -0.4, -0.1);
    INSERT INTO taxa.vibe_to_arrows (vibe_to_arrow_id, arrow_count, min_vibe, max_vibe) VALUES (8, -2, -0.8, -0.4);
    INSERT INTO taxa.vibe_to_arrows (vibe_to_arrow_id, arrow_count, min_vibe, max_vibe) VALUES (9, 0, -999, -0.8);
