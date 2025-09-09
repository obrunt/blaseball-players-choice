
function getPlayers(){
    fetch ("/database/players?id=100000")
      .then((response) => response.json())
      .then((data) => {
        var display_text = "Batting: " + calculateBattingRating(data[0]) +"\n" +
                            "Pitching: " + calculateBattingRating(data[0]) +"\n" +
                            "Baserunning: " + calculateBattingRating(data[0]) +"\n" +
                            "Defence: " + calculateBattingRating(data[0]);
        console.log(data[0]);
        document.getElementById("_before_current").innerText = display_text;
      });
  
}

