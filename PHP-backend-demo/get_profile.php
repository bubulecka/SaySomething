<?php
session_start();
require_once('pdo.php');
error_log("***********");
error_log("Profile get: from ".session_id()." state:".json_encode($_SESSION));

$payload = array('response' => 'false', 'profile' => array());
if ($_SERVER["REQUEST_METHOD"] == "GET")
{
    // check is active session
    if(isset($_SESSION['user_id']))
    { 
        $sql_ask = "SELECT username, users.img_link AS user_logo, users.created, COUNT(posts.post_id) AS total_posts 
        FROM users JOIN posts ON users.user_id = posts.creator_id WHERE user_id = :uid";
        $statement = $pdo_conn->prepare($sql_ask);
        try
        {
            $statement->execute(array(":user" => $_SESSION['user_id']));
            $row = $statement->fetch(PDO::FETCH_ASSOC);
            if (empty($row) === true)
            {
                //no such user?
                error_log("GET /posts/$query - empty response");
            }
            else
            {
                $payload['response'] = true;
                $payload['profile']= $row;
                error_log("GET profile - full response");
            }
        }
        catch(PDOException $e) {
            error_log("PDOException getting profile: ".$e->getCode());
            $payload['response']="false";
        }
    }
}

header("Content-type: application/json");
echo json_encode($payload);
exit();
?>