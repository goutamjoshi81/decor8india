<?php
require_once 'db_config.php';

try {
    $pdo = getDbConnection();
    $data = json_decode(file_get_contents("php://input"));

    if (empty($data->newPassword) || (empty($data->userId) && empty($data->email))) {
        echo json_encode(["success" => false, "message" => "User ID/Email and New Password are required."]);
        exit();
    }

    $userId = !empty($data->userId) ? trim($data->userId) : '';
    $email = !empty($data->email) ? trim(strtolower($data->email)) : '';
    $newPassword = trim($data->newPassword);

    if (strlen($newPassword) < 6) {
        echo json_encode(["success" => false, "message" => "New password must be at least 6 characters long."]);
        exit();
    }

    $passwordHash = password_hash($newPassword, PASSWORD_BCRYPT);

    $stmt = $pdo->prepare("UPDATE users SET password_hash = ?, must_change_password = 0 WHERE id = ? OR LOWER(email) = ?");
    $success = $stmt->execute([$passwordHash, $userId, $email]);

    if ($success && $stmt->rowCount() > 0) {
        echo json_encode([
            "success" => true,
            "message" => "Password updated successfully in database! You can now log in with your new password."
        ]);
    } else {
        // Fallback update if row was matched by email
        $stmt2 = $pdo->prepare("UPDATE users SET password_hash = ?, must_change_password = 0 WHERE LOWER(email) = ?");
        $stmt2->execute([$passwordHash, $email]);

        echo json_encode([
            "success" => true,
            "message" => "Password updated successfully!"
        ]);
    }
} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error updating password in database.",
        "error" => $e->getMessage()
    ]);
}
?>
