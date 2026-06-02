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

async function getTeamActivePlayers(team_id){
    //Want to get all players active on the team that aren't in the shadows

  const query = `
    SELECT player_id FROM data.player_modifications
    WHERE (position_type_id = 0
    OR position_type_id = 1)
    AND team_id = ?
    AND valid_until IS NULL;
  `;

  try {
    const result = await pool.query(query, [team_id]);

    //Returns an array of player ids
    return result[0];

  } catch (err){
    console.log(err);
  }
}

async function getPositionRosterLength(team_id, position_type){
    //Getting the maximum index position from the team roster
 const query = `
    SELECT position_id FROM data.team_roster
    WHERE team_id = ?
    AND position_type_id = ?
    AND valid_until IS NULL
    ORDER BY position_id DESC
    LIMIT 1;
  `;

  try {
    const result = await pool.query(query, [team_id, position_type]);

    return result[0];

  } catch (err){
    console.log(err);
  }
}

async function getPlayerFromIndex(team_id, position_type, position_index){
   const query = `
    SELECT player_id FROM data.team_roster
    WHERE team_id = ?
    AND position_type_id = ?
    AND position_id = ?
    AND valid_until IS NULL
    LIMIT 1;
  `;

  try {
    const result = await pool.query(query, [team_id, position_type, position_index]);

    return result[0];

  } catch (err){
    console.log(err);
  }
}

async function getTeamCounts(team_id){
   const query = `
    SELECT modification FROM data.team_roster
    WHERE team_id = ?
    AND valid_until IS NULL
    LIMIT 1;
  `;

  try {
    const result = await pool.query(query, [team_id]);

    let params = {
      balls: 4,
      strikes: 3,
      outs: 3,
      bases: 4
    };

    if(result.includes("EXTRA_STRIKE")){
      params.strikes += 1;
    }

    if(result.includes("EXTRA_BASE")){
      params.bases += 1;
    }

    if(result.includes("EXTRA_OUT")){
      params.outs += 1;
    }

    if(result.includes("WALK_IN_THE_PARK")){
      params.balls -= 1;
    }
    
    return params;

  } catch (err){
    console.log(err);
  }
}

module.exports = {
    getTeamMods,
    getTeamCounts,
    
    getTeamActivePlayers,
    getPositionRosterLength,
    getPlayerFromIndex
}