// ===================
//   COLLISION BOX
// ===================
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
};


// ==========================
//   COLLISION CONFIRMATION
// ==========================
var collision = false;
var hitbox = false;

var collisionTester = {
    //this is for visual testing of collision; plaed in both Gamepads
    checkContact: function() {
        $('.collision-p1').each(function(){
            if(collisionBox.ifHasContact('.collision-p2',$(this))){
                $(this).css({backgroundColor:'green'});
                collision = true;
                hitbox = true;
                console.log('Goku hitbox: ', hitbox);
            } else {
                $(this).css({backgroundColor:'red'});
                collision = false;
                hitbox = false;
            }
        });
        $('.collision-p2').each(function(){
            if(collisionBox.ifHasContact('.collision-p1',$(this))){
                $(this).css({backgroundColor:'yellow'});
                collision = true;
                hitbox = true;
                console.log('Ryu hitbox: ', hitbox);
            } else {
                $(this).css({backgroundColor:'blue'});
                collision = false;
                hitbox = false;
            }
        });
    },

    hitBoxCheck: $(window).keydown(function () {
            if(collision === true) {
                console.log('collision confirmed: ', collision);
                return collision
            };
    }),
}



// =============
//    HIT BOX
// =============

$(window).keydown(function(event){
    switch(event.which)
        {
        // =================
        //   GOKU HIT DETECT
        // =================
        // user presses the "A" PUNCH key
        case 65:
            if (collision && hitbox) {
                console.log('HIT CONFIRMED');
                $('.goku').css('background-color', 'orange');
            }	
            console.log('GOKU A PUNCH');
            break;	
                    
        // user presses the "S" KICK key
        case 83:
            if (collision && hitbox) {
                console.log('HIT CONFIRMED');
                $('.goku').css('background-color', 'orange');
            }	
            console.log('GOKU S KICK');
            break;	
	
        // =================
        //   RYU HIT DETECT
        // =================
        // user presses the "j" PUNCH key
        case 74:	
            if (collision && hitbox) {
                console.log('HIT CONFIRMED');
                $('.ryu').css('background-color', 'purple');
            }	
            console.log('RYU J PUNCH');
            break;	
                    
        // user presses the "k" KICK key
        case 75:
            if (collision && hitbox) {
                console.log('HIT CONFIRMED');
                $('.ryu').css('background-color', 'purple');
            }	
            console.log('RYU K KICK');
            break;	
        }
});
