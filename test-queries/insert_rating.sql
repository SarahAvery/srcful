-- Check if rating already exists before inserting

DO
$do$
BEGIN

IF NOT EXISTS (SELECT * FROM resource_ratings WHERE rating = 1 AND user_id = 1 AND resource_id = 1) THEN
  INSERT INTO resource_ratings (rating, user_id, resource_id)
  VALUES (1, 1, 1);
END IF;

end;
$do$;
