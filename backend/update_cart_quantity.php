<?php
session_start();
require_once("config.php");

if (!isset($_SESSION["id"])) {
    exit();
}

$user_id = $_SESSION["id"];
$product_id = intval($_POST["product_id"]);
$quantity = intval($_POST["quantity"]);

if ($quantity <= 0) {
    $stmt = $con->prepare("DELETE FROM cart WHERE user_id = ? AND product_id = ?");
    $stmt->bind_param("ii", $user_id, $product_id);
} else {
    $stmt = $con->prepare("UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?");
    $stmt->bind_param("iii", $quantity, $user_id, $product_id);
}

$stmt->execute();
echo json_encode(["success" => true]);
?>