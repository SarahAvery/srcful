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
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        const users = data.rows;
        res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // router.get("/:id", (req, res) => {
  //   console.log(req.params);
  //   db.query(`SELECT * FROM users WHERE users.id = ${req.params.id}`)
  //     .then((data) => {
  //       console.log(data);
  //       const users = data.rows[0];
  //       res.json({ users });
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });
  // });

  // router.post("/:id", (req, res) => {

  // });

  // router.put("/:id", (req, res) => {

  // });

  // router.delete("/:id", (req, res) => {

  // });

  return router;
};
