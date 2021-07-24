-- user can delete comment created by self
-- only on specific resource id

DELETE 
FROM resource_comments 
WHERE user_id = 2 and resource_id = 2;
