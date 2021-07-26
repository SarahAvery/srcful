const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("my-resources");
  });

  router.get("/new", (req, res) => {
    fetch(process.env.API_URL + "/categories")
      .then((data) => data.json())
      .then((json) => {
        if (json.categories) {
          const templateVars = { categories: json.categories };
          res.render("resources_new", templateVars);
        } else {
          res.redirect("/");
        }
      });
  });
  return router;
};
