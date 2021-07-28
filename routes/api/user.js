const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

module.exports = (db) => {
  const getResourcesByUserId = (userId) => {
    return new Promise((resolve, reject) => {
      const resourceQuery = `
        SELECT users.username AS username, users.id, resources.title, resources.image_url, resources.id AS resource_id, resources.url
        FROM resources
        JOIN users ON creator_id = users.id
        WHERE users.id = $1;`;

      const likedResourceQuery = `
      SELECT  users.id AS user_id, resources.title, resources.image_url, resources.id AS resource_id, resources.url
        FROM resource_likes
        JOIN users ON user_id = users.id
        JOIN resources ON resource_id = resources.id
        WHERE users.id = $1;`;

      Promise.all([
        db.query(resourceQuery, [userId]),
        db.query(likedResourceQuery, [userId]),
      ])
        .then(([resources, likedResources]) => {
          const data = {
            resources: resources.rows || [],
            likedResources: likedResources.rows || [],
          };

          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const getUserById = (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT users.id, users.username, users.email, users.created_at FROM users WHERE users.id = $1`;
      const likesQuery = `SELECT COUNT(*) FROM resource_likes WHERE user_id = $1`;
      const resourcesCountQuery = `SELECT COUNT(*) FROM resources WHERE creator_id = $1`;

      Promise.all([
        db.query(query, [id]),
        db.query(likesQuery, [id]),
        db.query(resourcesCountQuery, [id]),
      ]).then(([user, likes, resouces]) => {
        const userData = {
          ...user.rows[0],
          userLikesCount: likes.rows[0].count || 0,
          resourcesCount: resouces.rows[0].count || 0,
        };

        console.log(userData);
        resolve(userData);
      });
    });
  };

  router.get("/", (req, res) => {
    const currentUserId = req.session.userId;
    getUserById(currentUserId).then((data) => res.json(data));
  });

  router.get("/:id", (req, res) => {
    // TODO: Add authorization to permit users of the required scope to access user data
    const { id } = req.params;
    getUserById(id).then((data) => res.json(data));
  });

  router.post("/", (req, res) => {
    const update = req.body;

    console.log(req.query, req.params, update);
    // If inputs blank?
    // Hash password
    update.password = bcrypt.hashSync(update.password, 12);

    // If username taken, error
    // Else update user in database
    db.query(
      `
      UPDATE users
      SET username = $1,
          password = $2
      WHERE id = $3;
      `,
      [update.username, update.password, req.session.userId]
    )
      .then((data) => {
        res.json({ user: data.rows[0] });
      })
      .catch((e) => {
        res.status(500);

        if (e.constraint === "users_username_key") {
          res.json({ error: "Username already taken" });
        } else {
          res.json({ error: e.stack });
        }
      });
  });

  router.get("/:id/resources", (req, res) => {
    const { id } = req.params;
    getResourcesByUserId(id)
      .then((data) => res.json(data))
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
