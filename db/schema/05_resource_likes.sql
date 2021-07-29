DROP TABLE IF EXISTS resource_likes CASCADE;

CREATE TABLE resource_likes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER REFERENCES resources(id)  ON DELETE CASCADE NOT NULL,
  UNIQUE (user_id, resource_id)
);


/* 
pk  id serial
fk  user_id: user.id
fk  resource_id: resources.id
*/