<?php
// Decor8 India - Team Members Fetch Endpoint
// Reads from dedicated 'team_members' table (replaces cms_data key-value approach)
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

    $id = isset($_GET['id']) ? trim($_GET['id']) : null;

    if ($id) {
        $stmt = $pdo->prepare("SELECT * FROM team_members WHERE id = ? LIMIT 1");
        $stmt->execute([$id]);
        $row = $stmt->fetch();

        if ($row) {
            echo json_encode(["success" => true, "member" => $row]);
        } else {
            echo json_encode(["success" => false, "message" => "Team member not found."]);
        }
    } else {
        $stmt = $pdo->query("SELECT * FROM team_members ORDER BY sort_order ASC, updated_at DESC");
        $rows = $stmt->fetchAll();
        echo json_encode(["success" => true, "team_members" => $rows]);
    }

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error fetching team members.",
        "error" => $e->getMessage()
    ]);
}
?>
