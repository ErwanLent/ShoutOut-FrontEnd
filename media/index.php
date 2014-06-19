<?php
	include "../cms/php/connect.php";

    $template = file_get_contents("template.html");

    /*
    	Dear developers looking at this,
    	A CMS had to be made overnight. Ignore the horrible table structure. 
    	I'm an ASP.NET developer anyway.. I just needed a quick linux alternative (should have used Node instead of php, gross).
    	Sincerest apologies,
    	Erwan
    */

    // Pull first title
	$first_title_query = mysql_query("SELECT `content` FROM `media_page` WHERE `name` = 'title_one'");
	$first_title_array = mysql_fetch_array($first_title_query);

	$first_title = $first_title_array["content"];

	// Pull first content
	$first_content_query = mysql_query("SELECT `content` FROM `media_page` WHERE `name` = 'content_one'");
	$first_content_array = mysql_fetch_array($first_content_query);

	$first_content = $first_content_array["content"];

	// Update content
	$template = str_replace("<%FIRST_TITLE%>", $first_title, $template);
	$template = str_replace("<%FIRST_CONTENT%>", $first_content, $template);

    echo $template;
?>