/*  
	Your Project Title
	Author: You
*/

(function($){
	
	
	/*
	===============================================
	========================= APPLICATION FUNCTIONS	
	*/
	
	
	var checkLoginState = function(){
		$.ajax({
			url: 'xhr/check_login.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				// if user, loadApp()
				// if error, loadLanding()
			}
		});
	};
	
	

	// 	============================================
	//	SETUP FOR INIT
		
	var init = function(){
	
		checkLoginState();
	};
	
	
	init();
	
		
	/*
	===============================================
	======================================== EVENTS	
	*/
	/*--------------Tool Tip----------------------*/
    $('.masterTooltip').hover(function(){
        var title = $(this).attr('title')
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>')
            .text(title)
            .appendTo('body')
            .fadeIn('slow');

    }, function(){
            $(this).attr('title', $(this).data('tipText'));
            $('.tooltip').remove();
    }).mousemove(function(e){
            var mousex = e.pageX + 20;
            var mousey = e.pageY + 10;
            $('.tooltip')
                .css({ top: mousey, left: mousex })
        });




    /*------------End Tool Tip------------------------*/
	
	/*	
	==================================== END EVENTS 
	===============================================
	*/


    /*----------------MODAL---------------------------------*/

    $('modalClick').on('click', function(event){
        event.preventDefault();
        $('#overlay')
            .fadeIn()
            .find('#modal')
            .fadeIn();
    });

    $('.close').on('click', function(event){
       event.preventDefault();
        $('overlay')
            .fadeOut()
            .find('#modal')
            .fadeOut();

    });

    /*-----------------Fading status option ------------*/

    $('.mystatus').mouseover(function(){
        $(this).fadeTo(100, .3);
    });

    $('.mystatus').mouseout(function(){
        $(this).fadeTo(100, 1);
    });



    /*--------------END--MODAL---------------------------------*/


    /*----------------------Accordian-----------------------------*/

    $('ul.tabs').each(function(){
        var $active, $content, $links = $(this).find('a');
        $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
        $active.addClass('active');

        $content = $($active[0].hash);

        $links.not($active).each(function(){
            $(this.hash).hide();
        });

        $(this).on('click', 'a', function(e){
            $active.removeClass('active');
            $content.hide();

            $active = $(this);
            $content = $(this.hash);

            $active.addClass('active');
            $content.show();

            e.preventDefault();

        });


    });

    /*------------------END----Accordian-----------------------------*/

		

	
})(jQuery); // end private scope




