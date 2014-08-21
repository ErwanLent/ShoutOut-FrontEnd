$('document').ready(function(){
	var urlParts = window.location.pathname.split( '/' );
	var inviteKey = urlParts[urlParts.length - 1];

	var isIos = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

	if (isIos)
	{
		document.location = 'ShoutOut://?inviteCode=' + inviteKey;
		setTimeout( function() {
			$('.pending').hide();
			$('.not-installed').removeClass('hidden');
		    document.location = 'https://itunes.apple.com/us/app/shoutout-location-based-chatrooms/id895254896?ls=1&mt=8';
		}, 800);
	}
	else
	{
		$('.pending').hide();
		$('.not-installed').removeClass('hidden');
	}
});