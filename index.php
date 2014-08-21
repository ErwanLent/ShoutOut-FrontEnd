<?php

	if(strstr($_SERVER['HTTP_USER_AGENT'],'iPhone') || strstr($_SERVER['HTTP_USER_AGENT'],'iPod'))
	 {
	  header('Location: https://itunes.apple.com/us/app/shoutout-location-based-chatrooms/id895254896?ls=1&mt=8');
	  exit();
	}

	$template = file_get_contents("template.html");

	echo $template;
?>