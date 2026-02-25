<?php
session_start();
if (!isset($_SESSION['id'])) { header("Location: login.php"); exit(); }
$username = htmlspecialchars($_SESSION['name']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome — HermetiCart</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/styles.css">
    <meta http-equiv="refresh" content="5;url=main.html">

    <style>
    body {
        min-height:100vh; display:flex; align-items:center;
        justify-content:center; background:#0d0f14;
    }

    .welcome-card {
        background:#13161e;
        border:1px solid rgba(201,168,76,0.2);
        border-radius:24px;
        padding:3.5rem;
        text-align:center;
        max-width:440px;
        width:90%;
        box-shadow:0 40px 80px rgba(0,0,0,0.5);
        position:relative;
        overflow:hidden;
        animation:breathe 7s ease-in-out infinite;
    }

    .welcome-card::before {
        content:'';
        position:absolute;
        top:0; left:20%; right:20%;
        height:1px;
        background:linear-gradient(90deg,transparent,rgba(201,168,76,0.6),transparent);
    }

    .welcome-name {
        font-family:'Cormorant Garamond',serif;
        font-size:2.2rem;
        font-weight:700;
        color:#f0ead6;
        margin-bottom:0.75rem;
    }

    .welcome-sub {
        font-size:0.82rem;
        color:#8a8fa8;
        letter-spacing:0.06em;
        margin-bottom:2.5rem;
        font-family:'DM Sans',sans-serif;
    }

    .spinner {
        width:36px; height:36px;
        border:2px solid rgba(201,168,76,0.15);
        border-top-color:#c9a84c;
        border-radius:50%;
        margin:0 auto;
        animation:spin 0.9s linear infinite;
    }

    @keyframes spin { to { transform:rotate(360deg); } }

    .redirect-hint {
        margin-top:1.25rem;
        font-size:0.72rem;
        color:#3a3f52;
        letter-spacing:0.1em;
        text-transform:uppercase;
        font-family:'DM Sans',sans-serif;
    }
    </style>
</head>
<body>
    <div class="welcome-card">
        <p class="rainbow-text" style="font-size:1rem; margin-bottom:1rem;" data-text="HermetiCart">HermetiCart</p>
        <h1 class="welcome-name">Welcome, <?= $username ?>.</h1>
        <p class="welcome-sub">You are now signed in. Redirecting you to the store…</p>
        <div class="spinner"></div>
        <p class="redirect-hint">Redirecting in 5 seconds</p>
    </div>
</body>
</html>