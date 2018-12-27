<?php
session_start();
require_once('pdo.php');
error_log("***********");
error_log("POSTS GET all: from ".session_id()." state:".json_encode($_SESSION));

$payload = array('response' => 'false', 'data' => array());
if ($_SERVER["REQUEST_METHOD"] == "GET")
{
    try {
        // get older posts - loading more option
        if (isset($_GET['from']) && is_numeric($_GET['from'])) {
            $from = $_GET['from'];
            $sql_ask = "SELECT posts.*, users.username AS creator_name, users.img_link AS creator_logo
            FROM posts JOIN users ON posts.creator_id = users.user_id WHERE posts.post_id < :from
            ORDER BY posts.created DESC LIMIT 5";
            $statement = $pdo_conn->prepare($sql_ask);
            $statement->execute(array(':from' => $from));
        }
        else {
            // get the latest
            $sql_ask = "SELECT posts.*, users.username AS creator_name, users.img_link AS creator_logo
            FROM posts JOIN users ON posts.creator_id = users.user_id
            ORDER BY posts.created DESC LIMIT 5";
            $statement = $pdo_conn->prepare($sql_ask);
            $statement->execute();
        }
        $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
        if (empty($rows) === true)
        {
            error_log("GET /posts - empty response");
        }
        else
        {
            $payload['data'] = $rows;
            error_log("GET /posts - full response");
        }
        $payload['response'] = true;
    }
    catch(PDOException $e) {
        error_log("PDOException getting posts: ".$e->getCode());
        $payload['response']="false";
    }
}
header("Content-type: application/json");
echo json_encode($payload);
exit();
?>
