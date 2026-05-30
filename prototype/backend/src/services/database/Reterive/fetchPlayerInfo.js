const { pool } = require("../../../../config/db");




async function getPlayerStat(stat, player){
    //This is a basic generic function that just selects one stat from the player
    //Insead of haivng a large number of different calls just have the one

  const query = `
    SELECT ? FROM data.players
    WHERE player_id = ?
    AND valid_until IS NOT NULL
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

function getVibes(player, day){

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



module.exports = {
    getVibes
};