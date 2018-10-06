//set up/initialize global variables for winning/loosing the round (winCount, loseCount, player1BaseHealthPoints, player2BaseHealthPoints, player1CurrentHealthPoints, player2HealthPoints, player1AttackPoints, player2AttackPoints)

// //initialize characters attributes
// var characters = starterCharacters();

// //hols characters data
// function starterCharacters() {
//     //characters set
//     return [
//         {
//             //first character
//             name: "Goku",
//             charAttributes: {
//                 //current health points
//                 hPoints: 20000,
//                 //max health points
//                 maxHPoints: 20000,
//                 //attack points
//                 attackPwr: 800
//             },
//             //characters icon
//             img: "images/goku_hbi.png"
//         },
//         {
//             //second character
//             name: "Ryu",
//             charAttributes: {
//                 //current health points
//                 hPoints: 30000,
//                 //max health points
//                 maxHPoints: 30000,
//                 //attack points
//                 attackPwr: 800
//             },
//             //characters icon
//             img: "images/ryu_hbi.png"
//         }
//     ];
// }

//initialize player 1
var goku = null;

//initialize data for player1
var gokuData = null;

//reference to player 1
var initGoku = null;

//initialize player 2
var ryu = null;

//initialize data for player2
var ryuData = null;

//reference to player 2
var initRyu = null;

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
$(document).ready(function () {
    //$("#instructions").addClass("d-none");
});

// Functions
// ======================
// On Click

//make handlers for click handlers for goku and ryu
function characterHandlers() {
    $("#gokuImg").addClass("should-hover");
    $("#ryuImg").addClass("should-hover");

    //showcase goku info when the user clicks the character
    $("#gokuChar").on("click", function (event) {
        // Prevent the page from refreshing
        event.preventDefault();

        //check there is not already a player online
        database.ref("/players/goku").once("value").then(
            function (snapshot) {
                //check that no other player has chosen goku
                if (snapshot.val() !== null) {
                    return;
                }

                //handles player1 name selection
                goku = userNameElement.textContent;

                //update html
                $("#player1").text(goku);

                //hide instructions
                revealFigthingArena();

                //handles data deletion of player name when player leaves
                database.ref("/players/goku").onDisconnect().remove();

                //handles data deletion of keypad when player leaves
                database.ref("/keypad").onDisconnect().remove();

                //change what is saved in firebase
                database.ref("/players").update({
                    goku: goku
                });

                // Firebase is always watching for changes to the data on the character goku keypad.
                // When changes occurs it will print them to console and html
                database.ref("/keypad/ryu/").on("child_added", keyPadInputs, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });

                //make the fake function call the real function
                recordGokusKeyPad = recordGokusKeyPadReal;
            }
        );
    });

    //showcase ryu info when the user clicks the character
    $("#ryuChar").on("click", function (event) {
        // Prevent the page from refreshing
        event.preventDefault();
        //check there is not already a player online
        database.ref("/players/ryu").once("value").then(
            function (snapshot) {
                //check that no other player has chosen goku
                if (snapshot.val() !== null) {
                    return;
                }
                //handles player1 name selection
                ryu = userNameElement.textContent;

                //update html
                $("#player2").text(ryu);

                //hide instructions
                revealFigthingArena();

                //handles data deletion of player name when player leaves
                database.ref("/players/ryu").onDisconnect().remove();

                //handles data deletion of keypad when player leaves
                database.ref("/keypad").onDisconnect().remove();

                //change what is saved in firebase
                database.ref("/players").update({
                    ryu: ryu
                });

                // Firebase is always watching for changes to the data on the character goku keypad.
                // When changes occurs it will print them to console and html
                database.ref("/keypad/goku/").on("child_added", keyPadInputs, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });

                //make the fake function call the real function
                recordRyusKeyPad = recordRyusKeyPadReal;
            }
        );
    });
    //handles timer
    countdown.reset();
    countdown.start();
}
// Firebase is always watching for changes to the data on the character goku.
// When changes occurs it will print them to console and html
database.ref("/players/goku").on("value", function (snapshot) {

    // Print the initial data to the console.
    console.log(snapshot.val());

    //update local variables with database data
    if (snapshot.val() !== null) {
        //handles player1 name updates
        goku = snapshot.val();

        //update html
        $("#player1").text(goku);

    } else {
        //reset game when goku is not present
        if (goku !== null && ryu !== null) {
            //call reset
            resetFightArena("Goku Forfeits!");
        }

        //handles player1 name updates
        goku = null;

        //update html
        $("#player1").text("Player1");


    }
    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// Firebase is always watching for changes to the data on the character ryu.
// When changes occurs it will print them to console and html
database.ref("/players/ryu").on("value", function (snapshot) {

    // Print the initial data to the console.
    console.log(snapshot.val());

    //update local variables with database data
    if (snapshot.val() !== null) {
        //handles player2 name updates
        ryu = snapshot.val();

        //update html
        $("#player2").text(ryu);

    } else {
        //reset game when ryu is not present
        if (ryu !== null && goku !== null) {
            //call reset
            resetFightArena("Ryu Forfeits!");
        }

        //handles player2 name updates
        ryu = null;

        //update html
        $("#player2").text("Player2");

    }

    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

//show fighting arena
function revealFigthingArena() {
    //shows healthbar
    $("#healthBar").removeClass("d-none");

    //shows goku sprite
    $("#gokuSprite").removeClass("d-none");

    //shows ryu sprite
    $("#ryuSprite").removeClass("d-none");

    //hide instructions again
    $("#content").addClass("d-none");

    //remove keypad data
    database.ref("/keypad/").remove();
}

//records key ups
function recordGokusKeyPadReal(keyType, keyCode) {
    //change what is saved in firebase
    database.ref("/keypad/goku/").push({
        keyType: keyType,
        keyCode: keyCode
    });
}

//this is a fake function
function recordGokusKeyPad(keyType, keyCode) { }

//records keys
function recordRyusKeyPadReal(keyType, keyCode) {
    //change what is saved in firebase
    database.ref("/keypad/ryu/").push({
        keyType: keyType,
        keyCode: keyCode
    });
}

//this is a fake function
function recordRyusKeyPad(keyType, keyCode) { }

//receives key pad inputs
function keyPadInputs(snapshot) {
    // Print the initial data to the console.
    console.log(snapshot.val());

    // dispatch keyboard events
    document.dispatchEvent(new KeyboardEvent(snapshot.val().keyType, { 'keyCode': snapshot.val().keyCode }));
}

//reset function
function resetFightArena(message) {
    //showcase victories and forfeits messages
    $("#displayMessage").text(message);

    //unhide message area
    $("#displayMessage").removeClass("d-none");

    //remove healthbar
    $("#healthBar").addClass("d-none");

    //remove goku sprite
    $("#gokuSprite").addClass("d-none");

    //remove ryu sprite
    $("#ryuSprite").addClass("d-none");

    //remove instructions again
    $("#content").removeClass("d-none");

    //clear choices
    setTimeout(function () {
        //remove keypad data
        database.ref("/keypad/").remove();

        //remove players
        database.ref("/players/").remove();

        //reset game healthbars
        healthbar.resetGame();

        //reset goku's keypad
        recordGokusKeyPad = function () { };

        //reset ryu's keypad
        recordRyusKeyPad = function () { };

        //removes all callbacks for goku
        database.ref("/keypad/goku/").off();

        //removes all callbacks for ryu
        database.ref("/keypad/ryu/").off();

        //reset goku positioning
        $("#gokuSprite").removeAttr("style");

        //reset ryu positioning
        $("#ryuSprite").removeAttr("style");
    }, 5000);
}
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

        //if count <= 0 then the countdown has reached the end, declare a winner of the round and restart the counter
        if (countdown.time <= 0) {
            //stop countdown
            countdown.stop();

            //display the winner of the round
            //rightAndWrong();

            //delaying showing the winner of the round to the user and restart the round again
            //setTimeout(initGame, 2000);

            //keep track of the unanswered questions
            //countUnansweredAnswers++;

            //keep track of number of questions answered
            //countQuestion++;

        }
    }
};