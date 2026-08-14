<?php
// Decor8 India - Approve Booking & Auto-Create Client Account & Active Project
require_once 'db_config.php';

try {
    $pdo = getDbConnection();
    $data = json_decode(file_get_contents("php://input"));

    if (empty($data->bookingId)) {
        echo json_encode(["success" => false, "message" => "Booking ID is required."]);
        exit();
    }

    $bookingId = trim($data->bookingId);

    // Auto-create projects table if not exists
    $pdo->exec("CREATE TABLE IF NOT EXISTS `projects` (
      `id` varchar(50) NOT NULL,
      `title` varchar(150) NOT NULL DEFAULT 'Bespoke Luxury Project',
      `client_id` varchar(50) DEFAULT NULL,
      `client_name` varchar(100) DEFAULT NULL,
      `client_email` varchar(120) DEFAULT NULL,
      `designer_name` varchar(100) DEFAULT NULL,
      `category` varchar(50) DEFAULT 'Residential',
      `style` varchar(50) DEFAULT 'Luxury',
      `cover_image` text DEFAULT NULL,
      `location` varchar(150) DEFAULT NULL,
      `area` varchar(50) DEFAULT NULL,
      `budget` varchar(50) DEFAULT NULL,
      `status` varchar(50) NOT NULL DEFAULT 'Ongoing',
      `progress_percentage` int NOT NULL DEFAULT 0,
      `current_stage` varchar(100) NOT NULL DEFAULT 'Civil Work',
      `expected_completion` varchar(50) DEFAULT NULL,
      `description` text DEFAULT NULL,
      `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    // Auto-migrate tables if created with an older schema
    try { $pdo->exec("ALTER TABLE users ADD COLUMN is_approved TINYINT(1) DEFAULT 1"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE users ADD COLUMN must_change_password TINYINT(1) DEFAULT 0"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN title VARCHAR(150) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN client_id VARCHAR(50) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN client_name VARCHAR(100) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN client_email VARCHAR(120) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN progress_percentage INT NOT NULL DEFAULT 0"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN current_stage VARCHAR(100) NOT NULL DEFAULT 'Civil Work'"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN status VARCHAR(50) NOT NULL DEFAULT 'Ongoing'"); } catch (\PDOException $ex) {}
    // Add contract_price column to bookings & projects (safe auto-migration)
    try { $pdo->exec("ALTER TABLE bookings ADD COLUMN contract_price DECIMAL(12,2) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN contract_price DECIMAL(12,2) DEFAULT NULL"); } catch (\PDOException $ex) {}

    // Auto-backfill existing approved rows where contract_price was NULL
    try { $pdo->exec("UPDATE bookings SET contract_price = estimated_cost WHERE (contract_price IS NULL OR contract_price = 0) AND estimated_cost > 0"); } catch (\PDOException $ex) {}
    try { $pdo->exec("UPDATE projects SET contract_price = estimated_cost WHERE (contract_price IS NULL OR contract_price = 0) AND estimated_cost > 0"); } catch (\PDOException $ex) {}

    // 1. Fetch booking details
    $stmt = $pdo->prepare("SELECT * FROM bookings WHERE id = ?");
    $stmt->execute([$bookingId]);
    $booking = $stmt->fetch();

    if (!$booking) {
        echo json_encode(["success" => false, "message" => "Booking not found."]);
        exit();
    }

    $pdo->beginTransaction();

    // 2. Determine final contract price (use admin input if provided, otherwise fallback to estimated_cost)
    $estimatedCost = !empty($booking['estimated_cost']) ? (float)$booking['estimated_cost'] : 500000.00;
    $finalPrice = (isset($data->contractPrice) && (float)$data->contractPrice > 0) 
        ? (float)$data->contractPrice 
        : $estimatedCost;

    // Update booking status to Approved + save contract price in bookings table
    $updateStmt = $pdo->prepare("UPDATE bookings SET status = 'Approved', contract_price = ? WHERE id = ?");
    $updateStmt->execute([$finalPrice, $bookingId]);

    // 3. Create or Update client user account in 'users' table
    $userId = 'usr-' . time();
    $clientPhone = !empty($booking['client_phone']) ? preg_replace('/[^0-9]/', '', $booking['client_phone']) : '9876543210';
    $defaultPasswordHash = password_hash($clientPhone, PASSWORD_BCRYPT);
    $clientEmail = strtolower(trim($booking['client_email']));
    $clientName = trim($booking['client_name']);

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
        $clientName,
        $clientEmail,
        $booking['client_phone'],
        $defaultPasswordHash
    ]);

    // 4. Create Active Project for Client in 'projects' table
    $projectId = 'proj-' . time();
    $projectTitle = $booking['package_name'] . ' for ' . $clientName;
    $serviceType = !empty($booking['service_type']) ? $booking['service_type'] : 'Residential';
    $formattedBudget = '₹ ' . number_format($finalPrice / 100000, 2) . ' Lakhs';

    $projStmt = $pdo->prepare("INSERT INTO projects (id, title, client_id, client_name, client_email, service_type, estimated_cost, contract_price, budget, progress_percentage, current_stage, status) 
                               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 10, 'Design Discussion', 'Ongoing') 
                               ON DUPLICATE KEY UPDATE status = 'Ongoing', current_stage = 'Design Discussion', contract_price = VALUES(contract_price), budget = VALUES(budget)");
    $projStmt->execute([
        $projectId,
        $projectTitle,
        $userId,
        $clientName,
        $clientEmail,
        $serviceType,
        $estimatedCost,
        $finalPrice,
        $formattedBudget
    ]);

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "message" => "Client approved successfully! Added to users and projects table. Default password set to phone number: $clientPhone.",
        "bookingId" => $bookingId,
        "projectId" => $projectId,
        "defaultPassword" => $clientPhone,
        "clientEmail" => $clientEmail
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
