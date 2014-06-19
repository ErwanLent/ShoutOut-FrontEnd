<?php
	include "../cms/php/connect.php";

	$page = "";

	if (isset($_GET["page"]))
	{
		$page = $_GET["page"];
	}
	else
	{
		header("location: /");
	}

	/*
    	Dear developers looking at this,
    	A CMS had to be made overnight. Ignore the horrible table structure. 
    	I'm an ASP.NET developer anyway.. I just needed a quick linux alternative (should have used Node instead of php, gross).
    	Sincerest apologies,
    	Erwan
    */

    $template = file_get_contents("template.html");

	// Get content of page
	$page_content_query = mysql_query("SELECT `Content`, `Date`  FROM `pages` WHERE `Title` = '$page'");
	$page_content_array = mysql_fetch_array($page_content_query);

	$content = $page_content_array["Content"];
	$date = $page_content_array["Date"];

	// Add validation against non-existent pages
	if (strlen($content) <= 0)
	{
		header("location: /");
	}
	
	// Update content
	$template = str_replace("<%TITLE%>", $page, $template);
	$template = str_replace("<%DATE%>", $date, $template);
    $template = str_replace("<%CONTENT%>", $content, $template);

    echo $template;
?>