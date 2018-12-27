<?php 
// $_SESSION['account'] has username
// $_SESSION['user_id'] has user_id
session_start();
require_once("pdo.php"); //gets access to $pdo_conn connection object
error_log("***********");
error_log("POSTS GET all: from ".session_id()." state:".json_encode($_SESSION));

//prep response
$payload = array('auth' => 'false', 'message' => 'bad request');
if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	// check username
	if (!isset($_POST["username"])
		|| !ctype_alpha($_POST['username']) 
		|| strlen($_POST['username']) < 4 
		|| strlen($_POST['username']) > 12) 
	{
		$payload['message']="Username and password are required";
		error_log("Registration failed. Bad username: ".$_POST['username']);
	}
	// check password
	elseif (!isset($_POST["password"]) 
		|| strlen($_POST["password"]) < 4
		|| strlen($_POST["password"]) > 12
		) 
	{
		$payload['message']="Username and password are required";
		error_log("Registration failed. Bad password: ".$_POST["password"]);
	}
	else
	{
		$options = ['cost' => 12];
		$check = password_hash($_POST['password'], PASSWORD_BCRYPT, $options);

		$sql_ask = 'INSERT INTO users (username, password, img_link) VALUES (:user, :pwd, :img)';
        $statement = $pdo_conn->prepare($sql_ask);
        try
		{
			$username = $_POST['username'];
			$default_img = "https://robohash.org/$username.png?size=100x100&set=set4";
            $statement->execute(array( ':user' => $username, ':pwd' => $check, ':img' => $default_img));
            $id = $pdo_conn->lastInsertId();
			
			//confirm insert
			$sql_confirm = "SELECT * FROM users WHERE user_id = :uid";
			$statement = $pdo_conn->prepare($sql_confirm);
			$statement->execute(array(':uid' => $id));
			$row = $statement->fetch(PDO::FETCH_ASSOC);
			if (empty($row) === true) // No such user
			{
				$payload['message']="Something went wrong";
				error_log("Registration check failed. No such id: ".$id);
			}
			else {
				// registration successfull
				$_SESSION['account'] = $username;
				$_SESSION['user_id'] = $id;
				
				$payload['auth'] = true;
				$payload['message'] = "Success";
				$payload['profile']["username"] = $row['username'];
				$payload['profile']["img_link"] = $row['img_link'];
				$payload['profile']["created"] = $row['created'];
				error_log("Registration successful ".json_encode($_SESSION));
			}
        }
        catch(PDOException $e) {
            error_log("PDOException during Registration: ".$e->getCode());
            $payload['message']="Something went wrong";
			error_log("Registration failed for username: ".$_POST['username']);
        }
	}
}
header("Content-type: application/json");
echo json_encode($payload);
exit();
?>