/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /resources
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db, queryHelpers) => {
  router.get("/page/:number", (req, res) => {
    queryHelpers
      .getResourcesByPageOffset(req.params.number, req.session.userId)
      .then((data) => {
        res.json({ resources: data });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/", (req, res) => {
    queryHelpers
      .getResourcesByPageOffset(null, req.session.userId)
      .then((data) => {
        res.json({ resources: data });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/all", (req, res) => {
    const allResourcesQuery = `SELECT users.username AS username, resources.title, resources.image_url, resources.id AS resource_id, resources.url, resources.description, substring(resources.description,1,140) AS substring,
    resources.created_at::date AS date, resources.created_at::time
    AS time
    FROM resources
    JOIN users ON creator_id = users.id;`;

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
