CREATE DATABASE wpmvc;

-- Create User
CREATE USER 'wpmvc' IDENTIFIED BY 'pass$23';
-- Grant Privileges
GRANT USAGE ON 'wpmvc'.* TO 'wpmvc'@'%' IDENTIFIED BY 'pass$23';

ALTER USER 'wpmvc'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pass$23';
ALTER USER 'wpmvc' IDENTIFIED WITH mysql_native_password BY 'pass$23';

USE wpmvc;

-- USERS TABLE
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(24) NOT NULL,
    password VARCHAR(128) NOT NULL,
    fullname VARCHAR(64) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

-- LINKS TABLE
CREATE TABLE links (
    id INT(11) NOT NULL,
    title VARCHAR(254) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE links
    ADD PRIMARY KEY (id);

ALTER TABLE links
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE links;

-- Express-Sessions-table
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB