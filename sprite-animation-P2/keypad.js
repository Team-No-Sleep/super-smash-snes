$(document).keypress(function(e){
    switch(e.which)
		{
        // user presses the "a"
        case 97:	
            $('.fulgore').addClass('punch');
            $('.fulgore').addClass('fulgorePunch');
            setTimeout(function(e) { 
                $('.fulgore').removeClass('punch'); 
                $('.fulgore').removeClass('fulgorePunch'); 
            }, 830);
            break;	
                    
        // // user presses the "s" key
        case 115:
            $('.fulgore').addClass('kick');
            $('.fulgore').addClass('fulgoreKick');
            setTimeout(function(e) { 
                $('.fulgore').removeClass('kick'); 
                $('.fulgore').removeClass('fulgoreKick'); 
            }, 530);
            break;	
                    
        // // user presses the "d" key
        case 100:	
            $('.fulgore').addClass('jump');
            $('.fulgore').addClass('fulgoreJump');
            setTimeout(function(e) { 
                $('.fulgore').removeClass('jump'); 
                $('.fulgore').removeClass('fulgoreJump'); 
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

