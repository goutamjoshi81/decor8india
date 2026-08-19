<?php
// Decor8 India - Fetch Live Email Delivery Activity Logs
require_once 'db_config.php';

header("Content-Type: application/json; charset=UTF-8");

$logs = [];

// 1. Fetch from MySQL Database if available
try {
    $pdo = getDbConnection();
    if ($pdo) {
        $pdo->exec("CREATE TABLE IF NOT EXISTS `email_logs` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `recipient` VARCHAR(150) NOT NULL,
          `recipient_name` VARCHAR(150) DEFAULT NULL,
          `subject` VARCHAR(255) NOT NULL,
          `method` VARCHAR(50) NOT NULL DEFAULT 'SMTP',
          `status` VARCHAR(20) NOT NULL DEFAULT 'SUCCESS',
          `details` TEXT DEFAULT NULL,
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

        $stmt = $pdo->query("SELECT id, recipient, recipient_name, subject, method, status, details, created_at FROM email_logs ORDER BY id DESC LIMIT 50");
        $logs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
} catch (\Throwable $e) {}

// 2. Fallback to JSON log file if database has no records yet or query returned empty
if (empty($logs)) {
    $jsonFile = __DIR__ . '/email_logs.json';
    if (file_exists($jsonFile)) {
        $logs = json_decode(file_get_contents($jsonFile), true) ?: [];
    }
}

echo json_encode([
    "success" => true,
    "logs" => $logs
]);
?>
