<?php
require_once 'db_config.php';
require_once 'email_service.php';

try {
    $pdo = getDbConnection();
    $rawInput = file_get_contents("php://input");
    $data = json_decode($rawInput);

    if (!$data) {
        echo json_encode(["success" => false, "message" => "Invalid JSON payload received."]);
        exit();
    }

    if (empty($data->clientName) || empty($data->clientEmail) || empty($data->clientPhone)) {
        echo json_encode(["success" => false, "message" => "Client name, email, and phone number are required."]);
        exit();
    }

    // Automatically check and add missing columns if bookings table was created with an older schema
    try {
        $pdo->exec("ALTER TABLE bookings ADD COLUMN floor_plan_url VARCHAR(255) DEFAULT NULL");
    } catch (\PDOException $ex) { /* Column already exists */ }
    
    try {
        $pdo->exec("ALTER TABLE bookings ADD COLUMN is_emi_requested TINYINT(1) DEFAULT 0");
    } catch (\PDOException $ex) { /* Column already exists */ }

    $bookingId = 'bk-' . time() . '-' . rand(100, 999);
    $clientName = trim($data->clientName);
    $clientEmail = trim(strtolower($data->clientEmail));
    $clientPhone = trim($data->clientPhone);
    $serviceType = !empty($data->serviceType) ? trim($data->serviceType) : 'Residential';
    $packageName = !empty($data->packageName) ? trim($data->packageName) : 'Architectural Consultation';
    $preferredDate = !empty($data->preferredDate) ? $data->preferredDate : date('Y-m-d', strtotime('+2 days'));
    $requirements = !empty($data->requirements) ? trim($data->requirements) : '';
    $floorPlanUrl = !empty($data->floorPlanUrl) ? trim($data->floorPlanUrl) : null;
    $estimatedCost = !empty($data->estimatedCost) ? floatval($data->estimatedCost) : 650000.00;
    $isEmiRequested = !empty($data->isEmiRequested) ? 1 : 0;

    $stmt = $pdo->prepare("INSERT INTO bookings (id, client_name, client_email, client_phone, service_type, package_name, preferred_date, requirements, floor_plan_url, estimated_cost, is_emi_requested, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending Approval')");

    $success = $stmt->execute([
        $bookingId,
        $clientName,
        $clientEmail,
        $clientPhone,
        $serviceType,
        $packageName,
        $preferredDate,
        $requirements,
        $floorPlanUrl,
        $estimatedCost,
        $isEmiRequested
    ]);

    if ($success) {
        // Send automated Luxury Gold Admin Email Alert (honors admin toggle setting)
        $emailDispatch = sendAdminNewBookingNotification([
            'id' => $bookingId,
            'clientName' => $clientName,
            'clientEmail' => $clientEmail,
            'clientPhone' => $clientPhone,
            'serviceType' => $serviceType,
            'packageName' => $packageName,
            'preferredDate' => $preferredDate,
            'requirements' => $requirements,
            'floorPlanUrl' => $floorPlanUrl,
            'estimatedCost' => $estimatedCost,
            'isEmiRequested' => $isEmiRequested
        ]);

        echo json_encode([
            "success" => true,
            "message" => "Booking request submitted successfully!",
            "bookingId" => $bookingId,
            "email_status" => $emailDispatch
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to save booking request to database."]);
    }
} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Exception during save_booking execution.",
        "error" => $e->getMessage()
    ]);
}
?>

