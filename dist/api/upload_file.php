<?php
// Decor8 India - File & Photo Upload API for GoDaddy
require_once 'db_config.php';

$uploadDir = '../uploads/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];

    if ($file['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        $errMsg = "File upload failed with error code: " . $file['error'];
        if ($file['error'] === UPLOAD_ERR_INI_SIZE || $file['error'] === UPLOAD_ERR_FORM_SIZE) {
            $errMsg = "File exceeds the maximum upload size limit allowed by server.";
        }
        echo json_encode(["success" => false, "message" => $errMsg]);
        exit();
    }

    $fileName = time() . '_' . preg_replace("/[^a-zA-Z0-9\._-]/", "", basename($file['name']));
    $targetFilePath = $uploadDir . $fileName;
    $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));

    $allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'doc', 'docx', 'zip', 'dwg', 'dxf'];

    if (in_array($fileType, $allowedTypes)) {
        if (move_uploaded_file($file['tmp_name'], $targetFilePath)) {
            $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443)) ? "https://" : "http://";
            $domain = $_SERVER['HTTP_HOST'] ?? 'decor8india.com';
            $fileUrl = "$protocol$domain/uploads/$fileName";

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
        echo json_encode(["success" => false, "message" => "Invalid file format. Allowed: PDF, JPG, PNG, WEBP, DOCX, DWG, DXF, ZIP."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "No file attached in POST request."]);
}
?>
