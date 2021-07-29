/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /resources
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const limit = 10;
const resourceQuery = `SELECT users.username AS username, resources.title, resources.image_url, resources.id AS resource_id, resources.url, resources.description, substring(resources.description,1,140) AS substring,
    resources.created_at::date AS date, resources.created_at::time
    AS time
    FROM resources
    JOIN users ON creator_id = users.id OFFSET $1 LIMIT ${limit};`;

const allResourcesQuery = `SELECT users.username AS username, resources.title, resources.image_url, resources.id AS resource_id, resources.url, resources.description, substring(resources.description,1,140) AS substring,
    resources.created_at::date AS date, resources.created_at::time
    AS time
    FROM resources
    JOIN users ON creator_id = users.id;`;

const commentQuery = `
    SELECT resources.id, count(resource_comments.title) AS num_of_comments
    FROM resource_comments
    JOIN resources ON resource_id = resources.id
    GROUP BY resources.id;`;

const likesQuery = `
    SELECT resources.id, count(resource_likes) AS num_of_likes
    FROM resource_likes
    JOIN resources ON resource_id = resources.id
    GROUP BY resources.id;`;

const categoryQuery = `
    SELECT resources.id AS resource_id, array_agg(categories.title) AS categories
    FROM resource_categories
    JOIN resources ON resource_id = resources.id
    JOIN categories ON category_id = categories.id
    WHERE resource_categories.resource_id = resources.id
    GROUP BY resources.id;`;

const ratingQuery = `
    SELECT resources.id AS resource_id, round(avg(resource_ratings.rating),1) AS avg_rating
    FROM resource_ratings
    JOIN resources ON resource_id = resources.id
    GROUP BY resources.id;`;
const isLikedQuery = `
    SELECT resource_likes.*
    FROM resource_likes
    WHERE resource_id = $1 AND user_id = $2;`;
module.exports = (db) => {
  const resourcesQuery = (offset) => {
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

    const isLikedQueryFunc = (data) => {
      // categories
      return new Promise((resolve) => {
        db.query(isLikedQuery, [id, userId]).then((isLikedData) => {
          const newResources = data.map((resource) => ({
            ...resource,
            isLiked: !!isLikedData.rows.length,
          }));

          resolve(newResources);
        });
      });
    };

    return db
      .query(resourceQuery, [offset * limit || 0])
      .then((data) => {
        const resources = data.rows;
        return resources;
      })
      .then(commentsQueryFunc)
      .then(likesQueryFunc)
      .then(ratingQueryFunc)
      .then(categoryQueryFunc)
      .then((data) => data)
      .catch((err) => err);
  };

  router.get("/page/:number", (req, res) => {
    resourcesQuery(req.params.number)
      .then((data) => {
        res.json({ resources: data });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/", (req, res) => {
    resourcesQuery()
      .then((data) => {
        res.json({ resources: data });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/all", (req, res) => {
    db.query(allResourcesQuery)
      .then((data) => {
        res.json({ resources: data.rows });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
