const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

module.exports = () => {
  router.get("/", (req, res) => {
    if (!req.session.userId) {
      res.render("index");
    } else {
      fetch(process.env.API_URL + "/resources", {
        method: "GET",
        ...(req.headers && { headers: req.headers }),
      })
        .then((data) => data.json())
        .then((json) => {
          if (json.resources) {
            const templateVars = { resources: json.resources, pageNum: 1 };
            if (req.session.userId) {
              templateVars.user = req.session.userId;
            }
            res.render("index", templateVars);
          } else {
            res.redirect("/login");
          }
        });
    }
  });

  router.get("/page/:number", (req, res) => {
    if (req.params.number === "1") res.redirect("/");

    const offset = req.params.number - 1;
    fetch(process.env.API_URL + "/resources/page/" + offset, {
      ...(req.headers && { headers: req.headers }),
    })
      .then((data) => data.json())
      .then((json) => {
        if (json.resources) {
          const templateVars = {
            resources: json.resources,
            pageNum: req.params.number,
            user: req.session.userId,
          };
          res.render("index", templateVars);
        } else {
          res.redirect("/");
        }
      });
  });

  return router;
};
