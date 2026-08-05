<?php
// Decor8 India - Generic CMS Data Save/Update Endpoint
// Stores portfolio projects, services, articles, team members as JSON in cms_data table
require_once 'db_config.php';

try {
    $pdo = getDbConnection();

    // Auto-create cms_data table if not exists
    $pdo->exec("CREATE TABLE IF NOT EXISTS `cms_data` (
      `data_key` varchar(50) NOT NULL,
      `data_value` LONGTEXT NOT NULL,
      `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`data_key`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    $data = json_decode(file_get_contents("php://input"));

    if (empty($data->key) || !isset($data->value)) {
        echo json_encode(["success" => false, "message" => "Key and value are required."]);
        exit();
    }

    $key = trim($data->key);
    $value = json_encode($data->value);

    $stmt = $pdo->prepare("INSERT INTO cms_data (data_key, data_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE data_value = ?");
    $stmt->execute([$key, $value, $value]);

    echo json_encode([
        "success" => true,
        "message" => "CMS data '$key' saved successfully."
    ]);

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error saving CMS data.",
        "error" => $e->getMessage()
    ]);
}
?>
