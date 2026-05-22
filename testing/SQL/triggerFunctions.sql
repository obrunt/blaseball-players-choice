
-- FUNCTION: data.player_slug_creation()

-- DROP FUNCTION IF EXISTS data.player_slug_creation();

CREATE OR REPLACE FUNCTION data.player_slug_creation()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
	
	update data.players set url_slug = 'pitching-machine-2' WHERE player_id = '5d063a91-31b3-4688-97a7-e34a7181da30';
	update data.players set url_slug = replace(regexp_replace(lower(unaccent(replace(new.player_name,',',' comma'))), '[^A-Za-z'' ]', '','g'),' ','-')
		WHERE coalesce(url_slug,'') = '';
		
	return new;

END;
$BODY$;

ALTER FUNCTION data.player_slug_creation()
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION data.player_slug_creation() TO PUBLIC;

GRANT EXECUTE ON FUNCTION data.player_slug_creation() TO guest;

GRANT EXECUTE ON FUNCTION data.player_slug_creation() TO postgres;





-- FUNCTION: data.team_slug_creation()

-- DROP FUNCTION IF EXISTS data.team_slug_creation();

CREATE OR REPLACE FUNCTION data.team_slug_creation()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
	
	update data.teams set url_slug = 'crabs-2' WHERE team_id = '9494152b-99f6-4adb-9573-f9e084bc813f';
	update data.teams set url_slug = 'artists-2' WHERE team_id = 'd6a352fc-b675-40a0-864d-f4fd50aaeea0'; 
	update data.teams set url_slug = replace(regexp_replace(lower(unaccent(replace(new.nickname,'&','and'))), '[^A-Za-z'' ]', '','g'),' ','-')
		WHERE coalesce(url_slug,'') = '';
		
	return new;
	
END;
$BODY$;

ALTER FUNCTION data.team_slug_creation()
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION data.team_slug_creation() TO PUBLIC;

GRANT EXECUTE ON FUNCTION data.team_slug_creation() TO guest;

GRANT EXECUTE ON FUNCTION data.team_slug_creation() TO postgres;

