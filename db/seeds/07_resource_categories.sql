/* 
  resource_categories (
  id SERIAL PRIMARY KEY NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  resource_id INTEGER REFERENCES resources(id)
);
 */

INSERT INTO resource_categories (category_id, resource_id) 
VALUES (2, 1),
(3, 2),
(1, 3),
(1, 1);