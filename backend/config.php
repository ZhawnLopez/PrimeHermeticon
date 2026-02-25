<?php
$host     = "localhost";
$username = "root";
$password = "";
$database = "hermeticart_db";

$con = new mysqli($host, $username, $password, $database);

if ($con->connect_error) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error"   => "Database connection failed: " . $con->connect_error
    ]);
    exit();
}
?>