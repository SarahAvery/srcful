const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("resource");
  });

  return router;
};

module.exports = () => {
  router.get("/", (req, res) => {
    fetch(process.env.API_URL + "/resources")
      .then((data) => data.json())
      .then((json) => {
        if (json.resources) {
          const templateVars = { resources: json.resources };
          res.render("resource", templateVars);
        } else {
          res.redirect("/");
        }
      });
  });

  return router;
};
