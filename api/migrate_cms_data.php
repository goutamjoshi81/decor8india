<?php
// Decor8 India - One-Time Migration Script
// Migrates data FROM cms_data JSON blobs INTO separate normalized tables
// Run this ONCE after deploying the new table structure
// Safe to re-run: uses INSERT ... ON DUPLICATE KEY UPDATE

require_once 'db_config.php';

$results = [];

try {
    $pdo = getDbConnection();
    
    // ========== Step 1: Create all new tables ==========
    $pdo->exec("CREATE TABLE IF NOT EXISTS `services` (
      `id` varchar(50) NOT NULL,
      `title` varchar(200) NOT NULL,
      `type` enum('Residential','Commercial','Construction') NOT NULL DEFAULT 'Residential',
      `description` text DEFAULT NULL,
      `features` JSON DEFAULT NULL,
      `estimated_duration` varchar(50) DEFAULT NULL,
      `starting_price` decimal(12,2) DEFAULT 0.00,
      `image` text DEFAULT NULL,
      `icon_name` varchar(50) DEFAULT NULL,
      `is_active` tinyint(1) NOT NULL DEFAULT 1,
      `sort_order` int NOT NULL DEFAULT 0,
      `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

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

    $results[] = "✅ All new tables created successfully.";

    // ========== Step 2: Read existing cms_data ==========
    $stmt = $pdo->query("SELECT data_key, data_value FROM cms_data");
    $cmsRows = $stmt->fetchAll();
    
    $cmsData = [];
    foreach ($cmsRows as $row) {
        $cmsData[$row['data_key']] = json_decode($row['data_value'], true);
    }

    $results[] = "📦 Found " . count($cmsRows) . " keys in cms_data: " . implode(', ', array_keys($cmsData));

    // ========== Step 3: Migrate Services ==========
    if (isset($cmsData['services']) && is_array($cmsData['services'])) {
        $count = 0;
        $stmt = $pdo->prepare("INSERT INTO services (id, title, type, description, features, estimated_duration, starting_price, image, icon_name, is_active, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE title=VALUES(title), type=VALUES(type), description=VALUES(description), features=VALUES(features), estimated_duration=VALUES(estimated_duration), starting_price=VALUES(starting_price), image=VALUES(image), icon_name=VALUES(icon_name), is_active=VALUES(is_active), sort_order=VALUES(sort_order)");
        
        foreach ($cmsData['services'] as $idx => $s) {
            $stmt->execute([
                $s['id'],
                $s['title'],
                $s['type'] ?? 'Residential',
                $s['description'] ?? null,
                json_encode($s['features'] ?? []),
                $s['estimatedDuration'] ?? $s['estimated_duration'] ?? null,
                floatval($s['startingPrice'] ?? $s['starting_price'] ?? 0),
                $s['image'] ?? null,
                $s['iconName'] ?? $s['icon_name'] ?? null,
                isset($s['isActive']) ? (int)$s['isActive'] : 1,
                $idx
            ]);
            $count++;
        }
        $results[] = "✅ Migrated $count services.";
    } else {
        $results[] = "⚠️ No services found in cms_data to migrate.";
    }

    // ========== Step 4: Migrate Articles ==========
    if (isset($cmsData['articles']) && is_array($cmsData['articles'])) {
        $count = 0;
        $stmt = $pdo->prepare("INSERT INTO articles (id, title, category, excerpt, content, cover_image, author, read_time, tags, is_published)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE title=VALUES(title), category=VALUES(category), excerpt=VALUES(excerpt), content=VALUES(content), cover_image=VALUES(cover_image), author=VALUES(author), read_time=VALUES(read_time), tags=VALUES(tags), is_published=VALUES(is_published)");
        
        foreach ($cmsData['articles'] as $a) {
            $stmt->execute([
                $a['id'],
                $a['title'],
                $a['category'] ?? null,
                $a['excerpt'] ?? null,
                $a['content'] ?? null,
                $a['coverImage'] ?? $a['cover_image'] ?? null,
                $a['author'] ?? null,
                $a['readTime'] ?? $a['read_time'] ?? null,
                json_encode($a['tags'] ?? []),
                isset($a['isPublished']) ? (int)$a['isPublished'] : 1
            ]);
            $count++;
        }
        $results[] = "✅ Migrated $count articles.";
    } else {
        $results[] = "⚠️ No articles found in cms_data to migrate.";
    }

    // ========== Step 5: Migrate Team Members ==========
    if (isset($cmsData['team_members']) && is_array($cmsData['team_members'])) {
        $count = 0;
        $stmt = $pdo->prepare("INSERT INTO team_members (id, name, role, experience, image, bio, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE name=VALUES(name), role=VALUES(role), experience=VALUES(experience), image=VALUES(image), bio=VALUES(bio), sort_order=VALUES(sort_order)");
        
        foreach ($cmsData['team_members'] as $idx => $m) {
            $stmt->execute([
                $m['id'],
                $m['name'],
                $m['role'] ?? null,
                $m['experience'] ?? null,
                $m['image'] ?? null,
                $m['bio'] ?? null,
                $idx
            ]);
            $count++;
        }
        $results[] = "✅ Migrated $count team members.";
    } else {
        $results[] = "⚠️ No team_members found in cms_data to migrate.";
    }

    // ========== Step 6: Migrate Testimonials ==========
    if (isset($cmsData['testimonials']) && is_array($cmsData['testimonials'])) {
        $count = 0;
        $stmt = $pdo->prepare("INSERT INTO testimonials (id, client_name, client_location, rating, review_text, project_type, designation, is_visible)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE client_name=VALUES(client_name), client_location=VALUES(client_location), rating=VALUES(rating), review_text=VALUES(review_text), project_type=VALUES(project_type), designation=VALUES(designation), is_visible=VALUES(is_visible)");
        
        foreach ($cmsData['testimonials'] as $t) {
            $stmt->execute([
                $t['id'],
                $t['clientName'] ?? $t['client_name'] ?? 'Client',
                $t['clientLocation'] ?? $t['client_location'] ?? null,
                intval($t['rating'] ?? 5),
                $t['reviewText'] ?? $t['review_text'] ?? $t['quote'] ?? null,
                $t['projectType'] ?? $t['project_type'] ?? null,
                $t['designation'] ?? null,
                isset($t['isVisible']) ? (int)$t['isVisible'] : 1
            ]);
            $count++;
        }
        $results[] = "✅ Migrated $count testimonials.";
    } else {
        $results[] = "⚠️ No testimonials found in cms_data to migrate.";
    }

    // ========== Step 7: Summary ==========
    $results[] = "";
    $results[] = "🎉 Migration complete! The cms_data table has been preserved as a backup.";
    $results[] = "You can safely delete rows 'services', 'articles', 'team_members', 'testimonials' from cms_data after verifying the new tables.";

    echo json_encode([
        "success" => true,
        "message" => "Migration completed successfully.",
        "log" => $results
    ], JSON_PRETTY_PRINT);

} catch (Throwable $e) {
    $results[] = "❌ ERROR: " . $e->getMessage();
    echo json_encode([
        "success" => false,
        "message" => "Migration failed.",
        "error" => $e->getMessage(),
        "log" => $results
    ], JSON_PRETTY_PRINT);
}
?>
