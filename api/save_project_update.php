<?php
// Decor8 India - Save/Update Project, Daily Site Updates & Documents to GoDaddy MySQL
require_once 'db_config.php';

try {
    $pdo = getDbConnection();
    $data = json_decode(file_get_contents("php://input"));

    if (empty($data->projectId)) {
        echo json_encode(["success" => false, "message" => "Project ID is required."]);
        exit();
    }

    $projectId = trim($data->projectId);

    // Auto-create projects table if not exists
    $pdo->exec("CREATE TABLE IF NOT EXISTS `projects` (
      `id` varchar(50) NOT NULL,
      `title` varchar(150) NOT NULL DEFAULT 'Bespoke Luxury Project',
      `client_id` varchar(50) DEFAULT NULL,
      `client_name` varchar(100) DEFAULT NULL,
      `client_email` varchar(120) DEFAULT NULL,
      `designer_name` varchar(100) DEFAULT NULL,
      `category` varchar(50) DEFAULT 'Residential',
      `style` varchar(50) DEFAULT 'Luxury',
      `cover_image` text DEFAULT NULL,
      `location` varchar(150) DEFAULT NULL,
      `area` varchar(50) DEFAULT NULL,
      `budget` varchar(50) DEFAULT NULL,
      `status` varchar(50) NOT NULL DEFAULT 'Ongoing',
      `show_on_landing_page` TINYINT(1) DEFAULT 1,
      `progress_percentage` int NOT NULL DEFAULT 0,
      `current_stage` varchar(100) NOT NULL DEFAULT 'Civil Work',
      `expected_completion` varchar(50) DEFAULT NULL,
      `description` text DEFAULT NULL,
      `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    // Auto-migrate all project table columns if missing
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN title VARCHAR(150) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN client_id VARCHAR(50) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN client_name VARCHAR(100) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN client_email VARCHAR(120) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN designer_name VARCHAR(100) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN category VARCHAR(50) DEFAULT 'Residential'"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN service_type VARCHAR(50) DEFAULT 'Residential'"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN estimated_cost DECIMAL(12,2) DEFAULT 0.00"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN style VARCHAR(50) DEFAULT 'Luxury'"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN cover_image TEXT DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN gallery_images_json LONGTEXT DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN before_image TEXT DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN after_image TEXT DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN location VARCHAR(150) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN area VARCHAR(50) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN budget VARCHAR(50) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN completion_time VARCHAR(50) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN status VARCHAR(50) NOT NULL DEFAULT 'Ongoing'"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN show_on_landing_page TINYINT(1) DEFAULT 1"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN progress_percentage INT NOT NULL DEFAULT 0"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN current_stage VARCHAR(100) NOT NULL DEFAULT 'Civil Work'"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN expected_completion VARCHAR(50) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN description TEXT DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN work_updates_json LONGTEXT DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN documents_json LONGTEXT DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN payments_json LONGTEXT DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN milestones_json LONGTEXT DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN contract_price DECIMAL(12,2) DEFAULT NULL"); } catch (\PDOException $ex) {}

    // Auto-repair existing database records where client_id was incorrectly stored as an email address
    try {
        $pdo->exec("UPDATE projects p 
                    INNER JOIN users u ON LOWER(p.client_email) = LOWER(u.email) 
                    SET p.client_id = u.id 
                    WHERE (p.client_id LIKE '%@%' OR p.client_id IS NULL OR p.client_id = '')");
    } catch (\PDOException $ex) {}

    // 1. Fetch current project from DB
    $stmt = $pdo->prepare("SELECT * FROM projects WHERE id = ? LIMIT 1");
    $stmt->execute([$projectId]);
    $existing = $stmt->fetch();

    $workUpdates = !empty($existing['work_updates_json']) ? json_decode($existing['work_updates_json'], true) : [];
    $documents = !empty($existing['documents_json']) ? json_decode($existing['documents_json'], true) : [];
    $payments = !empty($existing['payments_json']) ? json_decode($existing['payments_json'], true) : [];

    if (!is_array($workUpdates)) $workUpdates = [];
    if (!is_array($documents)) $documents = [];
    if (!is_array($payments)) $payments = [];

    // Full payments array overwrite OR single payment push
    if (!empty($data->payments) && is_array($data->payments)) {
        $payments = $data->payments;
    } else if (!empty($data->payment)) {
        array_unshift($payments, $data->payment);
    }

    // Lock permanent Invoice IDs into payments array for DB persistence
    if (!empty($payments) && is_array($payments)) {
        foreach ($payments as &$p) {
            if (is_array($p)) {
                if (empty($p['invoiceUrl'])) {
                    $pid = !empty($p['id']) ? preg_replace('/[^0-9]/', '', $p['id']) : '';
                    if (empty($pid) || strlen($pid) < 6) {
                        $pid = sprintf("%06d", mt_rand(100000, 999999));
                    } else {
                        $pid = str_pad(substr($pid, -6), 6, '0', STR_PAD_LEFT);
                    }
                    $p['invoiceUrl'] = 'INV-D8I-' . $pid;
                }
            } else if (is_object($p)) {
                if (empty($p->invoiceUrl)) {
                    $pid = !empty($p->id) ? preg_replace('/[^0-9]/', '', $p->id) : '';
                    if (empty($pid) || strlen($pid) < 6) {
                        $pid = sprintf("%06d", mt_rand(100000, 999999));
                    } else {
                        $pid = str_pad(substr($pid, -6), 6, '0', STR_PAD_LEFT);
                    }
                    $p->invoiceUrl = 'INV-D8I-' . $pid;
                }
            }
        }
        unset($p);
    }

    // Full documents array overwrite OR single document push
    if (!empty($data->documents) && is_array($data->documents)) {
        $documents = $data->documents;
    } else if (!empty($data->document)) {
        array_unshift($documents, $data->document);
    }

    // Append new work update feed item if provided
    if (!empty($data->workUpdate)) {
        array_unshift($workUpdates, $data->workUpdate);
    }

    // Prepare fields to update
    $title = !empty($data->title) ? trim($data->title) : ($existing['title'] ?? 'Bespoke Luxury Interior Project');
    $clientName = !empty($data->clientName) ? trim($data->clientName) : ($existing['client_name'] ?? 'Client');
    $designerName = !empty($data->designerName) ? trim($data->designerName) : ($existing['designer_name'] ?? 'Mr. Satish Bhat (CEO & Principal Architect)');
    $category = !empty($data->category) ? trim($data->category) : ($existing['category'] ?? 'Residential');
    $style = !empty($data->style) ? trim($data->style) : ($existing['style'] ?? 'Luxury');
    $coverImage = !empty($data->coverImage) ? trim($data->coverImage) : ($existing['cover_image'] ?? null);
    $beforeImage = isset($data->beforeImage) ? trim($data->beforeImage) : ($existing['before_image'] ?? null);
    $afterImage = isset($data->afterImage) ? trim($data->afterImage) : ($existing['after_image'] ?? null);
    $location = !empty($data->location) ? trim($data->location) : ($existing['location'] ?? null);
    $area = !empty($data->area) ? trim($data->area) : ($existing['area'] ?? null);
    $budget = !empty($data->budget) ? trim($data->budget) : ($existing['budget'] ?? null);
    $completionTime = !empty($data->completionTime) ? trim($data->completionTime) : ($existing['completion_time'] ?? null);
    $description = isset($data->description) ? trim($data->description) : ($existing['description'] ?? null);

    // Calculate contract_price float
    $contractPrice = null;
    if (isset($data->contractPrice) && (float)$data->contractPrice > 0) {
        $contractPrice = (float)$data->contractPrice;
    } else if ($budget) {
        if (preg_match('/([\d.]+)\s*lakh/i', $budget, $matches)) {
            $contractPrice = (float)$matches[1] * 100000;
        } else if (preg_match('/[\d.]+/', str_replace(',', '', $budget), $matches)) {
            $contractPrice = (float)$matches[0];
        }
    }
    if (!$contractPrice && isset($existing['contract_price'])) {
        $contractPrice = (float)$existing['contract_price'];
    }

    $galleryImages = isset($data->galleryImages) && is_array($data->galleryImages) 
        ? $data->galleryImages 
        : (!empty($existing['gallery_images_json']) ? json_decode($existing['gallery_images_json'], true) : []);
    if (!is_array($galleryImages)) $galleryImages = [];

    $progressPercentage = isset($data->progressPercentage) ? (int)$data->progressPercentage : ($existing['progress_percentage'] ?? 0);
    $currentStage = !empty($data->currentStage) ? trim($data->currentStage) : ($existing['current_stage'] ?? 'Civil Work');
    $status = !empty($data->status) ? trim($data->status) : ($existing['status'] ?? 'Ongoing');

    $showOnLandingPage = 1;
    if (isset($data->showOnLandingPage)) {
        $showOnLandingPage = $data->showOnLandingPage ? 1 : 0;
    } else if (isset($existing['show_on_landing_page'])) {
        $showOnLandingPage = (int)$existing['show_on_landing_page'];
    }

    $milestones = isset($data->milestones) && is_array($data->milestones) 
        ? $data->milestones 
        : (!empty($existing['milestones_json']) ? json_decode($existing['milestones_json'], true) : []);
    if (!is_array($milestones)) $milestones = [];

    $workUpdatesJson = json_encode($workUpdates);
    $documentsJson = json_encode($documents);
    $paymentsJson = json_encode($payments);
    $galleryImagesJson = json_encode($galleryImages);
    $milestonesJson = json_encode($milestones);

    if ($existing) {
        $updateStmt = $pdo->prepare("UPDATE projects SET 
            title = ?,
            client_name = ?,
            designer_name = ?,
            category = ?,
            style = ?,
            cover_image = ?,
            gallery_images_json = ?,
            before_image = ?,
            after_image = ?,
            location = ?,
            area = ?,
            budget = ?,
            contract_price = ?,
            completion_time = ?,
            description = ?,
            progress_percentage = ?, 
            current_stage = ?, 
            status = ?, 
            show_on_landing_page = ?,
            work_updates_json = ?, 
            documents_json = ?, 
            payments_json = ?,
            milestones_json = ? 
            WHERE id = ?");
        $updateStmt->execute([
            $title,
            $clientName,
            $designerName,
            $category,
            $style,
            $coverImage,
            $galleryImagesJson,
            $beforeImage,
            $afterImage,
            $location,
            $area,
            $budget,
            $contractPrice,
            $completionTime,
            $description,
            $progressPercentage,
            $currentStage,
            $status,
            $showOnLandingPage,
            $workUpdatesJson,
            $documentsJson,
            $paymentsJson,
            $milestonesJson,
            $projectId
        ]);
    } else {
        $clientEmail = !empty($data->clientEmail) ? trim($data->clientEmail) : 'client@decor8india.com';
        $clientId = !empty($data->clientId) ? trim($data->clientId) : null;

        if (empty($clientId) || strpos($clientId, '@') !== false) {
            $uStmt = $pdo->prepare("SELECT id FROM users WHERE LOWER(email) = ? LIMIT 1");
            $uStmt->execute([strtolower($clientEmail)]);
            $uRow = $uStmt->fetch();
            if ($uRow && !empty($uRow['id'])) {
                $clientId = $uRow['id'];
            } else {
                $clientId = 'usr-' . time();
            }
        }

        $serviceType = !empty($data->serviceType) ? trim($data->serviceType) : 'Residential';
        $estimatedCost = !empty($data->estimatedCost) ? (float)$data->estimatedCost : 500000.00;

        $insertStmt = $pdo->prepare("INSERT INTO projects (id, title, client_id, client_email, client_name, designer_name, category, style, cover_image, gallery_images_json, before_image, after_image, location, area, budget, contract_price, completion_time, description, service_type, estimated_cost, progress_percentage, current_stage, status, show_on_landing_page, work_updates_json, documents_json, payments_json, milestones_json) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $insertStmt->execute([
            $projectId,
            $title,
            $clientId, // Strictly user ID (usr-XXX)
            $clientEmail,
            $clientName,
            $designerName,
            $category,
            $style,
            $coverImage,
            $galleryImagesJson,
            $beforeImage,
            $afterImage,
            $location,
            $area,
            $budget,
            $contractPrice ?: $estimatedCost,
            $completionTime,
            $description,
            $serviceType,
            $estimatedCost,
            $progressPercentage,
            $currentStage,
            $status,
            $showOnLandingPage,
            $workUpdatesJson,
            $documentsJson,
            $paymentsJson,
            $milestonesJson
        ]);
    }

    echo json_encode([
        "success" => true,
        "message" => "Project synced successfully to GoDaddy MySQL!",
        "projectId" => $projectId
    ]);

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error syncing project update to database.",
        "error" => $e->getMessage()
    ]);
}
?>
