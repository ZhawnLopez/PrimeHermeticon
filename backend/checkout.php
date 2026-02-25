<?php
header('Content-Type: application/json; charset=utf-8');

try {
    session_start();
    require_once(__DIR__ . '/config.php');

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(["success" => false, "message" => "Method not allowed."]);
        exit();
    }

    if (!isset($_SESSION["id"])) {
        echo json_encode(["success" => false, "message" => "Not logged in"]);
        exit();
    }

    $user_id = intval($_SESSION["id"]);

    $stmt = $con->prepare("SELECT order_id, total_amount FROM orders WHERE user_id = ? AND status = 'pending' LIMIT 1");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $order = $stmt->get_result()->fetch_assoc();

    if (!$order) {
        echo json_encode(["success" => false, "message" => "Cart is empty."]);
        exit();
    }

    $order_id = $order['order_id'];

    $stmt = $con->prepare("SELECT COUNT(*) as cnt FROM order_items WHERE order_id = ?");
    $stmt->bind_param("i", $order_id);
    $stmt->execute();
    $cnt = $stmt->get_result()->fetch_assoc()['cnt'];

    if ($cnt === 0) {
        echo json_encode(["success" => false, "message" => "Cart is empty."]);
        exit();
    }

    $stmt = $con->prepare("
        SELECT COALESCE(SUM(oi.quantity * oi.price), 0) AS total
        FROM order_items oi WHERE oi.order_id = ?
    ");
    $stmt->bind_param("i", $order_id);
    $stmt->execute();
    $total = $stmt->get_result()->fetch_assoc()['total'];

    $stmt = $con->prepare("UPDATE orders SET status = 'completed', total_amount = ? WHERE order_id = ?");
    $stmt->bind_param("di", $total, $order_id);
    $stmt->execute();

    echo json_encode(["success" => true, "message" => "Order placed!", "order_id" => $order_id]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Server error: " . $e->getMessage()]);
}
?>