<?php
// Decor8 India - GoDaddy MySQL Database Configuration
// IMPORTANT: Update DB_USER, DB_PASS, DB_NAME below with your exact GoDaddy cPanel MySQL details!

define('DB_HOST', 'localhost');
define('DB_USER', 'decor8_user');
define('DB_PASS', 'Decor8#India2026'); // Replace with your GoDaddy MySQL Password
define('DB_NAME', 'decor8_db');     // Replace with your GoDaddy MySQL Database Name

// Enable CORS for frontend React requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

function getDbConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        return new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (\PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Database connection error. Please verify DB_USER, DB_PASS, DB_NAME in public_html/api/db_config.php on GoDaddy.",
            "error" => $e->getMessage()
        ]);
        exit();
    }
}
?>