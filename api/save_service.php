<?php
// Decor8 India - Service Save/Update Endpoint
// Inserts or updates a single service in the dedicated 'services' table
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

    $data = json_decode(file_get_contents("php://input"), true);

    if (empty($data['id']) || empty($data['title'])) {
        echo json_encode(["success" => false, "message" => "Service id and title are required."]);
        exit();
    }

    // Handle delete action
    if (!empty($data['_action']) && $data['_action'] === 'delete') {
        $stmt = $pdo->prepare("DELETE FROM services WHERE id = ?");
        $stmt->execute([$data['id']]);
        echo json_encode(["success" => true, "message" => "Service deleted."]);
        exit();
    }

    // Handle bulk save (array of services)
    if (isset($data['_bulk']) && is_array($data['services'])) {
        $pdo->beginTransaction();
        $stmt = $pdo->prepare("INSERT INTO services (id, title, type, description, features, estimated_duration, starting_price, image, icon_name, is_active, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE title=VALUES(title), type=VALUES(type), description=VALUES(description), features=VALUES(features), estimated_duration=VALUES(estimated_duration), starting_price=VALUES(starting_price), image=VALUES(image), icon_name=VALUES(icon_name), is_active=VALUES(is_active), sort_order=VALUES(sort_order)");
        
        foreach ($data['services'] as $idx => $s) {
            $stmt->execute([
                $s['id'],
                $s['title'],
                $s['type'] ?? 'Residential',
                $s['description'] ?? null,
                json_encode($s['features'] ?? []),
                $s['estimatedDuration'] ?? $s['estimated_duration'] ?? null,
                floatval($s['startingPrice'] ?? $s['starting_price'] ?? 0),
                $s['image'] ?? null,
                $s['iconName'] ?? $s['icon_name'] ?? null,
                isset($s['isActive']) ? (int)$s['isActive'] : (isset($s['is_active']) ? (int)$s['is_active'] : 1),
                $idx
            ]);
        }
        $pdo->commit();
        echo json_encode(["success" => true, "message" => "All services saved."]);
        exit();
    }

    // Single service upsert
    $stmt = $pdo->prepare("INSERT INTO services (id, title, type, description, features, estimated_duration, starting_price, image, icon_name, is_active, sort_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE title=VALUES(title), type=VALUES(type), description=VALUES(description), features=VALUES(features), estimated_duration=VALUES(estimated_duration), starting_price=VALUES(starting_price), image=VALUES(image), icon_name=VALUES(icon_name), is_active=VALUES(is_active), sort_order=VALUES(sort_order)");

    $stmt->execute([
        $data['id'],
        $data['title'],
        $data['type'] ?? 'Residential',
        $data['description'] ?? null,
        json_encode($data['features'] ?? []),
        $data['estimatedDuration'] ?? $data['estimated_duration'] ?? null,
        floatval($data['startingPrice'] ?? $data['starting_price'] ?? 0),
        $data['image'] ?? null,
        $data['iconName'] ?? $data['icon_name'] ?? null,
        isset($data['isActive']) ? (int)$data['isActive'] : (isset($data['is_active']) ? (int)$data['is_active'] : 1),
        intval($data['sort_order'] ?? 0)
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Service '{$data['id']}' saved successfully."
    ]);

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error saving service.",
        "error" => $e->getMessage()
    ]);
}
?>
