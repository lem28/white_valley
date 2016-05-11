<?php
require_once("inc/user.php.inc");
require_once("inc/file.php.inc");

$request = $_POST[request];
$response = "<h1>didn't work :^)";

switch($request)
{
	case "register":
		$json = json_decode(file_get_contents("php://input"));
		$username = $json['reg_username'];
		$password = $_POST['reg_password'];
		$first_name = $_POST['reg_first_name'];
		$last_name = $_POST['reg_last_name'];
		$email = $_POST['reg_email'];
		$login = new user("inc/connect.ini");
		$response = $login->login_user($username, $password);
		if (!$response['success'])
		{
			$login->add_new_user($username,$password,$first_name,$last_name,$email);
			$response = "<p> $username Registered Successfully!";
		}
		else
		{
			$response = "<p>Registration Failed: ".$response['message'];
		}
		break;
	case "login":
		$json = json_decode(file_get_contents("php://input"));
		$username = $_POST['log_username'];
		$password = $_POST['log_password'];
		$login = new user("inc/connect.ini");
		$response = $login->login_user($username, $password);
		if ($response['success'])
		{
			$response = "<p>Login Successful!";
			$_SESSION["user"] = $username;
			header( 'refresh:3; Location: http://127.0.0.1/user.html' ) ;
		}
		else
		{
			$response = "<p>Login Failed: ".$response['message'];
		}
		break;
	case "logout":
		session_unset();
		session_destroy();
		header( 'refresh:3; Location: http://127.0.0.1/index.html' ) ;
		break;
	case "upload":
		$json = json_decode(file_get_contents("php://input"));
		$file = new file("inc/connect.ini");
		$response = $file->file_upload();
		if ($response['success'])
		{
			$response = "<p>File Upload Successful!";
			header( 'refresh:3; Location: http://127.0.0.1/user.html' ) ;
		}
		else
		{
			$response = "<p>File Upload Failed...";
		}
		break;
	case "browse":
		$json = json_decode(file_get_contents("php://input"));
		$file = new file("inc/connect.ini");
		$response = $file->file_browse();
		break;
}
echo $response;
?>