-- Check if email or username already exist in database

SELECT username, email
FROM users
WHERE username = '${user.name}' || email = '${user.email}';

-- If neither exist, add new user to database

INSERT INTO users (username, email, password) 
VALUES ('${user.name}', '${user.email}', '$(user.password}') 
RETURNING *;
