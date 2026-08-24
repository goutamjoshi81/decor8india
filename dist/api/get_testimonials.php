<?php
// Decor8 India - Testimonials Fetch Endpoint
// Reads from dedicated 'testimonials' table (replaces cms_data key-value approach)
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

    $id = isset($_GET['id']) ? trim($_GET['id']) : null;

    if ($id) {
        $stmt = $pdo->prepare("SELECT * FROM testimonials WHERE id = ? LIMIT 1");
        $stmt->execute([$id]);
        $row = $stmt->fetch();

        if ($row) {
            $row['clientName'] = $row['client_name'];
            $row['clientLocation'] = $row['client_location'];
            $row['reviewText'] = $row['review_text'];
            $row['projectType'] = $row['project_type'];
            $row['isVisible'] = (bool)$row['is_visible'];
            $row['rating'] = intval($row['rating']);
            echo json_encode(["success" => true, "testimonial" => $row]);
        } else {
            echo json_encode(["success" => false, "message" => "Testimonial not found."]);
        }
    } else {
        $visibleOnly = isset($_GET['visible']) ? (bool)$_GET['visible'] : false;
        $query = "SELECT * FROM testimonials";
        if ($visibleOnly) {
            $query .= " WHERE is_visible = 1";
        }
        $query .= " ORDER BY created_at DESC";
        
        $stmt = $pdo->query($query);
        $rows = $stmt->fetchAll();
        
        $testimonials = array_map(function($row) {
            $row['clientName'] = $row['client_name'];
            $row['clientLocation'] = $row['client_location'];
            $row['reviewText'] = $row['review_text'];
            $row['projectType'] = $row['project_type'];
            $row['isVisible'] = (bool)$row['is_visible'];
            $row['rating'] = intval($row['rating']);
            return $row;
        }, $rows);

        echo json_encode(["success" => true, "testimonials" => $testimonials]);
    }

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error fetching testimonials.",
        "error" => $e->getMessage()
    ]);
}
?>
