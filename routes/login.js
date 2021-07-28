const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const qs = require("qs");

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("login");
  });

  router.post("/", (req, res) => {
    console.log(req.headers);
    console.log(qs.stringify(req.body));

    fetch(`${process.env.API_URL}/login?${qs.stringify(req.body)}`, {
      method: "POST",
      ...(req.headers && {
        headers: req.headers,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.error) {
          res.status(500).render("login", { error: data.error });
        } else {
          const user = data;
          req.session.userId = user.id;
          res.redirect("/resources");
        }
      })
      .catch((e) => {
        console.log(e);
        res.render("login", { error: e });
      });
  });
  return router;
};
