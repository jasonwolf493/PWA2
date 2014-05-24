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
	// =====================LOGIN===================

    $('#signinButton').click(function(){
        var user = $('#user').val();
        var pass = $('#pass').val();

        $.ajax({
            url: 'xhr/login.php',
            type:'post',
            dataType: 'json',
            data: {
                username: user,
                password: pass
            },
            success:function(response){
                console.log("test user");
                if(response.error){
                    alert(response.error);

                }else{
                    window.location.assign('admin.html')
                };
            }
        });
    });


    //===================END LOGIN==================


    //===================Log Out====================

    $('#logOut').click(function(e){
        e.preventDefault();
        $.get('xhr/logout.php', function(){
            window.location.assign('index.html')
        })

    });

    //===============End Log Out====================

    //================Sign Up=======================

    $('#register').on('click', function(){
        var firstname= $('#first').val(),
            lastname= $('#last').val(),
            username= $('#userName').val(),
            email= $('#email').val(),
            password= $('#password').val();
            console.log(firstname+' '+lastname+' '+username+' '+email+' '+password);

        $.ajax({
            url:'xhr/register.php',
            type: 'post',
            dataType: 'json',
            data: {
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                password: password
            },

            success: function(response){

                if(response.error){
                    alert(response.error);
                }else{
                    window.location.assign('admin.html');
                }
            }
        });
    });

    //==============END SIGN UP=====================

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
        var title = $(this).attr('title');
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

    $('.modalClick').on('click', function(event){
        event.preventDefault();
        $('#overlay')
            .fadeIn()
            .find('#modal')
            .fadeIn();


    });

    $('.close').on('click', function(event){
       event.preventDefault();
        $('#overlay')
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

    //==================ACCORDIAN BUTTONS===========================//

    $('.projectsbtn').on('click',function(e){
        e.preventDefault();
        window.location.assign('project.html');
    });

    $('.taskbtn').on('click',function(e){
        e.preventDefault();
        window.location.assign('task.html');
    });

    $('.usersbtn').on('click',function(e){
        e.preventDefault();
        window.location.assign('users.html');
    });
    //================END ACCORDIAN BUTTONS=========================//


    //=================NEW PROJECT=========================//
    $('#addButton').on('click', function(e){
        e.preventDefault();

        var projName = $('#projectName').val(),
            projDesc = $('#projectDescription').val(),
            projDue = $('#projectDueDate').val(),
            status = $('#projectStatus').val();

        $.ajax({

            url: "xhr/new_project.php",
            type:"post",
            dataType:"json",
            data: {
                projectName: projName,
                projectDescription: projDesc,
                dueDate: projDue,
                status: status

            },
            success: function(response){

                console.log('testing for success');

                if(response.error){
                    alert(response.error);
                }else{
                    window.location.assign("project.html");
                }
            }
        });

    });




    //===============END NEW PROJECT=======================//

    //====================Get Project====================//
    var projects = function(){

        $.ajax({
            url: 'xhr/get_projects.php',
            type: 'get',
            dataType: 'json',
            success: function(response){
                if(response.error){
                    console.log(response.error);
                }else{
                    for(var i= 0, j=response.projects.length; i < j; i++){
                        var result = response.projects[i];

                        $(".projects").append(
                            '<div style="border: 1px solid black">' +
                                " Project ID: " + result.id + "<br>" +
                                " Project Name: " + result.projectName + "<br>" +
                                " Project Description: " + result.projectDescription + "<br>" +
                                '<button class="deletebtn">Delete</button>' +
                                '</div> <br>'
                        );
                    };
                    $('.deletebtn').on('click', function(e){
                       console.log('test delete');
                        $.ajax({
                            url: 'xhr/delete_project.php',
                            data: {
                                projectID: result.id
                            },
                            type:'POST',
                            dataType:'json',
                            success: function(response){
                                console.log('testing for success');

                                if(response.error){
                                    alert(response.error);
                                }else{
                                    window.location.assign("projects.html");
                                };
                            }
                        });
                    });


                }
            }
        })
    };



    //===================End Get Project===============//




    $('.dashboard').on('click',function(e){
        e.preventDefault();
        window.location.assign('admin.html');
    });


})(jQuery); // end private scope




