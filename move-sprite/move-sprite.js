
var game_height = 500;
var game_width = 500;
var scene = sjs.Scene({w:game_width, h:game_height});
var layer = scene.Layer('front');
var player = scene.Sprite('./img/goku-move.png');
var plateforms = [];
var playerSize = player.size(108, 115);
var input = scene.Input();

player.move(5, 20);

var cycle = scene.Cycle([
    [0, 0, 3],
    [110, 0, 3],
    [220, 0, 3],
    [330, 0, 3], 
    [440, 0, 3],
    [550, 0, 3],
]);
cycle.addSprite(player);

var xVelocity = -1, yVelocity = 0;

function animation() {
    var x = player.x + player.w;
    var y = player.y + player.h;
    var hasWallContact = y > window.innerHeight;

    if(!hasWallContact) {
        for(var i=0; i < plateforms.length; i++) {
            hasWallContact = plateforms.isPointIn(x, y);
        }
    }

    if(!input.keyboard.left && !input.keyboard.right)
        xVelocity = xVelocity / 3;

    if(input.keyboard.left) {
        xVelocity = Math.max(-2.5, xVelocity-2);
        player.scale(1, 1);
    }
    if(input.keyboard.right) {
        xVelocity = Math.min(2.5, xVelocity+2);
        player.scale(-1, 1);
    }

    player.move(xVelocity, yVelocity);
    if(player.x < 0)
        player.setX(0);
    if(player.x > game_width - 120)
        player.setX(game_width - 120);

    player.update();
    if(input.arrows())
        cycle.next(ticker.lastTicksElapsed);
    else
        cycle.reset();
};

var ticker = scene.Ticker(20, animation);
ticker.run();
