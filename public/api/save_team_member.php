<?php
// Decor8 India - Team Member Save/Update Endpoint
// Inserts or updates a single team member in the dedicated 'team_members' table
require_once 'db_config.php';

try {
    $pdo = getDbConnection();

    // Auto-create team_members table if not exists
    $pdo->exec("CREATE TABLE IF NOT EXISTS `team_members` (
      `id` varchar(50) NOT NULL,
      `name` varchar(100) NOT NULL,
      `role` varchar(100) DEFAULT NULL,
      `experience` varchar(100) DEFAULT NULL,
      `image` text DEFAULT NULL,
      `bio` text DEFAULT NULL,
      `sort_order` int NOT NULL DEFAULT 0,
      `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    $data = json_decode(file_get_contents("php://input"), true);

    if (empty($data['id']) || empty($data['name'])) {
        echo json_encode(["success" => false, "message" => "Team member id and name are required."]);
        exit();
    }

    // Handle delete action
    if (!empty($data['_action']) && $data['_action'] === 'delete') {
        $stmt = $pdo->prepare("DELETE FROM team_members WHERE id = ?");
        $stmt->execute([$data['id']]);
        echo json_encode(["success" => true, "message" => "Team member deleted."]);
        exit();
    }

    // Handle bulk save
    if (isset($data['_bulk']) && is_array($data['team_members'])) {
        $pdo->beginTransaction();
        $stmt = $pdo->prepare("INSERT INTO team_members (id, name, role, experience, image, bio, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE name=VALUES(name), role=VALUES(role), experience=VALUES(experience), image=VALUES(image), bio=VALUES(bio), sort_order=VALUES(sort_order)");
        
        foreach ($data['team_members'] as $idx => $m) {
            $stmt->execute([
                $m['id'],
                $m['name'],
                $m['role'] ?? null,
                $m['experience'] ?? null,
                $m['image'] ?? null,
                $m['bio'] ?? null,
                $idx
            ]);
        }
        $pdo->commit();
        echo json_encode(["success" => true, "message" => "All team members saved."]);
        exit();
    }

    // Single team member upsert
    $stmt = $pdo->prepare("INSERT INTO team_members (id, name, role, experience, image, bio, sort_order)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE name=VALUES(name), role=VALUES(role), experience=VALUES(experience), image=VALUES(image), bio=VALUES(bio), sort_order=VALUES(sort_order)");

    $stmt->execute([
        $data['id'],
        $data['name'],
        $data['role'] ?? null,
        $data['experience'] ?? null,
        $data['image'] ?? null,
        $data['bio'] ?? null,
        intval($data['sort_order'] ?? 0)
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Team member '{$data['id']}' saved successfully."
    ]);

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error saving team member.",
        "error" => $e->getMessage()
    ]);
}
?>
