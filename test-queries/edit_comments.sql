
-- user to update their own comments (based on user_id). User can update title and content only, only on specific resources id

-- when editing, the resource_id will need to be passed into the query
-- It will need to be confirmed that the signed in user matches the user id of that comment



-- Test Case: user_id = 5
-- resource id = 28 and 10


UPDATE resource_comments
SET title = 'Awful resource', content = 'This was a terrible post'
WHERE user_id = 5 and resource_id = 10;

-- Sucessfull

-- Created_at function works to automatically change the timestamp woo