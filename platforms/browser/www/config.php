<?php
	define("connect_v",2);
	if(connect_v==1)
	{
		require "logic/connect.php";
	}
	else if(connect_v==2)
	{
		require "logic/uconnect.php";
		require "logic/UniversalServer.php";
	}
	//require "logic/DBConnect.php";
	//$defdb=new DBConnect(DB_MYSQL,"localhost","root","","calendar");
	require "logic/UnitTestDBConnect.php";
	$defdb=new UnitTestDBConnect(DB_MYSQL,"localhost","root","","calendar");
	$sys_url="http://localhost/Office/Calendar/";
	$server_name="estate1";
	
	UniversalServer::$root="D:/xampp/htdocs/Enterprise/Estate/";
	//UniversalConnection::$apsi="";
	
	//$uc=new UniversalConnection();
	$uc=new stdClass();
	$uc->uid="debug_uid";
?>