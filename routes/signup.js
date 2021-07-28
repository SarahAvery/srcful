const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const bcrypt = require("bcrypt");

// app.set("view engine", "ejs");

module.exports = (db) => {
  router.get("/", (req, res) => {
    if (req.session.userId) {
      res.redirect("/resources");
    }
    res.render("signup");
  });

  router.post("/", (req, res) => {
    const user = req.body;
    const templateVars = {};

    // If inputs blank, error (currently required in html)
    // Hash password
    user.password = bcrypt.hashSync(user.password, 12);

    // If username taken, error
    // If email already registered, error
    // Else store new user in database: register query
    db.query(
      `
      INSERT INTO users(username, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [user.username, user.email, user.password]
    )
      .then((data) => {
        const newUser = data.rows[0];
        req.session.userId = newUser.id;
        res.redirect("/resources");
      })
      .catch((e) => {
        res.status(500);
        if (e.constraint === "users_username_key") {
          templateVars.error = "Username already taken";
          res.render("signup", templateVars);
        } else if (e.constraint === "users_email_key") {
          templateVars.error = "Email already registered";
          res.render("signup", templateVars);
        } else {
          res.send(e);
        }
      });
  });

  return router;
};
