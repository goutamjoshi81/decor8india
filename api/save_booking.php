<?php
require_once 'db_config.php';

$pdo = getDbConnection();
$data = json_decode(file_get_contents("php://input"));

if (empty($data->clientName) || empty($data->clientEmail) || empty($data->clientPhone)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Client name, email, and phone number are required."]);
    exit();
}

$bookingId = 'bk-' . time() . '-' . rand(100, 999);
$clientName = trim($data->clientName);
$clientEmail = trim(strtolower($data->clientEmail));
$clientPhone = trim($data->clientPhone);
$serviceType = isset($data->serviceType) ? trim($data->serviceType) : 'Residential';
$packageName = isset($data->packageName) ? trim($data->packageName) : 'Architectural Consultation';
$preferredDate = isset($data->preferredDate) ? $data->preferredDate : date('Y-m-d', strtotime('+2 days'));
$requirements = isset($data->requirements) ? trim($data->requirements) : '';
$floorPlanUrl = isset($data->floorPlanUrl) ? trim($data->floorPlanUrl) : null;
$estimatedCost = isset($data->estimatedCost) ? floatval($data->estimatedCost) : 650000.00;
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
    // Send email notification to CEO Satish Bhat (optional PHP mail)
    $to = "info@decor8india.com, satish@decor8india.com";
    $subject = "🔥 NEW BOOKING / SITE VISIT REQUEST: $clientName ($packageName)";
    $message = "New Booking Received on Decor8 India Web Portal:\n\n"
             . "Booking ID: $bookingId\n"
             . "Client Name: $clientName\n"
             . "Email: $clientEmail\n"
             . "Phone: $clientPhone\n"
             . "Package / Site: $packageName ($serviceType)\n"
             . "Preferred Date: $preferredDate\n"
             . "Estimated Budget: ₹ " . number_format($estimatedCost, 2) . "\n"
             . "0% EMI Interest Checkbox: " . ($isEmiRequested ? "YES" : "NO") . "\n"
             . "Notes & Requirements: $requirements\n\n"
             . "Log into Admin Dashboard to approve or contact client.\n\n"
             . "Decor8 India - Affordable Luxury";
    $headers = "From: web-portal@decor8india.com\r\n" . "Reply-To: $clientEmail\r\n";

    @mail($to, $subject, $message, $headers);

    echo json_encode([
        "success" => true,
        "message" => "Booking request submitted successfully!",
        "bookingId" => $bookingId
    ]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to save booking request."]);
}
?>
