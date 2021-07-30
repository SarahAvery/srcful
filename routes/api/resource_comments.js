const express = require("express");
const router = express.Router();

module.exports = (db, queryHelpers) => {
  router.get("/:id", (req, res) => {
    const { id } = req.params;

    // Gets resource comments by resource id with LIMIT 3
    queryHelpers
      .getResourceCommentsById(id, 3)
      .then((data) => res.json(data))
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/:id/all", (req, res) => {
    const { id } = req.params;

    // Gets resource comments by resource id with no LIMIT
    queryHelpers
      .getResourceCommentsById(id)
      .then((data) => res.json(data))
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:id", (req, res) => {
    const userId = req.session.userId;
    const { title, content, resourceId } = req.body;

    if (content && userId) {
      db.query(
        `INSERT INTO resource_comments (title, content, user_id, resource_id)
                VALUES ($1, $2, $3, $4);`,
        [title, content, userId, resourceId]
      );
    }

    res.status(201).send();
  });

  return router;
};
