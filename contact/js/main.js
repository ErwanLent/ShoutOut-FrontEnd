$(document).ready(function() 
{

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
  		if (isShowing && $(window).width() > 450)
  		{
  			$('.top-bar ul').removeAttr('style');
			$('.top-bar li').removeAttr('style');
			isShowing = false;

			resetMenu();
  		}
	});

	setTimeout(function(){
		$('.pin').show();
	}, 200);

	var isErrorBoxShowing = false;

	$('#email-submit').click(function(){

		var email = $('#email-input').val();
		var name = $('#name-input').val();
		var message = $('#message-input').val();

		if (!isErrorBoxShowing && ((name.length < 1) || (message.length < 1) || !checkEmail(email)))
		{
			$('.error-field').slideToggle();
			isErrorBoxShowing = true;
		}
		else
		{
			$.post("/php/ContactUs.php", { name: name,  email: email, message: message });
			$('.form').slideToggle('slow', function(){
				$('.sent').show();
				$('.contents').hide();
				$('.form').slideToggle();
			});
		}
	});

});

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
