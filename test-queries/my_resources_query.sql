
--  Returns all resources created by user.id provided
-- Should Return: creator_id: 5 and 5, resource_id: 9 and 15
SELECT resources.*
FROM resources
JOIN users ON creator_id = users.id
WHERE users.id = 5;


-- returns all resources that user has liked
-- Should Return: resources_id: 7 and 11, created_by: 28 and 28
SELECT resources.*, users.id AS liked_by
FROM resource_likes
JOIN users ON user_id = users.id
JOIN resources ON resource_id = resources.id
WHERE users.id = 5;