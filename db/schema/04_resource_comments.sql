-- Drop and recreate Comments table
DROP TABLE IF EXISTS resource_comments CASCADE;

CREATE TABLE resource_comments (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE
);



/* 
id: serial
user_id: users.id
created_at: date
updated_at: date
title: varchar(255)
content: text
*/

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON resource_comments
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();