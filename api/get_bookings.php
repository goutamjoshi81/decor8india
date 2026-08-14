<?php
require_once 'db_config.php';

try {
    $pdo = getDbConnection();
    $stmt = $pdo->query("SELECT * FROM bookings ORDER BY created_at DESC");
    $rawBookings = $stmt->fetchAll();

    $mappedBookings = array_map(function($b) {
        return [
            "id" => $b["id"],
            "clientName" => $b["client_name"] ?? '',
            "client_name" => $b["client_name"] ?? '',
            "clientEmail" => $b["client_email"] ?? '',
            "client_email" => $b["client_email"] ?? '',
            "clientPhone" => $b["client_phone"] ?? '',
            "client_phone" => $b["client_phone"] ?? '',
            "serviceType" => $b["service_type"] ?? 'Residential',
            "service_type" => $b["service_type"] ?? 'Residential',
            "packageName" => $b["package_name"] ?? 'Architectural Consultation',
            "package_name" => $b["package_name"] ?? 'Architectural Consultation',
            "preferredDate" => $b["preferred_date"] ?? '',
            "preferred_date" => $b["preferred_date"] ?? '',
            "requirements" => $b["requirements"] ?? '',
            "floorPlanUrl" => $b["floor_plan_url"] ?? null,
            "floor_plan_url" => $b["floor_plan_url"] ?? null,
            "estimatedCost" => isset($b["estimated_cost"]) ? (float)$b["estimated_cost"] : 650000.0,
            "estimated_cost" => isset($b["estimated_cost"]) ? (float)$b["estimated_cost"] : 650000.0,
            "isEmiRequested" => !empty($b["is_emi_requested"]),
            "is_emi_requested" => !empty($b["is_emi_requested"]),
            "status" => $b["status"] ?? 'Pending Approval',
            "createdAt" => $b["created_at"] ?? date('Y-m-d H:i:s'),
            "created_at" => $b["created_at"] ?? date('Y-m-d H:i:s'),
            "contractPrice" => isset($b["contract_price"]) ? (float)$b["contract_price"] : null,
            "contract_price" => isset($b["contract_price"]) ? (float)$b["contract_price"] : null

        ];
    }, $rawBookings);

    echo json_encode([
        "success" => true,
        "count" => count($mappedBookings),
        "bookings" => $mappedBookings
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
