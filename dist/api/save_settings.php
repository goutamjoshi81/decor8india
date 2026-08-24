<?php
// Decor8 India - Save System Settings API Endpoint
require_once 'db_config.php';

try {
    $rawInput = file_get_contents("php://input");
    $data = json_decode($rawInput, true);

    if (!is_array($data)) {
        echo json_encode(["success" => false, "message" => "Invalid JSON payload received."]);
        exit();
    }

    $pdo = getDbConnection();
    
    // Auto-create settings table if it doesn't exist
    $pdo->exec("CREATE TABLE IF NOT EXISTS `settings` (
      `setting_key` VARCHAR(100) PRIMARY KEY,
      `setting_value` TEXT DEFAULT NULL,
      `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    $savedSettings = [];

    if (isset($data['admin_email_enquiry_notifications'])) {
        $val = ($data['admin_email_enquiry_notifications'] === true || $data['admin_email_enquiry_notifications'] === '1' || $data['admin_email_enquiry_notifications'] === 1) ? '1' : '0';
        $stmt = $pdo->prepare("INSERT INTO settings (setting_key, setting_value) VALUES ('admin_email_enquiry_notifications', ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)");
        $stmt->execute([$val]);
        $savedSettings['admin_email_enquiry_notifications'] = ($val === '1');
    }

    if (isset($data['admin_notification_email']) && !empty(trim($data['admin_notification_email']))) {
        $emailVal = trim(strtolower($data['admin_notification_email']));
        if (filter_var($emailVal, FILTER_VALIDATE_EMAIL)) {
            $stmt = $pdo->prepare("INSERT INTO settings (setting_key, setting_value) VALUES ('admin_notification_email', ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)");
            $stmt->execute([$emailVal]);
            $savedSettings['admin_notification_email'] = $emailVal;
        }
    }

    // Also update fallback JSON file for redundancy
    $jsonFile = __DIR__ . '/settings.json';
    $currentJson = file_exists($jsonFile) ? (json_decode(file_get_contents($jsonFile), true) ?: []) : [];
    $merged = array_merge($currentJson, $savedSettings);
    @file_put_contents($jsonFile, json_encode($merged, JSON_PRETTY_PRINT));

    echo json_encode([
        "success" => true,
        "message" => "Admin settings saved successfully.",
        "settings" => $merged
    ]);

} catch (Throwable $e) {
    // Attempt fallback write to JSON
    $jsonFile = __DIR__ . '/settings.json';
    $currentJson = file_exists($jsonFile) ? (json_decode(file_get_contents($jsonFile), true) ?: []) : [];
    if (isset($data['admin_email_enquiry_notifications'])) {
        $currentJson['admin_email_enquiry_notifications'] = ($data['admin_email_enquiry_notifications'] === true || $data['admin_email_enquiry_notifications'] === '1' || $data['admin_email_enquiry_notifications'] === 1);
    }
    if (isset($data['admin_notification_email'])) {
        $currentJson['admin_notification_email'] = trim($data['admin_notification_email']);
    }
    @file_put_contents($jsonFile, json_encode($currentJson, JSON_PRETTY_PRINT));

    echo json_encode([
        "success" => true,
        "message" => "Settings saved to local storage fallback.",
        "settings" => $currentJson,
        "error" => $e->getMessage()
    ]);
}
?>
