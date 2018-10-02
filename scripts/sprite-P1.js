
var scene = sjs.Scene({w:game_width, h:game_height});
var game_height = 400;
var game_width = 300;
var gokuSprite = scene.Sprite('./img/goku-sheet.png');
var gokuSize = gokuSprite.size(108, 115);
var plateforms = [];
var input = scene.Input();
var xVelocity = -1, yVelocity = 0;


scene.loadImages(gokuSprite, function() {
    var gokuIdle = sjs.Cycle([
        [2, 583, 15],
        [112, 583, 15],
        [222, 583, 15],
    ]);
    gokuIdle.addSprites(gokuSprite);

    var gokuWalk = sjs.Cycle([
        [2, 583, 4],
        [112, 583, 4],
        [222, 583, 4],
        [330, 583, 4], 
        [440, 583, 4],   
        [550, 583, 4],
    ]);
    gokuWalk.addSprites(gokuSprite);

    var gokuKick = sjs.Cycle([
        [0, 3223, 5],
        [160, 3223, 5],
        [330, 3223, 5],
        [500, 3223, 5], 
        [660, 3223, 5],
        [840, 3223, 5],
    ]);
    gokuKick.addSprites(gokuSprite);

    // var gokuPunch = sjs.Cycle([
    //     [10, 3535, 5],
    //     [160, 3535, 5],
    //     [300, 3535, 5],
    //     [450, 3535, 5], 
    //     [600, 3535, 5],
    //     [750, 3535, 5],
    // ]);
    // gokuPunch.addSprites(gokuSprite);


    var gokuJump = sjs.Cycle([
        [0, 1065, 5],
        [110, 1065, 5],
        [210, 1065, 5],
        [310, 1065, 5], 
        [410, 1065, 5],
        [520, 1065, 5],
        [630, 1065, 5],
        [750, 1065, 5],
    ]);
    // gokuJump.addSprites(gokuSprite);

    function animation() {
        //Walking
        var x = gokuSprite.x + gokuSprite.w;
        var y = gokuSprite.y + gokuSprite.h;
        var hasWallContact = y > window.innerHeight;

        if(!hasWallContact) {
            for(var i=0; i < plateforms.length; i++) {
                hasWallContact = plateforms.isPointIn(x, y);
            }
        }

        if(!input.keyboard.left && !input.keyboard.right)
            xVelocity = xVelocity / 2;

        if(input.keyboard.left) {
            gokuSprite.size(108, 115);
            gokuWalk.next(false)
            xVelocity = Math.max(-1.5, xVelocity-3);
            gokuSprite.scale(1, 1);
        }
        if(input.keyboard.right) {
            gokuSprite.size(108, 115);
            gokuWalk.next();
            xVelocity = Math.min(1.5, xVelocity+3);
            gokuSprite.scale(-1, 1);
        }

        gokuSprite.move(xVelocity, yVelocity);
        if(gokuSprite.x < 0)
            gokuSprite.setX(0);
        if(gokuSprite.x > game_width - 120)
            gokuSprite.setX(game_width - 120);

        // gokuSprite.update();
        if(input === false)
            gokuIdle.next();
        else
            gokuIdle.next();

        //goku Punch
        // if(input.keyboard.up) {
        //     gokuSprite.size(150, 130);
        //     gokuPunch.next();
        // }


        if(input.keyReleased(13)) {
            gokuKick.next(2)
            console.log('goku kick')
        };
        //goku Kick
    

        // gokuIdle.next();
        // gokuWalk.next();
        




        //goku Jump
        // gokuSprite.size(105, 170);
        // gokuJump.next();

        gokuSprite.update();
    };
var ticker = scene.Ticker(animation);
ticker.run();
});