-- Decor8 India - GoDaddy MySQL Database Schema
-- Execute this SQL script in GoDaddy phpMyAdmin

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+05:30";

-- Table 1: Users (Admin & Approved Clients)
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(120) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` enum('ADMIN','CLIENT') NOT NULL DEFAULT 'CLIENT',
  `password_hash` varchar(255) NOT NULL,
  `is_approved` tinyint(1) NOT NULL DEFAULT 1,
  `must_change_password` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table 2: Bookings (Consultations & In-Person Site Visits)
CREATE TABLE IF NOT EXISTS `bookings` (
  `id` varchar(50) NOT NULL,
  `client_name` varchar(100) NOT NULL,
  `client_email` varchar(120) NOT NULL,
  `client_phone` varchar(20) NOT NULL,
  `service_type` varchar(50) NOT NULL,
  `package_name` varchar(150) NOT NULL,
  `preferred_date` date NOT NULL,
  `requirements` text DEFAULT NULL,
  `floor_plan_url` varchar(255) DEFAULT NULL,
  `estimated_cost` decimal(12,2) DEFAULT NULL,
  `is_emi_requested` tinyint(1) DEFAULT 0,
  `status` enum('Pending Approval','Approved','Rejected') NOT NULL DEFAULT 'Pending Approval',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table 3: Projects
CREATE TABLE IF NOT EXISTS `projects` (
  `id` varchar(50) NOT NULL,
  `title` varchar(150) NOT NULL,
  `client_id` varchar(50) NOT NULL,
  `client_name` varchar(100) NOT NULL,
  `designer_name` varchar(100) NOT NULL,
  `category` enum('Residential','Commercial','Construction') NOT NULL,
  `style` enum('Luxury','Modern','Minimal','Traditional') NOT NULL DEFAULT 'Luxury',
  `cover_image` text NOT NULL,
  `location` varchar(150) NOT NULL,
  `area` varchar(50) NOT NULL,
  `budget` varchar(50) NOT NULL,
  `status` enum('Ongoing','Completed') NOT NULL DEFAULT 'Ongoing',
  `progress_percentage` int NOT NULL DEFAULT 0,
  `current_stage` varchar(100) NOT NULL DEFAULT 'Civil Work',
  `expected_completion` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table 4: Payments Ledger
CREATE TABLE IF NOT EXISTS `payments` (
  `id` varchar(50) NOT NULL,
  `project_id` varchar(50) NOT NULL,
  `title` varchar(150) NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `paid_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `due_date` date NOT NULL,
  `paid_date` date DEFAULT NULL,
  `status` enum('Paid','Pending','Overdue') NOT NULL DEFAULT 'Pending',
  `invoice_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `fk_payments_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Default Admin Account (Email: satish@decor8india.com / Password: Decor8#India2026)
INSERT INTO `users` (`id`, `name`, `email`, `phone`, `role`, `password_hash`, `is_approved`, `must_change_password`) VALUES
('admin-1', 'Mr. Satish Bhat (CEO & Principal Architect)', 'satish@decor8india.com', '+91 98765 43210', 'ADMIN', '$2y$10$v0N16QfH2wNlXlB3hU8Fse1a1uGZ11vS2e48r6B0a9A7N1x0m0m1O', 1, 0)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- Table 5: Services (moved from cms_data JSON blob)
CREATE TABLE IF NOT EXISTS `services` (
  `id` varchar(50) NOT NULL,
  `title` varchar(200) NOT NULL,
  `type` enum('Residential','Commercial','Construction') NOT NULL DEFAULT 'Residential',
  `description` text DEFAULT NULL,
  `features` JSON DEFAULT NULL,
  `estimated_duration` varchar(50) DEFAULT NULL,
  `starting_price` decimal(12,2) DEFAULT 0.00,
  `image` text DEFAULT NULL,
  `icon_name` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int NOT NULL DEFAULT 0,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table 6: Articles / Blog Posts (moved from cms_data JSON blob)
CREATE TABLE IF NOT EXISTS `articles` (
  `id` varchar(50) NOT NULL,
  `title` varchar(300) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `excerpt` text DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `cover_image` text DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `read_time` varchar(20) DEFAULT NULL,
  `tags` JSON DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `published_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table 7: Team Members (moved from cms_data JSON blob)
CREATE TABLE IF NOT EXISTS `team_members` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `role` varchar(100) DEFAULT NULL,
  `experience` varchar(100) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT 0,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table 8: Testimonials (moved from cms_data JSON blob)
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` varchar(50) NOT NULL,
  `client_name` varchar(100) NOT NULL,
  `client_location` varchar(150) DEFAULT NULL,
  `rating` tinyint NOT NULL DEFAULT 5,
  `review_text` text DEFAULT NULL,
  `project_type` varchar(100) DEFAULT NULL,
  `designation` varchar(150) DEFAULT NULL,
  `is_visible` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

COMMIT;
