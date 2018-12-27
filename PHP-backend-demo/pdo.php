<?php
// This is the connection object for database
// localhost=127.0.0.1; port 3306 for xamp/linux, 8889 for mac
// This also sets mode for errors, should be changed for production!
// See the "errors" folder for detail
require_once('./db_variables.php');

$pdo_conn = new PDO("mysql:host=$db_host;port=$db_port;dbname=$db_name", $db_user, $db_password);
$pdo_conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$pdo_conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>