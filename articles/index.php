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

    $template = file_get_contents("template.html");

	// Get content of page
	$page_content_query = mysql_query("SELECT `Content`, `Date`  FROM `pages` WHERE `Title` = '$page'");
	$page_content_array = mysql_fetch_array($page_content_query);

	$content = $page_content_array["Content"];
	$date = $page_content_array["Date"];
	
	// Update content
	$template = str_replace("<%TITLE%>", $page, $template);
	$template = str_replace("<%DATE%>", $date, $template);
    $template = str_replace("<%CONTENT%>", $content, $template);

    echo $template;
?>