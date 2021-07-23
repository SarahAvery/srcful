/*
  resource_ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  rating INTEGER NOT NULL DEFAULT 0
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE,
);
 */



INSERT INTO resource_ratings (rating, user_id, resource_id) 
VALUES (5, 1, 1),
(4, 2, 2),
(2, 3, 2);