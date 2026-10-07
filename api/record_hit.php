<?php
// Decor8 India - Real-time First-Party Telemetry & Hit Recorder
require_once 'db_config.php';

// Disable error display in production response to preserve JSON
ini_set('display_errors', 0);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$raw = file_get_contents('php://input');
$payload = json_decode($raw, true);

if (!is_array($payload)) {
    echo json_encode(["success" => false, "message" => "Invalid payload"]);
    exit();
}

$sessionId = isset($payload['sessionId']) ? substr(trim($payload['sessionId']), 0, 64) : 'sess_' . md5($_SERVER['REMOTE_ADDR'] ?? microtime());
$eventType = isset($payload['eventType']) ? substr(trim($payload['eventType']), 0, 50) : 'page_view';
$pagePath  = isset($payload['path']) ? substr(trim($payload['path']), 0, 255) : '/';
$pageTitle = isset($payload['title']) ? substr(trim($payload['title']), 0, 255) : 'Decor8 India';
$referrer  = isset($payload['referrer']) ? substr(trim($payload['referrer']), 0, 255) : '';
$device    = isset($payload['device']) ? strtolower(substr(trim($payload['device']), 0, 20)) : 'desktop';

// Auto-detect device from User-Agent if not provided
if ($device === 'desktop' && isset($_SERVER['HTTP_USER_AGENT'])) {
    $ua = strtolower($_SERVER['HTTP_USER_AGENT']);
    if (preg_match('/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i', $ua)) {
        $device = 'tablet';
    } elseif (preg_match('/(mobile|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop)/i', $ua)) {
        $device = 'mobile';
    }
}

// Compute Channel from Referrer
$channel = 'Direct';
if (!empty($referrer)) {
    $host = strtolower(parse_url($referrer, PHP_URL_HOST) ?? '');
    if (strpos($host, 'google.') !== false) {
        $channel = 'Google Search';
    } elseif (strpos($host, 'instagram.') !== false || strpos($host, 'facebook.') !== false || strpos($host, 't.co') !== false || strpos($host, 'linkedin.') !== false) {
        $channel = 'Social Media';
    } elseif (strpos($host, 'bing.') !== false || strpos($host, 'yahoo.') !== false || strpos($host, 'duckduckgo.') !== false) {
        $channel = 'Other Search';
    } elseif (!empty($host) && strpos($host, 'decor8india.com') === false && strpos($host, 'localhost') === false) {
        $channel = 'Referral';
    }
}

$ipHash = md5(($_SERVER['REMOTE_ADDR'] ?? '127.0.0.1') . date('Y-m-d'));
$createdAt = date('Y-m-d H:i:s');

// Attempt MySQL Storage
$savedToDb = false;
try {
    $pdo = getDbConnection();
    
    // Auto-create site_analytics_hits table
    $pdo->exec("CREATE TABLE IF NOT EXISTS `site_analytics_hits` (
        `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
        `session_id` VARCHAR(64) NOT NULL,
        `ip_hash` VARCHAR(64) DEFAULT NULL,
        `event_type` VARCHAR(50) DEFAULT 'page_view',
        `page_path` VARCHAR(255) NOT NULL,
        `page_title` VARCHAR(255) DEFAULT NULL,
        `referrer` VARCHAR(255) DEFAULT NULL,
        `channel` VARCHAR(50) DEFAULT 'Direct',
        `device_type` VARCHAR(20) DEFAULT 'desktop',
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_created (`created_at`),
        INDEX idx_session (`session_id`),
        INDEX idx_path (`page_path`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    $stmt = $pdo->prepare("INSERT INTO `site_analytics_hits` 
        (`session_id`, `ip_hash`, `event_type`, `page_path`, `page_title`, `referrer`, `channel`, `device_type`, `created_at`) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $sessionId,
        $ipHash,
        $eventType,
        $pagePath,
        $pageTitle,
        $referrer,
        $channel,
        $device,
        $createdAt
    ]);
    $savedToDb = true;
} catch (Throwable $dbErr) {
    // If MySQL is temporarily unreachable or throws error, we use the fallback log
}

// Redundancy / Real-time Rolling Buffer File
try {
    $logFile = __DIR__ . '/analytics_recent_hits.json';
    $recent = file_exists($logFile) ? (json_decode(file_get_contents($logFile), true) ?: []) : [];
    
    $hitRecord = [
        "id" => "hit_" . microtime(true) . "_" . mt_rand(1000, 9999),
        "sessionId" => $sessionId,
        "eventType" => $eventType,
        "path" => $pagePath,
        "title" => $pageTitle,
        "referrer" => $referrer,
        "channel" => $channel,
        "device" => $device,
        "timestamp" => $createdAt
    ];

    array_unshift($recent, $hitRecord);
    if (count($recent) > 300) {
        $recent = array_slice($recent, 0, 300);
    }
    @file_put_contents($logFile, json_encode($recent, JSON_PRETTY_PRINT));
} catch (Throwable $fileErr) {}

echo json_encode([
    "success" => true,
    "savedToDb" => $savedToDb,
    "sessionId" => $sessionId,
    "channel" => $channel
]);
?>
