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

//  Variable that will hold the setInterval that runs the countdown
var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;

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
  if(userNameElement.textContent !== ""){
      let player1 = userNameElement.textContent;
  } else{
      let player1 = "Goku";
      let player2 = "Ryu";
      $("#player1").text(player1);
      $("#player2").text(player2);
      countdown.reset();
      countdown.start();
  }
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
  if(userNameElement.textContent !== ""){
    let player1 = userNameElement.textContent;
} else{
    let player1 = "Ryu";
    let player2 = "Goku"
    $("#player1").text(player2);
    $("#player2").text(player1);
}
  //shows healthbar
  $("#healthBar").removeClass("d-none");
  //shows ryu sprite
  $("#ryuSprite").removeClass("d-none");
  //shows goku sprite
  $("#gokuSprite").removeClass("d-none");
  //hide instructions again
  $("#content").addClass("d-none");
});
// coundown object
var countdown = {
    //countdown time initialized
    time: 59,

    //resets countdown
    reset: function () {
        //resets countdown time
        countdown.time = 59;

        //change the html to read the current countdown time
        $("#countDown").text("59");

    },
    //starts the countdown
    start: function () {
        // use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
            //start countdown
            intervalId = setInterval(countdown.count, 1000);

            //the countdown has started
            clockRunning = true;
        }
    },
    //stops countdown
    stop: function () {
        // use clearInterval to stop the count here and set the clock to not be running.
        //reset interval
        clearInterval(intervalId);

        //stop the countdown
        clockRunning = false;
    },
    //keep track of the countdown
    count: function () {
        // decrease time by 1
        countdown.time--;

        // update html with the current countdown
        $("#countDown").text(countdown.time);

        //if count <= 0 then the countdown has reached the end, show the right/wrong answers and restart the timer
        if (countdown.time <= 0) {
            //stop countdown
            countdown.stop();

            //display the right and wrong answers
            //rightAndWrong();

            //delaying showing the answer to the user and initialize the game again
            setTimeout(initGame, 2000);

            //keep track of the unanswered questions
            countUnansweredAnswers++;

            //keep track of number of questions answered
            countQuestion++;

        }
    }
};