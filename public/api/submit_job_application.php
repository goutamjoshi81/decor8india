<?php
// Decor8 India - Submit Job Application API
require_once __DIR__ . '/db_config.php';

try {
    $pdo = getDbConnection();
    $raw = file_get_contents('php://input');
    $data = json_decode($raw);

    if (!$data || empty($data->applicantName) || empty($data->applicantEmail) || empty($data->applicantPhone)) {
        throw new Exception("Please provide your Name, Email, and Phone number.");
    }

    $id = 'app-' . time() . '-' . rand(100, 999);
    $jobId = !empty($data->jobId) ? trim($data->jobId) : 'general';
    $jobTitle = !empty($data->jobTitle) ? trim($data->jobTitle) : 'General Application';
    $name = trim($data->applicantName);
    $email = strtolower(trim($data->applicantEmail));
    $phone = trim($data->applicantPhone);
    $portfolio = !empty($data->portfolioUrl) ? trim($data->portfolioUrl) : null;
    $resume = !empty($data->resumeUrl) ? trim($data->resumeUrl) : null;
    $cover = !empty($data->coverLetter) ? trim($data->coverLetter) : null;

    $stmt = $pdo->prepare("INSERT INTO job_applications (id, job_id, job_title, applicant_name, applicant_email, applicant_phone, portfolio_url, resume_url, cover_letter, status) 
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')");
    $stmt->execute([$id, $jobId, $jobTitle, $name, $email, $phone, $portfolio, $resume, $cover]);

    echo json_encode([
        "success" => true,
        "message" => "Thank you for applying! Your application has been submitted successfully to Decor8India Talent Acquisition.",
        "applicationId" => $id
    ]);

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>
