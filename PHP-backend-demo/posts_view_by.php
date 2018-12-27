<?php
session_start();
require_once('pdo.php');
error_log("***********");
error_log("POSTS GET all: from ".session_id()." state:".json_encode($_SESSION));

$payload = array('response' => 'false', 'data' => array());
if ($_SERVER["REQUEST_METHOD"] == "GET")
{
    $query = $_GET['u'];
	if (isset($_GET['u'])
		&& ctype_alpha($query)
		&& strlen($query) > 1
		&& strlen($query) < 13)
    { 
        $sql_ask_user = "SELECT users.user_id, users.img_link AS creator_logo FROM users WHERE users.username=:user";
        $sql_ask_posts = "SELECT posts.* FROM posts WHERE posts.creator_id = :userid ORDER BY posts.edited DESC LIMIT 10";
        $statement = $pdo_conn->prepare($sql_ask_user);
        try
        {
            $statement->execute(array(":user" => $query));
            $row = $statement->fetch(PDO::FETCH_ASSOC);
            if (empty($row) === true)
            {
                //no such user
                error_log("GET /posts/$query - empty response");
            }
            else
            {
                // prep user for sending
                $payload['response'] = true;
                $payload['data']['creator_name'] = $query;
                $payload['data']['creator_logo'] = $row['creator_logo'];
                $payload['data']['posts'] = [];
                error_log("GET /posts/$query - full response");

                //get posts
                $statement = $pdo_conn->prepare($sql_ask_posts);
                $statement->execute(array(":userid" => $row['user_id']));
                $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
                $payload['data']['posts'] = $rows;
            }
        }
        catch(PDOException $e) {
            error_log("PDOException getting posts: ".$e->getCode());
            $payload['response']="false";
        }
    }
}

header("Content-type: application/json");
echo json_encode($payload);
exit();
?>