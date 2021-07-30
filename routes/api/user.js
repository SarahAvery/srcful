const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

module.exports = (db, queryHelpers) => {
  const getResourcesByUserId = queryHelpers.getResourcesByUserId;
  const getUserById = queryHelpers.getUserById;

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
    //Check if inputs blank
    if (!update.username && !update.password) {
      return res.redirect("/profile");
    }

    let queryString = "UPDATE users SET ";
    const values = [];
    const queryBuilder = [];

    if (update.username) {
      values.push(update.username);
      queryBuilder.push(`username = $${values.length} `);
    }
    if (update.password) {
      // Hash password
      update.password = bcrypt.hashSync(update.password, 12);
      values.push(update.password);
      queryBuilder.push(`password = $${values.length} `);
    }

    queryString += queryBuilder.join(", ");
    values.push(req.session.userId);
    queryString += `WHERE id = $${values.length};`;

    db.query(queryString, values)
      .then((data) => {
        res.redirect("/profile");
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
