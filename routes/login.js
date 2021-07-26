const express = require("express");
const router = express.Router();
// const fetch = require("node-fetch");
const bcrypt = require("bcrypt");

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("login");
  });

  router.post("/", (req, res) => {
    const { email, password } = req.body;

    db.query(`SELECT * FROM users WHERE email = $1;`, [email])
    .then(data => {
      const user = data.rows[0];
      if (bcrypt.compareSync(password, user.password)) {
        req.session.userId = user.id;
        res.redirect("/my-resources");
      } else {
        //invalid password
        res.send({error: "invalid password"});
      }
    })
    .catch(e => {
      //invalid email
      res.status(500);
      res.send({error: "invalid email"});
    });

  });
  return router;
};
