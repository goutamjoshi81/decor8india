<?php
// Decor8 India - Database Configuration & Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Credentials (Update with your GoDaddy cPanel MySQL details)
define('DB_HOST', 'localhost');
define('DB_USER', 'decor8_user');       // Replace with your GoDaddy MySQL username
define('DB_PASS', 'Decor8#India2026');   // Replace with your GoDaddy MySQL password
define('DB_NAME', 'decor8_db');         // Replace with your GoDaddy MySQL database name

function getDbConnection() {
    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]);
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database Connection Failed: " . $e->getMessage()]);
        exit();
    }
}
?>
