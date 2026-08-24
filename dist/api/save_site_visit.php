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

    // Auto-create site_visits table if it doesn't exist yet
    $createTableQuery = "
        CREATE TABLE IF NOT EXISTS `site_visits` (
          `id` VARCHAR(50) PRIMARY KEY,
          `client_name` VARCHAR(150) NOT NULL,
          `client_email` VARCHAR(150) NOT NULL,
          `client_phone` VARCHAR(30) NOT NULL,
          `project_title` VARCHAR(255) NOT NULL,
          `preferred_date` DATE NOT NULL,
          `time_slot` VARCHAR(100) DEFAULT 'Morning (10:00 AM - 1:00 PM)',
          `notes` TEXT,
          `is_emi_requested` TINYINT(1) DEFAULT 0,
          `gate_pass_code` VARCHAR(50) DEFAULT NULL,
          `assigned_manager` VARCHAR(150) DEFAULT 'Senior Site Engineer',
          `status` VARCHAR(50) DEFAULT 'Scheduled',
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ";
    $pdo->exec($createTableQuery);

    $visitId = 'sv-' . time() . '-' . rand(100, 999);
    $clientName = trim($data->clientName);
    $clientEmail = trim(strtolower($data->clientEmail));
    $clientPhone = trim($data->clientPhone);
    $projectTitle = !empty($data->projectTitle) ? trim($data->projectTitle) : 'General Live Site Inspection';
    $preferredDate = !empty($data->preferredDate) ? $data->preferredDate : date('Y-m-d', strtotime('+2 days'));
    $timeSlot = !empty($data->timeSlot) ? trim($data->timeSlot) : 'Morning (10:00 AM - 1:00 PM)';
    $notes = !empty($data->notes) ? trim($data->notes) : '';
    $isEmiRequested = !empty($data->isEmiRequested) ? 1 : 0;
    $gatePassCode = 'GP-' . strtoupper(substr(md5(uniqid()), 0, 6));

    $stmt = $pdo->prepare("INSERT INTO site_visits (id, client_name, client_email, client_phone, project_title, preferred_date, time_slot, notes, is_emi_requested, gate_pass_code, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Scheduled')");

    $success = $stmt->execute([
        $visitId,
        $clientName,
        $clientEmail,
        $clientPhone,
        $projectTitle,
        $preferredDate,
        $timeSlot,
        $notes,
        $isEmiRequested,
        $gatePassCode
    ]);

    if ($success) {
        // Send automated Luxury Emerald/Gold Admin Alert (honors admin toggle setting)
        $emailDispatch = sendAdminNewSiteVisitNotification([
            'id' => $visitId,
            'clientName' => $clientName,
            'clientEmail' => $clientEmail,
            'clientPhone' => $clientPhone,
            'projectTitle' => $projectTitle,
            'preferredDate' => $preferredDate,
            'timeSlot' => $timeSlot,
            'gatePassCode' => $gatePassCode,
            'notes' => $notes,
            'isEmiRequested' => $isEmiRequested
        ]);

        echo json_encode([
            "success" => true,
            "message" => "Site visit request saved successfully!",
            "visitId" => $visitId,
            "gatePassCode" => $gatePassCode,
            "email_status" => $emailDispatch
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to save site visit request to database."]);
    }
} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Exception during save_site_visit execution.",
        "error" => $e->getMessage()
    ]);
}
?>

