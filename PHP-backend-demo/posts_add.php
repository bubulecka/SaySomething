<?php
// expected in POST (username:string, [img_link: url] content:(65k chars))
// expected out (response:bool, data:array<json>)
// $_SESSION['account'] has username
// $_SESSION['user_id'] has user_id
session_start();
require_once('pdo.php');
error_log("***********");
error_log("POSTS ADD: from ".session_id()." state:".json_encode($_SESSION));

// prep response
$payload = array('response' => 'false', 'data' => array());
if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    // Check if user is logged in?
    if (isset($_SESSION['user_id']) && isset($_SESSION['account']) 
        && isset($_POST['username']) && $_SESSION['account']==$_POST['username'])
    {
        // check required fields
        if (isset($_POST['content']) && ($_POST['content'] !== ''))
        {
            // check optional fields
            // $img = isset($_POST['img_link']) ? $_POST['img_link']: "http://placekitten.com/g/200";
            $content = $_POST['content'];
            try 
            {
                // insert data
                $sql_ask_insert = 'INSERT INTO posts (creator_id, content) VALUES (:user, :content)';
                $statement_insert = $pdo_conn->prepare($sql_ask_insert);
                $statement_insert->execute(array(
                    ':user' => $_SESSION['user_id'],
                    ':content' => $content
                ));
                $id = $pdo_conn->lastInsertId();
                
                // send back the inserted data
                $sql_ask_query = "SELECT posts.*, users.username AS creator_name, users.img_link AS creator_logo
                FROM posts JOIN users ON posts.creator_id = users.user_id WHERE posts.post_id= :post_id";
                $statement_get = $pdo_conn->prepare($sql_ask_query);
                $statement_get->execute(array( ':post_id' => $id ));
                $rows = $statement_get->fetchAll(PDO::FETCH_ASSOC);
                if (empty($rows) === true)
                {
                    error_log("POST GET notification - empty response");
                }
                else
                {
                    error_log("POST GET notification - full response");
                    $payload['response'] = true;
                    $payload['data'] = $rows;
                }
            }
            catch(PDOException $e) {
                error_log("PDOException during post creaton: ".$e->getCode());
            }
        }
        else 
        {
            error_log("POST ADD: Empty content");
        }
    }
    else
    {
        error_log("POST ADD: Wrong user");
    }
}

header("Content-type: application/json");
echo json_encode($payload);
exit();
?>