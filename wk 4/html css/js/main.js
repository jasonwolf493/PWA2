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

    //selects the signinbutton then on click it runs the function
    $('#signinButton').click(function(){
        // creates a var with the val of what ever is in the user and pass input fields
        var user = $('#user').val();
        var pass = $('#pass').val();

        //using the ajax functionality
        $.ajax({
            //links to the php file that we are going to use
            url: 'xhr/login.php',
            //we then post the info
            type:'post',
            dataType: 'json',
            // the data we pass in is username pass from the vars above
            data: {
                username: user,
                password: pass
            },
            //then it runs success and accepts a var of response
            success:function(response){
                console.log("test user");
                //if the response is an error it will then alert the user
                if(response.error){
                    alert(response.error);

                }else{
                    //but if everthing works it will send the user to the admin.html page
                    window.location.assign('admin.html')
                }
            }
        });
    });


    //===================END LOGIN==================


    //===================Log Out====================

    //when the logout button is clicked it then...
    $('#logOut').click(function(e){
        //prevents the default action
        e.preventDefault();
        //then the logout.php is called and then the user is sent to the index page
        $.get('xhr/logout.php', function(){
            window.location.assign('index.html')
        })

    });

    //===============End Log Out====================

    //================Sign Up=======================

    //when register is clicked
    $('#register').on('click', function(){
        //it creates a var with a value from each field
        var firstname= $('#first').val(),
            lastname= $('#last').val(),
            username= $('#userName').val(),
            email= $('#email').val(),
            password= $('#password').val();
            console.log(firstname+' '+lastname+' '+username+' '+email+' '+password);

        //then using ajax
        $.ajax({
            url:'xhr/register.php',
            //we then post
            type: 'post',
            dataType: 'json',
            data: {
                //all of this data to the database
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                password: password
            },

            success: function(response){

                //if there is an it will alert the user of the error
                if(response.error){
                    alert(response.error);
                }else{
                    //otherwise it will send the user to the admin page
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
    //selects the masterTooltip then when it is hovered
    $('.masterTooltip').hover(function(){
        //it makes a var from the title of what ever is hovered over
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        //selects tooltip class and <p> tag and fades it in
        $('<p class="tooltip"></p>')
            .text(title)
            .appendTo('body')
            .fadeIn('slow');

    }, function(){
            $(this).attr('title', $(this).data('tipText'));
            $('.tooltip').remove();
        //this function is used the keep the tool tip close to the mouse
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

    //selects modalClick and then on click runs the function
    $('.modalClick').on('click', function(event){
        //prevents the default
        event.preventDefault();
        //selects the overlay id and fades in
        $('#overlay')
            .fadeIn()
            .find('#modal')
            .fadeIn();


    });

    // now it selects the close class and when it is clicked on it runs the function
    $('.close').on('click', function(event){
        //prevent default and fade out
       event.preventDefault();
        $('#overlay')
            .fadeOut()
            .find('#modal')
            .fadeOut();

    });

    /*-----------------Fading status option ------------*/

    //sets the fade when the status' are moused over
    $('.mystatus').mouseover(function(){
        $(this).fadeTo(100, .3);
    });

    //set the fade of the status when the mouse leaves
    $('.mystatus').mouseout(function(){
        $(this).fadeTo(100, 1);
    });



    /*--------------END--MODAL---------------------------------*/


    /*----------------------Accordian-----------------------------*/

    //selects the tabs
    $('ul.tabs').each(function(){
        //then creates multiple vars
        var $active, $content, $links = $(this).find('a');
        $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
        $active.addClass('active');

        $content = $($active[0].hash);

        $links.not($active).each(function(){
            $(this.hash).hide();
        });

        //then hides or shows content whether its clicked or not
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

    //projects button brings you to the projects page
    $('.projectsbtn').on('click',function(e){
        e.preventDefault();
        window.location.assign('project.html');
    });

    //projects button brings you to the tasks page which isn't available
    $('.taskbtn').on('click',function(e){
        e.preventDefault();
        window.location.assign('task.html');
    });

    //projects button brings you to the users page which isn't available
    $('.usersbtn').on('click',function(e){
        e.preventDefault();
        window.location.assign('users.html');
    });
    //================END ACCORDIAN BUTTONS=========================//


    //=================NEW PROJECT=========================//
    //selects the add button and the when it is clicked it runs the function
    $('#addButton').on('click', function(e){
        e.preventDefault();

        //creates the following vars
        var projName = $('#projectName').val(),
            projDesc = $('#projectDescription').val(),
            projDue = $('#projectDueDate').val(),
            status = $('#projectStatus').val();


        //then uses ajax to
        $.ajax({

            url: "xhr/new_project.php",
            //post the information
            type:"post",
            dataType:"json",
            //and it posts the vars the were created above to the database
            data: {
                projectName: projName,
                projectDescription: projDesc,
                dueDate: projDue,
                status: status

            },
            success: function(response){

                console.log('testing for success');
                //if there is an issue it will alert the user
                if(response.error){
                    alert(response.error);
                }else{
                    //but if everything goes as planned it will just reload the page
                    window.location.assign("project.html");
                }
            }
        });

    });




    //===============END NEW PROJECT=======================//

    //====================Get Project====================//
    var projects = function(){

        //using ajax to finally get info rather than just posting it
        $.ajax({
            url: 'xhr/get_projects.php',
            type: 'get',
            dataType: 'json',
            success: function(response){
                if(response.error){
                    console.log(response.error);
                }else{
                    //we make a loop for the number of projects there is and then just post them
                    for(var i= 0, j=response.projects.length; i < j; i++){
                        //uses i var to select what project to post
                        var result = response.projects[i];

                        //add the info that was found in the data base with i
                        $(".projects").append(
                            //'<div style="border: 1px solid black">' +
                                '<div id="sortable" class="ui-state-default">' +
                                "<input class='projectid' type='hidden' value='" + result.id +"'>" +
                                " Project Name: " + result.projectName + "<br>" +
                                " Project Description: " + result.projectDescription + "<br>" +
                                '<button class="deletebtn">Delete</button>' +
                                '</div> <br>'
                        );
                    }
                    // selects the delete button and on click it runs the following function
                    $('.deletebtn').on('click', function(e){
                       console.log('test delete');
                        $.ajax({
                            // uses a php file in the xhr folder
                            url: 'xhr/delete_project.php',
                            data: {
                                projectID: result.id
                            },
                            //then removes the data from the database
                            type:'POST',
                            dataType:'json',
                            success: function(response){
                                console.log('testing for success');

                                if(response.error){
                                    alert(response.error);
                                }else{
                                    //the refreshes the page
                                    window.location.assign("project.html");
                                }
                            }
                        });
                    });


                }
            }
        })
    };

    projects();

    //===================End Get Project===============//
    //===================Date Picker===================//

    //selects anything with the class of mydatepicker then runs the datepicker() function within jqueryui
    $( ".mydatepicker" ).datepicker();


    //=================End Date Picker=================//



    //===================Button========================//
    $(function() {
        //Selects all anchors buttons and inputs with submit as a type
        $( "input[type=submit], a, button" )
            // runs the button function within the jqueryui
            .button()
            // runs the click function within the jqueryui
            .click(function( event ) {
                //and prevents the default from occuring
                event.preventDefault();
            });
    });
    //============END====Button========================//




    //====================Sortable=====================//

    //selects anything with the ID sortable and runs .sortable()
    $( "#sortable" ).sortable();


    //selects anything with the ID sortable and runs .disableSelection()
    $( "#sortable" ).disableSelection();

    //===================End Sortable==================//


    //selects any thing with the class of dashboard which in the case is the dashboard button then on click it...
    $('.dashboard').on('click',function(e){
        //prevents the default action from occurring then...
        e.preventDefault();
        //it tells the browser to go to admin.html
        window.location.assign('admin.html');
    });


})(jQuery); // end private scope




