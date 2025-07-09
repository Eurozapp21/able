-- AbleTools Website Database Setup
-- Run these commands in your MySQL database

-- Create the database (replace 'abletools' with your preferred name)
CREATE DATABASE abletools CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create a user for the application (replace username and password)
CREATE USER 'abletools_user'@'localhost' IDENTIFIED BY 'YourSecurePassword123';

-- Grant privileges to the user
GRANT ALL PRIVILEGES ON abletools.* TO 'abletools_user'@'localhost';

-- Apply the changes
FLUSH PRIVILEGES;

-- Use the database
USE abletools;

-- Show what we created
SHOW DATABASES;
SELECT user, host FROM mysql.user WHERE user = 'abletools_user';

-- Note: Your application will automatically create the tables when it starts
-- The MySQL storage layer includes table creation and sample data seeding