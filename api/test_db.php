<?php
// Decor8 India - Diagnostic Database Test Script
// Open this URL directly in browser: https://decor8india.com/api/test_db.php

// Disable error suppression to catch all PHP details
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json; charset=UTF-8");

require_once 'db_config.php';

$response = [
    "php_version" => PHP_VERSION,
    "db_host" => DB_HOST,
    "db_user" => DB_USER,
    "db_name" => DB_NAME,
    "status" => "FAILED",
    "tables" => [],
    "booking_count" => 0
];

try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    
    $response["status"] = "SUCCESS! Connected to GoDaddy MySQL Database.";
    
    $tablesStmt = $pdo->query("SHOW TABLES");
    $tables = $tablesStmt->fetchAll(PDO::FETCH_COLUMN);
    $response["tables"] = $tables;

    if (in_array('bookings', $tables)) {
        $bkStmt = $pdo->query("SELECT COUNT(*) FROM bookings");
        $response["booking_count"] = (int)$bkStmt->fetchColumn();
    } else {
        $response["booking_count"] = "WARNING: 'bookings' table is missing! Please import api/schema.sql in phpMyAdmin.";
    }

} catch (\PDOException $e) {
    $response["status"] = "DATABASE CONNECTION ERROR";
    $response["error_message"] = $e->getMessage();
    $response["solution_hint"] = "In cPanel MySQL Databases: 1) Verify user '" . DB_USER . "' is added to database '" . DB_NAME . "', 2) Ensure ALL PRIVILEGES are granted.";
}

echo json_encode($response, JSON_PRETTY_PRINT);
?>
