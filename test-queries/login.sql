-- Check if email or username already exist in database, 
-- and use JS logic to check if password matches given username/email from login form

SELECT id, username, email, password
FROM users
WHERE username = '${user.name}' || email = '${user.email}';
