<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['id'])) {
    echo json_encode([
        'logged' => true,
        'user_id' => $_SESSION['id'],
        'username' => isset($_SESSION['name']) ? $_SESSION['name'] : null,
        'role' => isset($_SESSION['role']) ? $_SESSION['role'] : null
    ]);
} else {
    echo json_encode(['logged' => false]);
}