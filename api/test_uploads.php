<?php
// Decor8 India - Uploads Directory Diagnostics Utility
header('Content-Type: application/json');

$results = [];

$uploadDir = '../uploads/';
$results['uploads_dir_path'] = realpath($uploadDir) ?: $uploadDir;
$results['exists'] = file_exists($uploadDir);
$results['is_dir'] = is_dir($uploadDir);

if ($results['exists']) {
    $results['permissions'] = substr(sprintf('%o', fileperms($uploadDir)), -4);
    $results['is_readable'] = is_readable($uploadDir);
    $results['is_writable'] = is_writable($uploadDir);
    
    // List first 5 files
    $files = scandir($uploadDir);
    $fileList = [];
    if ($files) {
        foreach ($files as $file) {
            if ($file !== '.' && $file !== '..') {
                $filePath = $uploadDir . $file;
                $fileList[] = [
                    'name' => $file,
                    'permissions' => substr(sprintf('%o', fileperms($filePath)), -4),
                    'size' => filesize($filePath),
                    'is_readable' => is_readable($filePath)
                ];
                if (count($fileList) >= 10) break;
            }
        }
    }
    $results['files'] = $fileList;
}

echo json_encode($results, JSON_PRETTY_PRINT);
?>
