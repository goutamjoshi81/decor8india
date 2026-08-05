<?php
require_once 'db_config.php';

$pdo = getDbConnection();
$data = json_decode(file_get_contents("php://input"));

if (empty($data->name) || empty($data->email) || empty($data->password)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Name, Email, and Password are required."]);
    exit();
}

$email = trim(strtolower($data->email));
$name = trim($data->name);
$phone = isset($data->phone) ? trim($data->phone) : '';
$password = $data->password;
$role = isset($data->role) && $data->role === 'ADMIN' ? 'ADMIN' : 'CLIENT';

// Check if email already exists
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ? LIMIT 1");
$stmt->execute([$email]);
if ($stmt->fetch()) {
    http_response_code(409);
    echo json_encode(["success" => false, "message" => "An account with this email address already exists."]);
    exit();
}

$userId = 'usr-' . time() . '-' . rand(100, 999);
$passwordHash = password_hash($password, PASSWORD_DEFAULT);

$insertStmt = $pdo->prepare("INSERT INTO users (id, name, email, phone, role, password_hash) VALUES (?, ?, ?, ?, ?, ?)");
$success = $insertStmt->execute([$userId, $name, $email, $phone, $role, $passwordHash]);

if ($success) {
    echo json_encode([
        "success" => true,
        "message" => "Account created successfully!",
        "user" => [
            "id" => $userId,
            "name" => $name,
            "email" => $email,
            "phone" => $phone,
            "role" => $role
        ]
    ]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to register user."]);
}
?>
