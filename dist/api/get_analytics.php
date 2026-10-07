<?php
// Decor8 India - Real-time Analytics Data Engine
require_once 'db_config.php';

ini_set('display_errors', 0);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$range = isset($_GET['range']) ? strtolower(trim($_GET['range'])) : '14d';
$days = 14;
if ($range === '7d') $days = 7;
elseif ($range === '30d') $days = 30;
elseif ($range === '90d') $days = 90;

// Initialize output structure
$result = [
    "success" => true,
    "range" => $range,
    "days" => $days,
    "activeNow" => 0,
    "activePages" => [],
    "totalVisitors" => 0,
    "totalPageviews" => 0,
    "avgDuration" => "0m 0s",
    "bounceRate" => "0.0%",
    "conversionCount" => 0,
    "chartData" => [],
    "topPages" => [],
    "channels" => [],
    "devices" => [
        "mobile" => 0,
        "desktop" => 100,
        "tablet" => 0
    ],
    "recentEvents" => [],
    "settings" => [
        "ga_measurement_id" => "G-E7KJ76JHFP",
        "ga_property_id" => ""
    ]
];

// Load settings
try {
    $settingsFile = __DIR__ . '/settings.json';
    if (file_exists($settingsFile)) {
        $st = json_decode(file_get_contents($settingsFile), true);
        if (is_array($st)) {
            if (!empty($st['ga_measurement_id'])) $result['settings']['ga_measurement_id'] = $st['ga_measurement_id'];
            if (!empty($st['ga_property_id'])) $result['settings']['ga_property_id'] = $st['ga_property_id'];
        }
    }
} catch (Throwable $e) {}

// Read rolling buffer
$recentHits = [];
try {
    $logFile = __DIR__ . '/analytics_recent_hits.json';
    if (file_exists($logFile)) {
        $recentHits = json_decode(file_get_contents($logFile), true) ?: [];
    }
} catch (Throwable $e) {}

$nowTs = time();
$fiveMinsAgo = $nowTs - (5 * 60);

// Active now from rolling buffer
$activeSessions = [];
$activePages = [];
foreach ($recentHits as $h) {
    $hTs = strtotime($h['timestamp'] ?? '');
    if ($hTs && $hTs >= $fiveMinsAgo) {
        $sid = $h['sessionId'] ?? 'anon';
        $activeSessions[$sid] = true;
        $p = $h['path'] ?? '/';
        $activePages[$p] = ($activePages[$p] ?? 0) + 1;
    }
}
$result['activeNow'] = count($activeSessions);
arsort($activePages);
$result['activePages'] = array_keys(array_slice($activePages, 0, 5, true));

// Attempt querying MySQL for full period analytics
$usedDb = false;
try {
    $pdo = getDbConnection();
    
    // Total Clients / Conversions
    try {
        $cStmt = $pdo->query("SELECT COUNT(*) FROM bookings");
        $result['conversionCount'] = (int)$cStmt->fetchColumn();
    } catch (Throwable $e) {}

    // Check if table exists
    $tCheck = $pdo->query("SHOW TABLES LIKE 'site_analytics_hits'")->fetchAll();
    if (!empty($tCheck)) {
        $startDate = date('Y-m-d 00:00:00', strtotime("-$days days"));

        // Active now from DB (last 5 minutes)
        $actStmt = $pdo->query("SELECT COUNT(DISTINCT session_id) FROM site_analytics_hits WHERE created_at >= (NOW() - INTERVAL 5 MINUTE)");
        $dbActive = (int)$actStmt->fetchColumn();
        if ($dbActive > $result['activeNow']) {
            $result['activeNow'] = $dbActive;
        }

        // Total Visitors & Pageviews in period
        $totStmt = $pdo->prepare("SELECT 
            COUNT(DISTINCT session_id) as total_visitors,
            COUNT(*) as total_hits,
            SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END) as total_pageviews
            FROM site_analytics_hits 
            WHERE created_at >= ?");
        $totStmt->execute([$startDate]);
        $totals = $totStmt->fetch();
        if ($totals) {
            $result['totalVisitors'] = (int)($totals['total_visitors'] ?? 0);
            $result['totalPageviews'] = (int)($totals['total_pageviews'] ?? 0);
        }

        // Daily chart data
        $dayStmt = $pdo->prepare("SELECT 
            DATE(created_at) as hit_date,
            COUNT(DISTINCT session_id) as visitors,
            SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END) as pageviews
            FROM site_analytics_hits
            WHERE created_at >= ?
            GROUP BY DATE(created_at)
            ORDER BY hit_date ASC");
        $dayStmt->execute([$startDate]);
        $dbDays = $dayStmt->fetchAll(PDO::FETCH_ASSOC);
        $dayMap = [];
        foreach ($dbDays as $dd) {
            $dayMap[$dd['hit_date']] = [
                'visitors' => (int)$dd['visitors'],
                'pageviews' => (int)$dd['pageviews']
            ];
        }

        // Build continuous date series
        $series = [];
        for ($i = $days - 1; $i >= 0; $i--) {
            $curD = date('Y-m-d', strtotime("-$i days"));
            $label = date('M j', strtotime($curD));
            $visitors = $dayMap[$curD]['visitors'] ?? 0;
            $pageviews = $dayMap[$curD]['pageviews'] ?? 0;
            $series[] = [
                "day" => $label,
                "date" => $curD,
                "visitors" => $visitors,
                "pageviews" => $pageviews
            ];
        }
        $result['chartData'] = $series;

        // Top pages
        $topStmt = $pdo->prepare("SELECT 
            page_path, 
            MAX(page_title) as page_title, 
            COUNT(*) as views 
            FROM site_analytics_hits 
            WHERE created_at >= ? AND event_type = 'page_view'
            GROUP BY page_path 
            ORDER BY views DESC 
            LIMIT 6");
        $topStmt->execute([$startDate]);
        $topRows = $topStmt->fetchAll(PDO::FETCH_ASSOC);
        $pagesList = [];
        $sumViews = max(1, $result['totalPageviews']);
        foreach ($topRows as $tr) {
            $pagesList[] = [
                "path" => $tr['page_path'],
                "title" => !empty($tr['page_title']) ? $tr['page_title'] : $tr['page_path'],
                "views" => (int)$tr['views'],
                "share" => round(((int)$tr['views'] / $sumViews) * 100)
            ];
        }
        $result['topPages'] = $pagesList;

        // Channels
        $chStmt = $pdo->prepare("SELECT 
            channel, 
            COUNT(DISTINCT session_id) as visitors 
            FROM site_analytics_hits 
            WHERE created_at >= ? 
            GROUP BY channel 
            ORDER BY visitors DESC");
        $chStmt->execute([$startDate]);
        $chRows = $chStmt->fetchAll(PDO::FETCH_ASSOC);
        $chList = [];
        $totCh = max(1, $result['totalVisitors']);
        $colorMap = [
            'Direct' => '#D4AF37',
            'Google Search' => '#10B981',
            'Social Media' => '#38BDF8',
            'Referral' => '#A855F7',
            'Other Search' => '#F59E0B'
        ];
        foreach ($chRows as $cr) {
            $chList[] = [
                "name" => $cr['channel'],
                "visitors" => (int)$cr['visitors'],
                "pct" => round(((int)$cr['visitors'] / $totCh) * 100),
                "color" => $colorMap[$cr['channel']] ?? '#94A3B8'
            ];
        }
        $result['channels'] = $chList;

        // Devices
        $devStmt = $pdo->prepare("SELECT 
            device_type, 
            COUNT(*) as hits 
            FROM site_analytics_hits 
            WHERE created_at >= ? 
            GROUP BY device_type");
        $devStmt->execute([$startDate]);
        $devRows = $devStmt->fetchAll(PDO::FETCH_ASSOC);
        $totDevHits = 0;
        $devCounts = ['mobile' => 0, 'desktop' => 0, 'tablet' => 0];
        foreach ($devRows as $dr) {
            $dType = strtolower($dr['device_type']);
            if (isset($devCounts[$dType])) {
                $devCounts[$dType] = (int)$dr['hits'];
                $totDevHits += (int)$dr['hits'];
            }
        }
        if ($totDevHits > 0) {
            $result['devices'] = [
                "mobile" => round(($devCounts['mobile'] / $totDevHits) * 100),
                "desktop" => round(($devCounts['desktop'] / $totDevHits) * 100),
                "tablet" => round(($devCounts['tablet'] / $totDevHits) * 100)
            ];
        }

        // Bounce rate (sessions with only 1 hit)
        $bStmt = $pdo->prepare("SELECT 
            session_id, 
            COUNT(*) as hit_count 
            FROM site_analytics_hits 
            WHERE created_at >= ? 
            GROUP BY session_id");
        $bStmt->execute([$startDate]);
        $allSessions = $bStmt->fetchAll(PDO::FETCH_ASSOC);
        if (!empty($allSessions)) {
            $singleHitCount = 0;
            foreach ($allSessions as $s) {
                if ((int)$s['hit_count'] <= 1) $singleHitCount++;
            }
            $result['bounceRate'] = round(($singleHitCount / count($allSessions)) * 100, 1) . '%';
        }

        $usedDb = true;
    }
} catch (Throwable $dbErr) {
    // If MySQL failed, fallback logic below kicks in
}

// Fallback to JSON rolling hits if DB didn't produce chartData
if (!$usedDb || empty($result['chartData'])) {
    $cutoff = strtotime("-$days days");
    $sessionSet = [];
    $pageViewCount = 0;
    $dayBuckets = [];
    $pageBuckets = [];
    $chanBuckets = [];
    $devBuckets = ['mobile' => 0, 'desktop' => 0, 'tablet' => 0];

    // Pre-fill days with 0
    for ($i = $days - 1; $i >= 0; $i--) {
        $curD = date('Y-m-d', strtotime("-$i days"));
        $dayBuckets[$curD] = ['visitors' => [], 'pageviews' => 0];
    }

    foreach ($recentHits as $rh) {
        $ts = strtotime($rh['timestamp'] ?? '');
        if ($ts && $ts >= $cutoff) {
            $sid = $rh['sessionId'] ?? 'anon';
            $sessionSet[$sid] = true;
            $d = date('Y-m-d', $ts);
            
            if ($rh['eventType'] === 'page_view') {
                $pageViewCount++;
                if (isset($dayBuckets[$d])) {
                    $dayBuckets[$d]['pageviews']++;
                    $dayBuckets[$d]['visitors'][$sid] = true;
                }
                $p = $rh['path'] ?? '/';
                $pageBuckets[$p] = ($pageBuckets[$p] ?? 0) + 1;
            }

            $ch = $rh['channel'] ?? 'Direct';
            $chanBuckets[$ch] = ($chanBuckets[$ch] ?? 0) + 1;

            $dv = strtolower($rh['device'] ?? 'desktop');
            if (isset($devBuckets[$dv])) $devBuckets[$dv]++;
        }
    }

    $result['totalVisitors'] = count($sessionSet);
    $result['totalPageviews'] = $pageViewCount;

    $series = [];
    foreach ($dayBuckets as $dKey => $data) {
        $series[] = [
            "day" => date('M j', strtotime($dKey)),
            "date" => $dKey,
            "visitors" => count($data['visitors']),
            "pageviews" => $data['pageviews']
        ];
    }
    $result['chartData'] = $series;

    arsort($pageBuckets);
    $pagesList = [];
    $sumViews = max(1, $pageViewCount);
    foreach (array_slice($pageBuckets, 0, 6, true) as $path => $count) {
        $pagesList[] = [
            "path" => $path,
            "title" => $path === '/' ? 'Home — Luxury Interiors & Bespoke Architecture' : $path,
            "views" => $count,
            "share" => round(($count / $sumViews) * 100)
        ];
    }
    $result['topPages'] = $pagesList;

    $totChanHits = max(1, array_sum($chanBuckets));
    $chList = [];
    $colorMap = ['Direct' => '#D4AF37', 'Google Search' => '#10B981', 'Social Media' => '#38BDF8', 'Referral' => '#A855F7'];
    foreach ($chanBuckets as $chName => $cnt) {
        $chList[] = [
            "name" => $chName,
            "visitors" => $cnt,
            "pct" => round(($cnt / $totChanHits) * 100),
            "color" => $colorMap[$chName] ?? '#94A3B8'
        ];
    }
    $result['channels'] = $chList;

    $totDev = max(1, array_sum($devBuckets));
    $result['devices'] = [
        "mobile" => round(($devBuckets['mobile'] / $totDev) * 100),
        "desktop" => round(($devBuckets['desktop'] / $totDev) * 100),
        "tablet" => round(($devBuckets['tablet'] / $totDev) * 100)
    ];
}

// Recent Events List (take up to 15 latest)
$evList = [];
foreach (array_slice($recentHits, 0, 15) as $rh) {
    $evList[] = [
        "id" => $rh['id'] ?? uniqid(),
        "eventName" => $rh['eventType'] ?? 'page_view',
        "path" => $rh['path'] ?? '/',
        "timestamp" => $rh['timestamp'] ?? date('Y-m-d H:i:s'),
        "device" => $rh['device'] ?? 'desktop',
        "channel" => $rh['channel'] ?? 'Direct'
    ];
}
$result['recentEvents'] = $evList;

echo json_encode($result);
?>
