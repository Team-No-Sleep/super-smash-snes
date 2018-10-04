// =======================
//   COLLISION DETECTOR
// =======================
var collisionBox = {
    ifHasContact: function (collisionBoxOne, collisionBoxTwo){
        var collisionBox1 = $(collisionBoxOne);
        var collisionBox2 = $(collisionBoxTwo);
        
        //collisionBox1 contact dimenstions
        var collisionBox1x = collisionBox1.offset().left;
        var collisionBox1y = collisionBox1.offset().top;
        var collisionBox1w = collisionBox1.width();
        var collisionBox1h = collisionBox1.height();
        
        //collisionBox2 contact dimensions
        var collisionBox2x = collisionBox2.offset().left;
        var collisionBox2y = collisionBox2.offset().top;
        var collisionBox2w = collisionBox2.width();
        var collisionBox2h = collisionBox2.height();
        
        if( collisionBox1y+collisionBox1h < collisionBox2y ||
            collisionBox1y > collisionBox2y+collisionBox2h ||
            collisionBox1x > collisionBox2x+collisionBox2w ||
            collisionBox1x+collisionBox1w < collisionBox2x ){
            return false;
        }else{
            return true;   
        };
    },

    //this is for visual testing of collision; plaed in both Gamepads
    checkContact: function() {
        $('.collision-p1').each(function(){
            if(collisionBox.ifHasContact('.collision-p2',$(this))){
                $(this).css({backgroundColor:'green'});
            } else {
                $(this).css({backgroundColor:'red'});
            }
        });
        $('.collision-p2').each(function(){
            if(collisionBox.ifHasContact('.collision-p1',$(this))){
                $(this).css({backgroundColor:'yellow'});
            } else {
                $(this).css({backgroundColor:'blue'});
            }
        });

    },
};


// ==================
//     GOKU GAMEPAD
// ==================
$(document).keydown(function(event){
    //comment out this collisionBox object after testing
    collisionBox.checkContact();
    
    switch(event.which)
		{
        // user presses the "A" PUNCH key
        case 65:	
            $('.goku').addClass('goku-punch');
            $('.goku').addClass('punch-p1');
            setTimeout(function(e) { 
                $('.goku').removeClass('punch-p1'); 
                $('.goku').removeClass('goku-punch'); 
            }, 570);
            break;	
                    
        // user presses the "S" KICK key
        case 83:
            $('.goku').addClass('kick-p1');
            $('.goku').addClass('goku-kick');
            setTimeout(function(e) { 
                $('.goku').removeClass('kick-p1'); 
                $('.goku').removeClass('goku-kick'); 
            }, 530);
            break;	
                    
        // user presses the "D" JUMP key
        case 68:	
            $('.goku').addClass('jump-p1');
            $('.goku').addClass('goku-jump');
            setTimeout(function(e) { 
                $('.goku').removeClass('jump-p1'); 
                $('.goku').removeClass('goku-jump'); 
            }, 830);
            break;	
         }
});

// ==================
//     RYU GAMEPAD
// ==================
$(window).keydown(function(event){
    //comment out this collisionBox object after testing
    collisionBox.checkContact();

    switch(event.which)
		{
        // user presses the "j" PUNCH key
        case 74:	
            $('.ryu').addClass('ryu-punch');
            $('.ryu').addClass('punch-p2');
            setTimeout(function(event) { 
                $('.ryu').removeClass('punch-p2'); 
                $('.ryu').removeClass('ryu-punch'); 
            }, 230);
            break;	
                    
        // user presses the "k" KICK key
        case 75:
            $('.ryu').addClass('ryu-kick');
            $('.ryu').addClass('kick-p2');
            setTimeout(function(event) { 
                $('.ryu').removeClass('kick-p2'); 
                $('.ryu').removeClass('ryu-kick'); 
            }, 940);
            break;	
                    
        // user presses the "l" JUMP key
        case 76:
            $('.ryu').addClass('ryu-jump');
            $('.ryu').addClass('jump-p2');
            setTimeout(function(event) { 
                $('.ryu').removeClass('jump-p2'); 
                $('.ryu').removeClass('ryu-jump'); 
            }, 870);
            break;	
        }
});

// =============
//    WALKING
// =============

//GOKUWALK
var gokuWalk = {
    player: $(".goku"),
    speed: 0.5,
    direction: {
        left: false,
        right: false,
    },
    keyDown: $(document).keydown(function(event) {
        var keycode = event.keyCode;
        event.preventDefault();
        if (keycode === 81) gokuWalk.direction.left = true;
        if (keycode === 69) gokuWalk.direction.right = true;
    }),
    keyUp: $(document).keyup(function(event) {
        var keycode = event.keyCode;
        event.preventDefault();
        if (keycode === 81) gokuWalk.direction.left = false;
        if (keycode === 69) gokuWalk.direction.right = false;
    }), 
    animateGo: $(document).keydown(function() {
        if (gokuWalk.direction.left === true || gokuWalk.direction.right === true) {
            gokuWalk.player.addClass('goku-walk walk-p1');
        } 
    }),
    animateStop: $(document).keyup(function() {
        if (gokuWalk.direction.left === false || gokuWalk.direction.right === false) {
            gokuWalk.player.removeClass('goku-walk walk-p1');
        };
    }),
    move: function() {
        if (gokuWalk.direction.left) gokuWalk.player.css("left", (gokuWalk.player.position().left - gokuWalk.speed) + "px");
        if (gokuWalk.direction.right) gokuWalk.player.css("left", (gokuWalk.player.position().left + gokuWalk.speed) + "px");
    },
};
setInterval(gokuWalk.move, 1);

//RYUWALK
var ryuWalk = {
    player: $(".ryu"),
    speed: 0.5,
    direction: {
        left: false,
        right: false,
    },
    keyDown: $(document).keydown(function(event) {
        var keycode = event.keyCode;
        event.preventDefault();
        if (keycode === 85) ryuWalk.direction.left = true;
        if (keycode === 79) ryuWalk.direction.right = true;
    }), 
    keyUp: $(document).keyup(function(event) {
        var keycode = event.keyCode;
        event.preventDefault();
        if (keycode === 85) ryuWalk.direction.left = false;
        if (keycode === 79) ryuWalk.direction.right = false;
    }),
    animateGo: $(document).keydown(function() {
        if (ryuWalk.direction.left === true || ryuWalk.direction.right === true) {
            ryuWalk.player.addClass('ryu-walk walk-p1');
        } 
    }),
    animateStop: $(document).keyup(function() {
        if (ryuWalk.direction.left === false || ryuWalk.direction.right === false) {
            ryuWalk.player.removeClass('ryu-walk walk-p1');
        };
    }),
    move: function() {
        if (ryuWalk.direction.left) ryuWalk.player.css("left", (ryuWalk.player.position().left - ryuWalk.speed) + "px");
        if (ryuWalk.direction.right) ryuWalk.player.css("left", (ryuWalk.player.position().left + ryuWalk.speed) + "px");
    },
};setInterval(ryuWalk.move, 1);