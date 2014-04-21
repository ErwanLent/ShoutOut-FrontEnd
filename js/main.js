$(document).ready(function() 
{
	/*=====================================================================================
		Scrolling Animation
	=======================================================================================*/

	$('#bottom-anchor').click(function() {
		$('html, body').stop().animate({
			scrollTop: $(document).height() - $(window).height()
		}, 1400, 'easeInOutCubic');
	});


	/*=====================================================================================
		Load Map With Santa Barbara Coordinates
	=======================================================================================*/

	var isMapLoaded = false;

	if(!isIphone() && $(window).width() > 730)
	{
		var latitude = 34.4258;
		var longitude = -119.7142;

		var map = loadMap(latitude, longitude);
		isMapLoaded = true;
	}
	else
	{
		$('.gradient').removeClass('color-overlay');
	}

	/*=====================================================================================
		Hangle Logo And Map Animations
	=======================================================================================*/

	$('.bar-logo').addClass("rotate");

	setTimeout(function() {
		$('.bar-logo').removeClass("duration");
		$('.bar-logo').removeClass("rotate");
	}, 1000);

	setTimeout(function() {
		$('.intro-content h1').show();
	}, 2000);

	setTimeout(function() {
		$('.animation-container').removeClass('hidden');
	    $('.right-column').removeClass('hidden');
	}, 700);

	if(isMapLoaded)
	{
		setInterval(function(){
			// Reset longitude at end of map
			if ((longitude + .1) >= 180)
				longitude = -180;

			longitude += .03;
			map.setCenter(new google.maps.LatLng(latitude, longitude));
		}, 10);
	}

	// iPhone Modifications
	if (isIphone())
	{
		$('.section-separator').css('background-size', '700px');
		$('.section-separator').css('background-attachment', 'inherit');
	}

	
	/*=====================================================================================
		Handle iPhone Chatroom Sliding Animation
	=======================================================================================*/

	var marginRight = 72;
	var marginLeft = 145;
	var state = "right";


	if ($(window).width() <= 485)
	{
		marginLeft = 125;
		marginRight = 60;
	}

	setInterval(function(){
		switch(state)
		{
			case "right":
			  	$('.chatroom-slider').css('margin-left', marginRight);
			  	state = "left";
			  	break;
			case "left":
			  	$('.chatroom-slider').css('margin-left', marginLeft * -1);
			  	state = "reset";
			 	break;
			 case "reset":
			 	$('.chatroom-slider').css('margin-left', 0);
			 	state = "right";
			 	break;
		}
	}, 1500);

	/*=====================================================================================
		Button Color Changer
	=======================================================================================*/
	if (!isIphone())
	{
		var degreeRotation = 0;
		setInterval(function(){
			var hueCss = 'hue-rotate('+ degreeRotation +'deg)';
			$('.email-button').css('-webkit-filter', hueCss);

			if (degreeRotation >= 360)
			{
				degreeRotation = -2;
			}

			degreeRotation += 2;
		}, 30);
	}

	/*=====================================================================================
		Email Subscription
	=======================================================================================*/


	// Subscribe button
	$('.email-button').click(function() {

		var email = $('.subscriber-email').val();

		if (isValidEmail(email))
		{
			$('.error').fadeOut();
			$.post("php/AddEmail.php", { email: email });
			toggleEmailThankYou();
		}
		else
		{
			$('.error').html("Please enter in a valid email.");
			$('.error').fadeIn();
		}
	});

	/*=====================================================================================
		Responsive Hamburger Menu
	=======================================================================================*/

	var isShowing = false;

	$('.icon-list').click(function(){
		if (!isShowing)
		{
			$('.top-bar ul').css('float', 'none');
			$('.top-bar ul').css('display', 'block');
			$('.top-bar li').css('text-align', 'center');
			$('.top-bar li').slideToggle();
			isShowing = true;
		}
		else
		{
			$('.top-bar li').slideToggle(function() {
				$('.top-bar ul').removeAttr('style');
				$('.top-bar li').removeAttr('style');
				isShowing = false;

				resetMenu();
			});
		}
	});

	// Close Menu On Item Click
	$('.top-bar li a').click(function(){
		$('.top-bar li').slideToggle(function() {
			$('.top-bar ul').removeAttr('style');
			$('.top-bar li').removeAttr('style');
			isShowing = false;

			resetMenu();
		});
	});

	$( window ).resize(function() {

		if ($(window).width() <= 485)
		{
			marginLeft = 125;
			marginRight = 60;
		}
		else
		{
			var marginRight = 72;
			var marginLeft = 145;
		}

  		if (isShowing && $(window).width() > 450)
  		{
			$('.top-bar li').slideToggle(function() {
				$('.top-bar ul').removeAttr('style');
				$('.top-bar li').removeAttr('style');
				isShowing = false;

				resetMenu();
			});
  		}
	});

	/*=====================================================================================
		Handle Content Animations Based On Scroll Location
	=======================================================================================*/
	var isSecondSectionShowing = false;

	$(window).scroll(function() {

	    var height = $(window).scrollTop();

	    if(!isSecondSectionShowing && height  > 900) {
	    	isSecondSectionShowing = true;
	        $('#more-info-image').removeClass('hidden');
	    }
	});

});

function loadMap(latitude, longitude)
{
	var map;
	var pgLocation = new google.maps.LatLng(34.4258, -119.7142);

	var pgOptions = {
		 	zoom: 3,
		 	center: pgLocation,
			scrollwheel: false, 
			mapTypeControl: false, 
			streetViewControl: false, 
			disableDefaultUI: true,
			styles:
			[{"featureType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"lightness":-100}]}]
		 	};

	return new google.maps.Map(document.getElementById("map"), pgOptions);	
}

function toggleEmailThankYou()
{
	// Clear email
	$('.subscriber-email').val(undefined);

	var currentValue = $('.subscribe-section h2').html();

	// Animate message
	$('.subscribe-section h2').fadeOut(function() {

		if (currentValue.indexOf('ShoutOut') != -1)
		{
			$(this).html('Thank you.');
		}
		else if (currentValue.indexOf('Again') == -1)
		{
			$(this).html(currentValue + ' Again.');
		}
		else
		{
			$(this).html(currentValue + ' And Again.');
		}

		// Show new message
		$(this).fadeIn();
	});
}

function resetMenu()
{
	// Fixed chrome rendering issue
	$('.top-bar').hide();
	setTimeout(function(){
		$('.top-bar').show();
	}, 1);
}

function isValidEmail(email) 
{
    var filter = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email)) 
    	return false;
	else
		return true;
}

function isIphone()
{
	if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) 
		return true;
	else
		return false;
}