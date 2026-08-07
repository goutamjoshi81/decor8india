<?php
// Decor8 India - Delete Branch Office Endpoint
require_once 'db_config.php';

try {
    $pdo = getDbConnection();

    $data = json_decode(file_get_contents("php://input"));

    if (empty($data->id)) {
        echo json_encode(["success" => false, "message" => "Branch ID is required."]);
        exit();
    }

    $id = trim($data->id);
    $stmt = $pdo->prepare("DELETE FROM branch_offices WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode([
        "success" => true,
        "message" => "Branch Office deleted successfully."
    ]);

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error deleting Branch Office.",
        "error" => $e->getMessage()
    ]);
}
?>
