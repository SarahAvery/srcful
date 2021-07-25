-- Check if like exists, if so then remove it
DO
$do$
BEGIN

IF EXISTS (SELECT * FROM resource_likes WHERE user_id = 3 AND resource_id = 1) THEN
  DELETE FROM resource_likes
  WHERE user_id = 3 AND resource_id = 1;
END IF;

end;
$do$;
