use db;

-- Create the 'books' table if not exists
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    status VARCHAR(255)
);

-- Insert records into the 'books' table if it's empty
INSERT IGNORE INTO books (title, status) VALUES ('Software Development Life Cycle', 'to-read');
INSERT IGNORE INTO books (title, status) VALUES ('Requirements Engineering', 'to-read');
INSERT IGNORE INTO books (title, status) VALUES ('Design and Architecture', 'in-progress');
INSERT IGNORE INTO books (title, status) VALUES ('Coding and Implementation', 'in-progress');
INSERT IGNORE INTO books (title, status) VALUES ('Testing', 'completed');
INSERT IGNORE INTO books (title, status) VALUES ('Ethics and Professionalism', 'completed');
