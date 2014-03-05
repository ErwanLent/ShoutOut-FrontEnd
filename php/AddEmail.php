<?php

	// Get POST Variables
	$email = htmlspecialchars($_REQUEST['email']);

	try
	{
		$link = connect();

		// SQL Insert User
		$sqlCommand = "INSERT INTO `email`(`id`, `Email_Address`) VALUES (NULL, '$email')";
		mysql_query($sqlCommand);

		mysql_close($link);

		echo("True");
	}
	catch (Exception $e)
	{
		echo("False");
	}

	function connect()
	{
		$mysql_host = "localhost";
	    $mysql_database = "ShoutOut";
	    $mysql_user = "root";
	    $mysql_password = "";
	 
	    $link = mysql_connect("$mysql_host","$mysql_user","$mysql_password") or die ("cannot connect to server");
	    mysql_select_db("$mysql_database")or die("cannot select database");
	    
	    return $link;
	}
?>