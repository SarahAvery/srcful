/* 
resource_likes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE,
),
*/

-- 1 - 33 user
-- 1 - 33 res

INSERT INTO resource_likes (user_id, resource_id) 
VALUES (1, 1),
(2, 1),
(2, 2),
(5, 7),
(6, 21),
(11, 21),
(1, 11),
(26, 28),
(30, 30),
(20, 5),
(27, 33),
(23, 21),
(28, 5),
(3, 3),
(22, 21),
(7, 16),
(15, 22),
(16, 14),
(13, 23),
(31, 1),
(12, 17),
(21, 30),
(28, 29),
(8, 33),
(13, 18),
(5, 11),
(31, 6),
(1, 9),
(20, 1),
(21, 2),
(25, 33),
(33, 1),
(6, 14);