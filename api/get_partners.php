<?php
// Decor8 India - Brand & Material Partners Fetch Endpoint
require_once 'db_config.php';

try {
    $pdo = getDbConnection();

    // Auto-create partners table if not exists
    $pdo->exec("CREATE TABLE IF NOT EXISTS `partners` (
      `id` varchar(50) NOT NULL,
      `name` varchar(200) NOT NULL,
      `category` varchar(200) DEFAULT NULL,
      `logo_url` text DEFAULT NULL,
      `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    $stmt = $pdo->query("SELECT * FROM partners ORDER BY created_at ASC");
    $rows = $stmt->fetchAll();

    $partners = array_map(function($row) {
        return [
            'id' => $row['id'],
            'name' => $row['name'],
            'category' => $row['category'] ?? '',
            'logoUrl' => $row['logo_url'] ?? '',
            'createdAt' => $row['created_at']
        ];
    }, $rows);

    echo json_encode(["success" => true, "partners" => $partners]);

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error fetching brand partners.",
        "error" => $e->getMessage()
    ]);
}
?>
