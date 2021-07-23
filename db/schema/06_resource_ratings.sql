DROP TABLE IF EXISTS resource_ratings CASCADE;

CREATE TABLE resource_ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  rating INTEGER NOT NULL DEFAULT 0,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE
);


/* 
pk  id serial
fk  user_id: user.id
fk  resource_id: resources.id

rating: int
*/