const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

module.exports = (db) => {
  router.get("/", (req, res) => {
    fetch(`${process.env.API_URL}/user/${req.session.userId}/resources`, {
      method: "GET",
      ...(req.headers && { headers: req.headers }),
    })
      .then((data) => data.json())
      .then(({ resources, likedResources }) => {
        res.render("resources", {
          resources,
          likedResources,
          user: req.session.userId,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  });

  return router;
};
