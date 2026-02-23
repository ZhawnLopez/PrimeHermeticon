<?php

header("Content-Type: application/json");

$servername = "localhost";      
$username = "root";             
$password = "";                 
$dbname = "hermeticart_db";         

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

$sql = "SELECT product_id, name, price, image_url, description, stock_quantity FROM products ORDER BY product_id ASC";
$result = $conn->query($sql);

$products = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

echo json_encode($products);

$conn->close();
?>