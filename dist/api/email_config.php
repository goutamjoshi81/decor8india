<?php
// Decor8 India - SMTP Email Configuration
// Configured from cPanel Mail Client Manual Settings

if (!defined('SMTP_HOST')) define('SMTP_HOST', 'decor8india.com');               // cPanel Outgoing Server
if (!defined('SMTP_PORT')) define('SMTP_PORT', 465);                            // 465 for SSL/TLS
if (!defined('SMTP_SECURE')) define('SMTP_SECURE', 'ssl');                      // 'ssl'
if (!defined('SMTP_USER')) define('SMTP_USER', '_mainaccount@decor8india.com'); // cPanel Authenticated Username
if (!defined('SMTP_PASS')) define('SMTP_PASS', 'Satishbhat@1126');              // cPanel Account Password
if (!defined('SMTP_FROM_NAME')) define('SMTP_FROM_NAME', 'Decor8 India Studio');
if (!defined('SMTP_FROM_EMAIL')) define('SMTP_FROM_EMAIL', 'support@decor8india.com');
if (!defined('APP_BASE_URL')) define('APP_BASE_URL', 'https://decor8india.com');
if (!defined('ENABLE_EMAIL_NOTIFICATIONS')) define('ENABLE_EMAIL_NOTIFICATIONS', true);
?>
