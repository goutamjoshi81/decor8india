<?php
// Decor8 India - SMTP Email Configuration
// Configure your email provider credentials below.

if (!defined('SMTP_HOST')) define('SMTP_HOST', 'mail.decor8india.com');          // e.g., mail.decor8india.com or smtp.gmail.com or smtp-relay.brevo.com
if (!defined('SMTP_PORT')) define('SMTP_PORT', 465);                            // 465 for SSL, 587 for TLS
if (!defined('SMTP_SECURE')) define('SMTP_SECURE', 'ssl');                      // 'ssl' or 'tls'
if (!defined('SMTP_USER')) define('SMTP_USER', 'support@decor8india.com');      // Your email username
if (!defined('SMTP_PASS')) define('SMTP_PASS', 'Decor8#India2026');             // Your email password / App password
if (!defined('SMTP_FROM_NAME')) define('SMTP_FROM_NAME', 'Decor8 India Studio');
if (!defined('SMTP_FROM_EMAIL')) define('SMTP_FROM_EMAIL', 'support@decor8india.com');
if (!defined('APP_BASE_URL')) define('APP_BASE_URL', 'https://decor8india.com');
if (!defined('ENABLE_EMAIL_NOTIFICATIONS')) define('ENABLE_EMAIL_NOTIFICATIONS', true);
?>
