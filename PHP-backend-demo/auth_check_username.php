<?php 
session_start(); //no explicit need
require_once("pdo.php"); 

error_log("***********");

// prep response
$payload = array('available' => 'false', 'message' => 'unknown request');
// doesn't have to be POST
if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	// Check input
	if (!isset($_POST["username"])
		//|| preg_match('/\s/',$_POST['username'])
		|| !ctype_alpha($_POST['username']) // TODO expand
		|| strlen($_POST['username']) < 4
		|| strlen($_POST['username']) > 12)
	{ 
		$payload['message'] = "Invalid username";
	} 
	else
	{
		$sql_ask = "SELECT user_id FROM $db_name.users WHERE username = :user";
		$statement = $pdo_conn->prepare($sql_ask);
		$statement->execute(array(':user' => $_POST['username']));
		$row = $statement->fetch(PDO::FETCH_ASSOC);
		
		if (empty($row) === true)  // no rows == no match
		{
			$payload['available'] = true;
			$payload['message'] = strip_tags($_POST['username']);
			error_log("Available username: ".$_POST['username']);
		}
		else // row == match
		{
            $payload['message']="Username is taken.";
            error_log("Username is taken: ".$_POST['username']);
		}

	}
}
header("Content-type: application/json");
echo json_encode($payload);
exit();

/*
htmlentities(); 	"&lt;script&gt;alert(&quot;hello&quot;)&lt;/script&gt; &lt;h1&gt; Hello World &lt;/h1&gt;",
strip_tags();  		"alert(\"hello\")  Hello World "
 */
?>