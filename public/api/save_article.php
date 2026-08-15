<?php
// Decor8 India - Article Save/Update Endpoint
// Inserts or updates a single article in the dedicated 'articles' table
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

    $data = json_decode(file_get_contents("php://input"), true);

    if (empty($data['id']) || empty($data['title'])) {
        echo json_encode(["success" => false, "message" => "Article id and title are required."]);
        exit();
    }

    // Handle delete action
    if (!empty($data['_action']) && $data['_action'] === 'delete') {
        $stmt = $pdo->prepare("DELETE FROM articles WHERE id = ?");
        $stmt->execute([$data['id']]);
        echo json_encode(["success" => true, "message" => "Article deleted."]);
        exit();
    }

    // Determine is_published integer
    $isPub = 1;
    if (isset($data['isPublished'])) {
        $isPub = $data['isPublished'] ? 1 : 0;
    } else if (isset($data['status'])) {
        $isPub = strtolower($data['status']) === 'published' ? 1 : 0;
    } else if (isset($data['is_published'])) {
        $isPub = (int)$data['is_published'];
    }

    $coverImage = $data['coverImage'] ?? $data['cover_image'] ?? null;
    $author = $data['authorName'] ?? $data['author'] ?? 'Aarav Mehta (Principal Architect)';
    $readTime = $data['readTime'] ?? $data['read_time'] ?? '4 min read';

    // Handle bulk save
    if (isset($data['_bulk']) && is_array($data['articles'])) {
        $pdo->beginTransaction();
        $stmt = $pdo->prepare("INSERT INTO articles (id, title, category, excerpt, content, cover_image, author, read_time, tags, is_published)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE title=VALUES(title), category=VALUES(category), excerpt=VALUES(excerpt), content=VALUES(content), cover_image=VALUES(cover_image), author=VALUES(author), read_time=VALUES(read_time), tags=VALUES(tags), is_published=VALUES(is_published)");
        
        foreach ($data['articles'] as $a) {
            $itemIsPub = 1;
            if (isset($a['isPublished'])) {
                $itemIsPub = $a['isPublished'] ? 1 : 0;
            } else if (isset($a['status'])) {
                $itemIsPub = strtolower($a['status']) === 'published' ? 1 : 0;
            } else if (isset($a['is_published'])) {
                $itemIsPub = (int)$a['is_published'];
            }

            $stmt->execute([
                $a['id'],
                $a['title'],
                $a['category'] ?? null,
                $a['excerpt'] ?? null,
                $a['content'] ?? null,
                $a['coverImage'] ?? $a['cover_image'] ?? null,
                $a['authorName'] ?? $a['author'] ?? 'Aarav Mehta',
                $a['readTime'] ?? $a['read_time'] ?? '4 min read',
                json_encode($a['tags'] ?? []),
                $itemIsPub
            ]);
        }
        $pdo->commit();
        echo json_encode(["success" => true, "message" => "All articles saved."]);
        exit();
    }

    // Single article upsert
    $stmt = $pdo->prepare("INSERT INTO articles (id, title, category, excerpt, content, cover_image, author, read_time, tags, is_published)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE title=VALUES(title), category=VALUES(category), excerpt=VALUES(excerpt), content=VALUES(content), cover_image=VALUES(cover_image), author=VALUES(author), read_time=VALUES(read_time), tags=VALUES(tags), is_published=VALUES(is_published)");

    $stmt->execute([
        $data['id'],
        $data['title'],
        $data['category'] ?? null,
        $data['excerpt'] ?? null,
        $data['content'] ?? null,
        $coverImage,
        $author,
        $readTime,
        json_encode($data['tags'] ?? []),
        $isPub
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Article '{$data['id']}' saved successfully."
    ]);

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error saving article.",
        "error" => $e->getMessage()
    ]);
}
?>
