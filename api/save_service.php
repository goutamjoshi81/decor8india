<?php
// Decor8 India - Service Save/Update Endpoint
// Inserts or updates services in the dedicated 'services' table with full discount support
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

    if (!$data) {
        echo json_encode(["success" => false, "message" => "Invalid JSON payload."]);
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

        // If discount is explicitly valid and less than starting price
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

    // Helper to upsert a single service with explicit typed parameter binding
    $upsertService = function($pdo, $s, $idx = 0) use ($extractDiscount) {
        list($dPrice, $dPct) = $extractDiscount($s);
        $startingPrice = floatval($s['startingPrice'] ?? $s['starting_price'] ?? 0);
        $featuresJson = json_encode($s['features'] ?? []);
        $isActive = isset($s['isActive']) ? (int)$s['isActive'] : (isset($s['is_active']) ? (int)$s['is_active'] : 1);
        $sortOrder = isset($s['sort_order']) ? intval($s['sort_order']) : intval($idx);
        $type = $s['type'] ?? 'Residential';
        $desc = $s['description'] ?? null;
        $duration = $s['estimatedDuration'] ?? $s['estimated_duration'] ?? null;
        $image = $s['image'] ?? null;
        $iconName = $s['iconName'] ?? $s['icon_name'] ?? null;
        $id = $s['id'];
        $title = $s['title'];

        // Check if row already exists
        $checkStmt = $pdo->prepare("SELECT id FROM services WHERE id = ? LIMIT 1");
        $checkStmt->execute([$id]);
        $exists = $checkStmt->fetchColumn();

        if ($exists) {
            $updateStmt = $pdo->prepare("UPDATE services SET 
                title = :title, 
                type = :type, 
                description = :description, 
                features = :features, 
                estimated_duration = :duration, 
                starting_price = :startingPrice, 
                discount_price = :discountPrice, 
                discount_percentage = :discountPercentage, 
                image = :image, 
                icon_name = :iconName, 
                is_active = :isActive, 
                sort_order = :sortOrder 
                WHERE id = :id");
            
            $updateStmt->bindValue(':title', $title, PDO::PARAM_STR);
            $updateStmt->bindValue(':type', $type, PDO::PARAM_STR);
            $updateStmt->bindValue(':description', $desc, $desc === null ? PDO::PARAM_NULL : PDO::PARAM_STR);
            $updateStmt->bindValue(':features', $featuresJson, PDO::PARAM_STR);
            $updateStmt->bindValue(':duration', $duration, $duration === null ? PDO::PARAM_NULL : PDO::PARAM_STR);
            $updateStmt->bindValue(':startingPrice', $startingPrice);
            if ($dPrice === null) {
                $updateStmt->bindValue(':discountPrice', null, PDO::PARAM_NULL);
            } else {
                $updateStmt->bindValue(':discountPrice', $dPrice);
            }
            $updateStmt->bindValue(':discountPercentage', $dPct, PDO::PARAM_INT);
            $updateStmt->bindValue(':image', $image, $image === null ? PDO::PARAM_NULL : PDO::PARAM_STR);
            $updateStmt->bindValue(':iconName', $iconName, $iconName === null ? PDO::PARAM_NULL : PDO::PARAM_STR);
            $updateStmt->bindValue(':isActive', $isActive, PDO::PARAM_INT);
            $updateStmt->bindValue(':sortOrder', $sortOrder, PDO::PARAM_INT);
            $updateStmt->bindValue(':id', $id, PDO::PARAM_STR);
            $updateStmt->execute();
        } else {
            $insertStmt = $pdo->prepare("INSERT INTO services (id, title, type, description, features, estimated_duration, starting_price, discount_price, discount_percentage, image, icon_name, is_active, sort_order)
                VALUES (:id, :title, :type, :description, :features, :duration, :startingPrice, :discountPrice, :discountPercentage, :image, :iconName, :isActive, :sortOrder)");
            
            $insertStmt->bindValue(':id', $id, PDO::PARAM_STR);
            $insertStmt->bindValue(':title', $title, PDO::PARAM_STR);
            $insertStmt->bindValue(':type', $type, PDO::PARAM_STR);
            $insertStmt->bindValue(':description', $desc, $desc === null ? PDO::PARAM_NULL : PDO::PARAM_STR);
            $insertStmt->bindValue(':features', $featuresJson, PDO::PARAM_STR);
            $insertStmt->bindValue(':duration', $duration, $duration === null ? PDO::PARAM_NULL : PDO::PARAM_STR);
            $insertStmt->bindValue(':startingPrice', $startingPrice);
            if ($dPrice === null) {
                $insertStmt->bindValue(':discountPrice', null, PDO::PARAM_NULL);
            } else {
                $insertStmt->bindValue(':discountPrice', $dPrice);
            }
            $insertStmt->bindValue(':discountPercentage', $dPct, PDO::PARAM_INT);
            $insertStmt->bindValue(':image', $image, $image === null ? PDO::PARAM_NULL : PDO::PARAM_STR);
            $insertStmt->bindValue(':iconName', $iconName, $iconName === null ? PDO::PARAM_NULL : PDO::PARAM_STR);
            $insertStmt->bindValue(':isActive', $isActive, PDO::PARAM_INT);
            $insertStmt->bindValue(':sortOrder', $sortOrder, PDO::PARAM_INT);
            $insertStmt->execute();
        }

        return [$dPrice, $dPct];
    };

    // Handle bulk save (array of services)
    if (isset($data['_bulk']) && is_array($data['services'])) {
        $pdo->beginTransaction();
        foreach ($data['services'] as $idx => $s) {
            if (!empty($s['id']) && !empty($s['title'])) {
                $upsertService($pdo, $s, $idx);
            }
        }
        $pdo->commit();
        echo json_encode(["success" => true, "message" => "All services saved."]);
        exit();
    }

    if (empty($data['id']) || empty($data['title'])) {
        echo json_encode(["success" => false, "message" => "Service id and title are required."]);
        exit();
    }

    // Single service upsert
    list($singleDPrice, $singleDPct) = $upsertService($pdo, $data, intval($data['sort_order'] ?? 0));

    echo json_encode([
        "success" => true,
        "message" => "Service '{$data['id']}' saved successfully.",
        "discountPrice" => $singleDPrice,
        "discountPercentage" => $singleDPct
    ]);

} catch (Throwable $e) {
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    echo json_encode([
        "success" => false,
        "message" => "Error saving service.",
        "error" => $e->getMessage()
    ]);
}
?>
