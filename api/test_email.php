<?php
// Decor8 India - SMTP Email Delivery Diagnostic & Test Tool
require_once __DIR__ . '/db_config.php';
require_once __DIR__ . '/email_service.php';

$recipient = isset($_GET['to']) ? trim($_GET['to']) : (isset($_POST['to']) ? trim($_POST['to']) : 'support@decor8india.com');
$type = isset($_GET['type']) ? trim($_GET['type']) : 'invoice';

if (!empty($_GET['to']) || $_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($type === 'invoice') {
        $sampleInvoice = [
            'id' => 'pay-sample-' . time(),
            'title' => 'Milestone 2: Civil Works & BWP Marine Core Procurement (40%)',
            'amount' => 840000.00,
            'dueDate' => date('d M Y', strtotime('+7 days')),
            'invoiceUrl' => 'INV-D8I-884210'
        ];
        $result = sendInvoiceNotification($recipient, "Valued Client (Test)", "Vasanthpura Luxury Villa 3BHK", $sampleInvoice);
    } else if ($type === 'progress') {
        $result = sendProgressNotification($recipient, "Valued Client (Test)", "Vasanthpura Luxury Villa 3BHK", 65, "Custom Modular Woodwork & False Ceiling", "Factory carcass arrived at site. Master bedroom wardrobe framing completed.");
    } else if ($type === 'welcome') {
        $result = sendWelcomeClientNotification($recipient, "Valued Client (Test)", "Vasanthpura Luxury Villa 3BHK", "Decor8#Welcome2026");
    } else {
        $result = sendSmtpEmail($recipient, "Valued Client", "Decor8 India SMTP Connection Verified", getEmailLayout("SMTP Test Successful", "Your email settings are working perfectly.", "<p>Congratulations! Your authenticated SMTP email service is working properly on Decor8 India.</p>"));
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
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Decor8 India - SMTP Email Test Console</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0B0C0E; color: #E5E5E5; padding: 40px 20px; }
        .card { max-width: 520px; margin: 0 auto; background: #14151B; padding: 30px; border-radius: 16px; border: 1px solid #D4AF37; }
        h1 { font-family: Georgia, serif; color: #FFF; font-size: 22px; margin-top: 0; }
        label { display: block; font-size: 12px; color: #D4AF37; margin-bottom: 6px; font-weight: 600; text-transform: uppercase; }
        input, select { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); background: #000; color: #FFF; margin-bottom: 16px; box-sizing: border-box; }
        button { width: 100%; padding: 14px; background: linear-gradient(135deg, #D4AF37, #B8860B); border: none; border-radius: 8px; color: #000; font-weight: 700; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; }
        .info { font-size: 11px; color: #888; margin-top: 14px; line-height: 1.5; font-family: monospace; }
    </style>
</head>
<body>
    <div class="card">
        <h1>Decor8 India • SMTP Email Test Console</h1>
        <form method="GET" action="test_email.php">
            <label>Recipient Email Address</label>
            <input type="email" name="to" value="support@decor8india.com" required />

            <label>Notification Type to Test</label>
            <select name="type">
                <option value="invoice">1. New Invoice / Milestone Billing (INV-D8I-XXXXXX)</option>
                <option value="progress">2. Project Progress & Milestone Update (65% Complete)</option>
                <option value="welcome">3. Welcome / Client Portal Credentials</option>
                <option value="generic">4. Generic SMTP Connection Check</option>
            </select>

            <button type="submit">Send Test Email Now</button>
        </form>
        <div class="info">
            SMTP Host: <?php echo SMTP_HOST; ?>:<?php echo SMTP_PORT; ?> (<?php echo SMTP_SECURE; ?>)<br>
            Sender: <?php echo SMTP_FROM_NAME; ?> &lt;<?php echo SMTP_FROM_EMAIL; ?>&gt;
        </div>
    </div>
</body>
</html>
