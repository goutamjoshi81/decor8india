<?php
// Decor8 India - Services Fetch Endpoint
// Reads from dedicated 'services' table (replaces cms_data key-value approach)
require_once 'db_config.php';

try {
    $pdo = getDbConnection();

    // Auto-create services table if not exists
    $pdo->exec("CREATE TABLE IF NOT EXISTS `services` (
      `id` varchar(50) NOT NULL,
      `title` varchar(200) NOT NULL,
      `type` enum('Residential','Commercial','Construction') NOT NULL DEFAULT 'Residential',
      `description` text DEFAULT NULL,
      `features` JSON DEFAULT NULL,
      `estimated_duration` varchar(50) DEFAULT NULL,
      `starting_price` decimal(12,2) DEFAULT 0.00,
      `image` text DEFAULT NULL,
      `icon_name` varchar(50) DEFAULT NULL,
      `is_active` tinyint(1) NOT NULL DEFAULT 1,
      `sort_order` int NOT NULL DEFAULT 0,
      `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    $id = isset($_GET['id']) ? trim($_GET['id']) : null;

    if ($id) {
        // Fetch single service
        $stmt = $pdo->prepare("SELECT * FROM services WHERE id = ? LIMIT 1");
        $stmt->execute([$id]);
        $row = $stmt->fetch();

        if ($row) {
            $row['features'] = json_decode($row['features'], true) ?: [];
            $row['startingPrice'] = floatval($row['starting_price']);
            $row['estimatedDuration'] = $row['estimated_duration'];
            $row['iconName'] = $row['icon_name'];
            $row['isActive'] = (bool)$row['is_active'];
            echo json_encode(["success" => true, "service" => $row]);
        } else {
            echo json_encode(["success" => false, "message" => "Service not found."]);
        }
    } else {
        // Fetch all services
        $activeOnly = isset($_GET['active']) ? (bool)$_GET['active'] : false;
        $query = "SELECT * FROM services";
        if ($activeOnly) {
            $query .= " WHERE is_active = 1";
        }
        $query .= " ORDER BY sort_order ASC, updated_at DESC";
        
        $stmt = $pdo->query($query);
        $rows = $stmt->fetchAll();
        
        $services = array_map(function($row) {
            $row['features'] = json_decode($row['features'], true) ?: [];
            $row['startingPrice'] = floatval($row['starting_price']);
            $row['estimatedDuration'] = $row['estimated_duration'];
            $row['iconName'] = $row['icon_name'];
            $row['isActive'] = (bool)$row['is_active'];
            return $row;
        }, $rows);

        echo json_encode(["success" => true, "services" => $services]);
    }

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error fetching services.",
        "error" => $e->getMessage()
    ]);
}
?>
