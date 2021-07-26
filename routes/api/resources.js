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
    const queryString = `SELECT users.username AS username, resources.*
    FROM resources
    JOIN users ON creator_id = users.id LIMIT 8;`;
    db.query(queryString)
      .then((data) => {
        const resources = data.rows;
        res.json({ resources });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
