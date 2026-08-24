<?php
// Decor8 India - Testimonial Save/Update Endpoint
// Inserts or updates a single testimonial in the dedicated 'testimonials' table
require_once 'db_config.php';

try {
    $pdo = getDbConnection();

    // Auto-create testimonials table if not exists
    $pdo->exec("CREATE TABLE IF NOT EXISTS `testimonials` (
      `id` varchar(50) NOT NULL,
      `client_name` varchar(100) NOT NULL,
      `client_location` varchar(150) DEFAULT NULL,
      `rating` tinyint NOT NULL DEFAULT 5,
      `review_text` text DEFAULT NULL,
      `project_type` varchar(100) DEFAULT NULL,
      `designation` varchar(150) DEFAULT NULL,
      `is_visible` tinyint(1) NOT NULL DEFAULT 1,
      `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    $data = json_decode(file_get_contents("php://input"), true);

    if (empty($data['id'])) {
        echo json_encode(["success" => false, "message" => "Testimonial id is required."]);
        exit();
    }

    // Handle delete action
    if (!empty($data['_action']) && $data['_action'] === 'delete') {
        $stmt = $pdo->prepare("DELETE FROM testimonials WHERE id = ?");
        $stmt->execute([$data['id']]);
        echo json_encode(["success" => true, "message" => "Testimonial deleted."]);
        exit();
    }

    // Handle bulk save
    if (isset($data['_bulk']) && is_array($data['testimonials'])) {
        $pdo->beginTransaction();
        $stmt = $pdo->prepare("INSERT INTO testimonials (id, client_name, client_location, rating, review_text, project_type, designation, is_visible)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE client_name=VALUES(client_name), client_location=VALUES(client_location), rating=VALUES(rating), review_text=VALUES(review_text), project_type=VALUES(project_type), designation=VALUES(designation), is_visible=VALUES(is_visible)");
        
        foreach ($data['testimonials'] as $t) {
            $stmt->execute([
                $t['id'],
                $t['clientName'] ?? $t['client_name'] ?? 'Client',
                $t['clientLocation'] ?? $t['client_location'] ?? null,
                intval($t['rating'] ?? 5),
                $t['reviewText'] ?? $t['review_text'] ?? null,
                $t['projectType'] ?? $t['project_type'] ?? null,
                $t['designation'] ?? null,
                isset($t['isVisible']) ? (int)$t['isVisible'] : (isset($t['is_visible']) ? (int)$t['is_visible'] : 1)
            ]);
        }
        $pdo->commit();
        echo json_encode(["success" => true, "message" => "All testimonials saved."]);
        exit();
    }

    // Single testimonial upsert
    $clientName = $data['clientName'] ?? $data['client_name'] ?? 'Client';
    
    $stmt = $pdo->prepare("INSERT INTO testimonials (id, client_name, client_location, rating, review_text, project_type, designation, is_visible)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE client_name=VALUES(client_name), client_location=VALUES(client_location), rating=VALUES(rating), review_text=VALUES(review_text), project_type=VALUES(project_type), designation=VALUES(designation), is_visible=VALUES(is_visible)");

    $stmt->execute([
        $data['id'],
        $clientName,
        $data['clientLocation'] ?? $data['client_location'] ?? null,
        intval($data['rating'] ?? 5),
        $data['reviewText'] ?? $data['review_text'] ?? null,
        $data['projectType'] ?? $data['project_type'] ?? null,
        $data['designation'] ?? null,
        isset($data['isVisible']) ? (int)$data['isVisible'] : (isset($data['is_visible']) ? (int)$data['is_visible'] : 1)
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Testimonial '{$data['id']}' saved successfully."
    ]);

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error saving testimonial.",
        "error" => $e->getMessage()
    ]);
}
?>
