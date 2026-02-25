<?php
require_once("admin_check.php");

$result = $con->query("
    SELECT user_id, username, email, role, created_at
    FROM users
    ORDER BY created_at DESC
");

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode($users);
?>