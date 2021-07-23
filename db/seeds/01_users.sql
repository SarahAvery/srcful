-- Users table seeds here (Example)
/* 
  users (
  id uuid DEFAULT uuid_generate_v1() PRIMARY KEY NOT NULL,

  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
*/


INSERT INTO users (username, email, password) 
VALUES ('alice1', 'alice_monte@gmail.com', 'password'),
('kira46', 'kira_tang@hotmail.com', 'password'),
('mike81', 'mike_lombard@yahoo.com', 'password');
