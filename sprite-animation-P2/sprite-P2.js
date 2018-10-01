var scene = sjs.Scene({w:game_width, h:game_height});
var game_height = 400;
var game_width = 300;
var sprite = scene.Sprite('./img/fulgore-idle.png');
var gifSize = sprite.size(73, 110);

scene.loadImages(sprite, function() {
    var cycle = sjs.Cycle([
        [0, 0, 15],
        [70, 0, 15],
        [141, 0, 15],
        [213, 0, 15],
        [286, 0, 15],
    ]);
    cycle.addSprites(sprite);

    function animation() {
        cycle.next();
        sprite.update();
    };
var ticker = scene.Ticker(animation);
ticker.run();
});