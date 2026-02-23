<?php
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hermeticart_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

/*
    Daily random logic:
    use the current date
    same product for the whole day.
*/
$today = date('Y-m-d');
$seed = crc32($today);

$sql = "SELECT product_id, name, price, image_url, description
        FROM products
        ORDER BY RAND($seed)
        LIMIT 1";

$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode(null);
}

$conn->close();
?>