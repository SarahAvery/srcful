/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// THIS IS AN API REQUEST/QUERY
// ALL REQUESTS SHOULD BE MOCKED USING THIS STRUCTURE

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userQuery = `SELECT users.id, users.username, users.email, users.created_at, users.updated_at FROM users;`;

    const userLikes = `SELECT users.id as user_id, count(resource_likes.id) AS num_of_likes
      FROM users
      JOIN resource_likes ON user_id = users.id
      GROUP BY users.id`;

    const userComments = `
    SELECT users.id as user_id, count(resource_comments.title) AS num_of_comments
    FROM users
    JOIN resource_comments ON user_id = users.id
    GROUP BY users.id;`;

    const userResources = `SELECT users.id as user_id, count(resources.id) AS num_of_resources
    FROM users
    JOIN resources ON creator_id = users.id
    GROUP BY users.id;`;

    const likesQueryFunc = (prevResources) => {
      return new Promise((resolve) => {
        db.query(userLikes).then((data) => {
          const likesData = data.rows;
          const combined = prevResources.map((user) => {
            const match = likesData.find((likes) => likes.user_id === user.id);
            user.likeCount = (match && match.num_of_likes) || 0;
            return user;
          });

          resolve(combined);
        });
      });
    };

    const commentsQueryFunc = (prevResources) => {
      return new Promise((resolve) => {
        db.query(userComments).then((data) => {
          const commentData = data.rows;
          const combined = prevResources.map((user) => {
            const match = commentData.find(
              (comments) => comments.user_id === user.id
            );
            user.commentCount = (match && match.num_of_comments) || 0;
            return user;
          });

          resolve(combined);
        });
      });
    };

    const resourceQueryFunc = (prevResources) => {
      return new Promise((resolve) => {
        db.query(userResources).then((data) => {
          const resData = data.rows;
          const combined = prevResources.map((user) => {
            const match = resData.find(
              (resources) => resources.user_id === user.id
            );
            user.resourceCount = (match && match.num_of_resources) || 0;
            return user;
          });

          resolve(combined);
        });
      });
    };

    db.query(userQuery)
      .then((data) => {
        const users = data.rows;
        return users;
      })
      .then(likesQueryFunc)
      .then(commentsQueryFunc)
      .then(resourceQueryFunc)
      .then((data) => {
        res.json({ users: data });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
