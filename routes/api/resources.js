/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /resources
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const resourceQuery = `SELECT users.username AS username, resources.title, resources.image_url, resources.id AS resource_id, resources.url, substring(resources.description,1,140) AS substring, 
    resources.created_at::date AS date, resources.created_at::time
   AS time    
   FROM resources
   JOIN users ON creator_id = users.id LIMIT 8;`;

    const commentQuery = `SELECT resources.id, count(resource_comments.title) AS num_of_comments FROM resource_comments JOIN resources ON resource_id = resources.id GROUP BY resources.id LIMIT 8;`;

    const likesQuery = `SELECT resources.id , count(resource_likes) AS num_of_likes FROM resource_likes JOIN resources ON resource_id = resources.id GROUP BY resources.id ORDER BY resources.id ASC LIMIT 8;`;

    const categoryQuery = `SELECT resources.id AS resource_id, array_agg(categories.title) AS categories FROM resource_categories JOIN resources ON resource_id = resources.id JOIN categories ON category_id = categories.id WHERE resource_categories.resource_id = resources.id GROUP BY resources.id ORDER BY resources.id ASC;`;

    const ratingQuery = `SELECT resources.id AS resource_id, round(avg(resource_ratings.rating),1) AS avg_rating FROM resource_ratings JOIN resources ON resource_id = resources.id GROUP BY resources.id ORDER BY resources.id ASC;`;

    const commentsQueryFunc = (prevResources) => {
      // commentsCount
      return new Promise((resolve) => {
        db.query(commentQuery).then((data) => {
          const commentData = data.rows;
          const combined = prevResources.map((resource) => {
            const match = commentData.find(
              (commentRes) => commentRes.id === resource.resource_id
            );
            resource.commentCount = (match && match.num_of_comments) || 0;
            return resource;
          });

          resolve(combined);
        });
      });
    };

    const likesQueryFunc = (prevResources) => {
      // likesCount
      return new Promise((resolve) => {
        db.query(likesQuery).then((data) => {
          const ratingData = data.rows;
          const combined = prevResources.map((resource) => {
            const match = ratingData.find(
              (likesRes) => likesRes.id === resource.resource_id
            );
            resource.likeCount = (match && match.num_of_likes) || 0;
            return resource;
          });

          resolve(combined);
        });
      });
    };

    const ratingQueryFunc = (prevResources) => {
      // avgRating
      return new Promise((resolve) => {
        db.query(ratingQuery).then((data) => {
          const ratingData = data.rows;
          const combined = prevResources.map((resource) => {
            const match = ratingData.find(
              (rating) => rating.resource_id === resource.resource_id
            );
            resource.avgRating = (match && match.avg_rating) || 0;
            return resource;
          });

          resolve(combined);
        });
      });
    };

    const categoryQueryFunc = (data) => {
      // categories
      return new Promise((resolve) => {
        db.query(categoryQuery).then((catData) => {
          const categoryData = catData.rows;

          const newResources = data.map((resource) => ({
            ...resource,
            ...(categoryData.find(
              (category) => category.resource_id === resource.resource_id
            ) || { categories: [] }),
          }));

          resolve(newResources);
        });
      });
    };

    db.query(resourceQuery)
      .then((data) => {
        const resources = data.rows;
        return resources;
      })
      .then(commentsQueryFunc)
      .then(likesQueryFunc)
      .then(ratingQueryFunc)
      .then(categoryQueryFunc)
      .then((data) => {
        res.json({ resources: data });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
