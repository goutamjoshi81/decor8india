<?php
// Decor8 India - SMTP Email Delivery Diagnostic & Test Tool
require_once __DIR__ . '/email_config.php';
require_once __DIR__ . '/email_service.php';

// If this is an AJAX / API test request:
if (isset($_GET['send']) || $_SERVER['REQUEST_METHOD'] === 'POST') {
    header("Content-Type: application/json; charset=UTF-8");
    
    $recipient = isset($_REQUEST['to']) ? trim($_REQUEST['to']) : 'support@decor8india.com';
    $type = isset($_REQUEST['type']) ? trim($_REQUEST['type']) : 'invoice';

    if ($type === 'invoice') {
        $sampleInvoice = [
            'id' => 'pay-test-' . time(),
            'title' => 'Milestone 2: Civil Works & BWP Marine Core Procurement (40%)',
            'amount' => 840000.00,
            'dueDate' => date('d M Y', strtotime('+7 days')),
            'invoiceUrl' => 'INV-D8I-' . rand(100000, 999999)
        ];
        $result = sendInvoiceNotification($recipient, "Valued Client (Test)", "Vasanthpura Luxury Villa 3BHK", $sampleInvoice);
    } else if ($type === 'progress') {
        $result = sendProgressNotification($recipient, "Valued Client (Test)", "Vasanthpura Luxury Villa 3BHK", 65, "Custom Modular Woodwork & False Ceiling", "Factory carcass delivered to site. Master bedroom wardrobe framing completed.");
    } else if ($type === 'welcome') {
        $result = sendWelcomeClientNotification($recipient, "Valued Client (Test)", "Vasanthpura Luxury Villa 3BHK", "Decor8#Welcome2026");
    } else {
        $result = sendSmtpEmail(
            $recipient, 
            "Valued Client", 
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
