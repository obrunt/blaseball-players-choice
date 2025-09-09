
export function calculateBattingRating(player) {
  return (
    (((1 - player.tragicness) * 0.01)) +
    (player.buoyancy * 0) +
    (player.thwackability * 0.35) +
    (player.moxie * 0.075) +
    (player.divinity * 0.35) +
    (player.musclitude * 0.075) +
    ((1 - player.patheticism) * 0.05) +
    (player.martyrdom * 0.02)
  );
};

export function calculatePitchingRating(player) {
  return (
    (player.shakespearianism * 0.1) +
    (player.suppression * 0) +
    (player.unthwackability * 0.5) +
    (player.coldness * 0.025) +
    (player.overpowerment * 0.15) +
    (player.ruthlessness * 0.4)
  );
};

export function calculateBaserunningRating(player) {
  return (
    (player.laserlikeness * 0.5) +
    (player.continuation * 0.1) +
    (player.baseThirst * 0.1) +
    (player.indulgence * 0.1) +
    (player.groundFriction * 0.1)
  );
};

export function calculateDefenseRating(player) {
  return (
    (player.omniscience * 0.2) +
    (player.tenaciousness * 0.2) +
    (player.watchfulness * 0.1) +
    (player.anticapitalism * 0.1) +
    (player.chasiness * 0.1)
  );
};

function ratingToStarsUnrounded(rating) {
  return rating * 5;
}

function ratingToStarsRounded(rating) {
  return Math.round(rating * 10) / 2;
}