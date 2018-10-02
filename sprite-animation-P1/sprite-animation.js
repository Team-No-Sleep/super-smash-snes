// This is from the '/sprite.js-master/tests/test.sprites.html file'
//I just kept deleting stuff until it gave one sprite to cycle through and make the sprite stay still
//For the sprite sheets, I just made a duplicate copy of the sheet (goku-sheet.png), then cropped the row of frames I wanted to animate

//Hope this eases the learning curve for us!!!

//This estabilishes the play space, gotta figure out how to set the background in the playspace
var scene = sjs.Scene({w:game_width, h:game_height});
var game_height = 400;
var game_width = 300;

//Establishes the sprite you want to animate
var sprite = scene.Sprite('./img/goku-move.png');

//This is the full size of one sprite frame
var gifSize = sprite.size(108, 115);


//I think we can use this function to eventually create a more complex character object to play with
scene.loadImages(sprite, function() {
    //This is to cycle through each frame. I used Gimp to identify the top left pixel corner of each frame
    var cycle = sjs.Cycle([
        //I'm making this the idle. The real idle is goku-idle.png, but it just looks like he's really eager to grope someone. 
        // Feel free to try making him for practice. Just swap the file names from the /img folder.
        [0, 0, 10],
        [110, 0, 10],
        [220, 0, 10],
        //these last three frames make him look like he's moving forward. Uncomment it to watch.
        // [330, 0, 10], 
        // [440, 0, 10],
        // [550, 0, 5],
    ]);
    //Applies the cycle to chosen sprite
    cycle.addSprites(sprite);

    //Chooses all types of animations to apply
    function animation() {
        //This tells is to run through the cycle repetitively, I think. Removing it just leaves one frame
        cycle.next();
        //uncomment sprite.move() to show it move, looks like it cuts off because sjs.Scene sets the game stage/level
        // sprite.move(1);

        //This is needed at the end to apply all of the chosen animation moves above it
        sprite.update();
    };

//This runs the entire thing but I havent figured out why or how. Just put it at the end lol
var ticker = scene.Ticker(animation);
ticker.run();
});


// ===========================================================================
// This is to show a cleaner version of the code without all of the comments!
// ===========================================================================

// // var scene = sjs.Scene({w:game_width, h:game_height});
// // var game_height = 400;
// // var game_width = 300;
// // var sprite = scene.Sprite('./img/goku-move.png');
// // var gifSize = sprite.size(108, 115);

// // scene.loadImages(sprite, function() {
// //     var cycle = sjs.Cycle([
// //         [0, 0, 10],
// //         [110, 0, 10],
// //         [220, 0, 10],
// //     ]);
// //     cycle.addSprites(sprite);

// //     function animation() {
// //         cycle.next();
// //         sprite.update();
// //     };
// // var ticker = scene.Ticker(animation);
// // ticker.run();
// // });