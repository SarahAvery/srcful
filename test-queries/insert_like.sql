-- Check if like already exists before inserting

DO
$do$
BEGIN

IF NOT EXISTS (SELECT * FROM resource_likes WHERE user_id = 3 AND resource_id = 1) THEN
  INSERT INTO resource_likes (user_id, resource_id)
  VALUES (3, 1);
END IF;

end;
$do$;
