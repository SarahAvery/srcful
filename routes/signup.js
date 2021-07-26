const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const bcrypt = require("bcrypt");

// app.set("view engine", "ejs");

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("signup");
  });

  router.post("/", (req, res) => {
    const user = req.body;

    // Hash password
    user.password = bcrypt.hashSync(user.password, 12);

    //If username taken, error
    //If email already registered, error
    //If inputs blank, error (currently required in html)

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
        if (!newUser) {
          res.send({ error: "error" });
        } else {
          req.session.userId = user.id;
          res.send("🤗");
        }
      })
      .catch((e) => {
        res.status(500);
        res.send(e);
      });

    // Redirect to /myresources
    res.redirect("/my-resources");
  });
  return router;
};
