DROP TABLE IF EXISTS resources CASCADE;


CREATE TABLE resources (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  url VARCHAR(255),
  image_url VARCHAR(255) ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

-- creator_id can not be null

  -- category_id --> JOIN resource_catergories ON resources.id = resource_categories.resource_id

/*
pk  id: serial
    created_at: date
    updated_at: date
    title: varchar
    description: text
    url: varchar
fk  categories: resource_categories table
fk  likes: user_likes_res table
fk  rating: user_rating_res table
fk  comments: user_rating_res table
fk  created_by: user(id)
*/



CREATE TRIGGER set_timestamp
BEFORE UPDATE ON resources
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();