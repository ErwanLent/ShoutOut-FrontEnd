$(document).ready(function() 
{
	/*=====================================================================================
		About Scrolling Animation
	=======================================================================================*/

		$('#about').click(function() {
			$('html, body').stop().animate({
				scrollTop: $('.about').offset().top - 50
			}, 700, 'easeInOutQuad');
		});


	/*=====================================================================================
		Load Map With Santa Barbara Coordinates
	=======================================================================================*/

	if(!isIphone())
	{
		var latitude = 34.4258;
		var longitude = -119.7142;

		var map = loadMap(latitude, longitude);
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

	if(!isIphone())
	{
		setInterval(function(){
			// Reset longitude at end of map
			if ((longitude + .1) >= 180)
				longitude = -180;

			longitude += .03;
			map.setCenter(new google.maps.LatLng(latitude, longitude));
		}, 10);
	}

	
	/*=====================================================================================
		Hangle iPhone Chatroom Sliding Animation
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
		Responsive Hamburger Menu
	=======================================================================================*/
	var isShowing = false;
	$('.icon-list').click(function(){
		if (!isShowing)
		{
			$('.top-bar ul').css('float', 'none');
			$('.top-bar ul').css('display', 'block');
			$('.top-bar li').css('text-align', 'center');
			$('.top-bar li').css('display', 'block');
			isShowing = true;
		}
		else
		{
			$('.top-bar ul').removeAttr('style');
			$('.top-bar li').removeAttr('style');
			isShowing = false;

			resetMenu();
		}
	});

	// Close Menu On Item Click
	$('.top-bar li a').click(function(){
		$('.top-bar ul').removeAttr('style');
		$('.top-bar li').removeAttr('style');
		isShowing = false;

		resetMenu();
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
  			$('.top-bar ul').removeAttr('style');
			$('.top-bar li').removeAttr('style');
			isShowing = false;

			resetMenu();
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

function isSubscribed()
{
	if (getSubscribedCookie() == "true")
		return true;
	else
		return false;
}

function setSubscribedCookie(value)
{
	var date = new Date();
	date.setDate(date.getDate() + 365);
	var expires = "expires=" + date.toGMTString();
	document.cookie = "Subscribed_Cookie" + "=" + value + "; " + expires;
}

function getSubscribedCookie()
{
	var name = "Subscribed_Cookie" + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		  var c = ca[i].trim();
		  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	  }
	return "";
}

function resetMenu()
{
	// Fixed chrome rendering issue
	$('.top-bar').hide();
	setTimeout(function(){
		$('.top-bar').show();
	}, 1);
}

function checkEmail(email) 
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