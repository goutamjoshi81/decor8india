<?php
// Decor8 India - Generic CMS Data Fetch Endpoint
// Reads portfolio projects, services, articles, team members from cms_data table
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

    $key = isset($_GET['key']) ? trim($_GET['key']) : null;

    if ($key) {
        // Fetch single key
        $stmt = $pdo->prepare("SELECT data_value FROM cms_data WHERE data_key = ? LIMIT 1");
        $stmt->execute([$key]);
        $row = $stmt->fetch();

        if ($row) {
            $decoded = json_decode($row['data_value'], true);
            echo json_encode([
                "success" => true,
                "key" => $key,
                "value" => $decoded
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "No data found for key: $key"
            ]);
        }
    } else {
        // Fetch all CMS keys
        $stmt = $pdo->query("SELECT data_key, data_value FROM cms_data ORDER BY updated_at DESC");
        $rows = $stmt->fetchAll();
        $result = [];
        foreach ($rows as $row) {
            $result[$row['data_key']] = json_decode($row['data_value'], true);
        }
        echo json_encode([
            "success" => true,
            "data" => $result
        ]);
    }

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error fetching CMS data.",
        "error" => $e->getMessage()
    ]);
}
?>
