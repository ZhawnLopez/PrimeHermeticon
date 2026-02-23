<?php
session_start();

if (!isset($_SESSION['id'])) {
    header("Location: login.php");
    exit();
}

$username = htmlspecialchars($_SESSION['name']);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome - HermetiCart</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="../assets/css/styles.css">

    <meta http-equiv="refresh" content="5;url=main.html">
</head>
<body class="bg-gradient-to-br from-purple-600 to-blue-600 min-h-screen flex items-center justify-center">

    <div class="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md text-center">
        <h1 class="text-4xl font-bold mb-4 text-gray-800">Welcome, <?php echo $username; ?>!</h1>
        <p class="text-gray-600 mb-6">You are now logged in as a user. Redirecting you to the main page...</p>

        <div class="loader border-t-4 border-purple-600 border-solid rounded-full w-12 h-12 mx-auto animate-spin"></div>
    </div>

    <style>
        .loader {
            border-width: 4px;
            border-top-color: transparent;
        }
    </style>

</body>
</html>