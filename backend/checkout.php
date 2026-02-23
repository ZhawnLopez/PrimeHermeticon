<?php
header('Content-Type: application/json; charset=utf-8');

ini_set('display_errors', 1);
error_reporting(E_ALL);

$logFile = __DIR__ . '/checkout_error.log';

function dev_log($msg) {
    global $logFile;
    error_log("[".date('Y-m-d H:i:s')."] " . $msg . PHP_EOL, 3, $logFile);
}

try {
    session_start();
    if (!file_exists(__DIR__ . '/config.php')) {
        dev_log("config.php not found at " . __DIR__ . "/config.php");
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Server misconfiguration (config missing)."]);
        exit();
    }

    require_once(__DIR__ . '/config.php'); 
    if (!isset($con) || !($con instanceof mysqli)) {
        dev_log("config.php did not create \$con (mysqli). \$con=" . var_export(isset($con) ? $con : null, true));
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Server misconfiguration (DB connection)."]);
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(["success" => false, "message" => "Method not allowed. Use POST."]);
        exit();
    }

    if (!isset($_SESSION["id"])) {
        echo json_encode(["success" => false, "message" => "Not logged in"]);
        exit();
    }

    $user_id = intval($_SESSION["id"]);

    if (!$con->begin_transaction()) {
        $err = "begin_transaction failed: " . $con->error;
        dev_log($err);
        throw new Exception($err);
    }

    $sql = "
        SELECT c.product_id, c.quantity, p.price
        FROM cart c
        JOIN products p ON c.product_id = p.product_id
        WHERE c.user_id = ?
    ";

    $stmt = $con->prepare($sql);
    if (!$stmt) {
        $err = "prepare(select cart) failed: " . $con->error;
        dev_log($err);
        throw new Exception($err);
    }

    $stmt->bind_param("i", $user_id);
    if (!$stmt->execute()) {
        $err = "execute(select cart) failed: " . $stmt->error;
        dev_log($err);
        throw new Exception($err);
    }

    $res = $stmt->get_result();
    $cartItems = [];
    $total = 0.0;
    while ($row = $res->fetch_assoc()) {
        $cartItems[] = $row;
        $total += floatval($row['price']) * intval($row['quantity']);
    }

    if (count($cartItems) === 0) {
        $con->rollback();
        echo json_encode(["success" => false, "message" => "Cart is empty."]);
        exit();
    }

    $ins = $con->prepare("INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, 'pending')");
    if (!$ins) {
        $err = "prepare(insert order) failed: " . $con->error;
        dev_log($err);
        throw new Exception($err);
    }

    $ins->bind_param("id", $user_id, $total);
    if (!$ins->execute()) {
        $err = "execute(insert order) failed: " . $ins->error;
        dev_log($err);
        throw new Exception($err);
    }

    $order_id = $con->insert_id;

    $del = $con->prepare("DELETE FROM cart WHERE user_id = ?");
    if (!$del) {
        $err = "prepare(delete cart) failed: " . $con->error;
        dev_log($err);
        throw new Exception($err);
    }
    $del->bind_param("i", $user_id);
    if (!$del->execute()) {
        $err = "execute(delete cart) failed: " . $del->error;
        dev_log($err);
        throw new Exception($err);
    }

    if (!$con->commit()) {
        $err = "commit failed: " . $con->error;
        dev_log($err);
        throw new Exception($err);
    }

    echo json_encode(["success" => true, "message" => "Order placed!", "order_id" => $order_id]);
    exit();

} catch (Exception $e) {
    if (isset($con) && ($con instanceof mysqli)) {
        @$con->rollback();
    }

    dev_log("Exception in checkout.php: " . $e->getMessage() . " Trace: " . $e->getTraceAsString());

    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Server error during checkout. See server log."]);
    exit();
}
?>