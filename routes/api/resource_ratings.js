const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

module.exports = (db) => {
  router.post("/", (req, res) => {
    const rating = req.body.rating;
    const resourceId = req.body.resourceId;

    if (rating) {
      db.query(
        `INSERT INTO resource_ratings (rating, user_id, resource_id)
                VALUES ($1, $2, $3) ON CONFLICT (user_id, resource_id) DO UPDATE SET rating = $1;`,
        [rating, req.session.userId, resourceId]
      )
        .then(() => {
          db.query(
            `SELECT round(avg(resource_ratings.rating),1) AS avg_rating
                  FROM resource_ratings
                  JOIN resources ON resource_id = resources.id
                  WHERE resource_id = $1
                  GROUP BY resources.id;`,
            [resourceId]
          ).then((data) => res.json(data.rows[0]));
        })
        .catch((e) => res.send(e.stack));
    }
  });

  return router;
};
