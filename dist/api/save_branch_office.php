<?php
// Decor8 India - Save/Update Branch Office Endpoint
require_once 'db_config.php';

try {
    $pdo = getDbConnection();

    // Auto-create branch_offices table if not exists
    $pdo->exec("CREATE TABLE IF NOT EXISTS `branch_offices` (
      `id` varchar(50) NOT NULL,
      `city` varchar(100) NOT NULL,
      `title` varchar(150) NOT NULL,
      `address` text NOT NULL,
      `phone` varchar(50) NOT NULL,
      `email` varchar(100) NOT NULL,
      `working_hours` varchar(100) DEFAULT 'Mon - Sat: 9:30 AM - 7:30 PM',
      `map_url` text DEFAULT NULL,
      `image_url` text DEFAULT NULL,
      `is_headquarter` tinyint(1) DEFAULT 0,
      `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    $data = json_decode(file_get_contents("php://input"));

    if (empty($data->title) || empty($data->city) || empty($data->address)) {
        echo json_encode(["success" => false, "message" => "City, Title, and Address are required."]);
        exit();
    }

    $id = !empty($data->id) ? $data->id : 'branch-' . time();
    $city = trim($data->city);
    $title = trim($data->title);
    $address = trim($data->address);
    $phone = isset($data->phone) ? trim($data->phone) : '';
    $email = isset($data->email) ? trim($data->email) : '';
    $workingHours = isset($data->workingHours) ? trim($data->workingHours) : 'Mon - Sat: 9:30 AM - 7:30 PM';
    $mapUrl = isset($data->mapUrl) ? trim($data->mapUrl) : null;
    $imageUrl = isset($data->imageUrl) ? trim($data->imageUrl) : null;
    $isHeadquarter = !empty($data->isHeadquarter) ? 1 : 0;

    $stmt = $pdo->prepare("INSERT INTO branch_offices (id, city, title, address, phone, email, working_hours, map_url, image_url, is_headquarter) 
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) 
                           ON DUPLICATE KEY UPDATE city = ?, title = ?, address = ?, phone = ?, email = ?, working_hours = ?, map_url = ?, image_url = ?, is_headquarter = ?");
    $stmt->execute([
        $id, $city, $title, $address, $phone, $email, $workingHours, $mapUrl, $imageUrl, $isHeadquarter,
        $city, $title, $address, $phone, $email, $workingHours, $mapUrl, $imageUrl, $isHeadquarter
    ]);

    echo json_encode([
        "success" => true,
        "branchId" => $id,
        "message" => "Branch Office '$title' saved successfully."
    ]);

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error saving Branch Office.",
        "error" => $e->getMessage()
    ]);
}
?>
