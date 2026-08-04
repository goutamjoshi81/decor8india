<?php
require_once 'db_config.php';

try {
    $pdo = getDbConnection();
    $stmt = $pdo->query("SELECT * FROM bookings ORDER BY created_at DESC");
    $bookings = $stmt->fetchAll();

    echo json_encode([
        "success" => true,
        "count" => count($bookings),
        "bookings" => $bookings
    ]);
} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error fetching bookings from database.",
        "error" => $e->getMessage(),
        "bookings" => []
    ]);
}
?>
