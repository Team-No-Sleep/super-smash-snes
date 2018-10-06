//sound effect from sound.js library
var hadouken = "hadouken";
var punch = "punch";
var cut = "cut";
var jab = "jab";
var cross = "cross";
var kick = "kick";
var jump = "jump";
function loadSound() {
  createjs.Sound.registerSound("sounds/hadouken.mp3", hadouken);
  createjs.Sound.registerSound("sounds/cross.mp3", cross);
  createjs.Sound.registerSound("sounds/punch.mp3", punch);
  createjs.Sound.registerSound("sounds/cut.mp3", cut);
  createjs.Sound.registerSound("sounds/jab.mp3", jab);
  createjs.Sound.registerSound("sounds/kick.mp3", kick);
  createjs.Sound.registerSound("sounds/jump.mp3", jump);
}
loadSound();
function playHadouken() {
  createjs.Sound.play(hadouken);
}
function playCross() {
  createjs.Sound.play(cross);
}
function playPunch() {
  createjs.Sound.play(punch);
}
function playCut() {
  createjs.Sound.play(cut);
}
function playJab() {
  createjs.Sound.play(jab);
}
function playKick() {
  createjs.Sound.play(kick);
}
function playJump() {
  createjs.Sound.play(jump);
}
// ==================
//     GOKU GAMEPAD
// ==================
$(document).keydown(function (event) {
  if (!$("#collapseExample").hasClass('show')) {
    //comment out this collisionBox object after testing
    collisionQuery.checkContact();

    switch (event.which) {
      // user presses the "A" PUNCH key
      case 65:
        //database call to record the press of the keytype and the keycode
        recordGokusKeyPad("keydown", 65);
        playPunch();
        $(".goku").removeClass("goku-idle");
        $(".goku").removeClass("idle-p1");
        $(".goku").addClass("goku-punch");
        $(".goku").addClass("punch-p1");
        setTimeout(function (e) {
          $(".goku").removeClass("punch-p1");
          $(".goku").removeClass("goku-punch");
          $(".goku").addClass("goku-idle");
          $(".goku").addClass("idle-p1");
        }, 570);
        break;

      // user presses the "S" KICK key
      case 83:
        //database call to record the press of the keytype and the keycode
        recordGokusKeyPad("keydown", 83);
        playCross();
        $(".goku").addClass("kick-p1");
        $(".goku").addClass("goku-kick");
        setTimeout(function (e) {
          $(".goku").removeClass("kick-p1");
          $(".goku").removeClass("goku-kick");
        }, 530);
        break;

      // user presses the "D" JUMP key
      case 68:
        //database call to record the press of the keytype and the keycode
        recordGokusKeyPad("keydown", 68);
        playJump();
        $(".goku").removeClass("goku-idle");
        $(".goku").removeClass("idle-p1");
        $(".goku").addClass("goku-jump");
        $(".goku").addClass("jump-p1");
        setTimeout(function (e) {
          $(".goku").addClass("goku-idle");
          $(".goku").addClass("idle-p1");
          $(".goku").removeClass("jump-p1");
          $(".goku").removeClass("goku-jump");
        }, 400);
        break;
    }
  }
});

// ==================
//     RYU GAMEPAD
// ==================
$(document).keydown(function (event) {
  if (!$("#collapseExample").hasClass('show')) {
    //comment out this collisionTester object after testing
    collisionQuery.checkContact();

    switch (event.which) {
      // user presses the "j" PUNCH key
      case 74:
        //database call to record the press of the keytype and the keycode
        recordRyusKeyPad("keydown", 74);
        playPunch();
        $(".ryu").removeClass("ryu-idle");
        $(".ryu").removeClass("idle-p2");
        $(".ryu").addClass("ryu-punch");
        $(".ryu").addClass("punch-p2");
        setTimeout(function (event) {
          $(".ryu").addClass("ryu-idle");
          $(".ryu").addClass("idle-p2");
          $(".ryu").removeClass("punch-p2");
          $(".ryu").removeClass("ryu-punch");
        }, 230);
        break;

      // user presses the "k" KICK key
      case 75:
        //database call to record the press of the keytype and the keycode
        recordRyusKeyPad("keydown", 75);
        playKick();
        $(".ryu").addClass("ryu-kick");
        $(".ryu").addClass("kick-p2");
        setTimeout(function (event) {
          $(".ryu").removeClass("kick-p2");
          $(".ryu").removeClass("ryu-kick");
        }, 600);
        break;

      // user presses the "l" JUMP key
      case 76:
        //database call to record the press of the keytype and the keycode
        recordRyusKeyPad("keydown", 76);
        playJump();
        $(".ryu").addClass("ryu-jump");
        $(".ryu").addClass("jump-p2");
        setTimeout(function (event) {
          $(".ryu").removeClass("jump-p2");
          $(".ryu").removeClass("ryu-jump");
        }, 370);
        break;
    }
  }
});

// =============
//    WALKING
// =============

var walk = {
	goku: $(".goku"),
	ryu: $(".ryu"),
	speed: 2,
	gokuLeftKeyToggle  : false,
	gokuRightKeyToggle : false,
	ryuLeftKeyToggle   : false,
	ryuRightKeyToggle  : false,

	keyDown: $(document).keydown(function (event) {
		var keycode = event.keyCode;
		if (keycode === 81) {
			walk.gokuLeftKeyToggle = true;
			//database call to record the press of the keytype and the keycode
			recordGokusKeyPad("keydown", keycode);
		}
		if (keycode === 69) {
			walk.gokuRightKeyToggle = true;
			recordGokusKeyPad("keydown", keycode);
		}
		if (keycode === 85) {
			walk.ryuLeftKeyToggle = true;
			recordRyusKeyPad("keydown", keycode);
		}
		if (keycode === 79) {
			walk.ryuRightKeyToggle  = true;
			recordRyusKeyPad("keydown", keycode);
		}
	}),
	keyUp: $(document).keyup(function (event) {
		var keycode = event.keyCode;
		if (keycode === 81) {
			walk.gokuLeftKeyToggle  = false;
			recordGokusKeyPad("keyup", keycode);
		}
		if (keycode === 69) {
			walk.gokuRightKeyToggle = false;
			recordGokusKeyPad("keyup", keycode);
		}
		if (keycode === 85) {
			walk.ryuLeftKeyToggle   = false;
			recordRyusKeyPad("keyup", keycode);
		}
		if (keycode === 79) {
			walk.ryuRightKeyToggle  = false;
			recordRyusKeyPad("keyup", keycode);
		}
	}),
	animateGo: $(document).keydown(function () {
		if (walk.gokuLeftKeyToggle == true || walk.gokuRightKeyToggle == true) {
			walk.goku.addClass("goku-walk walk-p1");
		}
		if (walk.ryuLeftKeyToggle == true || walk.ryuRightKeyToggle == true) {
			walk.ryu.addClass("ryu-walk walk-p2");
		}
	}),
	animateStop: $(document).keyup(function () {
		if (walk.gokuLeftKeyToggle == false || walk.gokuRightKeyToggle == false) {
			walk.goku.removeClass("goku-walk walk-p1");
		}
		if (walk.ryuLeftKeyToggle == false || walk.ryuRightKeyToggle == false) {
			walk.ryu.removeClass("ryu-walk walk-p2");
		}
	}),
	moveGoku: function () {
		var charposition = walk.goku.position().left;
		if (walk.gokuLeftKeyToggle)
			walk.goku.css(
				"left", charposition - walk.speed + "px");
		if (walk.gokuRightKeyToggle)
			walk.goku.css(
				"left", charposition + walk.speed + "px");
	},
	moveRyu: function () {
		var charposition = walk.ryu.position().left;
		if (walk.ryuLeftKeyToggle)
			walk.ryu.css(
				"left", charposition - walk.speed + "px");
		if (walk.ryuRightKeyToggle)
			walk.ryu.css(
				"left", charposition + walk.speed + "px");
	},
};
setInterval(walk.moveGoku, 1);
setInterval(walk.moveRyu, 1);