<?php
// Decor8 India - Fetch Careers / Job Openings API
require_once __DIR__ . '/db_config.php';

try {
    $pdo = getDbConnection();

    // Auto-create careers table if not exists
    $pdo->exec("CREATE TABLE IF NOT EXISTS `careers` (
      `id` varchar(50) NOT NULL,
      `title` varchar(200) NOT NULL,
      `department` varchar(100) NOT NULL DEFAULT 'Interior Design',
      `location` varchar(100) NOT NULL DEFAULT 'Bengaluru',
      `type` varchar(50) NOT NULL DEFAULT 'Full-Time',
      `experience` varchar(50) NOT NULL DEFAULT '2-5 Years',
      `salary` varchar(100) DEFAULT 'Competitive',
      `description` text DEFAULT NULL,
      `requirements` text DEFAULT NULL,
      `is_active` tinyint(1) NOT NULL DEFAULT 1,
      `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // Auto-create job_applications table if not exists
    $pdo->exec("CREATE TABLE IF NOT EXISTS `job_applications` (
      `id` varchar(50) NOT NULL,
      `job_id` varchar(50) NOT NULL,
      `job_title` varchar(200) NOT NULL,
      `applicant_name` varchar(100) NOT NULL,
      `applicant_email` varchar(120) NOT NULL,
      `applicant_phone` varchar(50) NOT NULL,
      `portfolio_url` text DEFAULT NULL,
      `resume_url` text DEFAULT NULL,
      `cover_letter` text DEFAULT NULL,
      `status` enum('Pending','Shortlisted','Interview Scheduled','Rejected','Hired') NOT NULL DEFAULT 'Pending',
      `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // Check if careers table is empty, seed defaults
    $countStmt = $pdo->query("SELECT COUNT(*) FROM careers");
    if ($countStmt->fetchColumn() == 0) {
        $defaultJobs = [
            [
                'id' => 'job-1',
                'title' => 'Senior Luxury Interior Architect',
                'department' => 'Interior Design',
                'location' => 'Bengaluru (Head Office)',
                'type' => 'Full-Time',
                'experience' => '4 - 7 Years',
                'salary' => '₹ 8.5L - ₹ 14.0L p.a.',
                'description' => 'Lead turnkey residential penthouse and luxury villa interior projects from spatial concept to final handover. Coordinate material selection, client presentations, and site execution.',
                'requirements' => 'B.Arch or Degree in Interior Design. Mastery of AutoCAD, 3ds Max/V-Ray, SketchUp, and site execution management. Strong portfolio in high-end residential interiors.',
                'is_active' => 1
            ],
            [
                'id' => 'job-2',
                'title' => '3D Architectural Visualizer & Renderer',
                'department' => '3D Rendering',
                'location' => 'Bengaluru / Hybrid',
                'type' => 'Full-Time',
                'experience' => '2 - 5 Years',
                'salary' => '₹ 5.5L - ₹ 9.0L p.a.',
                'description' => 'Create ultra-realistic 3D walkthroughs, photorealistic lighting setups, and interior mood renders for high-profile client projects.',
                'requirements' => 'Proficiency in 3ds Max, Corona Render, Lumion, Photoshop, and Unreal Engine. Ability to interpret architectural CAD drawings into photorealistic lighting renders.',
                'is_active' => 1
            ],
            [
                'id' => 'job-3',
                'title' => 'Turnkey Civil Construction Project Manager',
                'department' => 'Civil Engineering',
                'location' => 'Bengaluru / Site Based',
                'type' => 'Full-Time',
                'experience' => '5 - 8 Years',
                'salary' => '₹ 9.0L - ₹ 15.0L p.a.',
                'description' => 'Oversee on-site civil works, structural fitouts, carpentry, MEP coordination, quality audits, and contractor timelines for luxury villa and commercial builds.',
                'requirements' => 'B.Tech/BE Civil Engineering or Diploma. In-depth knowledge of civil execution, concrete structures, tile laying, electrical layout, and contractor management.',
                'is_active' => 1
            ]
        ];

        $insStmt = $pdo->prepare("INSERT INTO careers (id, title, department, location, type, experience, salary, description, requirements, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        foreach ($defaultJobs as $j) {
            $insStmt->execute([$j['id'], $j['title'], $j['department'], $j['location'], $j['type'], $j['experience'], $j['salary'], $j['description'], $j['requirements'], $j['is_active']]);
        }
    }

    // Fetch all careers
    $stmt = $pdo->query("SELECT * FROM careers ORDER BY created_at DESC");
    $rawJobs = $stmt->fetchAll();

    $jobs = array_map(function($r) {
        return [
            "id" => $r['id'],
            "title" => $r['title'],
            "department" => $r['department'] ?? 'Interior Design',
            "location" => $r['location'] ?? 'Bengaluru',
            "type" => $r['type'] ?? 'Full-Time',
            "experience" => $r['experience'] ?? '2-5 Years',
            "salary" => $r['salary'] ?? 'Competitive',
            "description" => $r['description'] ?? '',
            "requirements" => $r['requirements'] ?? '',
            "isActive" => (bool)($r['is_active'] ?? 1),
            "createdAt" => $r['created_at']
        ];
    }, $rawJobs);

    // Fetch applications
    $appStmt = $pdo->query("SELECT * FROM job_applications ORDER BY created_at DESC");
    $rawApps = $appStmt->fetchAll();

    $applications = array_map(function($a) {
        return [
            "id" => $a['id'],
            "jobId" => $a['job_id'],
            "jobTitle" => $a['job_title'],
            "applicantName" => $a['applicant_name'],
            "applicantEmail" => $a['applicant_email'],
            "applicantPhone" => $a['applicant_phone'],
            "portfolioUrl" => $a['portfolio_url'],
            "resumeUrl" => $a['resume_url'],
            "coverLetter" => $a['cover_letter'],
            "status" => $a['status'] ?? 'Pending',
            "createdAt" => $a['created_at']
        ];
    }, $rawApps);

    echo json_encode([
        "success" => true,
        "jobs" => $jobs,
        "applications" => $applications
    ]);

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error fetching careers.",
        "error" => $e->getMessage()
    ]);
}
?>
