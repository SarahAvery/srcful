/*
  resource_ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  rating INTEGER NOT NULL DEFAULT 0
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE,
),
 */



INSERT INTO resource_ratings (rating, user_id, resource_id) 
VALUES (5, 1, 1),
(4, 2, 2),
(2, 3, 2),
(3, 27, 21),
(1, 19, 7),
(3, 5, 14),
(4, 20, 1),
(2, 29, 1),
(1, 26, 19),
(2, 5, 10),
(4, 3, 29),
(5, 16, 22),
(2, 28, 26),
(1, 22, 18),
(5, 19, 25),
(3, 4, 32),
(4, 18, 7),
(5, 17, 4),
(2, 33, 7),
(1, 30, 22),
(3, 3, 12),
(2, 19, 9),
(4, 22, 12),
(3, 31, 32),
(3, 1, 3),
(2, 25, 28),
(4, 5, 32),
(4, 21, 16),
(5, 20, 9),
(5, 20, 8),
(5, 9, 16),
(4, 7, 14),
(3, 31, 4);