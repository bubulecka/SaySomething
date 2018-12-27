<?php 
session_start();
require_once("pdo.php");
// $_SESSION['account'] has username
// $_SESSION['user_id'] has user_id
error_log("***********");
error_log("AUTH LOGIN: from ".session_id()." state:".json_encode($_SESSION));
// check if current user is logged in?
if ($_SERVER["REQUEST_METHOD"] == "GET")
{
	$isLoggedIn = false;
	if (isset($_SESSION['user_id'])) {
		$isLoggedIn = true;
	}
	error_log("User is logged in? ".$isLoggedIn);
	header("Content-type: application/json");
	echo json_encode($isLoggedIn);
	return;
}
else if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	// log out currently logged in user
	//session_destroy();

	// prep output
	$payload = array('auth' => 'false', 'message' => 'bad request');
	error_log("GOT: ".$_POST["username"]." ".$_POST["password"]);
	
	// check username
	if (!isset($_POST["username"])
		|| !ctype_alpha($_POST['username']) 
		|| strlen($_POST['username']) < 4 
		|| strlen($_POST['username']) > 12) 
	{
		$payload['message']="Username and password are required";
		error_log("Login fail. Bad username: ".$_POST['username']);
	}
	// check password
	elseif (!isset($_POST["password"]) 
		|| strlen($_POST["password"]) < 4
		|| strlen($_POST["password"]) > 12
		) 
	{
		$payload['message']="Username and password are required";
		error_log("Login fail. Bad password: ".$_POST["password"]);
	}
	else
	{
		// find user by username
		$sql_ask = "SELECT * FROM $db_name.users WHERE username = :user";
		$statement = $pdo_conn->prepare($sql_ask);
		$statement->execute(array(':user' => $_POST['username'])); //username is chars
		$row = $statement->fetch(PDO::FETCH_ASSOC);
		if (empty($row) === true) // No such user
		{
			$payload['message']="Incorrect username or password";
			error_log("Login fail. No such user: ".$_POST['username']);
		}
		else // user found, check password
		{
			// maybe store salt separately and pull it for verification
			$check = password_verify($_POST['password'], $row['password']);
			if ($check === true) //login success
			{
				// save session vars
				$_SESSION['account'] = $_POST['username'];
				$_SESSION['user_id'] = $row['user_id'];
				//session_write_close();
				$payload['auth'] = true;
				$payload['message'] = "Success";
				$payload['profile']["username"] = $_POST['username'];
				$payload['profile']["img_link"] = $row['img_link'];
				$payload['profile']["created"] = $row['created'];
				error_log("Login success ".$_SESSION['user_id'].": ".$_SESSION['account']);
			}
			else
			{
				$payload['message'] = "Incorrect username or password";
				//add a suspicious counter
				error_log("Login fail. Incorrect password attempt for ".$_POST['username']." ".$row['user_id']);
			}
		}
	}
	error_log(json_encode($_SESSION));
	header("Content-type: application/json");
	echo json_encode($payload);
	return;
}
?>