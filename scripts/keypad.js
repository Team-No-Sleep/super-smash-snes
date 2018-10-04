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
$(document).keyup(function(e){
    //comment out this collisionBox object after testing
    collisionBox.checkContact();
    
    switch(e.which)
		{
        // user presses the "a" PUNCH key
        case 97:	
            $('.goku').addClass('punch');
            $('.goku').addClass('gokuPunch');
            setTimeout(function(e) { 
                $('.goku').removeClass('punch'); 
                $('.goku').removeClass('gokuPunch'); 
            }, 830);
            break;	
                    
        // user presses the "s" KICK key
        case 115:
            $('.goku').addClass('kick');
            $('.goku').addClass('gokuKick');
            setTimeout(function(e) { 
                $('.goku').removeClass('kick'); 
                $('.goku').removeClass('gokuKick'); 
            }, 530);
            break;	
                    
        // user presses the "d" JUMP key
        case 100:	
            $('.goku').addClass('jump');
            $('.goku').addClass('gokuJump');
            setTimeout(function(e) { 
                $('.goku').removeClass('jump'); 
                $('.goku').removeClass('gokuJump'); 
            }, 1530);
            break;	
                    
         // user presses the "q" WALK LEFT key 
         case 113:	
             $('.goku').css({"margin-left": "-=10px" });;
         break;

         // user presses the "e"  WALK RIGHT key
         case 101:	
             $('.goku').css({"margin-left": "+=10px" });
         break;
     }
});



// ==================
//     RYU GAMEPAD
// ==================
$(document).keypress(function(e){
    //comment out this collisionBox object after testing
    collisionBox.checkContact();

    switch(e.which)
		{
        // user presses the "j" PUNCH key
        case 106:	
            $('.ryu').addClass('ryu-punch');
            $('.ryu').addClass('punch-p2');
            setTimeout(function(e) { 
                $('.ryu').removeClass('punch-p2'); 
                $('.ryu').removeClass('ryu-punch'); 
            }, 230);
            break;	
                    
        // user presses the "k" KICK key
        case 107:
            $('.ryu').addClass('ryu-kick');
            $('.ryu').addClass('kick-p2');
            setTimeout(function(e) { 
                $('.ryu').removeClass('kick-p2'); 
                $('.ryu').removeClass('ryu-kick'); 
            }, 540);
            break;	
                    
        // user presses the "l" JUMP key
        case 108:	
            $('.ryu').addClass('ryu-jump');
            $('.ryu').addClass('jump-p2');
            setTimeout(function(e) { 
                $('.ryu').removeClass('jump-p2'); 
                $('.ryu').removeClass('ryu-jump'); 
            }, 870);
            break;	
                    
        // user presses the "u" WALK LEFT key
        case 117:	
            $('.ryu').css({"margin-left": "-=10px" });
            break;
            
        // user presses the "o" WALK RIGHT key 
        case 111:	
            $('.ryu').css({"margin-left": "+=10px"});
            break;
        }
});