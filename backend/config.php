<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "hermeticart_db";

$con = new mysqli($host, $username, $password, $database);

if ($con->connect_error) {
    die("Database connection failed: " . $con->connect_error);
}
?>