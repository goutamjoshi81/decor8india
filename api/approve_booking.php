<?php
require_once 'db_config.php';

try {
    $pdo = getDbConnection();
    $data = json_decode(file_get_contents("php://input"));

    if (empty($data->bookingId)) {
        echo json_encode(["success" => false, "message" => "Booking ID is required."]);
        exit();
    }

    $bookingId = trim($data->bookingId);

    // 1. Fetch booking details
    $stmt = $pdo->prepare("SELECT * FROM bookings WHERE id = ?");
    $stmt->execute([$bookingId]);
    $booking = $stmt->fetch();

    if (!$booking) {
        echo json_encode(["success" => false, "message" => "Booking not found."]);
        exit();
    }

    $pdo->beginTransaction();

    // 2. Update booking status to Approved
    $updateStmt = $pdo->prepare("UPDATE bookings SET status = 'Approved' WHERE id = ?");
    $updateStmt->execute([$bookingId]);

    // 3. Create or Update client user account with default password (phone number)
    $userId = 'usr-' . time();
    $clientPhone = !empty($booking['client_phone']) ? preg_replace('/[^0-9]/', '', $booking['client_phone']) : '9876543210';
    $defaultPasswordHash = password_hash($clientPhone, PASSWORD_BCRYPT);

    $userStmt = $pdo->prepare("INSERT INTO users (id, name, email, phone, role, password_hash, is_approved, must_change_password) 
                               VALUES (?, ?, ?, ?, 'CLIENT', ?, 1, 1) 
                               ON DUPLICATE KEY UPDATE is_approved = 1");
    $userStmt->execute([
        $userId,
        $booking['client_name'],
        $booking['client_email'],
        $booking['client_phone'],
        $defaultPasswordHash
    ]);

    // 4. Create Project for Client
    $projectId = 'prj-' . time();
    $projectTitle = $booking['package_name'] . ' - ' . $booking['client_name'];
    $projStmt = $pdo->prepare("INSERT INTO projects (id, title, client_id, service_type, estimated_cost, total_paid, progress_percentage, status) VALUES (?, ?, ?, ?, ?, 0, 10, 'In Progress')");
    $projStmt->execute([
        $projectId,
        $projectTitle,
        $booking['client_email'],
        $booking['service_type'],
        $booking['estimated_cost']
    ]);

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "message" => "Booking approved successfully! Client transferred to users table and project initiated.",
        "bookingId" => $bookingId,
        "defaultPassword" => $clientPhone
    ]);
} catch (Throwable $e) {
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    echo json_encode([
        "success" => false,
        "message" => "Error approving booking.",
        "error" => $e->getMessage()
    ]);
}
?>
