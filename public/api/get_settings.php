<?php
// Decor8 India - Get System Settings API Endpoint
require_once 'db_config.php';

$defaultSettings = [
    'admin_email_enquiry_notifications' => true,
    'admin_notification_email' => 'support@decor8india.com',
    'ga_measurement_id' => 'G-E7KJ76JHFP',
    'ga_property_id' => ''
];

try {
    $pdo = getDbConnection();
    
    // Auto-create settings table if it doesn't exist
    $pdo->exec("CREATE TABLE IF NOT EXISTS `settings` (
      `setting_key` VARCHAR(100) PRIMARY KEY,
      `setting_value` TEXT DEFAULT NULL,
      `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    $stmt = $pdo->query("SELECT setting_key, setting_value FROM settings");
    $rows = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);

    $settings = $defaultSettings;

    if (!empty($rows)) {
        if (isset($rows['admin_email_enquiry_notifications'])) {
            $settings['admin_email_enquiry_notifications'] = ($rows['admin_email_enquiry_notifications'] === '1' || $rows['admin_email_enquiry_notifications'] === 'true' || $rows['admin_email_enquiry_notifications'] === 1 || $rows['admin_email_enquiry_notifications'] === true);
        }
        if (!empty($rows['admin_notification_email'])) {
            $settings['admin_notification_email'] = trim($rows['admin_notification_email']);
        }
        if (isset($rows['ga_measurement_id'])) {
            $settings['ga_measurement_id'] = trim($rows['ga_measurement_id']);
        }
        if (isset($rows['ga_property_id'])) {
            $settings['ga_property_id'] = trim($rows['ga_property_id']);
        }
    } else {
        // Seed defaults
        $insertStmt = $pdo->prepare("INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)");
        $insertStmt->execute(['admin_email_enquiry_notifications', '1']);
        $insertStmt->execute(['admin_notification_email', 'support@decor8india.com']);
        $insertStmt->execute(['ga_measurement_id', 'G-E7KJ76JHFP']);
        $insertStmt->execute(['ga_property_id', '']);
    }

    echo json_encode([
        "success" => true,
        "settings" => $settings
    ]);

} catch (Throwable $e) {
    // Fallback to JSON file if MySQL fails
    $jsonFile = __DIR__ . '/settings.json';
    $settings = $defaultSettings;
    if (file_exists($jsonFile)) {
        $content = file_get_contents($jsonFile);
        $parsed = json_decode($content, true);
        if (is_array($parsed)) {
            $settings = array_merge($defaultSettings, $parsed);
        }
    }

    echo json_encode([
        "success" => true,
        "settings" => $settings,
        "source" => "fallback_json",
        "error" => $e->getMessage()
    ]);
}
?>
