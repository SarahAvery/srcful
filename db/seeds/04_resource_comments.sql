/*
resource_comments (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
)
*/


INSERT INTO resource_comments (title, content, user_id, resource_id) 
VALUES ('Great resource', 'This resource was really helpful.', 1, 1),
('Okay resource', 'This resource could be better.', 2, 2),
('Bad resource', 'This resource was not helpful.', 3, 2);