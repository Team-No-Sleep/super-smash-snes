//set up/initialize global variables for winning/loosing the round (winCount, loseCount, player1BaseHealthPoints, player2BaseHealthPoints, player1CurrentHealthPoints, player2HealthPoints, player1AttackPoints, player2AttackPoints)

//initialize characters attributes
var characters = starterCharacters();

//hols characters data
function starterCharacters() {
  //characters set
  return [
    {
      //first character
      name: "Goku",
      charAttributes: {
        //current health points
        hPoints: 20000,
        //max health points
        maxHPoints: 20000,
        //attack points
        attackPwr: 800
      },
      //characters icon
      img: "images/goku_hbi.png"
    },
    {
      //second character
      name: "Ryu",
      charAttributes: {
        //current health points
        hPoints: 30000,
        //max health points
        maxHPoints: 30000,
        //attack points
        attackPwr: 800
      },
      //characters icon
      img: "images/ryu_hbi.png"
    }
  ];
}

//initialize player 1
var player1 = null;

//initialize data for player1
var player1Data = null;

//reference to player 1
var initPlayer1 = null;

//initialize player 2
var player2 = null;

//initialize data for player2
var player2Data = null;

//reference to player 2
var initPlayer2 = null;

//wins count
var winCount;

//loss count
var lossCount;

//player 1 attacks player2 the attack happens with attacks points reduces health points by the number of attack points then player2 attacks player 1 the same way therefore attack points reduces health points by the number of attack points.

//update/reduce health bars based on the attacks from player1 and player2

//start timer at 1 minute maybe? to signify/countdown the amount of time a round lasts

//function that resets the game once a round is finished, all the rounds have been played, when a player leaves and declare a forfeit too, when both players leave

//declare a winner of the round when the timer runs out based on who has the highest amount of health points left, or who stands with the highest amount of healthpoints if the timer has not run out yet

//declare a winner of the game if the either player win 3 rounds in a row

//loads jQuery after the document is already loaded
$(document).ready(function() {
  //$("#instructions").addClass("d-none");
});

// Functions
// ======================
// On Click

//showcase goku info when the user clicks the character
$("#gokuChar").on("click", function(event) {
  // Prevent the page from refreshing
  event.preventDefault();

  //shows healthbar
  $("#healthBar").removeClass("d-none");
  //shows goku sprite
  $("#gokuSprite").removeClass("d-none");
  //shows ryu sprite
  $("#ryuSprite").removeClass("d-none");

  //hide instructions again
  $("#content").addClass("d-none");
});

//showcase ryu info when the user clicks the character
$("#ryuChar").on("click", function(event) {
  // Prevent the page from refreshing
  event.preventDefault();

  //shows healthbar
  $("#healthBar").removeClass("d-none");
  //shows ryu sprite
  $("#ryuSprite").removeClass("d-none");
  //shows goku sprite
  $("#gokuSprite").removeClass("d-none");
  //hide instructions again
  $("#content").addClass("d-none");
});
