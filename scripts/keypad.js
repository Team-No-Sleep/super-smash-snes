// ==================
//     GOKU GAMEPAD
// ==================
$(document).keypress(function(e){
    switch(e.which)
		{
        // user presses the "a"
        case 97:	
            $('.goku').addClass('punch');
            $('.goku').addClass('gokuPunch');
            setTimeout(function(e) { 
                $('.goku').removeClass('punch'); 
                $('.goku').removeClass('gokuPunch'); 
            }, 830);
            break;	
                    
        // // user presses the "s" key
        case 115:
            $('.goku').addClass('kick');
            $('.goku').addClass('gokuKick');
            setTimeout(function(e) { 
                $('.goku').removeClass('kick'); 
                $('.goku').removeClass('gokuKick'); 
            }, 530);
            break;	
                    
        // // user presses the "d" key
        case 100:	
            $('.goku').addClass('jump');
            $('.goku').addClass('gokuJump');
            setTimeout(function(e) { 
                $('.goku').removeClass('jump'); 
                $('.goku').removeClass('gokuJump'); 
            }, 1530);
            break;	
                    
         // // user presses the "q" key 
         case 113:	
             $('.goku').css({"margin-left": "-=10px" });;
             console.log('goku left')
         break;

         // // user presses the "e" key 
         case 101:	
             $('.goku').css({"margin-left": "+=10px" });
             console.log('goku right')
         break;
     }
});



// ==================
//     RYU GAMEPAD
// ==================
$(document).keypress(function(e){
    switch(e.which)
		{
        // user presses the "j"
        case 106:	
            $('.ryu').addClass('ryu-punch');
            $('.ryu').addClass('punch-p2');
            setTimeout(function(e) { 
                $('.ryu').removeClass('punch-p2'); 
                $('.ryu').removeClass('ryu-punch'); 
            }, 230);
            break;	
                    
        // // user presses the "k" key
        case 107:
            $('.ryu').addClass('ryu-kick');
            $('.ryu').addClass('kick-p2');
            setTimeout(function(e) { 
                $('.ryu').removeClass('kick-p2'); 
                $('.ryu').removeClass('ryu-kick'); 
            }, 540);
            break;	
                    
        // // user presses the "l" key
        case 108:	
            $('.ryu').addClass('ryu-jump');
            $('.ryu').addClass('jump-p2');
            setTimeout(function(e) { 
                $('.ryu').removeClass('jump-p2'); 
                $('.ryu').removeClass('ryu-jump'); 
            }, 870);
            break;	
                    
        // // user presses the "u" key
        case 117:	
            $('.ryu').css({"margin-left": "-=10px" });
            break;
            
        // // user presses the "o" key 
        case 111:	
            $('.ryu').css({"margin-left": "+=10px"});
            break;
        }
});