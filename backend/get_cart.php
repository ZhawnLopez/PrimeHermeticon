<?php
session_start();
require_once("config.php");

if (!isset($_SESSION["id"])) {
    echo json_encode([]);
    exit();
}

$user_id = $_SESSION["id"];

$stmt = $con->prepare("
    SELECT p.product_id, p.name, p.price, p.image_url, c.quantity
    FROM cart c
    JOIN products p ON c.product_id = p.product_id
    WHERE c.user_id = ?
");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$cart = [];

while ($row = $result->fetch_assoc()) {
    $cart[] = $row;
}

echo json_encode($cart);
?>