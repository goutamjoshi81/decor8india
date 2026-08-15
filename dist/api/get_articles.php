<?php
// Decor8 India - Articles Fetch Endpoint
// Reads from dedicated 'articles' table (replaces cms_data key-value approach)
require_once 'db_config.php';

try {
    $pdo = getDbConnection();

    // Auto-create articles table if not exists
    $pdo->exec("CREATE TABLE IF NOT EXISTS `articles` (
      `id` varchar(50) NOT NULL,
      `title` varchar(300) NOT NULL,
      `category` varchar(100) DEFAULT NULL,
      `excerpt` text DEFAULT NULL,
      `content` longtext DEFAULT NULL,
      `cover_image` text DEFAULT NULL,
      `author` varchar(100) DEFAULT NULL,
      `read_time` varchar(20) DEFAULT NULL,
      `tags` JSON DEFAULT NULL,
      `is_published` tinyint(1) NOT NULL DEFAULT 1,
      `published_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    $id = isset($_GET['id']) ? trim($_GET['id']) : null;

    if ($id) {
        // Fetch single article
        $stmt = $pdo->prepare("SELECT * FROM articles WHERE id = ? LIMIT 1");
        $stmt->execute([$id]);
        $row = $stmt->fetch();

        if ($row) {
            $row['tags'] = json_decode($row['tags'], true) ?: [];
            $row['coverImage'] = $row['cover_image'];
            $row['readTime'] = $row['read_time'];
            $row['isPublished'] = (bool)$row['is_published'];
            $row['publishedAt'] = $row['published_at'];
            echo json_encode(["success" => true, "article" => $row]);
        } else {
            echo json_encode(["success" => false, "message" => "Article not found."]);
        }
    } else {
        // Fetch all articles
        $publishedOnly = isset($_GET['published']) ? (bool)$_GET['published'] : false;
        $query = "SELECT * FROM articles";
        if ($publishedOnly) {
            $query .= " WHERE is_published = 1";
        }
        $query .= " ORDER BY published_at DESC";
        
        $stmt = $pdo->query($query);
        $rows = $stmt->fetchAll();
        
        $articles = array_map(function($row) {
            $row['tags'] = json_decode($row['tags'], true) ?: [];
            $row['coverImage'] = $row['cover_image'];
            $row['readTime'] = $row['read_time'];
            $row['isPublished'] = (bool)$row['is_published'];
            $row['publishedAt'] = $row['published_at'];
            return $row;
        }, $rows);

        echo json_encode(["success" => true, "articles" => $articles]);
    }

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error fetching articles.",
        "error" => $e->getMessage()
    ]);
}
?>
