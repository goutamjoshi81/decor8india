<?php
// Decor8 India - Brand & Material Partner Save/Delete Endpoint
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

    $data = json_decode(file_get_contents("php://input"), true);

    if (empty($data['id']) && empty($data['name'])) {
        echo json_encode(["success" => false, "message" => "Partner name or id is required."]);
        exit();
    }

    // Handle delete action
    if (!empty($data['_action']) && $data['_action'] === 'delete') {
        $stmt = $pdo->prepare("DELETE FROM partners WHERE id = ?");
        $stmt->execute([$data['id']]);
        echo json_encode(["success" => true, "message" => "Partner deleted successfully."]);
        exit();
    }

    $id = !empty($data['id']) ? $data['id'] : 'partner-' . time() . '-' . rand(100, 999);
    $name = $data['name'];
    $category = $data['category'] ?? '';
    $logoUrl = $data['logoUrl'] ?? $data['logo_url'] ?? '';

    $stmt = $pdo->prepare("INSERT INTO partners (id, name, category, logo_url)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE name=VALUES(name), category=VALUES(category), logo_url=VALUES(logo_url)");

    $stmt->execute([$id, $name, $category, $logoUrl]);

    echo json_encode([
        "success" => true,
        "message" => "Partner saved successfully.",
        "partner" => [
            "id" => $id,
            "name" => $name,
            "category" => $category,
            "logoUrl" => $logoUrl
        ]
    ]);

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error saving partner.",
        "error" => $e->getMessage()
    ]);
}
?>
