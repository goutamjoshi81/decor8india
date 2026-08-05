<?php
// Decor8 India - GoDaddy Error Log Reader Diagnostic
header('Content-Type: application/json');

$results = [];

$apiLog = 'error_log';
$rootLog = '../error_log';

if (file_exists($apiLog)) {
    $results['api_error_log'] = array_slice(file($apiLog), -30); // Last 30 lines
} else {
    $results['api_error_log'] = 'No api/error_log file found.';
}

if (file_exists($rootLog)) {
    $results['root_error_log'] = array_slice(file($rootLog), -30); // Last 30 lines
} else {
    $results['root_error_log'] = 'No root error_log file found.';
}

echo json_encode($results, JSON_PRETTY_PRINT);
?>
