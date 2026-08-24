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
      `discount_price` decimal(12,2) DEFAULT NULL,
      `discount_percentage` int DEFAULT 0,
      `image` text DEFAULT NULL,
      `icon_name` varchar(50) DEFAULT NULL,
      `is_active` tinyint(1) NOT NULL DEFAULT 1,
      `sort_order` int NOT NULL DEFAULT 0,
      `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    // Auto-migrate columns if table already exists
    try {
        $pdo->exec("ALTER TABLE services ADD COLUMN discount_price decimal(12,2) DEFAULT NULL");
    } catch (\PDOException $e) {}
    try {
        $pdo->exec("ALTER TABLE services ADD COLUMN discount_percentage int DEFAULT 0");
    } catch (\PDOException $e) {}

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

    // Helper to extract and compute discount fields
    $extractDiscount = function($item) {
        $startingPrice = floatval($item['startingPrice'] ?? $item['starting_price'] ?? 0);
        $rawDiscountPrice = $item['discountPrice'] ?? $item['discount_price'] ?? null;
        $discountPrice = ($rawDiscountPrice !== null && $rawDiscountPrice !== '' && floatval($rawDiscountPrice) > 0) 
            ? floatval($rawDiscountPrice) 
            : null;
        
        $rawPct = $item['discountPercentage'] ?? $item['discount_percentage'] ?? 0;
        $discountPct = intval($rawPct);

        if ($discountPrice !== null && $discountPrice > 0 && $startingPrice > 0 && $discountPrice < $startingPrice) {
            if ($discountPct <= 0) {
                $discountPct = (int)round((( $startingPrice - $discountPrice ) / $startingPrice) * 100);
            }
        } elseif ($discountPct > 0 && $startingPrice > 0 && ($discountPrice === null || $discountPrice <= 0)) {
            $discountPrice = round($startingPrice * (1 - ($discountPct / 100)), 2);
        } else {
            // Explicitly cleared / no discount
            $discountPrice = null;
            $discountPct = 0;
        }

        return [$discountPrice, $discountPct];
    };

    // Handle bulk save (array of services)
    if (isset($data['_bulk']) && is_array($data['services'])) {
        $pdo->beginTransaction();
        $stmt = $pdo->prepare("INSERT INTO services (id, title, type, description, features, estimated_duration, starting_price, discount_price, discount_percentage, image, icon_name, is_active, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE title=VALUES(title), type=VALUES(type), description=VALUES(description), features=VALUES(features), estimated_duration=VALUES(estimated_duration), starting_price=VALUES(starting_price), discount_price=VALUES(discount_price), discount_percentage=VALUES(discount_percentage), image=VALUES(image), icon_name=VALUES(icon_name), is_active=VALUES(is_active), sort_order=VALUES(sort_order)");
        
        foreach ($data['services'] as $idx => $s) {
            list($dPrice, $dPct) = $extractDiscount($s);
            $stmt->execute([
                $s['id'],
                $s['title'],
                $s['type'] ?? 'Residential',
                $s['description'] ?? null,
                json_encode($s['features'] ?? []),
                $s['estimatedDuration'] ?? $s['estimated_duration'] ?? null,
                floatval($s['startingPrice'] ?? $s['starting_price'] ?? 0),
                $dPrice,
                $dPct,
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
    list($singleDPrice, $singleDPct) = $extractDiscount($data);
    $stmt = $pdo->prepare("INSERT INTO services (id, title, type, description, features, estimated_duration, starting_price, discount_price, discount_percentage, image, icon_name, is_active, sort_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE title=VALUES(title), type=VALUES(type), description=VALUES(description), features=VALUES(features), estimated_duration=VALUES(estimated_duration), starting_price=VALUES(starting_price), discount_price=VALUES(discount_price), discount_percentage=VALUES(discount_percentage), image=VALUES(image), icon_name=VALUES(icon_name), is_active=VALUES(is_active), sort_order=VALUES(sort_order)");

    $stmt->execute([
        $data['id'],
        $data['title'],
        $data['type'] ?? 'Residential',
        $data['description'] ?? null,
        json_encode($data['features'] ?? []),
        $data['estimatedDuration'] ?? $data['estimated_duration'] ?? null,
        floatval($data['startingPrice'] ?? $data['starting_price'] ?? 0),
        $singleDPrice,
        $singleDPct,
        $data['image'] ?? null,
        $data['iconName'] ?? $data['icon_name'] ?? null,
        isset($data['isActive']) ? (int)$data['isActive'] : (isset($data['is_active']) ? (int)$data['is_active'] : 1),
        intval($data['sort_order'] ?? 0)
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Service '{$data['id']}' saved successfully.",
        "discountPrice" => $singleDPrice,
        "discountPercentage" => $singleDPct
    ]);


} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error saving service.",
        "error" => $e->getMessage()
    ]);
}
?>
