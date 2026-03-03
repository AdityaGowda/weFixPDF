-- ─────────────────────────────────────────────────────────────
-- ConvertLite — MySQL 8 Initial Setup
-- ─────────────────────────────────────────────────────────────
-- Run this ONCE as the MySQL root user to create the
-- application database and a dedicated DB user.
--
-- Usage:
--   sudo mysql -u root < src/db/setup-mysql.sql
--   (or)
--   mysql -u root -p < src/db/setup-mysql.sql
-- ─────────────────────────────────────────────────────────────

-- 1. Create the database
CREATE DATABASE IF NOT EXISTS `wefixpdf`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- 2. Create a dedicated application user
--    ⚠️  Change 'YourStrongPassword@123' to a secure password!
CREATE USER IF NOT EXISTS 'wefixpdf_user'@'localhost'
  IDENTIFIED WITH mysql_native_password BY 'wefixpdf@123';

-- 3. Grant privileges on the convertlite_db only
GRANT ALL PRIVILEGES ON `wefixpdf`.* TO 'wefixpdf_user'@'localhost';

-- 4. Apply privilege changes
FLUSH PRIVILEGES;

-- 5. Confirm
SELECT '✅  Database and user created successfully!' AS status;
