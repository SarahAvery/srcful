DROP TABLE IF EXISTS resource_categories CASCADE;

CREATE TABLE resource_categories (
  id SERIAL PRIMARY KEY NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  resource_id INTEGER REFERENCES resources(id)
);