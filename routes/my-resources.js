const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// app.set("view engine", "ejs");

// app.get('/signup', (req, res) => {
//   res.render('signup');
// });

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("my-resources");
  });
  return router;
};
