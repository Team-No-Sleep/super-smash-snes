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
                    
        // // user presses the "Left" key
        case 81:	
            // $('.idle').animate({"left": "+=10px" }, "fast" );
            console.log('left');
            break;
        // // user presses the "Right" key 
        case 69:	
            console.log('right');
            // $('.idle').animate({"right": "+=10px"}, "fast" );
            break;
        }
});

