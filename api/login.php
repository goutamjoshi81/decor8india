<?php
require_once 'db_config.php';

$pdo = getDbConnection();
$data = json_decode(file_get_contents("php://input"));

if (empty($data->email) || empty($data->password)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Email and Password are required."]);
    exit();
}

$email = trim(strtolower($data->email));
$password = $data->password;

$stmt = $pdo->prepare("SELECT id, name, email, phone, role, password_hash FROM users WHERE email = ? LIMIT 1");
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password_hash'])) {
    echo json_encode([
        "success" => true,
        "message" => "Login successful!",
        "user" => [
            "id" => $user['id'],
            "name" => $user['name'],
            "email" => $user['email'],
            "phone" => $user['phone'],
            "role" => $user['role']
        ]
    ]);
} else {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Invalid email or password. Please check your credentials."]);
}
?>
