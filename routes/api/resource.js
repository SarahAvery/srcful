/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const getResourceById = (id, userId = null) => {
    return new Promise((resolve, reject) => {
      const resourceQuery = `
      SELECT users.username AS username, resources.title, resources.image_url, resources.id AS resource_id, resources.url, resources.description, substring(resources.description,1,140) AS substring, resources.created_at::date AS date, resources.created_at::time AS time
      FROM resources
      JOIN users ON creator_id = users.id
      WHERE resources.id = $1;`;

      const commentQuery = `
      SELECT resources.id, count(resource_comments.title) AS num_of_comments
      FROM resource_comments
      JOIN resources ON resource_id = resources.id
      WHERE resources.id = $1
      GROUP BY resources.id;`;

      const likesQuery = `
      SELECT resources.id, count(resource_likes) AS num_of_likes
      FROM resource_likes
      JOIN resources ON resource_id = resources.id
      WHERE resources.id = $1
      GROUP BY resources.id;`;

      const categoryQuery = `
      SELECT resources.id AS resource_id, array_agg(categories.title) AS categories
      FROM resource_categories
      JOIN resources ON resource_id = resources.id
      JOIN categories ON category_id = categories.id
      WHERE resource_categories.resource_id = resources.id AND resources.id = $1
      GROUP BY resources.id`;

      const ratingQuery = `
      SELECT resources.id AS resource_id, round(avg(resource_ratings.rating),1) AS avg_rating
      FROM resource_ratings
      JOIN resources ON resource_id = resources.id
      WHERE resource_id = $1
      GROUP BY resources.id;`;

      const isLikedQuery = `
      SELECT resource_likes.*
      FROM resource_likes
      WHERE resource_id = $1 AND user_id = $2;`;

      const commentsQueryFunc = (prevResources) => {
        // commentsCount
        return new Promise((resolve) => {
          db.query(commentQuery, [id]).then((data) => {
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
          db.query(likesQuery, [id]).then((data) => {
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
          db.query(ratingQuery, [id]).then((data) => {
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
          db.query(categoryQuery, [id]).then((catData) => {
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

      db.query(resourceQuery, [id])
        .then((data) => {
          const resources = data.rows;
          return resources;
        })
        .then(commentsQueryFunc)
        .then(likesQueryFunc)
        .then(ratingQueryFunc)
        .then(categoryQueryFunc)
        .then(isLikedQueryFunc)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  router.get("/:id", (req, res) => {
    // TODO: Add authorization to permit users of the required scope to access user data
    const { id } = req.params;
    const userId = req.session.userId;
    getResourceById(id, userId)
      .then((data) => res.json(data))
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    // TODO: Edit Resource
  });

  router.delete("/", (req, res) => {
    // TODO: Delete Resource
  });

  return router;
};
