const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

module.exports = () => {
  router.get("/", (req, res) => {
    if (req.session.userId) {
      res.redirect("/resources");
    }
    fetch(process.env.API_URL + "/resources")
      .then((data) => data.json())
      .then((json) => {
        if (json.resources) {
          const templateVars = { resources: json.resources, pageNum:1 };
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
          const templateVars = {
            resources: json.resources,
            pageNum: req.params.number,
          };
          res.render("index", templateVars);
        } else {
          res.redirect("/");
        }
      });
  });

  return router;
};
