<?php
// Decor8 India - Fetch All Projects & Live Site Feeds from GoDaddy MySQL
require_once 'db_config.php';

try {
    $pdo = getDbConnection();
    $clientEmail = isset($_GET['clientEmail']) ? trim(strtolower($_GET['clientEmail'])) : null;

    // Auto-migrate projects table columns if missing
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN title VARCHAR(150) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN client_id VARCHAR(50) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN client_name VARCHAR(100) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN client_email VARCHAR(120) DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN progress_percentage INT NOT NULL DEFAULT 0"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN current_stage VARCHAR(100) NOT NULL DEFAULT 'Civil Work'"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN status VARCHAR(50) NOT NULL DEFAULT 'Ongoing'"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN show_on_landing_page TINYINT(1) DEFAULT 1"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN work_updates_json LONGTEXT DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN documents_json LONGTEXT DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN payments_json LONGTEXT DEFAULT NULL"); } catch (\PDOException $ex) {}
    try { $pdo->exec("ALTER TABLE projects ADD COLUMN milestones_json LONGTEXT DEFAULT NULL"); } catch (\PDOException $ex) {}

    if ($clientEmail) {
        $stmt = $pdo->prepare("SELECT * FROM projects WHERE LOWER(client_email) = ? OR LOWER(client_id) = ? ORDER BY created_at DESC");
        $stmt->execute([$clientEmail, $clientEmail]);
    } else {
        $stmt = $pdo->query("SELECT * FROM projects ORDER BY created_at DESC");
    }

    $rawProjects = $stmt->fetchAll();
    $projects = [];

    foreach ($rawProjects as $row) {
        $workUpdates = !empty($row['work_updates_json']) ? json_decode($row['work_updates_json'], true) : [];
        $documents = !empty($row['documents_json']) ? json_decode($row['documents_json'], true) : [];
        $payments = !empty($row['payments_json']) ? json_decode($row['payments_json'], true) : [];

        $projects[] = [
            "id" => $row['id'],
            "title" => $row['title'],
            "clientId" => $row['client_id'] ?? $row['client_email'] ?? 'client-1',
            "clientName" => $row['client_name'] ?? 'Client',
            "clientEmail" => $row['client_email'] ?? '',
            "designerName" => $row['designer_name'] ?? 'Aarav Mehta',
            "category" => $row['category'] ?? 'Residential',
            "style" => $row['style'] ?? 'Luxury',
            "coverImage" => $row['cover_image'] ?? 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
            "location" => $row['location'] ?? 'Mumbai',
            "area" => $row['area'] ?? '2,500 Sq. Ft.',
            "budget" => $row['budget'] ?? '₹ 50.00 L',
            "status" => $row['status'] ?? 'Ongoing',
            "showOnLandingPage" => isset($row['show_on_landing_page']) ? (bool)$row['show_on_landing_page'] : true,
            "progressPercentage" => (int)($row['progress_percentage'] ?? 0),
            "currentStage" => $row['current_stage'] ?? 'Civil Work',
            "expectedCompletion" => $row['expected_completion'] ?? '2026-10-30',
            "description" => $row['description'] ?? '',
            "workUpdates" => is_array($workUpdates) ? $workUpdates : [],
            "documents" => is_array($documents) ? $documents : [],
            "payments" => is_array($payments) ? $payments : []
        ];
    }

    echo json_encode([
        "success" => true,
        "projects" => $projects
    ]);

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error fetching projects from database.",
        "error" => $e->getMessage()
    ]);
}
?>
