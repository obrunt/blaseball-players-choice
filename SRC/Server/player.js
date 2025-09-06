function getPlayers(){
    fetch ("/database/players?id=a1a1a2")
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("_before_current").innerText = data;
      });
}


function calculateBattingRating(player) {
  return (
    Math.pow(1 - e.tragicness, 0.01) *
    Math.pow(e.buoyancy, 0) *
    Math.pow(e.thwackability, 0.35) *
    Math.pow(e.moxie, 0.075) *
    Math.pow(e.divinity, 0.35) *
    Math.pow(e.musclitude, 0.075) *
    Math.pow(1 - e.patheticism, 0.05) *
    Math.pow(e.martyrdom, 0.02)
  );
}

function calculatePitchingRating(player) {
  return (
    Math.pow(e.shakespearianism, 0.1) *
    Math.pow(e.suppression, 0) *
    Math.pow(e.unthwackability, 0.5) *
    Math.pow(e.coldness, 0.025) *
    Math.pow(e.overpowerment, 0.15) *
    Math.pow(e.ruthlessness, 0.4)
  );
}

function calculateBaserunningRating(player) {
  return (
    Math.pow(e.laserlikeness, 0.5) *
    Math.pow(e.continuation, 0.1) *
    Math.pow(e.baseThirst, 0.1) *
    Math.pow(e.indulgence, 0.1) *
    Math.pow(e.groundFriction, 0.1)
  );
}

function calculateDefenseRating(player) {
  return (
    Math.pow(e.omniscience, 0.2) *
    Math.pow(e.tenaciousness, 0.2) *
    Math.pow(e.watchfulness, 0.1) *
    Math.pow(e.anticapitalism, 0.1) *
    Math.pow(e.chasiness, 0.1)
  );
}

function ratingToStarsUnrounded(rating) {
  return rating * 5;
}

function ratingToStarsRounded(rating) {
  return Math.round(rating * 10) / 2;
}