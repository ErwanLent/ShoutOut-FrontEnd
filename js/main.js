$(document).ready(function() 
{
	var latitude = 34.4258;
	var longitude = -119.7142;

	var map = loadMap();

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

	
	var margin = 72;
	var state = "right";

	setInterval(function(){
		switch(state)
		{
			case "right":
			  	$('.chatroom-slider').css('margin-left', margin);
			  	state = "left";
			  	break;
			case "left":
			  	$('.chatroom-slider').css('margin-left', margin * -1);
			  	state = "reset";
			 	break;
			 case "reset":
			 	$('.chatroom-slider').css('margin-left', 0);
			 	state = "right";
			 	break;
		}
	}, 1500);
	
});

function loadMap()
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