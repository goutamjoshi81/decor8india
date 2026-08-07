<?php
// Decor8 India - Fetch All Branch Offices Endpoint
require_once 'db_config.php';

try {
    $pdo = getDbConnection();

    // Auto-create table if not exists
    $pdo->exec("CREATE TABLE IF NOT EXISTS `branch_offices` (
      `id` varchar(50) NOT NULL,
      `city` varchar(100) NOT NULL,
      `title` varchar(150) NOT NULL,
      `address` text NOT NULL,
      `phone` varchar(50) NOT NULL,
      `email` varchar(100) NOT NULL,
      `working_hours` varchar(100) DEFAULT 'Mon - Sat: 9:30 AM - 7:30 PM',
      `map_url` text DEFAULT NULL,
      `image_url` text DEFAULT NULL,
      `is_headquarter` tinyint(1) DEFAULT 0,
      `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    $stmt = $pdo->query("SELECT * FROM branch_offices ORDER BY is_headquarter DESC, created_at ASC");
    $rows = $stmt->fetchAll();

    $branches = [];
    foreach ($rows as $r) {
        $branches[] = [
            'id' => $r['id'],
            'city' => $r['city'],
            'title' => $r['title'],
            'address' => $r['address'],
            'phone' => $r['phone'],
            'email' => $r['email'],
            'workingHours' => $r['working_hours'],
            'mapUrl' => $r['map_url'],
            'imageUrl' => $r['image_url'],
            'isHeadquarter' => (bool)$r['is_headquarter'],
            'createdAt' => $r['created_at']
        ];
    }

    echo json_encode([
        "success" => true,
        "branchOffices" => $branches
    ]);

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error fetching Branch Offices.",
        "error" => $e->getMessage()
    ]);
}
?>
