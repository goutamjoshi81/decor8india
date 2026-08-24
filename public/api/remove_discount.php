<?php
// Decor8 India - Direct Service Discount Removal Endpoint
require_once 'db_config.php';

try {
    $pdo = getDbConnection();
    $data = json_decode(file_get_contents("php://input"), true) ?: [];
    $id = $data['id'] ?? $_GET['id'] ?? null;

    if (!$id) {
        echo json_encode(["success" => false, "message" => "Service ID is required."]);
        exit();
    }

    $stmt = $pdo->prepare("UPDATE services SET discount_price = NULL, discount_percentage = 0 WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode([
        "success" => true,
        "message" => "Promotional discount removed successfully from database.",
        "id" => $id,
        "discountPrice" => null,
        "discountPercentage" => 0
    ]);

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error removing discount: " . $e->getMessage()
    ]);
}
?>
