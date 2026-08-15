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
      `gallery_images_json` longtext DEFAULT NULL,
      `before_image` text DEFAULT NULL,
      `after_image` text DEFAULT NULL,
      `location` varchar(150) DEFAULT NULL,
      `area` varchar(50) DEFAULT NULL,
      `budget` varchar(50) DEFAULT NULL,
      `contract_price` decimal(12,2) DEFAULT NULL,
      `completion_time` varchar(50) DEFAULT NULL,
      `status` varchar(50) NOT NULL DEFAULT 'Ongoing',
      `show_on_landing_page` tinyint(1) DEFAULT 1,
      `progress_percentage` int NOT NULL DEFAULT 0,
      `current_stage` varchar(100) NOT NULL DEFAULT 'Civil Work',
      `expected_completion` varchar(50) DEFAULT NULL,
      `description` text DEFAULT NULL,
      `work_updates_json` longtext DEFAULT NULL,
      `documents_json` longtext DEFAULT NULL,
      `payments_json` longtext DEFAULT NULL,
      `milestones_json` longtext DEFAULT NULL,
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
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN designer_name VARCHAR(100) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN category VARCHAR(50) DEFAULT 'Residential'"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN service_type VARCHAR(50) DEFAULT 'Residential'"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN estimated_cost DECIMAL(12,2) DEFAULT 0.00"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN style VARCHAR(50) DEFAULT 'Luxury'"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN cover_image TEXT DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN gallery_images_json LONGTEXT DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN before_image TEXT DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN after_image TEXT DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN location VARCHAR(150) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN area VARCHAR(50) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN budget VARCHAR(50) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN completion_time VARCHAR(50) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN status VARCHAR(50) NOT NULL DEFAULT 'Ongoing'"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN show_on_landing_page TINYINT(1) DEFAULT 1"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN progress_percentage INT NOT NULL DEFAULT 0"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN current_stage VARCHAR(100) NOT NULL DEFAULT 'Civil Work'"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN expected_completion VARCHAR(50) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN description TEXT DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN work_updates_json LONGTEXT DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN documents_json LONGTEXT DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN payments_json LONGTEXT DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN milestones_json LONGTEXT DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN contract_price DECIMAL(12,2) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE bookings ADD COLUMN contract_price DECIMAL(12,2) DEFAULT NULL"); } catch (\PDOException $ex) {}

    // Auto-backfill existing approved rows where contract_price was NULL
    try { $pdo->exec("UPDATE bookings SET contract_price = estimated_cost WHERE (contract_price IS NULL OR contract_price = 0) AND estimated_cost > 0"); } catch (\PDOException $ex) {}
    try { $pdo->exec("UPDATE projects SET contract_price = estimated_cost WHERE (contract_price IS NULL OR contract_price = 0) AND estimated_cost > 0"); } catch (\PDOException $ex) {}

    // 1. Delete duplicate rows where client_id has '@' while another valid row exists for the same client and title
    try {
        $pdo->exec("DELETE p1 FROM projects p1
                    INNER JOIN projects p2 
                      ON LOWER(p1.client_email) = LOWER(p2.client_email) 
                      AND p1.title = p2.title 
                      AND p1.id != p2.id
                    WHERE p1.client_id LIKE '%@%' AND p2.client_id NOT LIKE '%@%'");
    } catch (\PDOException $ex) {}

    // 2. Auto-repair any remaining projects where client_id is an email address to use the user's ID
    try {
        $pdo->exec("UPDATE projects p 
                    INNER JOIN users u ON LOWER(p.client_email) = LOWER(u.email) 
                    SET p.client_id = u.id 
                    WHERE (p.client_id LIKE '%@%' OR p.client_id IS NULL OR p.client_id = '')");
    } catch (\PDOException $ex) {}

    // Fetch booking details
    $stmt = $pdo->prepare("SELECT * FROM bookings WHERE id = ?");
    $stmt->execute([$bookingId]);
    $booking = $stmt->fetch();

    if (!$booking) {
        echo json_encode(["success" => false, "message" => "Booking not found."]);
        exit();
    }

    $pdo->beginTransaction();

    // Determine final contract price (use admin input if provided, otherwise fallback to estimated_cost)
    $estimatedCost = !empty($booking['estimated_cost']) ? (float)$booking['estimated_cost'] : 500000.00;
    $finalPrice = (isset($data->contractPrice) && (float)$data->contractPrice > 0) 
        ? (float)$data->contractPrice 
        : $estimatedCost;

    // Update booking status to Approved + save contract price in bookings table
    $updateStmt = $pdo->prepare("UPDATE bookings SET status = 'Approved', contract_price = ? WHERE id = ?");
    $updateStmt->execute([$finalPrice, $bookingId]);

    // Create or Update client user account in 'users' table
    $clientEmail = strtolower(trim($booking['client_email']));
    $clientName = trim($booking['client_name']);
    $clientPhone = !empty($booking['client_phone']) ? preg_replace('/[^0-9]/', '', $booking['client_phone']) : '9876543210';
    $defaultPasswordHash = password_hash($clientPhone, PASSWORD_BCRYPT);

    // Look up existing user ID first to avoid ID re-generation
    $uStmt = $pdo->prepare("SELECT id FROM users WHERE LOWER(email) = ? LIMIT 1");
    $uStmt->execute([$clientEmail]);
    $existingUser = $uStmt->fetch();

    if ($existingUser && !empty($existingUser['id'])) {
        $userId = $existingUser['id'];
        $userStmt = $pdo->prepare("UPDATE users SET name = ?, phone = ?, role = 'CLIENT', is_approved = 1, must_change_password = 1 WHERE id = ?");
        $userStmt->execute([$clientName, $booking['client_phone'], $userId]);
    } else {
        $userId = 'usr-' . time();
        $userStmt = $pdo->prepare("INSERT INTO users (id, name, email, phone, role, password_hash, is_approved, must_change_password) 
                                   VALUES (?, ?, ?, ?, 'CLIENT', ?, 1, 1)");
        $userStmt->execute([
            $userId,
            $clientName,
            $clientEmail,
            $booking['client_phone'],
            $defaultPasswordHash
        ]);
    }

    // Check if project already exists for this client with this title / email to prevent double creation
    $projectTitle = $booking['package_name'] . ' for ' . $clientName;
    $serviceType = !empty($booking['service_type']) ? $booking['service_type'] : 'Residential';
    $formattedBudget = '₹ ' . number_format($finalPrice / 100000, 2) . ' Lakhs';

    $pCheckStmt = $pdo->prepare("SELECT id FROM projects WHERE (LOWER(client_email) = ? OR LOWER(client_id) = ?) AND title = ? LIMIT 1");
    $pCheckStmt->execute([$clientEmail, strtolower($userId), $projectTitle]);
    $existingProj = $pCheckStmt->fetch();

    if ($existingProj && !empty($existingProj['id'])) {
        $projectId = $existingProj['id'];
        $pUpdStmt = $pdo->prepare("UPDATE projects SET client_id = ?, client_name = ?, client_email = ?, service_type = ?, estimated_cost = ?, contract_price = ?, budget = ?, status = 'Ongoing', current_stage = 'Design Discussion' WHERE id = ?");
        $pUpdStmt->execute([$userId, $clientName, $clientEmail, $serviceType, $estimatedCost, $finalPrice, $formattedBudget, $projectId]);
    } else {
        $projectId = 'proj-' . time();

        $defaultMilestones = [
            ["id" => "m1", "stage" => "Design Discussion", "progressPercentage" => 100, "status" => "Completed", "targetDate" => date('Y-m-d'), "completedDate" => date('Y-m-d')],
            ["id" => "m2", "stage" => "Site Measurement", "progressPercentage" => 20, "status" => "In Progress", "targetDate" => date('Y-m-d', strtotime('+7 days'))],
            ["id" => "m3", "stage" => "3D Design", "progressPercentage" => 0, "status" => "Pending", "targetDate" => date('Y-m-d', strtotime('+15 days'))],
            ["id" => "m4", "stage" => "Material Selection", "progressPercentage" => 0, "status" => "Pending", "targetDate" => date('Y-m-d', strtotime('+22 days'))],
            ["id" => "m5", "stage" => "Civil Work", "progressPercentage" => 0, "status" => "Pending", "targetDate" => date('Y-m-d', strtotime('+35 days'))],
            ["id" => "m6", "stage" => "Carpentry", "progressPercentage" => 0, "status" => "Pending", "targetDate" => date('Y-m-d', strtotime('+45 days'))],
            ["id" => "m7", "stage" => "Painting", "progressPercentage" => 0, "status" => "Pending", "targetDate" => date('Y-m-d', strtotime('+52 days'))],
            ["id" => "m8", "stage" => "Electrical", "progressPercentage" => 0, "status" => "Pending", "targetDate" => date('Y-m-d', strtotime('+55 days'))],
            ["id" => "m9", "stage" => "Furniture Installation", "progressPercentage" => 0, "status" => "Pending", "targetDate" => date('Y-m-d', strtotime('+58 days'))],
            ["id" => "m10", "stage" => "Final Inspection", "progressPercentage" => 0, "status" => "Pending", "targetDate" => date('Y-m-d', strtotime('+60 days'))]
        ];

        $defaultWorkUpdates = [
            [
                "id" => "wu-" . time(),
                "projectId" => $projectId,
                "date" => date('Y-m-d'),
                "title" => "Booking Approved & Design Phase Initiated",
                "description" => "Client account activated. Site measurement team scheduled for preliminary survey.",
                "mediaUrls" => ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"],
                "mediaType" => "image",
                "stage" => "Design Discussion"
            ]
        ];

        $defaultDocuments = [
            [
                "id" => "doc-" . time(),
                "projectId" => $projectId,
                "title" => "Project Proposal & Service Estimate.pdf",
                "category" => "Quotation",
                "fileUrl" => "#",
                "fileSize" => "1.8 MB",
                "uploadDate" => date('Y-m-d')
            ]
        ];

        $defaultPayments = [
            [
                "id" => "pay-" . time(),
                "projectId" => $projectId,
                "title" => "Token Deposit (10%)",
                "amount" => $finalPrice ? round($finalPrice * 0.1) : 100000,
                "paidAmount" => 0,
                "dueDate" => date('Y-m-d', strtotime('+3 days')),
                "status" => "Pending",
                "invoiceUrl" => "INV-D8I-" . sprintf("%06d", mt_rand(100000, 999999))
            ]
        ];

        $defaultCover = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
        $defaultGallery = json_encode([$defaultCover]);
        $defaultReqs = !empty($booking['requirements']) ? $booking['requirements'] : 'Approved luxury interior transformation.';

        $projStmt = $pdo->prepare("INSERT INTO projects (id, title, client_id, client_name, client_email, designer_name, category, style, cover_image, gallery_images_json, location, area, budget, contract_price, completion_time, status, show_on_landing_page, progress_percentage, current_stage, expected_completion, description, work_updates_json, documents_json, payments_json, milestones_json) 
            VALUES (?, ?, ?, ?, ?, 'Mr. Satish Bhat (CEO & Principal Architect)', ?, 'Modern', ?, ?, 'City Center', ?, ?, ?, '60 Days', 'Ongoing', 1, 10, 'Design Discussion', ?, ?, ?, ?, ?, ?)");
        
        $expectedCompletion = date('Y-m-d', strtotime('+60 days'));
        $area = !empty($booking['carpet_area']) ? ($booking['carpet_area'] . ' Sq. Ft.') : '1,500 Sq. Ft.';

        $projStmt->execute([
            $projectId,
            $projectTitle,
            $userId, // Strictly user ID (usr-XXX)
            $clientName,
            $clientEmail,
            $serviceType,
            $defaultCover,
            $defaultGallery,
            $area,
            $formattedBudget,
            $finalPrice,
            $expectedCompletion,
            $defaultReqs,
            json_encode($defaultWorkUpdates),
            json_encode($defaultDocuments),
            json_encode($defaultPayments),
            json_encode($defaultMilestones)
        ]);
    }

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "message" => "Client approved successfully! Added to users and projects table. Default password set to phone number: $clientPhone.",
        "bookingId" => $bookingId,
        "projectId" => $projectId,
        "userId" => $userId,
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
