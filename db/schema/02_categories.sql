DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL, 
  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE DEFAULT NULL
);

/*
id: serial
title: varchar
description: text

created_at: timestamptz
updated_at: timestamptz
created_by: user.id
*/

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON categories
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();