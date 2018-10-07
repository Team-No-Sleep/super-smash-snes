//initialize player 1
var goku = null;

//initialize player 2
var ryu = null;

//tracks current fighter
var myFighter = null;

//  Variable that will hold the setInterval that runs the countdown
var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;

// Functions
// ======================
// On Click

//make handlers for click handlers for goku and ryu
function characterHandlers() {
    //add hover to goku
    $("#gokuImg").addClass("should-hover");

    //add hover to ryu
    $("#ryuImg").addClass("should-hover");

    //handles data deletion of player wins when player leaves
    database.ref("/wins/").onDisconnect().remove();

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

                //current fighter
                myFighter = "goku";
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

                //current fighter
                myFighter = "ryu";
            }
        );
    });
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

        //set timer
        maybeStartTimer();

        //update html
        $("#player1").text(goku);

    } else {

        //update html
        $("#player1").text("Player1");

        //reset game when goku is not present
        if (goku !== null) {
            //reset fight arena based on timer running out, declare a winner and don't reset arena
            resetFightArena("Goku Forfeits!", "ryu", true);
        }
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

        //set timer
        maybeStartTimer();

        //update html
        $("#player2").text(ryu);

    } else {

        //update html
        $("#player2").text("Player2");

        //reset game when ryu is not present
        if (ryu !== null) {
            //reset fight arena based on timer running out, declare a winner and don't reset arena
            resetFightArena("Ryu Forfeits!", "goku", true);
        }
    }

    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

//look out for both players to be in the game and start the timer
function maybeStartTimer() {
    //start timer
    if (ryu !== null && goku !== null) {
        //handles timer
        countdown.reset();
        countdown.start();
    }
}
//sets who won
database.ref("/wins/").on("value", function (snapshot) {
    //whenever win count changes the html gets updated
    console.log(snapshot.val());
    if (snapshot.val() === null) {
        return;
    }

    //update html
    $("#gokuWinCount").text(snapshot.val().goku);
    $("#ryuWinCount").text(snapshot.val().ryu);
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
function resetFightArena(message, winner, fullReset) {
    //reset characters values
    goku = null;
    ryu = null;

    //for testing
    console.log("winner: " + winner);

    //stop timer
    countdown.stop();

    //makes the current fighter still standing the winner
    if (myFighter === winner && !fullReset) {
        //read current value
        database.ref("/wins/").once("value").then(function (snapshot) {
            //holds current winner
            let tempWinner = winner;

            //for testing
            console.log("winner: " + winner);

            //holds current wins
            let tempWins = snapshot.val();

            //updates current wins for each player
            if (tempWins === null) {
                tempWins = {
                    goku: 0,
                    ryu: 0
                };
            }

            //wins are increased
            tempWins[winner] += 1;

            //update database
            database.ref("/wins/").update(tempWins);
        });

        //add user to leaderboard and update the number of times they have won
        database.ref("/leaderboard/" + userNameElement.textContent).transaction(function (currentValue) {
            //initialize current user data for the leaderboard
            let newValue = (currentValue || {
                count: 0,
                profilePicUrl: getProfilePicUrl()
            });

            // increment win count
            newValue.count++;

            //new leaderboard data
            return newValue;
        });
    }

    //removes win count for players
    if (fullReset) {
        database.ref("/wins/").remove();
    }

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
        //cancels onDisconnect Handler
        database.ref("/players/goku").onDisconnect().cancel();

        //cancels onDisconnect Handler
        database.ref("/players/ryu").onDisconnect().cancel();

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

        //show leaderboard data
        $("#leaderBoard").removeClass("d-none");

        //hide instructions
        $("#userInstructions").addClass("d-none");

        //hide leaderboard again
        setTimeout(function () {
            //show leaderboard data
            $("#leaderBoard").addClass("d-none");

            //hide instructions
            $("#userInstructions").removeClass("d-none");
        }, 5000);
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

            //figure out who the winner is
            let winner = "";

            if (curHitPointsGoku > curHitPointsRyu) {
                winner = "goku";
            } else if (curHitPointsGoku === curHitPointsRyu) {
                winner = null;
            } else {
                winner = "ryu";
            }
            //reset fight arena based on timer running out, declare a winner and don't reset arena
            resetFightArena("Time Up!", winner, false);
        }
    }
};

//sets leaderboard
database.ref("/leaderboard/").on("value", function (snapshot) {
    console.log(snapshot.val());

    //delete the leaderboard items
    $("#leaderBoardList").empty();

    //initialize leaderboard data
    let leaderBoardData = snapshot.val();

    //iterates over user object
    for (let user in leaderBoardData) {
        //make a list of users in the leaderboard
        $("#leaderBoardList").append("<li> <img class='userLeaderBoard img-fluid' src='" + leaderBoardData[user].profilePicUrl + "' /> " + user + " " + leaderBoardData[user].count + "</li>");
    }

});