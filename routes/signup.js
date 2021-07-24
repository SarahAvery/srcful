const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const bcrypt = require('bcrypt');

// app.set("view engine", "ejs");

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("signup");
  });

  router.post("/", (req, res) => {
    const { username, email, password } = req.body;

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    //Store new user in database: login query
    // userDatabase[id] = { id, email, hashedPassword };

    //Create cookie session
    //Select userID from db via username?
    // req.session.userID = id;

    // Redirect to /myresources
    res.redirect('/my-resources');
  });
  return router;
};
