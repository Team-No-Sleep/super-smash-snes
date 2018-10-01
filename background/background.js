var game_height = 250;
var game_width = 768;
var scene = sjs.Scene({w:game_width, h:game_height});
var layer = scene.Layer('front');
var background = layer.Sprite('./img/stage.png');

function paint() {
background.update();
};

var ticker = scene.Ticker(25, paint);
ticker.run();