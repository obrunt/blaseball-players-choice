


CREATE TABLE taxa.team_additional_info (
    team_additional_info_id integer NOT NULL,
    team_id character varying,
    team_abbreviation character varying,
    team_current_status character varying
);

COMMENT ON TABLE taxa.team_additional_info IS 'Data currently not parseable by dB team object. Team short names created by SIBR poll to teams.  Last update: 7/4/2021';

CREATE SEQUENCE taxa.team_additional_info_team_additional_info_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE taxa.team_additional_info_team_additional_info_id_seq OWNED BY taxa.team_additional_info.team_additional_info_id;


INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (1, '8d87c468-699a-47a8-b40d-cfb73a5660ad', 'CRAB', 'active');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (2, 'c73b705c-40ad-4633-a6ed-d357ee2e2bcf', 'LIFT', 'active');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (3, '878c1bf6-0d21-4659-bfee-916c8314d69c', 'TACO', 'active');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (4, '7fcb63bc-11f2-40b9-b465-f1d458692a63', NULL, 'tournament');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (5, 'e3f90fa1-0bbe-40df-88ce-578d0723a23b', NULL, 'tournament');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (6, 'a3ea6358-ce03-4f23-85f9-deb38cb81b20', NULL, 'tournament');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (7, 'f29d6e60-8fce-4ac6-8bc2-b5e3cabc5696', NULL, 'tournament');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (8, 'b63be8c2-576a-4d6e-8daf-814f8bcea96f', 'DALE', 'active');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (9, '3f8bbb15-61c0-4e3f-8e4a-907a5fb1565e', 'BOS', 'active');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (10, '36569151-a2fb-43c1-9df7-2df512424c82', 'NYM', 'active');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (11, 'eb67ae5e-c4bf-46ca-bbbc-425cd34182ff', 'CAN', 'active');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (12, '49181b72-7f1c-4f1c-929f-928d763ad7fb', NULL, 'tournament');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (13, '4d921519-410b-41e2-882e-9726a4e54a6a', NULL, 'tournament');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (14, 'bfd38797-8404-4b38-8b82-341da28b1f83', 'CHST', 'active');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (15, '7966eb04-efcc-499b-8f03-d13916330531', 'YELL', 'active');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (16, '9a5ab308-41f2-4889-a3c3-733b9aab806e', NULL, 'tournament');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (17, 'b3b9636a-f88a-47dc-a91d-86ecc79f9934', NULL, 'tournament');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (18, '3b0a289b-aebd-493c-bc11-96793e7216d5', NULL, 'tournament');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (19, 'd2634113-b650-47b9-ad95-673f8e28e687', NULL, 'tournament');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (20, 'b024e975-1c4a-4575-8936-a3754a08806a', 'STK', 'active');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (21, 'b72f3061-f573-40d7-832a-5ad475bd7909', 'LVRS', 'active');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (22, '979aee4a-6d80-4863-bf1c-ee1a78e06024', 'FRI', 'active');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (23, 'd8f82163-2e74-496b-8e4b-2ab35b2d3ff1', NULL, 'tournament');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (24, 'a7592bd7-1d3c-4ffb-8b3a-0b1e4bc321fd', NULL, 'tournament');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (25, '9e42c12a-7561-42a2-b2d0-7cf81a817a5e', NULL, 'tournament');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (26, '70eab4ab-6cb1-41e7-ac8b-1050ee12eecc', NULL, 'tournament');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (27, '4e5d0063-73b4-440a-b2d1-214a7345cf16', NULL, 'tournament');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (28, 'e8f7ffee-ec53-4fe0-8e87-ea8ff1d0b4a9', NULL, 'tournament');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (29, '23e4cbc1-e9cd-47fa-a35b-bfa06f726cb7', 'PIES', 'active');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (30, '105bc3ff-1320-4e37-8ef0-8d595cb95dd0', 'SEA', 'active');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (31, 'a37f9158-7f82-46bc-908c-c9e2dda7c33b', 'JAZZ', 'active');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (32, 'f02aeae2-5e6a-4098-9842-02d2273f25c7', 'HELL', 'active');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (33, 'ca3f1c8c-c025-4d8e-8eef-5be6accbeb16', 'CHI', 'active');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (34, 'c6c01051-cdd4-47d6-8a98-bb5b754f937f', 'STAR', 'disbanded');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (35, 'adc5b394-8f76-416d-9ce9-813706877b84', 'KCBM', 'active');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (36, '747b8e4a-7e50-4638-a973-ea7950a3e739', 'TGRS', 'active');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (37, '9debc64f-74b7-4ae1-a4d6-fce0144b6ea5', 'SPY', 'active');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (38, '57ec08cc-0411-4643-b304-0e80dbc15ac7', 'CDMX', 'active');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (39, '40b9ec2a-cb43-4dbb-b836-5accb62e7c20', 'PODS', 'disbanded');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (40, 'bb4a9de5-c924-4923-a0cb-9d1445f1ee5d', 'OHWO', 'active');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (41, '46358869-dce9-4a01-bfba-ac24fc56f57e', 'CORE', 'active');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (42, 'd9f89a8a-c563-493e-9d64-78e4f9a55d4a', 'ATL', 'active');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (43, 'd6a352fc-b675-40a0-864d-f4fd50aaeea0', 'CART', 'deceased');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (44, '9494152b-99f6-4adb-9573-f9e084bc813f', 'CLAB', 'deceased');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (45, '71c621eb-85dc-4bd7-a690-0c68c0e6fb90', 'DOG', 'disbanded');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (46, '54d0d0f2-16e0-42a0-9fff-79cfa7c4a157', 'ANT', 'deceased');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (47, '88151292-6c12-4fb8-b2d6-3e64821293b3', 'AL8', 'deceased');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (48, 'a4b23784-0132-4813-b300-f7449cb06493', 'PHO', 'disbanded');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (49, 'c19bb50b-9a22-4dd2-8200-bce639b1b239', 'TRK', 'deceased');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (50, '939db13f-79c9-41c5-9a15-b340b1bea875', 'BBB', 'disbanded');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (51, '3a094991-4cbc-4786-b74c-688876d243f4', 'RUN', 'deceased');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (52, '2e22beba-8e36-42ba-a8bf-975683c52b5f', 'CAR', 'deceased');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (53, 'b6b5df8f-5602-4883-b47d-07e77ed9d5af', 'LAR', 'deceased');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (54, '00245773-6f25-43b1-a863-42b4068888f0', 'LPL', 'disbanded');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (55, '1e04e5cc-80a6-41c0-af0d-7292817eed79', 'LOU', 'deceased');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (56, 'd0762a7e-004b-48a9-a832-a993982b305b', 'KELP', 'deceased');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (57, '3543229a-668c-4ac9-b64a-588422481f12', 'FINS', 'disbanded');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (58, '74966fbd-5d77-48b1-8075-9bf197583775', 'RHO', 'disbanded');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (59, '55c9fee3-79c8-4467-8dfb-ff1e340aae8c', 'COW', 'deceased');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (60, '53d473fb-ffee-4fd3-aa1c-671228adc592', 'AUB', 'disbanded');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (61, '1a51664e-efec-45fa-b0ba-06d04c344628', 'PSY', 'deceased');
    INSERT INTO taxa.team_additional_info (team_additional_info_id, team_id, team_abbreviation, team_current_status) VALUES (62, 'cbd44c06-231a-4d1a-bb7d-4170b06e566a', 'HRT', 'deceased');









CREATE TABLE taxa.player_incinerations_unrecorded (
    season integer,
    day integer,
    tournament integer,
    phase character varying,
    player_name character varying,
    player_id character varying(36) DEFAULT NULL::character varying
);


COMMENT ON TABLE taxa.player_incinerations_unrecorded IS 'Manually input data for pre-dB player incinerations.';

INSERT INTO taxa.player_incinerations_unrecorded (season, day, tournament, phase, player_name, player_id) VALUES (1, 87, -1, 'GAMEDAY', 'Aldon Anthony', NULL);
    INSERT INTO taxa.player_incinerations_unrecorded (season, day, tournament, phase, player_name, player_id) VALUES (1, 79, -1, 'GAMEDAY', 'Alexandria Dracaena', NULL);
    INSERT INTO taxa.player_incinerations_unrecorded (season, day, tournament, phase, player_name, player_id) VALUES (1, 92, -1, 'GAMEDAY', 'Cedric Gonzalez', NULL);
    INSERT INTO taxa.player_incinerations_unrecorded (season, day, tournament, phase, player_name, player_id) VALUES (1, 64, -1, 'GAMEDAY', 'Dickerson Greatness', NULL);
    INSERT INTO taxa.player_incinerations_unrecorded (season, day, tournament, phase, player_name, player_id) VALUES (1, 64, -1, 'GAMEDAY', 'Famous Oconnor', NULL);
    INSERT INTO taxa.player_incinerations_unrecorded (season, day, tournament, phase, player_name, player_id) VALUES (1, 12, -1, 'GAMEDAY', 'Fitzgerald Massey', NULL);
    INSERT INTO taxa.player_incinerations_unrecorded (season, day, tournament, phase, player_name, player_id) VALUES (1, 75, -1, 'GAMEDAY', 'Hurley Pacheco', NULL);
    INSERT INTO taxa.player_incinerations_unrecorded (season, day, tournament, phase, player_name, player_id) VALUES (1, 21, -1, 'GAMEDAY', 'Jenna Maldonado', NULL);
    INSERT INTO taxa.player_incinerations_unrecorded (season, day, tournament, phase, player_name, player_id) VALUES (1, 73, -1, 'GAMEDAY', 'Jessi Wise', NULL);
    INSERT INTO taxa.player_incinerations_unrecorded (season, day, tournament, phase, player_name, player_id) VALUES (1, 51, -1, 'GAMEDAY', 'Lars Mendoza', NULL);
    INSERT INTO taxa.player_incinerations_unrecorded (season, day, tournament, phase, player_name, player_id) VALUES (1, 24, -1, 'GAMEDAY', 'Nora Perez', NULL);
    INSERT INTO taxa.player_incinerations_unrecorded (season, day, tournament, phase, player_name, player_id) VALUES (1, 39, -1, 'GAMEDAY', 'Scrap Murphy', NULL);
    INSERT INTO taxa.player_incinerations_unrecorded (season, day, tournament, phase, player_name, player_id) VALUES (1, 63, -1, 'GAMEDAY', 'Sosa Elftower', NULL);
    INSERT INTO taxa.player_incinerations_unrecorded (season, day, tournament, phase, player_name, player_id) VALUES (1, 71, -1, 'GAMEDAY', 'Trevino Merritt', NULL);
    INSERT INTO taxa.player_incinerations_unrecorded (season, day, tournament, phase, player_name, player_id) VALUES (1, 23, -1, 'GAMEDAY', 'Tyreek Olive', NULL);
    INSERT INTO taxa.player_incinerations_unrecorded (season, day, tournament, phase, player_name, player_id) VALUES (1, 71, -1, 'GAMEDAY', 'Zi Delacruz', NULL);
    INSERT INTO taxa.player_incinerations_unrecorded (season, day, tournament, phase, player_name, player_id) VALUES (7, NULL, -1, 'ELECTIONS', 'Ron Monstera', '41949d4d-b151-4f46-8bf7-73119a48fac8');
    INSERT INTO taxa.player_incinerations_unrecorded (season, day, tournament, phase, player_name, player_id) VALUES (8, NULL, -1, 'ELECTIONS', 'August Mina', 'c17a4397-4dcc-440e-8c53-d897e971cae9');
    INSERT INTO taxa.player_incinerations_unrecorded (season, day, tournament, phase, player_name, player_id) VALUES (8, NULL, -1, 'ELECTIONS', 'Thomas Kirby', 'f73009c5-2ede-4dc4-b96d-84ba93c8a429');
    INSERT INTO taxa.player_incinerations_unrecorded (season, day, tournament, phase, player_name, player_id) VALUES (0, NULL, -1, 'ELECTIONS', 'Jaylen Hotdogfingers', '04e14d7b-5021-4250-a3cd-932ba8e0a889');









CREATE TABLE taxa.player_url_slugs (
    player_url_slug_id integer NOT NULL,
    player_id character varying,
    url_slug character varying,
    player_name character varying
);


COMMENT ON TABLE taxa.player_url_slugs IS 'Manually created unique player url slugs for initial Wyatt Masoning.';

CREATE SEQUENCE taxa.player_url_slugs_player_url_slug_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE taxa.player_url_slugs_player_url_slug_id_seq OWNED BY taxa.player_url_slugs.player_url_slug_id;


ALTER TABLE ONLY taxa.player_url_slugs ALTER COLUMN player_url_slug_id SET DEFAULT nextval('taxa.player_url_slugs_player_url_slug_id_seq');


INSERT INTO taxa.player_url_slugs (player_url_slug_id, player_id, url_slug, player_name) VALUES (2, '0bb35615-63f2-4492-80ec-b6b322dc5450', 'wyatt-mason-2', 'Wyatt Mason');
    INSERT INTO taxa.player_url_slugs (player_url_slug_id, player_id, url_slug, player_name) VALUES (3, '0d5300f6-0966-430f-903f-a4c2338abf00', 'wyatt-mason-3', 'Wyatt Mason');
    INSERT INTO taxa.player_url_slugs (player_url_slug_id, player_id, url_slug, player_name) VALUES (4, '21d52455-6c2c-4ee4-8673-ab46b4b926b4', 'wyatt-mason-4', 'Wyatt Mason');
    INSERT INTO taxa.player_url_slugs (player_url_slug_id, player_id, url_slug, player_name) VALUES (5, '27c68d7f-5e40-4afa-8b6f-9df47b79e7dd', 'wyatt-mason-5', 'Wyatt Mason');
    INSERT INTO taxa.player_url_slugs (player_url_slug_id, player_id, url_slug, player_name) VALUES (6, '5ca7e854-dc00-4955-9235-d7fcd732ddcf', 'wyatt-mason-6', 'Wyatt Mason');
    INSERT INTO taxa.player_url_slugs (player_url_slug_id, player_id, url_slug, player_name) VALUES (7, '63df8701-1871-4987-87d7-b55d4f1df2e9', 'wyatt-mason-7', 'Wyatt Mason');
    INSERT INTO taxa.player_url_slugs (player_url_slug_id, player_id, url_slug, player_name) VALUES (8, '75f9d874-5e69-438d-900d-a3fcb1d429b3', 'wyatt-mason-8', 'Wyatt Mason');
    INSERT INTO taxa.player_url_slugs (player_url_slug_id, player_id, url_slug, player_name) VALUES (9, 'a1ed3396-114a-40bc-9ff0-54d7e1ad1718', 'wyatt-mason-9', 'Wyatt Mason');
    INSERT INTO taxa.player_url_slugs (player_url_slug_id, player_id, url_slug, player_name) VALUES (10, 'bf6a24d1-4e89-4790-a4ba-eeb2870cbf6f', 'wyatt-mason-10', 'Wyatt Mason');
    INSERT INTO taxa.player_url_slugs (player_url_slug_id, player_id, url_slug, player_name) VALUES (11, 'e16c3f28-eecd-4571-be1a-606bbac36b2b', 'wyatt-mason-11', 'Wyatt Mason');
    INSERT INTO taxa.player_url_slugs (player_url_slug_id, player_id, url_slug, player_name) VALUES (12, 'e4034192-4dc6-4901-bb30-07fe3cf77b5e', 'wyatt-mason-12', 'Wyatt Mason');
    INSERT INTO taxa.player_url_slugs (player_url_slug_id, player_id, url_slug, player_name) VALUES (13, 'ea44bd36-65b4-4f3b-ac71-78d87a540b48', 'wyatt-mason-13', 'Wyatt Mason');
    INSERT INTO taxa.player_url_slugs (player_url_slug_id, player_id, url_slug, player_name) VALUES (14, 'f741dc01-2bae-4459-bfc0-f97536193eea', 'wyatt-mason-14', 'Wyatt Mason');
    INSERT INTO taxa.player_url_slugs (player_url_slug_id, player_id, url_slug, player_name) VALUES (15, '80e474a3-7d2b-431d-8192-2f1e27162607', 'wyatt-mason-15', 'Wyatt Mason');










CREATE TABLE taxa.team_divine_favor (
    team_divine_favor_id integer NOT NULL,
    team_id character varying,
    valid_from timestamp without time zone,
    valid_until timestamp without time zone,
    divine_favor integer
);

CREATE SEQUENCE taxa.team_divine_favor_team_divine_favor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE taxa.team_divine_favor_team_divine_favor_id_seq OWNED BY taxa.team_divine_favor.team_divine_favor_id;


ALTER TABLE ONLY taxa.team_divine_favor ALTER COLUMN team_divine_favor_id SET DEFAULT nextval('taxa.team_divine_favor_team_divine_favor_id_seq');


INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (1, 'b72f3061-f573-40d7-832a-5ad475bd7909', '2020-07-29 08:12:22.438', '2020-08-03 07:59:00', 1);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (2, '878c1bf6-0d21-4659-bfee-916c8314d69c', '2020-07-29 08:12:22.438', '2020-08-03 07:59:00', 2);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (3, 'b024e975-1c4a-4575-8936-a3754a08806a', '2020-07-29 08:12:22.438', '2020-08-03 07:59:00', 3);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (5, 'ca3f1c8c-c025-4d8e-8eef-5be6accbeb16', '2020-07-29 08:12:22.438', '2020-08-03 07:59:00', 5);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (6, 'bfd38797-8404-4b38-8b82-341da28b1f83', '2020-07-29 08:12:22.438', '2020-08-03 07:59:00', 6);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (7, '3f8bbb15-61c0-4e3f-8e4a-907a5fb1565e', '2020-07-29 08:12:22.438', '2020-08-03 07:59:00', 7);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (8, '979aee4a-6d80-4863-bf1c-ee1a78e06024', '2020-07-29 08:12:22.438', '2020-08-03 07:59:00', 8);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (9, '7966eb04-efcc-499b-8f03-d13916330531', '2020-07-29 08:12:22.438', '2020-08-03 07:59:00', 9);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (11, '8d87c468-699a-47a8-b40d-cfb73a5660ad', '2020-07-29 08:12:22.438', '2020-08-03 07:59:00', 11);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (12, '23e4cbc1-e9cd-47fa-a35b-bfa06f726cb7', '2020-07-29 08:12:22.438', '2020-08-03 07:59:00', 12);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (13, 'f02aeae2-5e6a-4098-9842-02d2273f25c7', '2020-07-29 08:12:22.438', '2020-08-03 07:59:00', 13);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (14, '57ec08cc-0411-4643-b304-0e80dbc15ac7', '2020-07-29 08:12:22.438', '2020-08-03 07:59:00', 14);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (15, '747b8e4a-7e50-4638-a973-ea7950a3e739', '2020-07-29 08:12:22.438', '2020-08-03 07:59:00', 15);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (16, 'eb67ae5e-c4bf-46ca-bbbc-425cd34182ff', '2020-07-29 08:12:22.438', '2020-08-03 07:59:00', 16);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (17, '9debc64f-74b7-4ae1-a4d6-fce0144b6ea5', '2020-07-29 08:12:22.438', '2020-08-03 07:59:00', 17);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (18, 'b63be8c2-576a-4d6e-8daf-814f8bcea96f', '2020-07-29 08:12:22.438', '2020-08-03 07:59:00', 18);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (19, '105bc3ff-1320-4e37-8ef0-8d595cb95dd0', '2020-07-29 08:12:22.438', '2020-08-03 07:59:00', 19);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (4, 'adc5b394-8f76-416d-9ce9-813706877b84', '2020-07-29 08:12:22.438', '2020-08-03 07:59:00', 4);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (10, '36569151-a2fb-43c1-9df7-2df512424c82', '2020-07-29 08:12:22.438', '2020-08-03 07:59:00', 10);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (20, 'a37f9158-7f82-46bc-908c-c9e2dda7c33b', '2020-07-29 08:12:22.438', '2020-08-03 07:59:00', 20);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (21, '23e4cbc1-e9cd-47fa-a35b-bfa06f726cb7', '2020-08-03 07:59:00', '2020-09-14 07:59:00', 1);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (41, 'b72f3061-f573-40d7-832a-5ad475bd7909', '2020-08-03 07:59:00', '2020-09-14 07:59:00', 2);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (42, '878c1bf6-0d21-4659-bfee-916c8314d69c', '2020-08-03 07:59:00', '2020-09-14 07:59:00', 3);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (43, 'b024e975-1c4a-4575-8936-a3754a08806a', '2020-08-03 07:59:00', '2020-09-14 07:59:00', 4);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (44, 'ca3f1c8c-c025-4d8e-8eef-5be6accbeb16', '2020-08-03 07:59:00', '2020-09-14 07:59:00', 6);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (45, 'bfd38797-8404-4b38-8b82-341da28b1f83', '2020-08-03 07:59:00', '2020-09-14 07:59:00', 7);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (46, '3f8bbb15-61c0-4e3f-8e4a-907a5fb1565e', '2020-08-03 07:59:00', '2020-09-14 07:59:00', 8);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (47, '979aee4a-6d80-4863-bf1c-ee1a78e06024', '2020-08-03 07:59:00', '2020-09-14 07:59:00', 9);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (48, '7966eb04-efcc-499b-8f03-d13916330531', '2020-08-03 07:59:00', '2020-09-14 07:59:00', 10);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (49, '8d87c468-699a-47a8-b40d-cfb73a5660ad', '2020-08-03 07:59:00', '2020-09-14 07:59:00', 12);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (50, 'f02aeae2-5e6a-4098-9842-02d2273f25c7', '2020-08-03 07:59:00', '2020-09-14 07:59:00', 13);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (51, '57ec08cc-0411-4643-b304-0e80dbc15ac7', '2020-08-03 07:59:00', '2020-09-14 07:59:00', 14);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (52, '747b8e4a-7e50-4638-a973-ea7950a3e739', '2020-08-03 07:59:00', '2020-09-14 07:59:00', 15);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (53, 'eb67ae5e-c4bf-46ca-bbbc-425cd34182ff', '2020-08-03 07:59:00', '2020-09-14 07:59:00', 16);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (54, '9debc64f-74b7-4ae1-a4d6-fce0144b6ea5', '2020-08-03 07:59:00', '2020-09-14 07:59:00', 17);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (55, 'b63be8c2-576a-4d6e-8daf-814f8bcea96f', '2020-08-03 07:59:00', '2020-09-14 07:59:00', 18);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (56, '105bc3ff-1320-4e37-8ef0-8d595cb95dd0', '2020-08-03 07:59:00', '2020-09-14 07:59:00', 19);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (57, 'adc5b394-8f76-416d-9ce9-813706877b84', '2020-08-03 07:59:00', '2020-09-14 07:59:00', 5);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (58, '36569151-a2fb-43c1-9df7-2df512424c82', '2020-08-03 07:59:00', '2020-09-14 07:59:00', 11);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (59, 'a37f9158-7f82-46bc-908c-c9e2dda7c33b', '2020-08-03 07:59:00', '2020-09-14 07:59:00', 20);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (60, 'ca3f1c8c-c025-4d8e-8eef-5be6accbeb16', '2020-09-14 07:59:00', '2020-09-26 10:29:31.561294', 1);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (61, 'a37f9158-7f82-46bc-908c-c9e2dda7c33b', '2020-09-14 07:59:00', '2020-09-26 10:29:31.561294', 2);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (62, 'b63be8c2-576a-4d6e-8daf-814f8bcea96f', '2020-09-14 07:59:00', '2020-09-26 10:29:31.561294', 3);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (63, '979aee4a-6d80-4863-bf1c-ee1a78e06024', '2020-09-14 07:59:00', '2020-09-26 10:29:31.561294', 4);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (64, 'bfd38797-8404-4b38-8b82-341da28b1f83', '2020-09-14 07:59:00', '2020-09-26 10:29:31.561294', 5);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (65, 'b72f3061-f573-40d7-832a-5ad475bd7909', '2020-09-14 07:59:00', '2020-09-26 10:29:31.561294', 6);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (66, '23e4cbc1-e9cd-47fa-a35b-bfa06f726cb7', '2020-09-14 07:59:00', '2020-09-26 10:29:31.561294', 7);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (67, '747b8e4a-7e50-4638-a973-ea7950a3e739', '2020-09-14 07:59:00', '2020-09-26 10:29:31.561294', 8);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (68, '105bc3ff-1320-4e37-8ef0-8d595cb95dd0', '2020-09-14 07:59:00', '2020-09-26 10:29:31.561294', 9);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (69, 'f02aeae2-5e6a-4098-9842-02d2273f25c7', '2020-09-14 07:59:00', '2020-09-26 10:29:31.561294', 10);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (70, '36569151-a2fb-43c1-9df7-2df512424c82', '2020-09-14 07:59:00', '2020-09-26 10:29:31.561294', 11);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (71, '9debc64f-74b7-4ae1-a4d6-fce0144b6ea5', '2020-09-14 07:59:00', '2020-09-26 10:29:31.561294', 12);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (72, 'adc5b394-8f76-416d-9ce9-813706877b84', '2020-09-14 07:59:00', '2020-09-26 10:29:31.561294', 13);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (73, '7966eb04-efcc-499b-8f03-d13916330531', '2020-09-14 07:59:00', '2020-09-26 10:29:31.561294', 14);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (74, 'b024e975-1c4a-4575-8936-a3754a08806a', '2020-09-14 07:59:00', '2020-09-26 10:29:31.561294', 15);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (75, '8d87c468-699a-47a8-b40d-cfb73a5660ad', '2020-09-14 07:59:00', '2020-09-26 10:29:31.561294', 16);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (76, '57ec08cc-0411-4643-b304-0e80dbc15ac7', '2020-09-14 07:59:00', '2020-09-26 10:29:31.561294', 17);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (77, '3f8bbb15-61c0-4e3f-8e4a-907a5fb1565e', '2020-09-14 07:59:00', '2020-09-26 10:29:31.561294', 18);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (78, 'eb67ae5e-c4bf-46ca-bbbc-425cd34182ff', '2020-09-14 07:59:00', '2020-09-26 10:29:31.561294', 19);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (79, '878c1bf6-0d21-4659-bfee-916c8314d69c', '2020-09-14 07:59:00', '2020-09-26 10:29:31.561294', 20);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (80, '878c1bf6-0d21-4659-bfee-916c8314d69c', '2020-09-26 10:30:06.338053', NULL, 1);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (81, 'b72f3061-f573-40d7-832a-5ad475bd7909', '2020-09-26 10:30:06.344018', NULL, 2);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (82, '979aee4a-6d80-4863-bf1c-ee1a78e06024', '2020-09-26 10:30:06.354634', NULL, 3);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (83, 'bfd38797-8404-4b38-8b82-341da28b1f83', '2020-09-26 10:30:06.360136', NULL, 4);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (84, 'adc5b394-8f76-416d-9ce9-813706877b84', '2020-09-26 10:30:06.3678', NULL, 5);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (85, '747b8e4a-7e50-4638-a973-ea7950a3e739', '2020-09-26 10:30:06.372765', NULL, 6);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (86, '7966eb04-efcc-499b-8f03-d13916330531', '2020-09-26 10:30:06.37793', NULL, 7);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (87, 'a37f9158-7f82-46bc-908c-c9e2dda7c33b', '2020-09-26 10:30:06.386655', NULL, 8);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (88, '23e4cbc1-e9cd-47fa-a35b-bfa06f726cb7', '2020-09-26 10:30:06.393127', NULL, 9);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (89, 'f02aeae2-5e6a-4098-9842-02d2273f25c7', '2020-09-26 10:30:06.401098', NULL, 10);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (90, 'b63be8c2-576a-4d6e-8daf-814f8bcea96f', '2020-09-26 10:30:06.406416', NULL, 11);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (91, '36569151-a2fb-43c1-9df7-2df512424c82', '2020-09-26 10:30:06.412655', NULL, 12);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (92, 'eb67ae5e-c4bf-46ca-bbbc-425cd34182ff', '2020-09-26 10:30:06.419253', NULL, 13);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (93, '3f8bbb15-61c0-4e3f-8e4a-907a5fb1565e', '2020-09-26 10:30:06.424344', NULL, 14);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (94, 'b024e975-1c4a-4575-8936-a3754a08806a', '2020-09-26 10:30:06.43123', NULL, 15);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (95, '105bc3ff-1320-4e37-8ef0-8d595cb95dd0', '2020-09-26 10:30:06.438918', NULL, 16);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (96, 'ca3f1c8c-c025-4d8e-8eef-5be6accbeb16', '2020-09-26 10:30:06.444359', NULL, 17);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (97, '8d87c468-699a-47a8-b40d-cfb73a5660ad', '2020-09-26 10:30:06.451267', NULL, 18);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (98, '57ec08cc-0411-4643-b304-0e80dbc15ac7', '2020-09-26 10:30:06.456357', NULL, 19);
    INSERT INTO taxa.team_divine_favor (team_divine_favor_id, team_id, valid_from, valid_until, divine_favor) VALUES (99, '9debc64f-74b7-4ae1-a4d6-fce0144b6ea5', '2020-09-26 10:30:06.46395', NULL, 20);







CREATE TABLE taxa.team_url_slugs (
    team_url_slug_id integer NOT NULL,
    team_id character varying,
    url_slug character varying,
    team_name character varying
);

COMMENT ON TABLE taxa.team_url_slugs IS 'Manually created to differentiate between multiple Artists/Crabs teams.  Last update: 6/25/2021';


CREATE SEQUENCE taxa.team_url_slugs_team_url_slug_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE taxa.team_url_slugs_team_url_slug_id_seq OWNED BY taxa.team_url_slugs.team_url_slug_id;


ALTER TABLE ONLY taxa.team_url_slugs ALTER COLUMN team_url_slug_id SET DEFAULT nextval('taxa.team_url_slugs_team_url_slug_id_seq');
