/* 
resource_likes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE,
);
*/



INSERT INTO resource_likes (user_id, resource_id) 
VALUES (1, 1),
(2, 1),
(2, 2);