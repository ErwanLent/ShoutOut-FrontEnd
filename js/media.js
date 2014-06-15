$(document).ready(function() 
{
	/*=====================================================================================
		Responsive Hamburger Menu
	=======================================================================================*/

	var isShowing = false;

	$('.icon-list').click(function(){
		if (!isShowing)
		{
			openMenu();
			isShowing = true;
		}
		else
		{
			$('.top-bar li').slideToggle(function() {
				closeMenu();
			});

			isShowing = false;
		}
	});

	// Close Menu On Item Click
	$('.top-bar li a').click(function(){
		closeMenu();
		isShowing = false;
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
				isShowing = false;

			$('.top-bar li').slideToggle(function() {
				closeMenu();

				var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

				if (isChrome)
				{
					// Fixes chrome rendering bug
					$('.top-bar').hide();
					setTimeout(function(){
						$('.top-bar').show();
					}, 10);
				}
			});
			}
	});

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
});

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

function isValidEmail(email) 
{
    var filter = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email)) 
    	return false;
	else
		return true;
}

function closeMenu()
{
	$('.top-bar').css('max-height', '50px');

	$('.top-bar ul').removeAttr('style');
	$('.top-bar li').removeAttr('style');
}

function openMenu()
{
	$('.top-bar').removeAttr('style');

	$('.top-bar ul').css('float', 'none');
	$('.top-bar ul').css('display', 'block');
	$('.top-bar li').css('text-align', 'center');

	$('.top-bar li').slideToggle();
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