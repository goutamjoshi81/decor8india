<?php
// Decor8 India - Fetch All Bookings API Endpoint
require_once 'db_config.php';

$pdo = getDbConnection();

try {
    $stmt = $pdo->query("SELECT id, client_name as clientName, client_email as clientEmail, client_phone as clientPhone, service_type as serviceType, package_name as packageName, preferred_date as preferredDate, requirements, floor_plan_url as floorPlanUrl, estimated_cost as estimatedCost, is_emi_requested as isEmiRequested, status, created_at as createdAt FROM bookings ORDER BY created_at DESC");
    $bookings = $stmt->fetchAll();

    echo json_encode([
        "success" => true,
        "bookings" => $bookings
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
