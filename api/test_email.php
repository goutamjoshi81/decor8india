<?php
// Decor8 India - SMTP Email Delivery Diagnostic & Test Tool
require_once __DIR__ . '/email_config.php';
require_once __DIR__ . '/email_service.php';
require_once __DIR__ . '/db_config.php';

// If this is an AJAX / API test request:
if (isset($_GET['send']) || $_SERVER['REQUEST_METHOD'] === 'POST') {
    header("Content-Type: application/json; charset=UTF-8");
    
    $recipient = isset($_REQUEST['to']) ? trim($_REQUEST['to']) : 'support@decor8india.com';
    $type = isset($_REQUEST['type']) ? trim($_REQUEST['type']) : 'invoice';
    $customSubject = isset($_REQUEST['subject']) ? trim($_REQUEST['subject']) : '';
    $customBody = isset($_REQUEST['body']) ? trim($_REQUEST['body']) : '';
    $projectId = isset($_REQUEST['projectId']) ? trim($_REQUEST['projectId']) : '';

    // Fetch REAL project record from MySQL Database if available
    $pdo = getDbConnection();
    $proj = null;
    if ($pdo) {
        if (!empty($projectId)) {
            $stmt = $pdo->prepare("SELECT * FROM projects WHERE id = ?");
            $stmt->execute([$projectId]);
            $proj = $stmt->fetch(PDO::FETCH_ASSOC);
        }
        if (!$proj && !empty($recipient)) {
            $stmt = $pdo->prepare("SELECT * FROM projects WHERE LOWER(client_email) = LOWER(?) ORDER BY id DESC LIMIT 1");
            $stmt->execute([$recipient]);
            $proj = $stmt->fetch(PDO::FETCH_ASSOC);
        }
    }

    // Default real values or database record values
    $clientName = $proj ? ($proj['client_name'] ?? 'Valued Client') : 'Valued Client';
    $projectTitle = $proj ? ($proj['title'] ?? 'Luxury Interior Design Project') : 'Vasanthpura Luxury Villa 3BHK';
    $progressPct = $proj ? (int)($proj['progress_percentage'] ?? 0) : 65;
    $currentStage = $proj ? ($proj['current_stage'] ?? 'Design Discussion') : 'Custom Modular Woodwork & False Ceiling';

    // Parse payments from database JSON if available
    $payments = [];
    if ($proj && !empty($proj['payments_json'])) {
        $payments = json_decode($proj['payments_json'], true) ?: [];
    }
    // Parse work updates from database JSON if available
    $workUpdates = [];
    if ($proj && !empty($proj['work_updates_json'])) {
        $workUpdates = json_decode($proj['work_updates_json'], true) ?: [];
    }

    if ($type === 'generic' || $type === 'custom' || !empty($customBody)) {
        $subject = $customSubject ?: "Official Notice — " . $projectTitle;
        $messageBody = $customBody ?: "This is an official project notice regarding your interior execution with Decor8 India Studio.";
        $result = sendCustomAnnouncementNotification($recipient, $clientName, $projectTitle, $subject, $messageBody);

    } else if ($type === 'invoice') {
        // Use real invoice from DB if present, else build clean structure
        $invoiceData = !empty($payments) ? end($payments) : [
            'id' => 'pay-' . time(),
            'title' => 'Milestone Installment Payment',
            'amount' => 450000.00,
            'dueDate' => date('Y-m-d', strtotime('+7 days'))
        ];
        $result = sendInvoiceNotification($recipient, $clientName, $projectTitle, $invoiceData);

    } else if ($type === 'progress') {
        $latestWork = !empty($workUpdates) ? end($workUpdates) : null;
        $workNotes = $latestWork ? ($latestWork['title'] . ': ' . ($latestWork['description'] ?? 'Work in progress.')) : 'Active site installation in progress.';
        $result = sendProgressNotification($recipient, $clientName, $projectTitle, $progressPct, $currentStage, $workNotes);

    } else if ($type === 'welcome') {
        $result = sendWelcomeClientNotification($recipient, $clientName, $projectTitle, "Your Registered Mobile Number");

    } else if ($type === 'admin_booking') {
        $result = sendAdminNewBookingNotification([
            'id' => 'bk-TEST-' . rand(1000, 9999),
            'clientName' => 'Vikramaditya Rao',
            'clientEmail' => 'vikram.rao@example.com',
            'clientPhone' => '+91 98450 12345',
            'packageName' => '4BHK Luxury Turnkey Interior Package',
            'serviceType' => 'Residential',
            'preferredDate' => date('Y-m-d', strtotime('+3 days')),
            'estimatedCost' => 1850000.00,
            'isEmiRequested' => 1,
            'requirements' => 'Italian marble flooring in foyer, concealed mood lighting, customized walk-in master wardrobe and bar counter.'
        ]);

    } else if ($type === 'admin_site_visit') {
        $result = sendAdminNewSiteVisitNotification([
            'id' => 'sv-TEST-' . rand(1000, 9999),
            'clientName' => 'Dr. Ananya Sharma',
            'clientEmail' => 'ananya.sharma@example.com',
            'clientPhone' => '+91 99001 88776',
            'projectTitle' => 'Vasanthpura Penthouse Luxury Experience Studio',
            'preferredDate' => date('Y-m-d', strtotime('+2 days')),
            'timeSlot' => 'Morning (10:00 AM - 1:00 PM)',
            'gatePassCode' => 'GP-' . strtoupper(substr(md5(uniqid()), 0, 6)),
            'isEmiRequested' => 0,
            'notes' => 'Would like to inspect Italian modular kitchen finish and acoustic ceiling isolation in home theatre area.'
        ]);

    } else {
        $result = sendSmtpEmail(
            $recipient, 
            $clientName, 
            "Decor8 India SMTP Connection Verified", 
            getEmailLayout("SMTP Test Successful", "Your email settings are working properly.", "<p>Congratulations! Your authenticated SMTP email service is working properly on Decor8 India.</p>")
        );
    }

    echo json_encode([
        "status" => $result['success'] ? "SUCCESS" : "ERROR",
        "details" => $result,
        "config" => [
            "host" => SMTP_HOST,
            "port" => SMTP_PORT,
            "user" => SMTP_USER,
            "secure" => SMTP_SECURE,
            "from" => SMTP_FROM_EMAIL
        ]
    ], JSON_PRETTY_PRINT);
    exit();
}

// Ensure HTML content type for the browser
header("Content-Type: text/html; charset=UTF-8");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Decor8 India • SMTP Email Test Console</title>
    <style>
        * { box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
            background: #0B0C0E; 
            color: #E5E5E5; 
            padding: 40px 16px; 
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        .card { 
            width: 100%;
            max-width: 540px; 
            background: #14151B; 
            padding: 36px 28px; 
            border-radius: 20px; 
            border: 1px solid rgba(212, 175, 55, 0.4); 
            box-shadow: 0 20px 50px rgba(0,0,0,0.8);
        }
        .logo {
            font-family: Georgia, serif;
            font-size: 24px;
            font-weight: bold;
            color: #FFF;
            text-align: center;
            letter-spacing: 1.5px;
            margin-bottom: 4px;
        }
        .logo span { color: #D4AF37; }
        .subtitle {
            text-align: center;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #B8860B;
            margin-bottom: 26px;
            font-weight: 700;
        }
        label { 
            display: block; 
            font-size: 11px; 
            color: #D4AF37; 
            margin-bottom: 6px; 
            font-weight: 700; 
            text-transform: uppercase; 
            letter-spacing: 0.5px;
        }
        input, select { 
            width: 100%; 
            padding: 12px 14px; 
            border-radius: 10px; 
            border: 1px solid rgba(255,255,255,0.15); 
            background: #08080A; 
            color: #FFF; 
            margin-bottom: 18px; 
            font-size: 13px;
            outline: none;
            transition: border-color 0.2s;
        }
        input:focus, select:focus {
            border-color: #D4AF37;
        }
        button { 
            width: 100%; 
            padding: 14px; 
            background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); 
            border: none; 
            border-radius: 10px; 
            color: #000; 
            font-weight: 700; 
            cursor: pointer; 
            text-transform: uppercase; 
            letter-spacing: 1.5px; 
            font-size: 12px;
            transition: opacity 0.2s;
        }
        button:hover { opacity: 0.95; }
        button:disabled { opacity: 0.5; cursor: not-allowed; }
        .info { 
            font-size: 11px; 
            color: #8A8D9A; 
            margin-top: 20px; 
            padding-top: 16px;
            border-top: 1px solid rgba(255,255,255,0.08);
            line-height: 1.6; 
            font-family: monospace; 
        }
        .result-box {
            margin-top: 20px;
            padding: 16px;
            border-radius: 10px;
            font-size: 12px;
            display: none;
            word-break: break-all;
            white-space: pre-wrap;
            font-family: monospace;
        }
        .success {
            background: rgba(16, 185, 129, 0.15);
            border: 1px solid #10B981;
            color: #34D399;
            display: block;
        }
        .error {
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid #EF4444;
            color: #F87171;
            display: block;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="logo">DECOR<span>8</span> INDIA</div>
        <div class="subtitle">SMTP Email Diagnostic Console</div>

        <form id="testForm" onsubmit="handleSend(event)">
            <label>Recipient Email Address</label>
            <input type="email" id="toEmail" value="support@decor8india.com" placeholder="client@example.com" required />

            <label>Select Notification Template to Test</label>
            <select id="emailType">
                <option value="invoice">1. Official GST Invoice (INV-D8I-XXXXXX)</option>
                <option value="progress">2. Project Milestone Progress (65% Complete)</option>
                <option value="welcome">3. Client Portal Welcome & Temporary Password</option>
                <option value="generic">4. Generic SMTP Handshake Verification</option>
            </select>

            <button type="submit" id="submitBtn">Send Test Email Now</button>
        </form>

        <div id="resultBox" class="result-box"></div>

        <div class="info">
            <strong>Active SMTP Config:</strong><br>
            • Host: <?php echo SMTP_HOST; ?>:<?php echo SMTP_PORT; ?> (<?php echo SMTP_SECURE; ?>)<br>
            • From: <?php echo SMTP_FROM_NAME; ?> &lt;<?php echo SMTP_FROM_EMAIL; ?>&gt;<br>
            • Auth User: <?php echo SMTP_USER; ?>
        </div>
    </div>

    <script>
        async function handleSend(e) {
            e.preventDefault();
            const btn = document.getElementById('submitBtn');
            const resBox = document.getElementById('resultBox');
            const to = document.getElementById('toEmail').value;
            const type = document.getElementById('emailType').value;

            btn.disabled = true;
            btn.innerText = 'Connecting to SMTP Server...';
            resBox.className = 'result-box';
            resBox.style.display = 'none';

            try {
                const response = await fetch(`test_email.php?send=1&to=${encodeURIComponent(to)}&type=${encodeURIComponent(type)}`);
                const data = await response.json();

                if (data.status === 'SUCCESS') {
                    resBox.className = 'result-box success';
                    resBox.innerText = `✅ Success! Email delivered via ${data.details.method}.\nRecipient: ${to}\n\n` + JSON.stringify(data, null, 2);
                } else {
                    resBox.className = 'result-box error';
                    resBox.innerText = `❌ Delivery Status: ${data.details.message}\n\n` + JSON.stringify(data, null, 2);
                }
            } catch (err) {
                resBox.className = 'result-box error';
                resBox.innerText = `❌ Network / Script Error: ${err.message}`;
            } finally {
                btn.disabled = false;
                btn.innerText = 'Send Test Email Now';
                resBox.style.display = 'block';
            }
        }
    </script>
</body>
</html>
