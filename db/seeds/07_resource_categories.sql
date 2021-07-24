/* 
  resource_categories (
  id SERIAL PRIMARY KEY NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  resource_id INTEGER REFERENCES resources(id)
),
 */

-- 1 - 19 cat
-- 1 - 33 res

INSERT INTO resource_categories (category_id, resource_id) 
VALUES (2, 1),
(3, 2),
(1, 3),
(1, 1),
(6, 20),
(1, 8),
(18, 14),
(12, 12),
(16, 7),
(6, 29),
(16, 30),
(14, 22),
(6, 9),
(1, 7),
(7, 8),
(13, 19),
(17, 22),
(10, 10),
(2, 17),
(3, 11),
(16, 5),
(6, 11),
(4, 12),
(17, 19),
(5, 19),
(6, 12),
(13, 2),
(4, 27),
(11, 3),
(8, 16),
(11, 23),
(16, 21),
(8, 29),
(5, 4);
