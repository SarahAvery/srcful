-- Check if user is logged in somewhere in JS file, or only display/allow access to url if logged in

-- Create new resource using form data (function paramater -> newResource)

INSERT INTO resources (title, description, url, creator_id)
VALUES ('${newResource.title}', '${newResource.description}', '${newResource.url}', '${req.session.userID}');  -- session userID defined on login as part of that function / request