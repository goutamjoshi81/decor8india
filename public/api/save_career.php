<?php
// Decor8 India - Save / Update / Delete Career Job Opening API
require_once __DIR__ . '/db_config.php';

try {
    $pdo = getDbConnection();
    $raw = file_get_contents('php://input');
    $data = json_decode($raw);

    if (!$data) {
        throw new Exception("Invalid JSON payload.");
    }

    $action = $data->action ?? 'save';

    if ($action === 'delete') {
        if (empty($data->id)) {
            throw new Exception("Job ID is required for deletion.");
        }
        $delStmt = $pdo->prepare("DELETE FROM careers WHERE id = ?");
        $delStmt->execute([$data->id]);

        echo json_encode([
            "success" => true,
            "message" => "Job opening deleted successfully."
        ]);
        exit();
    }

    if ($action === 'toggle') {
        if (empty($data->id)) {
            throw new Exception("Job ID is required.");
        }
        $togStmt = $pdo->prepare("UPDATE careers SET is_active = IF(is_active = 1, 0, 1) WHERE id = ?");
        $togStmt->execute([$data->id]);

        echo json_encode([
            "success" => true,
            "message" => "Job opening active status toggled."
        ]);
        exit();
    }

    // Save or Edit Job Opening
    $id = !empty($data->id) ? trim($data->id) : ('job-' . time());
    $title = !empty($data->title) ? trim($data->title) : 'Architectural Role';
    $department = !empty($data->department) ? trim($data->department) : 'Interior Design';
    $location = !empty($data->location) ? trim($data->location) : 'Bengaluru';
    $type = !empty($data->type) ? trim($data->type) : 'Full-Time';
    $experience = !empty($data->experience) ? trim($data->experience) : '2-5 Years';
    $salary = !empty($data->salary) ? trim($data->salary) : 'Competitive';
    $description = !empty($data->description) ? trim($data->description) : '';
    $requirements = !empty($data->requirements) ? trim($data->requirements) : '';
    $isActive = isset($data->isActive) ? ($data->isActive ? 1 : 0) : 1;

    $stmt = $pdo->prepare("INSERT INTO careers (id, title, department, location, type, experience, salary, description, requirements, is_active) 
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                           ON DUPLICATE KEY UPDATE 
                           title = VALUES(title),
                           department = VALUES(department),
                           location = VALUES(location),
                           type = VALUES(type),
                           experience = VALUES(experience),
                           salary = VALUES(salary),
                           description = VALUES(description),
                           requirements = VALUES(requirements),
                           is_active = VALUES(is_active)");

    $stmt->execute([$id, $title, $department, $location, $type, $experience, $salary, $description, $requirements, $isActive]);

    echo json_encode([
        "success" => true,
        "message" => "Job opening saved successfully!",
        "jobId" => $id
    ]);

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error saving job opening.",
        "error" => $e->getMessage()
    ]);
}
?>
