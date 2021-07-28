const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

module.exports = () => {
  router.get("/", (req, res) => {
    fetch(process.env.API_URL + "/resources")
      .then((data) => data.json())
      .then((json) => {
        if (json.resources) {
          const templateVars = { resources: json.resources };
          if (req.session.userId) {
            res.redirect("/resources");
          }
          res.render("index", templateVars);
        } else {
          res.redirect("/");
        }
      });
  });

  router.get("/page/:number", (req, res) => {
    if (req.params.number === "1") res.redirect("/");

    const offset = req.params.number - 1;
    fetch(process.env.API_URL + "/resources/page/" + offset)
      .then((data) => data.json())
      .then((json) => {
        if (json.resources) {
          const templateVars = { resources: json.resources };
          res.render("index", templateVars);
        } else {
          res.redirect("/");
        }
      });
  });

  return router;
};
