const { pool } = require("../../../../config/db");


async function getStadiumMods(stadium_id){
      const query = `
    SELECT modification FROM data.stadium_modifications
    WHERE valid_until IS NULL
    AND stadium_id = ?
  `;

  try {
    const result = await pool.query(query, [stadium_id]);

    //Returns the mods
    return result[0];

  } catch (err){
    console.log(err);
  }
}

async function getStadiumStat(stat, stadium){
    //This is a basic generic function that just selects one stat from the stadium
    //Insead of haivng a large number of different calls just have the one

  const query = `
    SELECT ? FROM data.stadiums
    WHERE stadium_id = ?
    AND valid_until IS NULL
    LIMIT 1;
  `;

  try {
    const result = await pool.query(query, [stat, stadium]);

    //Returns the requested stat
    return result[0];

  } catch (err){
    console.log(err);
  }

}


module.exports = {
    getStadiumStat,
    getStadiumMods
}