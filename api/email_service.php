<?php
// Decor8 India - Production SMTP Email Notification Engine
// Supports Native Socket SMTP (SSL/TLS) + Fallback with Luxury Gold HTML Templates

require_once __DIR__ . '/email_config.php';

/**
 * Sends an email using direct Socket SMTP with AUTH LOGIN. Falls back to mail() if socket fails.
 */
function sendSmtpEmail($toEmail, $toName, $subject, $htmlBody, $textBody = '') {
    if (!defined('ENABLE_EMAIL_NOTIFICATIONS') || !ENABLE_EMAIL_NOTIFICATIONS) {
        return ["success" => false, "message" => "Email notifications are disabled."];
    }

    if (empty($toEmail) || !filter_var($toEmail, FILTER_VALIDATE_EMAIL)) {
        return ["success" => false, "message" => "Invalid recipient email address: " . htmlspecialchars($toEmail)];
    }

    $host = SMTP_HOST;
    $port = SMTP_PORT;
    $user = SMTP_USER;
    $pass = SMTP_PASS;
    $secure = strtolower(SMTP_SECURE);
    $fromEmail = SMTP_FROM_EMAIL;
    $fromName = SMTP_FROM_NAME;

    $fromDomain = substr(strrchr($fromEmail, "@"), 1);
    if (empty($fromDomain)) $fromDomain = "decor8india.com";
    $messageId = "<" . md5(uniqid(rand(), true)) . "@" . $fromDomain . ">";

    // Construct MIME message with Full RFC-5322 Anti-Spam Compliance
    $headers = [
        "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <{$fromEmail}>",
        "Reply-To: <{$fromEmail}>",
        "To: =?UTF-8?B?" . base64_encode($toName) . "?= <{$toEmail}>",
        "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=",
        "Date: " . date("r"),
        "Message-ID: {$messageId}",
        "Organization: Decor8 India Interiors Pvt. Ltd.",
        "X-Priority: 3 (Normal)",
        "X-Mailer: Decor8India-Luxury-Notifier/2.0",
        "MIME-Version: 1.0",
        "Content-Type: multipart/alternative; boundary=\"{$boundary}\""
    ];

    if (empty($textBody)) {
        $textBody = strip_tags(str_replace(['<br>', '<br/>', '<br />', '</p>'], "\n", $htmlBody));
    }

    $body = "--{$boundary}\r\n" .
            "Content-Type: text/plain; charset=UTF-8\r\n" .
            "Content-Transfer-Encoding: base64\r\n\r\n" .
            chunk_split(base64_encode($textBody)) . "\r\n" .
            "--{$boundary}\r\n" .
            "Content-Type: text/html; charset=UTF-8\r\n" .
            "Content-Transfer-Encoding: base64\r\n\r\n" .
            chunk_split(base64_encode($htmlBody)) . "\r\n" .
            "--{$boundary}--\r\n";

    // Attempt Direct SMTP Socket Connection
    $smtpSuccess = false;
    $smtpLog = [];

    try {
        $transport = ($secure === 'ssl' || $port == 465) ? "ssl://{$host}" : "tcp://{$host}";
        $timeout = 10;
        
        $socket = @fsockopen($transport, $port, $errno, $errstr, $timeout);
        
        if (!$socket) {
            $smtpLog[] = "Socket connection failed to {$transport}:{$port}. Error [{$errno}]: {$errstr}";
        } else {
            stream_set_timeout($socket, $timeout);

            $read = function() use ($socket, &$smtpLog) {
                $response = "";
                while ($line = fgets($socket, 515)) {
                    $response .= $line;
                    if (substr($line, 3, 1) == " ") break;
                }
                $smtpLog[] = "S: " . trim($response);
                return $response;
            };

            $write = function($cmd) use ($socket, &$smtpLog) {
                $smtpLog[] = "C: " . (stripos($cmd, 'AUTH') !== false || stripos($cmd, base64_encode(SMTP_PASS)) !== false ? '***HIDDEN***' : trim($cmd));
                fputs($socket, $cmd . "\r\n");
            };

            $read(); // Initial greeting

            $write("EHLO " . (isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'localhost'));
            $ehloResp = $read();

            // Handle STARTTLS if port 587 and not already ssl
            if ($secure === 'tls' || $port == 587) {
                $write("STARTTLS");
                $read();
                stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
                $write("EHLO " . (isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'localhost'));
                $read();
            }

            // Authentication
            if (!empty($user) && !empty($pass)) {
                $write("AUTH LOGIN");
                $read();
                $write(base64_encode($user));
                $read();
                $write(base64_encode($pass));
                $authResp = $read();

                if (substr($authResp, 0, 3) !== "235" && $user !== $fromEmail) {
                    // Try with fromEmail (support@decor8india.com) if _mainaccount failed
                    $write("AUTH LOGIN");
                    $read();
                    $write(base64_encode($fromEmail));
                    $read();
                    $write(base64_encode($pass));
                    $authResp = $read();
                }

                if (substr($authResp, 0, 3) !== "235") {
                    throw new Exception("SMTP Authentication failed: " . $authResp);
                }
            }

            $write("MAIL FROM: <{$fromEmail}>");
            $read();
            $write("RCPT TO: <{$toEmail}>");
            $read();
            $write("DATA");
            $read();

            $fullMessage = implode("\r\n", $headers) . "\r\n\r\n" . $body;
            $write($fullMessage . "\r\n.");
            $dataResp = $read();

            $write("QUIT");
            $read();
            fclose($socket);

            if (substr($dataResp, 0, 3) === "250") {
                $smtpSuccess = true;
            } else {
                throw new Exception("SMTP Data rejection: " . $dataResp);
            }
        }
    } catch (Throwable $e) {
        $smtpLog[] = "SMTP Exception: " . $e->getMessage();
    }

    if ($smtpSuccess) {
        return [
            "success" => true,
            "method" => "SMTP",
            "message" => "Email sent successfully via authenticated SMTP.",
            "recipient" => $toEmail,
            "smtp_log" => $smtpLog
        ];
    }

    // Fallback to PHP native mail()
    $nativeHeaders = "From: {$fromName} <{$fromEmail}>\r\n" .
                     "Reply-To: {$fromEmail}\r\n" .
                     "MIME-Version: 1.0\r\n" .
                     "Content-Type: text/html; charset=UTF-8\r\n" .
                     "X-Mailer: Decor8India-Fallback/2.0\r\n";

    $mailResult = @mail($toEmail, $subject, $htmlBody, $nativeHeaders);

    return [
        "success" => $mailResult,
        "method" => $mailResult ? "PHP_MAIL_FALLBACK" : "FAILED",
        "message" => $mailResult ? "Sent via fallback mail()." : "Failed to deliver via SMTP and mail().",
        "smtp_log" => $smtpLog
    ];
}

/**
 * Base Brand Wrapper for Dark & Gold Luxury HTML Emails
 */
function getEmailLayout($title, $previewText, $contentHtml) {
    $baseUrl = defined('APP_BASE_URL') ? APP_BASE_URL : 'https://decor8india.com';
    $year = date('Y');

    return '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>' . htmlspecialchars($title) . '</title>
    <style>
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        body { margin: 0; padding: 0; width: 100% !important; background-color: #0B0C0E; font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; color: #E5E5E5; }
    </style>
</head>
<body style="margin: 0; padding: 20px 10px; background-color: #0B0C0E; font-family: \'Segoe UI\', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;">
    <div style="display: none; max-height: 0px; overflow: hidden;">' . htmlspecialchars($previewText) . '</div>
    
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #14151B; border-radius: 16px; border: 1px solid rgba(212, 175, 55, 0.35); overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.8);">
        
        <!-- Header Banner with Gold Accents -->
        <tr>
            <td style="padding: 30px 24px 20px 24px; text-align: center; background: linear-gradient(180deg, #1C1D24 0%, #14151B 100%); border-bottom: 2px solid #D4AF37;">
                <div style="font-family: Georgia, serif; font-size: 26px; font-weight: bold; letter-spacing: 2px; color: #FFFFFF; text-transform: uppercase;">
                    DECOR<span style="color: #D4AF37;">8</span> INDIA
                </div>
                <div style="font-size: 9px; font-weight: 700; letter-spacing: 3px; color: #B8860B; text-transform: uppercase; margin-top: 4px;">
                    Bespoke Architecture & Turnkey Interiors
                </div>
            </td>
        </tr>

        <!-- Main Body Content -->
        <tr>
            <td style="padding: 30px 28px 24px 28px; line-height: 1.6; color: #E0E0E0; font-size: 14px;">
                ' . $contentHtml . '
            </td>
        </tr>

        <!-- Need Help Bar -->
        <tr>
            <td style="padding: 16px 28px; background-color: #181920; border-top: 1px solid rgba(255,255,255,0.06); text-align: center;">
                <p style="margin: 0; font-size: 12px; color: #A0A0A0;">
                    Have questions? Call <strong style="color: #D4AF37;">+91 93805 23743</strong> or email <a href="mailto:support@decor8india.com" style="color: #D4AF37; text-decoration: none;">support@decor8india.com</a>
                </p>
            </td>
        </tr>

        <!-- Footer Directory -->
        <tr>
            <td style="padding: 24px; text-align: center; font-size: 10.5px; color: #787A85; background-color: #0E0F13; border-top: 1px solid rgba(212, 175, 55, 0.2);">
                <p style="margin: 0 0 6px 0; color: #B0B0B0; font-weight: 600;">
                    DECOR8 INDIA INTERIORS PVT. LTD. • GSTIN: 29AABCD8826K1Z1
                </p>
                <p style="margin: 0 0 8px 0; line-height: 1.4;">
                    Bengaluru HQ (#14 Vasanthpura) • Sirsi Studio • Hyderabad • Mumbai
                </p>
                <p style="margin: 0;">
                    <a href="' . $baseUrl . '" style="color: #D4AF37; text-decoration: none;">www.decor8india.com</a> | ISO 9001:2015 Certified Turnkey Execution
                </p>
            </td>
        </tr>
    </table>
</body>
</html>';
}

/**
 * 1. Send Invoice / Milestone Billing Notification
 */
function sendInvoiceNotification($clientEmail, $clientName, $projectTitle, $invoice) {
    $baseUrl = defined('APP_BASE_URL') ? APP_BASE_URL : 'https://decor8india.com';
    $invId = !empty($invoice['invoiceUrl']) ? $invoice['invoiceUrl'] : ('INV-D8I-' . rand(100000, 999999));
    $title = $invoice['title'] ?? 'Project Milestone Billing';
    $amount = isset($invoice['amount']) ? number_format((float)$invoice['amount'], 2) : '0.00';
    $dueDate = $invoice['dueDate'] ?? date('d M Y', strtotime('+7 days'));
    $portalUrl = $baseUrl . '/client';

    $subject = "Official Invoice Generated: {$invId} for {$projectTitle}";
    $previewText = "Your official milestone invoice for {$projectTitle} is ready to view and download.";

    $html = '
        <h2 style="font-family: Georgia, serif; color: #FFFFFF; font-size: 20px; margin-top: 0; margin-bottom: 12px;">
            New GST Tax Invoice Issued
        </h2>
        <p style="margin: 0 0 16px 0; font-size: 14px; color: #CCCCCC;">
            Dear <strong style="color: #FFFFFF;">' . htmlspecialchars($clientName) . '</strong>,
        </p>
        <p style="margin: 0 0 20px 0; font-size: 13.5px; line-height: 1.6; color: #B8B8C0;">
            An official GST Tax Invoice has been generated for your project <strong style="color: #D4AF37;">"' . htmlspecialchars($projectTitle) . '"</strong>.
        </p>

        <!-- Invoice Details Card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #1D1E26; border: 1px solid #D4AF37; border-radius: 12px; margin-bottom: 24px; overflow: hidden;">
            <tr>
                <td style="padding: 16px 20px; border-bottom: 1px solid rgba(212,175,55,0.2); background-color: #242530;">
                    <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #D4AF37; letter-spacing: 1.5px; font-family: monospace;">
                        INVOICE NUMBER: ' . htmlspecialchars($invId) . '
                    </span>
                </td>
            </tr>
            <tr>
                <td style="padding: 16px 20px;">
                    <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 13px;">
                        <tr>
                            <td style="color: #9E9EA8; width: 40%;">Milestone Stage:</td>
                            <td style="color: #FFFFFF; font-weight: 600;">' . htmlspecialchars($title) . '</td>
                        </tr>
                        <tr>
                            <td style="color: #9E9EA8;">Invoice Amount:</td>
                            <td style="color: #D4AF37; font-size: 16px; font-weight: 700; font-family: Georgia, serif;">₹ ' . $amount . '</td>
                        </tr>
                        <tr>
                            <td style="color: #9E9EA8;">Due Date:</td>
                            <td style="color: #FFFFFF; font-weight: 500;">' . htmlspecialchars($dueDate) . '</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>

        <!-- Call to Action Button -->
        <div style="text-align: center; margin: 28px 0 20px 0;">
            <a href="' . $portalUrl . '" style="display: inline-block; padding: 13px 32px; background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); color: #000000; font-weight: 700; font-size: 12.5px; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 15px rgba(212,175,55,0.3);">
                View & Download Invoice in Portal
            </a>
        </div>
    ';

    return sendSmtpEmail($clientEmail, $clientName, $subject, getEmailLayout($subject, $previewText, $html));
}

/**
 * 2. Send Project Progress & Milestone Update Notification
 */
function sendProgressNotification($clientEmail, $clientName, $projectTitle, $progressPct, $currentStage, $workNotes = '') {
    $baseUrl = defined('APP_BASE_URL') ? APP_BASE_URL : 'https://decor8india.com';
    $progressPct = max(0, min(100, (int)$progressPct));
    $portalUrl = $baseUrl . '/client';

    $subject = "Project Update: {$projectTitle} is now {$progressPct}% Complete";
    $previewText = "Site progress update for {$projectTitle}: {$currentStage} stage currently in progress.";

    $html = '
        <h2 style="font-family: Georgia, serif; color: #FFFFFF; font-size: 20px; margin-top: 0; margin-bottom: 12px;">
            Project Progress Milestone Update
        </h2>
        <p style="margin: 0 0 16px 0; font-size: 14px; color: #CCCCCC;">
            Dear <strong style="color: #FFFFFF;">' . htmlspecialchars($clientName) . '</strong>,
        </p>
        <p style="margin: 0 0 20px 0; font-size: 13.5px; line-height: 1.6; color: #B8B8C0;">
            Here is the latest progress update for your project <strong style="color: #D4AF37;">"' . htmlspecialchars($projectTitle) . '"</strong>:
        </p>

        <!-- Progress Box -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #1D1E26; border: 1px solid rgba(212,175,55,0.4); border-radius: 12px; margin-bottom: 24px; padding: 20px;">
            <tr>
                <td>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="font-size: 12px; color: #9E9EA8; font-weight: 600; text-transform: uppercase;">Overall Completion</span>
                        <span style="font-size: 18px; font-weight: 700; color: #D4AF37; font-family: Georgia, serif; float: right;">' . $progressPct . '%</span>
                    </div>

                    <!-- Progress Bar Background -->
                    <div style="background-color: #2A2B36; border-radius: 8px; height: 12px; width: 100%; overflow: hidden; margin: 10px 0 16px 0;">
                        <div style="background: linear-gradient(90deg, #B8860B 0%, #D4AF37 100%); height: 12px; width: ' . $progressPct . '%; border-radius: 8px;"></div>
                    </div>

                    <div style="padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 13px;">
                        <strong style="color: #9E9EA8;">Current Active Stage:</strong> 
                        <span style="color: #FFFFFF; font-weight: 600; margin-left: 6px;">' . htmlspecialchars($currentStage) . '</span>
                    </div>

                    ' . (!empty($workNotes) ? '
                    <div style="margin-top: 10px; font-size: 12.5px; color: #C0C0C8; background-color: #14151B; padding: 12px; border-radius: 8px; border-left: 3px solid #D4AF37;">
                        ' . nl2br(htmlspecialchars($workNotes)) . '
                    </div>
                    ' : '') . '
                </td>
            </tr>
        </table>

        <!-- Call to Action Button -->
        <div style="text-align: center; margin: 28px 0 20px 0;">
            <a href="' . $portalUrl . '" style="display: inline-block; padding: 13px 32px; background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); color: #000000; font-weight: 700; font-size: 12.5px; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 15px rgba(212,175,55,0.3);">
                View Live Site Photos in Portal
            </a>
        </div>
    ';

    return sendSmtpEmail($clientEmail, $clientName, $subject, getEmailLayout($subject, $previewText, $html));
}

/**
 * 3. Send New Document / 3D CAD Upload Notification
 */
function sendDocumentNotification($clientEmail, $clientName, $projectTitle, $docData) {
    $baseUrl = defined('APP_BASE_URL') ? APP_BASE_URL : 'https://decor8india.com';
    $docName = $docData['name'] ?? 'Architectural Document';
    $category = $docData['category'] ?? 'Design & CAD';
    $portalUrl = $baseUrl . '/client';

    $subject = "New Document Uploaded: {$docName} for {$projectTitle}";
    $previewText = "New architectural file uploaded for {$projectTitle}.";

    $html = '
        <h2 style="font-family: Georgia, serif; color: #FFFFFF; font-size: 20px; margin-top: 0; margin-bottom: 12px;">
            New Architectural File Uploaded
        </h2>
        <p style="margin: 0 0 16px 0; font-size: 14px; color: #CCCCCC;">
            Dear <strong style="color: #FFFFFF;">' . htmlspecialchars($clientName) . '</strong>,
        </p>
        <p style="margin: 0 0 20px 0; font-size: 13.5px; line-height: 1.6; color: #B8B8C0;">
            Our architectural team has uploaded a new document to your project vault for <strong style="color: #D4AF37;">"' . htmlspecialchars($projectTitle) . '"</strong>:
        </p>

        <!-- Document Details -->
        <table role="presentation" width="100%" cellpadding="14" cellspacing="0" style="background-color: #1D1E26; border: 1px solid rgba(212,175,55,0.3); border-radius: 12px; margin-bottom: 24px;">
            <tr>
                <td>
                    <div style="font-size: 15px; font-weight: 600; color: #FFFFFF; margin-bottom: 4px;">
                        📄 ' . htmlspecialchars($docName) . '
                    </div>
                    <div style="font-size: 12px; color: #B8860B; font-weight: 500;">
                        Category: ' . htmlspecialchars($category) . '
                    </div>
                </td>
            </tr>
        </table>

        <!-- CTA Button -->
        <div style="text-align: center; margin: 28px 0 20px 0;">
            <a href="' . $portalUrl . '" style="display: inline-block; padding: 13px 32px; background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); color: #000000; font-weight: 700; font-size: 12.5px; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; border-radius: 8px;">
                Open Client Document Vault
            </a>
        </div>
    ';

    return sendSmtpEmail($clientEmail, $clientName, $subject, getEmailLayout($subject, $previewText, $html));
}

/**
 * 4. Send Welcome & Client Portal Credentials Notification
 */
function sendWelcomeClientNotification($clientEmail, $clientName, $projectTitle, $tempPassword) {
    $baseUrl = defined('APP_BASE_URL') ? APP_BASE_URL : 'https://decor8india.com';
    $loginUrl = $baseUrl . '/client';

    $subject = "Welcome to Decor8 India — Your Client Portal is Active";
    $previewText = "Access your bespoke interior project dashboard, milestones, daily site updates and invoices.";

    $html = '
        <h2 style="font-family: Georgia, serif; color: #FFFFFF; font-size: 20px; margin-top: 0; margin-bottom: 12px;">
            Welcome to Decor8 India
        </h2>
        <p style="margin: 0 0 16px 0; font-size: 14px; color: #CCCCCC;">
            Dear <strong style="color: #FFFFFF;">' . htmlspecialchars($clientName) . '</strong>,
        </p>
        <p style="margin: 0 0 20px 0; font-size: 13.5px; line-height: 1.6; color: #B8B8C0;">
            Your project <strong style="color: #D4AF37;">"' . htmlspecialchars($projectTitle) . '"</strong> has been officially activated. You can now monitor live daily site progress, 3D render approvals, and GST invoices via your secure Client Portal.
        </p>

        <!-- Login Credentials Card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #1D1E26; border: 1px solid #D4AF37; border-radius: 12px; margin-bottom: 24px; overflow: hidden;">
            <tr>
                <td style="padding: 14px 20px; background-color: #242530; border-bottom: 1px solid rgba(212,175,55,0.2);">
                    <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #D4AF37; letter-spacing: 1.5px; font-family: monospace;">
                        SECURE CLIENT PORTAL ACCESS
                    </span>
                </td>
            </tr>
            <tr>
                <td style="padding: 16px 20px;">
                    <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 13px;">
                        <tr>
                            <td style="color: #9E9EA8; width: 35%;">Portal URL:</td>
                            <td><a href="' . $loginUrl . '" style="color: #D4AF37; font-weight: 600; text-decoration: none;">' . $loginUrl . '</a></td>
                        </tr>
                        <tr>
                            <td style="color: #9E9EA8;">Login Email:</td>
                            <td style="color: #FFFFFF; font-weight: 600; font-family: monospace;">' . htmlspecialchars($clientEmail) . '</td>
                        </tr>
                        <tr>
                            <td style="color: #9E9EA8;">Access Password:</td>
                            <td style="color: #D4AF37; font-weight: 700; font-family: monospace; font-size: 14px;">' . htmlspecialchars($tempPassword) . '</td>
                        </tr>
                        <tr>
                            <td style="color: #9E9EA8;">Lead Architect:</td>
                            <td style="color: #FFFFFF;">Mr. Satish Bhat (CEO & Principal Architect)</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>

        <!-- CTA Button -->
        <div style="text-align: center; margin: 28px 0 20px 0;">
            <a href="' . $loginUrl . '" style="display: inline-block; padding: 13px 32px; background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); color: #000000; font-weight: 700; font-size: 12.5px; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 15px rgba(212,175,55,0.3);">
                Login to Client Portal
            </a>
        </div>
    ';

    return sendSmtpEmail($clientEmail, $clientName, $subject, getEmailLayout($subject, $previewText, $html));
}
?>
