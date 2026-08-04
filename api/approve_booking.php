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

    // Auto-migrate tables if created with an older schema
    try { $pdo->exec("ALTER TABLE users ADD COLUMN is_approved TINYINT(1) DEFAULT 1"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE users ADD COLUMN must_change_password TINYINT(1) DEFAULT 0"); } catch (\PDOException $ex) {}
    
    try {
        $pdo->exec("CREATE TABLE IF NOT EXISTS `projects` (
          `id` varchar(50) NOT NULL,
          `title` varchar(150) NOT NULL,
          `client_id` varchar(50) NOT NULL,
          `service_type` varchar(50) NOT NULL,
          `estimated_cost` decimal(12,2) DEFAULT NULL,
          `total_paid` decimal(12,2) DEFAULT 0,
          `progress_percentage` int DEFAULT 0,
          `status` varchar(50) DEFAULT 'In Progress',
          `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    } catch (\PDOException $ex) {}

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

    // 3. Create or Update client user account in 'users' table
    $userId = 'usr-' . time();
    $clientPhone = !empty($booking['client_phone']) ? preg_replace('/[^0-9]/', '', $booking['client_phone']) : '9876543210';
    $defaultPasswordHash = password_hash($clientPhone, PASSWORD_BCRYPT);

    $userStmt = $pdo->prepare("INSERT INTO users (id, name, email, phone, role, password_hash, is_approved, must_change_password) 
                               VALUES (?, ?, ?, ?, 'CLIENT', ?, 1, 1) 
                               ON DUPLICATE KEY UPDATE 
                                 name = VALUES(name),
                                 phone = VALUES(phone),
                                 role = 'CLIENT',
                                 password_hash = VALUES(password_hash),
                                 is_approved = 1,
                                 must_change_password = 1");
    $userStmt->execute([
        $userId,
        $booking['client_name'],
        $booking['client_email'],
        $booking['client_phone'],
        $defaultPasswordHash
    ]);

    // 4. Create Project for Client if not exists
    $projectId = 'prj-' . time();
    $projectTitle = $booking['package_name'] . ' - ' . $booking['client_name'];
    $projStmt = $pdo->prepare("INSERT INTO projects (id, title, client_id, service_type, estimated_cost, total_paid, progress_percentage, status) VALUES (?, ?, ?, ?, ?, 0, 10, 'In Progress') ON DUPLICATE KEY UPDATE status = 'In Progress'");
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
        "message" => "Client approved successfully! Added to users table. Default password set to phone number: $clientPhone.",
        "bookingId" => $bookingId,
        "defaultPassword" => $clientPhone,
        "clientEmail" => $booking['client_email']
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
