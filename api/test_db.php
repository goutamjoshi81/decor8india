<?php
// Decor8 India - Diagnostic Database Test Script
// Open this URL in browser: https://decor8india.com/api/test_db.php

require_once 'db_config.php';

header("Content-Type: application/json; charset=UTF-8");

$response = [
    "step_1_php_version" => PHP_VERSION,
    "step_2_connection" => "Testing...",
    "step_3_tables" => [],
    "step_4_booking_count" => 0,
    "step_5_users_count" => 0
];

try {
    $pdo = getDbConnection();
    $response["step_2_connection"] = "SUCCESS! Connected to MySQL database '" . DB_NAME . "' as user '" . DB_USER . "'";
    
    // Check tables
    $tablesStmt = $pdo->query("SHOW TABLES");
    $tables = $tablesStmt->fetchAll(PDO::FETCH_COLUMN);
    $response["step_3_tables"] = $tables;

    // Check bookings count
    if (in_array('bookings', $tables)) {
        $bkStmt = $pdo->query("SELECT COUNT(*) FROM bookings");
        $response["step_4_booking_count"] = (int)$bkStmt->fetchColumn();
    } else {
        $response["step_4_booking_count"] = "ERROR: 'bookings' table does NOT exist in database!";
    }

    // Check users count
    if (in_array('users', $tables)) {
        $usrStmt = $pdo->query("SELECT COUNT(*) FROM users");
        $response["step_5_users_count"] = (int)$usrStmt->fetchColumn();
    } else {
        $response["step_5_users_count"] = "ERROR: 'users' table does NOT exist in database!";
    }

    echo json_encode($response, JSON_PRETTY_PRINT);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "DIAGNOSTIC_FAILURE",
        "error_message" => $e->getMessage(),
        "db_user_attempted" => DB_USER,
        "db_name_attempted" => DB_NAME
    ], JSON_PRETTY_PRINT);
}
?>
