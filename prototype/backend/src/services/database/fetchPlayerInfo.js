const { pool } = require("../../../../config/db");


async function getPlayerMods(player){
    //We want to get all the mods that the player has
    //This just calls the player mod table and returns the current mods

  const query = `
    SELECT modification FROM data.player_modifications
    WHERE player_id = ?
    AND valid_until IS NULL;
  `;

  try {
    const result = await pool.query(query, [player]);

    //Returns an array of modifications
    return result[0];

  } catch (err){
    console.log(err);
  }
}

async function getPlayerTeam(player_id){
  const query = `
    SELECT team_id FROM data.team_roster
    WHERE player_id = ?
    AND valid_until IS NULL;
  `;

  try {
    const result = await pool.query(query, [player_id, team_id]);

    //Returning the most recent team the player is attached to
    return result[0];

  } catch (err){
    console.log(err);
  }
}

async function getPlayerPosition(player_id, team_id){
  const query = `
    SELECT position_type_id FROM data.team_roster
    WHERE player_id = ?
    AND team_id = ?
    AND valid_until IS NULL;
  `;

  try {
    const result = await pool.query(query, [player_id, team_id]);

    //Returns the index
      //0 - batter
      //1 - pitcher
      //2:4 - shadow
    return result[0];

  } catch (err){
    console.log(err);
  }

}

async function getPlayerStat(stat, player){
    //This is a basic generic function that just selects one stat from the player
    //Insead of haivng a large number of different calls just have the one

  const query = `
    SELECT ? FROM data.players
    WHERE player_id = ?
    AND valid_until IS NULL
    LIMIT 1;
  `;

  try {
    const result = await pool.query(query, [stat, player]);

    //Returns the requested stat
    return result[0];

  } catch (err){
    console.log(err);
  }

}

async function getVibes(player, day){

    const buoyancy = await getPlayerStat('bouyancy', player);
    const pressurization = await getPlayerStat('pressurization', player);
    const cinnamon = await getPlayerStat('cinnamon', player);

    //This is the main fulctuation decider
        //It isn't know if this also needs to include pressurization and cinnamon
    const frequency = 6 + round(10 * buoyancy);

    //Have a fluctuation method to change from game to game
    const phase = Math.sin(Math.pi * (2 / frequency) * day + 0.5);

    //Have a circular phase
        //Pressurization defines the bottom of it
        //Cinnamon is the top of the vibes
    const vibes = 0.5 * ((phase - 1) * pressurization + (phase + 1) * cinnamon);

    return vibes;
}

async function isFlinching(player_id, game_id){

  const flinchQuery = `
  SELECT * FROM data.player_modifications
  WHERE valid_until IS NULL
  AND player_id = ?;
  `
  try {
    const result = await pool.query(flinchQuery, [player_id]);

    //IF the player doesn't have the flinch modification
      //They can't be flinching
    if (!result[0].includes('FLINCH')){
      return false;
    }
  } catch (err){
    console.log(err);
  }

  const strikeQuery = ` 
    SELECT strikes FROM data.game_events
    WHERE game_id = ?
    ORDER BY event_index DESC
    LIMIT 1;
  `;

  try {
    const result = await pool.query(strikeQuery, [game_id]);

    if (result[0] > 0){
      return false
    }
    return true;

  } catch (err){
    console.log(err);
  }
}


module.exports = {
  getVibes,
  getPlayerMods,
  getPlayerStat,
  getPlayerTeam,
  getPlayerPosition,
  isFlinching
};