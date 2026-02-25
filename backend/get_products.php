<?php
header('Content-Type: application/json');
session_start();
require_once("config.php");

$result = $con->query("
    SELECT product_id, name, price, image_url, description, stock_quantity, product_type
    FROM products
    ORDER BY product_id ASC
");

$products = [];
while ($row = $result->fetch_assoc()) {
    $row['image_url'] = trim($row['image_url']);
    $products[] = $row;
}

echo json_encode($products);
?>