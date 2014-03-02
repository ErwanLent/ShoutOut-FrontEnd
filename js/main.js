$(document).ready(function() 
{
	/*=====================================================================================
		Add Smooth Scrolling For Windows Webkit Users
	=======================================================================================*/
	if (navigator.userAgent.indexOf('Windows') != -1 && 
		navigator.userAgent.indexOf('WebKit') != -1)
	{
		var smoothScrollingScript = document.createElement('script');
		smoothScrollingScript.src = '/js/smoothscroll.js';

		var firstScript = document.getElementsByTagName('script')[0];
		firstScript.parentNode.insertBefore(smoothScrollingScript, firstScript);
	}

	/*=====================================================================================
		Load Map With Santa Barbara Coordinates
	=======================================================================================*/

	var latitude = 34.4258;
	var longitude = -119.7142;

	var map = loadMap(latitude, longitude);

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

	setInterval(function(){
		// Reset longitude at end of map
		if ((longitude + .1) >= 180)
			longitude = -180;

		longitude += .03;
		map.setCenter(new google.maps.LatLng(latitude, longitude));
	}, 10);

	
	/*=====================================================================================
		Hangle iPhone Chatroom Sliding Animation
	=======================================================================================*/

	var marginRight = 72;
	var marginLeft = 145;
	var state = "right";

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
		Handle Content Animations Based On Scroll Location
	=======================================================================================*/
	
	var isFirstContentShowing = false;
	var isSecondContentShowing = false;

	$(window).scroll(function() {
	    var height = $(window).scrollTop();

	    if(!isFirstContentShowing && height  > 100) {
	    	isFirstContentShowing = true;
	        $('.animation-container').removeClass('hidden');
	        $('.right-column').removeClass('hidden');
	    }

	    if(!isSecondContentShowing && height  > 850) {
	    	isSecondContentShowing = true;
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