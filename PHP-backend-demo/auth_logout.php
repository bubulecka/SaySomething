<?php
session_start();

// it doesn't matter which request we got, could be any other
if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    error_log("Logout request for sessionID: ".session_id());
    if (isset($_SESSION['account'])) error_log("Logged out ".$_SESSION['account']);
    else error_log("Logged out Anonymous");

    session_destroy();

    // respond
    $payload = array('auth' => 'false', 'message' => 'Logged out');
    header("Content-type: application/json");
    echo json_encode($payload);
    return;
}
?>