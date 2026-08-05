<?php
// Decor8 India - File & Photo Upload API for GoDaddy
require_once 'db_config.php';

$uploadDir = '../uploads/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];
    $fileName = time() . '_' . preg_replace("/[^a-zA-Z0-9\._-]/", "", basename($file['name']));
    $targetFilePath = $uploadDir . $fileName;
    $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));

    $allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'doc', 'docx', 'zip'];

    if (in_array($fileType, $allowedTypes)) {
        if (move_uploaded_file($file['tmp_name'], $targetFilePath)) {
            $domain = $_SERVER['HTTP_HOST'];
            $fileUrl = "https://$domain/uploads/$fileName";

            echo json_encode([
                "success" => true,
                "message" => "File uploaded successfully!",
                "fileUrl" => $fileUrl,
                "fileName" => $fileName
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Failed to move uploaded file to server directory."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Invalid file format. Allowed: JPG, PNG, WEBP, PDF, DOCX."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "No file attached in POST request."]);
}
?>
