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
      `gallery_images_json` longtext DEFAULT NULL,
      `author` varchar(100) DEFAULT NULL,
      `read_time` varchar(20) DEFAULT NULL,
      `tags` JSON DEFAULT NULL,
      `is_published` tinyint(1) NOT NULL DEFAULT 1,
      `published_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    // Auto-migrate gallery_images_json column if missing
    try { $pdo->exec("ALTER TABLE articles ADD COLUMN gallery_images_json LONGTEXT DEFAULT NULL"); } catch (\PDOException $ex) {}

    $id = isset($_GET['id']) ? trim($_GET['id']) : null;

    $formatArticle = function($row) {
        $row['tags'] = !empty($row['tags']) ? (json_decode($row['tags'], true) ?: []) : [];
        $row['coverImage'] = !empty($row['cover_image']) ? $row['cover_image'] : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
        $gallery = !empty($row['gallery_images_json']) ? json_decode($row['gallery_images_json'], true) : [];
        $row['galleryImages'] = is_array($gallery) ? $gallery : [];
        $row['readTime'] = !empty($row['read_time']) ? $row['read_time'] : '4 min read';
        $row['authorName'] = !empty($row['author']) ? $row['author'] : 'Decor8 Editorial Team';
        $row['isPublished'] = (!isset($row['is_published']) || $row['is_published'] == 1);
        $row['status'] = (!isset($row['is_published']) || $row['is_published'] == 1) ? 'Published' : 'Draft';
        $row['publishedAt'] = !empty($row['published_at']) ? explode(' ', $row['published_at'])[0] : date('Y-m-d');
        $row['slug'] = !empty($row['title']) ? strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $row['title']))) : 'article';
        return $row;
    };

    if ($id) {
        // Fetch single article
        $stmt = $pdo->prepare("SELECT * FROM articles WHERE id = ? LIMIT 1");
        $stmt->execute([$id]);
        $row = $stmt->fetch();

        if ($row) {
            echo json_encode(["success" => true, "article" => $formatArticle($row)]);
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
        
        $articles = array_map($formatArticle, $rows);

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
