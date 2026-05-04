-- Jalankan di phpMyAdmin (db_helpdesk)
-- Script ini akan membuat tabel users jika belum ada.
-- Password sudah bcrypt (laravel-compatible).

CREATE TABLE IF NOT EXISTS `users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `email_verified_at` TIMESTAMP NULL DEFAULT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) NOT NULL DEFAULT 'user',
  `remember_token` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`name`, `email`, `password`, `role`, `created_at`, `updated_at`)
VALUES
  ('Admin Helpdesk', 'admin@gmail.com', '$2y$10$hUizdaEc3ptzBYM7nKl74uoneffAacHDvwltZE7dNkDP7VAXAE3GK', 'admin', NOW(), NOW()),
  ('User Helpdesk', 'user@gmail.com', '$2y$10$8XqW8I3EVJh6kwtjP5hDTOYA4lwDFMpFYQYEPeZ7Jh7Rrso5PvO/2', 'user', NOW(), NOW())
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `password` = VALUES(`password`),
  `role` = VALUES(`role`),
  `updated_at` = NOW();
