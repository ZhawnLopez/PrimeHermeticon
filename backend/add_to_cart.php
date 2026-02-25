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

if ($row) {
    $order_id = $row['order_id'];
} else {
    $stmt = $con->prepare("INSERT INTO orders (user_id, total_amount, status) VALUES (?, 0, 'pending')");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $order_id = $con->insert_id;
}

$stmt = $con->prepare("SELECT id, quantity FROM order_items WHERE order_id = ? AND product_id = ?");
$stmt->bind_param("ii", $order_id, $product_id);
$stmt->execute();
$existing = $stmt->get_result()->fetch_assoc();

if ($existing) {
    $new_qty = $existing['quantity'] + 1;
    $stmt = $con->prepare("UPDATE order_items SET quantity = ? WHERE id = ?");
    $stmt->bind_param("ii", $new_qty, $existing['id']);
    $stmt->execute();
} else {
    $price_stmt = $con->prepare("SELECT price FROM products WHERE product_id = ?");
    $price_stmt->bind_param("i", $product_id);
    $price_stmt->execute();
    $price = $price_stmt->get_result()->fetch_assoc()['price'];

    $stmt = $con->prepare("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, 1, ?)");
    $stmt->bind_param("iid", $order_id, $product_id, $price);
    $stmt->execute();
}

$stmt = $con->prepare("
    UPDATE orders SET total_amount = (
        SELECT SUM(oi.quantity * oi.price) FROM order_items oi WHERE oi.order_id = ?
    ) WHERE order_id = ?
");
$stmt->bind_param("ii", $order_id, $order_id);
$stmt->execute();

echo json_encode(["success" => true]);
?>