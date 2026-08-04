<?php
// Decor8 India - Approve Booking API Endpoint
require_once 'db_config.php';

$pdo = getDbConnection();
$data = json_decode(file_get_contents("php://input"));

if (empty($data->bookingId)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "bookingId is required."]);
    exit();
}

$bookingId = trim($data->bookingId);

// 1. Fetch booking details
$stmt = $pdo->prepare("SELECT * FROM bookings WHERE id = ? LIMIT 1");
$stmt->execute([$bookingId]);
$booking = $stmt->fetch();

if (!$booking) {
    http_response_code(404);
    echo json_encode(["success" => false, "message" => "Booking not found in database."]);
    exit();
}

// 2. Update booking status to Approved
$updateBooking = $pdo->prepare("UPDATE bookings SET status = 'Approved' WHERE id = ?");
$updateBooking->execute([$bookingId]);

// 3. Create or update User in users table
$clientEmail = trim(strtolower($booking['client_email']));
$clientName = trim($booking['client_name']);
$clientPhone = trim($booking['client_phone']);
$phonePassword = preg_replace('/[^0-9]/', '', $clientPhone) ?: '9876543210';
$passwordHash = password_hash($phonePassword, PASSWORD_DEFAULT);

$checkUser = $pdo->prepare("SELECT id FROM users WHERE LOWER(email) = ? LIMIT 1");
$checkUser->execute([$clientEmail]);
$existingUser = $checkUser->fetch();

$userId = $existingUser ? $existingUser['id'] : ('usr-' . time() . '-' . rand(100, 999));
$newProjectId = 'proj-' . time() . '-' . rand(100, 999);

if ($existingUser) {
    $userStmt = $pdo->prepare("UPDATE users SET name = ?, phone = ?, password_hash = ?, is_approved = 1, must_change_password = 1 WHERE id = ?");
    $userStmt->execute([$clientName, $clientPhone, $passwordHash, $userId]);
} else {
    $userStmt = $pdo->prepare("INSERT INTO users (id, name, email, phone, role, password_hash, is_approved, must_change_password) VALUES (?, ?, ?, ?, 'CLIENT', ?, 1, 1)");
    $userStmt->execute([$userId, $clientName, $clientEmail, $clientPhone, $passwordHash]);
}

// 4. Create Project record in projects table
$projStmt = $pdo->prepare("INSERT INTO projects (id, title, client_id, client_name, designer_name, category, style, cover_image, location, area, budget, status, progress_percentage, current_stage, description) VALUES (?, ?, ?, ?, 'Mr. Satish Bhat (CEO & Principal Architect)', ?, 'Luxury', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', 'Indiranagar, Bengaluru', '1800 Sq. Ft.', ?, 'Ongoing', 10, 'Design Discussion', ?)");

$budgetStr = "₹ " . number_format($booking['estimated_cost'] ?? 1500000, 2);
$projStmt->execute([
    $newProjectId,
    $booking['package_name'] . " - " . $clientName,
    $userId,
    $clientName,
    $booking['service_type'] ?: 'Residential',
    $budgetStr,
    $booking['requirements'] ?: 'Approved luxury interior project.'
]);

echo json_encode([
    "success" => true,
    "message" => "Booking approved successfully! Client account created in users table with default phone password.",
    "user" => [
        "id" => $userId,
        "name" => $clientName,
        "email" => $clientEmail,
        "phone" => $clientPhone,
        "defaultPassword" => $phonePassword,
        "projectId" => $newProjectId
    ]
]);
?>
