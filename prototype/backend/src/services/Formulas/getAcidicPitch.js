const { getMultiplier } = require("getMultiplier");

const { getVibes, getPlayerStat, isFlinching } = require("../database/Reterive/fetchPlayerInfo");
const { fetchGameSeason, fetchGameDay } = require("../database/Reterive/fetchSeasonDayGames");
const { getGameStadium, getGameInning } = require("../database/Reterive/fetchGameInfo");
const { getStadiumStat } = require("../database/Reterive/fetchStadiumInfo");

function get_acidic_pitch(pitcher_id, pitcher_team, game_id){

}