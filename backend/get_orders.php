<?php
require_once("admin_check.php");

$result = $con->query("
    SELECT
        o.order_id,
        u.username,
        u.email,
        o.total_amount,
        o.status,
        o.order_date,
        COUNT(oi.id) AS item_count
    FROM orders o
    JOIN users u ON o.user_id = u.user_id
    LEFT JOIN order_items oi ON o.order_id = oi.order_id
    GROUP BY o.order_id
    ORDER BY o.order_date DESC
");

$orders = [];
while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

echo json_encode($orders);
?>