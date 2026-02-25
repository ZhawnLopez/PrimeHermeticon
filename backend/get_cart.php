<?php
header('Content-Type: application/json');
session_start();
require_once("config.php");

if (!isset($_SESSION["id"])) {
    echo json_encode([]);
    exit();
}

$user_id = $_SESSION["id"];

$stmt = $con->prepare("SELECT order_id FROM orders WHERE user_id = ? AND status = 'pending' LIMIT 1");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$row = $stmt->get_result()->fetch_assoc();

if (!$row) {
    echo json_encode([]);
    exit();
}

$order_id = $row['order_id'];

$stmt = $con->prepare("
    SELECT p.product_id, p.name, p.price, p.image_url, oi.quantity
    FROM order_items oi
    JOIN products p ON oi.product_id = p.product_id
    WHERE oi.order_id = ?
");
$stmt->bind_param("i", $order_id);
$stmt->execute();
$result = $stmt->get_result();

$cart = [];
while ($row = $result->fetch_assoc()) {
    $cart[] = $row;
}

echo json_encode($cart);
?>