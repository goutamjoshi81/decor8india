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
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN location VARCHAR(150) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN area VARCHAR(50) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN budget VARCHAR(50) DEFAULT NULL"); } catch (\PDOException $ex) {}
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
    $progressPercentage = isset($data->progressPercentage) ? (int)$data->progressPercentage : ($existing['progress_percentage'] ?? 0);
    $currentStage = !empty($data->currentStage) ? trim($data->currentStage) : ($existing['current_stage'] ?? 'Civil Work');
    $status = !empty($data->status) ? trim($data->status) : ($existing['status'] ?? 'Ongoing');

    $showOnLandingPage = 1;
    if (isset($data->showOnLandingPage)) {
        $showOnLandingPage = $data->showOnLandingPage ? 1 : 0;
    } else if (isset($existing['show_on_landing_page'])) {
        $showOnLandingPage = (int)$existing['show_on_landing_page'];
    }

    $workUpdatesJson = json_encode($workUpdates);
    $documentsJson = json_encode($documents);
    $paymentsJson = json_encode($payments);

    if ($existing) {
        $updateStmt = $pdo->prepare("UPDATE projects SET 
            progress_percentage = ?, 
            current_stage = ?, 
            status = ?, 
            show_on_landing_page = ?,
            work_updates_json = ?, 
            documents_json = ?, 
            payments_json = ? 
            WHERE id = ?");
        $updateStmt->execute([
            $progressPercentage,
            $currentStage,
            $status,
            $showOnLandingPage,
            $workUpdatesJson,
            $documentsJson,
            $paymentsJson,
            $projectId
        ]);
    } else {
        $title = !empty($data->title) ? trim($data->title) : 'Bespoke Luxury Interior Project';
        $clientEmail = !empty($data->clientEmail) ? trim($data->clientEmail) : 'client@decor8india.com';
        $serviceType = !empty($data->serviceType) ? trim($data->serviceType) : 'Residential';
        $estimatedCost = !empty($data->estimatedCost) ? (float)$data->estimatedCost : 500000.00;

        $insertStmt = $pdo->prepare("INSERT INTO projects (id, title, client_id, client_email, service_type, estimated_cost, progress_percentage, current_stage, status, show_on_landing_page, work_updates_json, documents_json, payments_json) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $insertStmt->execute([
            $projectId,
            $title,
            $clientEmail,
            $clientEmail,
            $serviceType,
            $estimatedCost,
            $progressPercentage,
            $currentStage,
            $status,
            $showOnLandingPage,
            $workUpdatesJson,
            $documentsJson,
            $paymentsJson
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
