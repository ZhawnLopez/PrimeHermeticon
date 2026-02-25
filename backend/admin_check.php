<?php
header('Content-Type: application/json');
session_start();
require_once("config.php");

if (!isset($_SESSION['id']) || $_SESSION['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(["success" => false, "message" => "Access denied."]);
    exit();
}
?>