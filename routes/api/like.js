const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    if (!req.session.userId || !req.body.resourceId) {
      res.status(400).json({ error: "Resource id and user id required" });
    } else {
      db.query(
        `
          INSERT INTO resource_likes(user_id, resource_id)
          VALUES($1, $2);
        `,
        [req.session.userId, req.body.resourceId]
      )
        .then((data) => {
          res.json({});
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    }
  });

  router.post("/remove", (req, res) => {
    if (!req.session.userId || !req.body.resourceId) {
      res.status(400).json({ error: "Resource id and user id required" });
    } else {
      db.query(
        `
        DELETE FROM resource_likes
        WHERE user_id = $1 AND resource_id = $2;
        `,
        [req.session.userId, req.body.resourceId]
      )
        .then((data) => {
          res.json({});
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    }
  });

  return router;
};
