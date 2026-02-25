<?php
header('Content-Type: application/json');
session_start();
require_once("config.php");

if (!isset($_SESSION["id"])) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit();
}

$user_id    = $_SESSION["id"];
$product_id = intval($_POST["product_id"] ?? 0);

if ($product_id <= 0) {
    echo json_encode(["success" => false, "message" => "Invalid product"]);
    exit();
}

$stmt = $con->prepare("SELECT order_id FROM orders WHERE user_id = ? AND status = 'pending' LIMIT 1");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$row = $stmt->get_result()->fetch_assoc();

if (!$row) {
    echo json_encode(["success" => true]);
    exit();
}

$order_id = $row['order_id'];

$stmt = $con->prepare("DELETE FROM order_items WHERE order_id = ? AND product_id = ?");
$stmt->bind_param("ii", $order_id, $product_id);
$stmt->execute();

$stmt = $con->prepare("
    UPDATE orders SET total_amount = (
        SELECT COALESCE(SUM(oi.quantity * oi.price), 0) FROM order_items oi WHERE oi.order_id = ?
    ) WHERE order_id = ?
");
$stmt->bind_param("ii", $order_id, $order_id);
$stmt->execute();

echo json_encode(["success" => true]);
?>