<?php
require_once 'db_config.php';

try {
    $pdo = getDbConnection();

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

    $stmt = $pdo->query("SELECT * FROM site_visits ORDER BY created_at DESC");
    $rawVisits = $stmt->fetchAll();

    $mappedVisits = array_map(function($v) {
        return [
            "id" => $v["id"],
            "clientName" => $v["client_name"] ?? '',
            "clientEmail" => $v["client_email"] ?? '',
            "clientPhone" => $v["client_phone"] ?? '',
            "projectTitle" => $v["project_title"] ?? '',
            "preferredDate" => $v["preferred_date"] ?? '',
            "timeSlot" => $v["time_slot"] ?? 'Morning (10:00 AM - 1:00 PM)',
            "notes" => $v["notes"] ?? '',
            "isEmiRequested" => !empty($v["is_emi_requested"]),
            "gatePassCode" => $v["gate_pass_code"] ?? '',
            "assignedManager" => $v["assigned_manager"] ?? 'Senior Site Engineer',
            "status" => $v["status"] ?? 'Scheduled',
            "createdAt" => $v["created_at"] ?? date('Y-m-d H:i:s')
        ];
    }, $rawVisits);

    echo json_encode([
        "success" => true,
        "count" => count($mappedVisits),
        "siteVisits" => $mappedVisits
    ]);
} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error fetching site visits from database.",
        "error" => $e->getMessage(),
        "siteVisits" => []
    ]);
}
?>
