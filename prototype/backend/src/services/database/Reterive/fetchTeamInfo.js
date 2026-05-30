const { pool } = require("../../../../config/db");

async function getTeamMods(team){
    //We want to get all the mods that the player has
    //This just calls the player mod table and returns the current mods

  const query = `
    SELECT modification FROM data.player_modifications
    WHERE player_id = ?
    AND valid_until IS NULL;
  `;

  try {
    const result = await pool.query(query, [team]);

    //Returns an array of modifications
    return result[0];

  } catch (err){
    console.log(err);
  }
}

async function getTeamActivePlayers(team){
    //Want to get all players ctive on the team that aren't in the shadows

  const query = `
    SELECT player_id FROM data.player_modifications
    WHERE (position_type_id = 0
    OR position_type_id = 1)
    AND team_id = ?
    AND valid_until IS NULL;
  `;

  try {
    const result = await pool.query(query, [team]);

    //Returns an array of player ids
    return result[0];

  } catch (err){
    console.log(err);
  }
}

module.exports = {
    getTeamMods,
    getTeamActivePlayers
}