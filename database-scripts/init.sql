-- Create the guestbook database
CREATE DATABASE guestbook;

-- Use the guestbook database
USE guestbook;

-- Create a table to store the guestbook form data
CREATE TABLE guestbook_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Unique ID for each entry
    firstname VARCHAR(100) NOT NULL,    -- User's first name
    lastname VARCHAR(100) NOT NULL,     -- User's last name
    jobname VARCHAR(100),               -- User's job title
    company VARCHAR(100),               -- User's company
    linkedin VARCHAR(255),              -- User's LinkedIn URL
    email VARCHAR(100),                 -- User's email address
    meet_method VARCHAR(50),            -- How the user met (referral, linkedin, other)
    other_meet_method VARCHAR(255),     -- If "Other" was selected, specify the method
    message TEXT,                       -- Message from the user
    mailing_list BOOLEAN,               -- Whether the user wants to be added to the mailing list
    email_format VARCHAR(10),           -- Preferred email format (HTML or Text)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Timestamp of when the entry was created
);

INSERT INTO guestbook_entries (
    firstname, 
    lastname, 
    jobname, 
    company, 
    linkedin, 
    email, 
    meet_method, 
    other_meet_method, 
    message, 
    mailing_list, 
    email_format
) 
VALUES (
    'John',                    
    'Doe',                     
    'Software Engineer',      
    'TechCorp',                
    'https://www.linkedin.com/in/johndoe',  
    'johndoe@example.com',     
    'LinkedIn',                
    'Networking',              
    'Looking forward to connecting!',
    TRUE,                      -- Wants to be added to mailing list (TRUE or FALSE)
    'HTML'                     
);


