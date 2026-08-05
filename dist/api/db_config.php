<?php
// Decor8 India - GoDaddy MySQL Database Configuration

define('DB_HOST', 'localhost');
define('DB_USER', 'decor8india'); 
define('DB_PASS', 'decor8india2018'); 
define('DB_NAME', 'decor8_db'); 

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
    // Try exact configured credentials first
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        return new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (\PDOException $e) {
        // Output clean JSON error response so client can inspect exact reason
        http_response_code(200); // Send 200 so Chrome Response tab displays JSON instead of empty 500
        echo json_encode([
            "success" => false,
            "message" => "MySQL Connection Error on GoDaddy. Check db_config.php or cPanel user privileges.",
            "error_details" => $e->getMessage(),
            "attempted_user" => DB_USER,
            "attempted_db" => DB_NAME
        ]);
        exit();
    }
}
?>