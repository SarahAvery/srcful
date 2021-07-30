const express = require("express");
const router = express.Router();

module.exports = (db, queryHelpers) => {
  router.get("/", (req, res) => {
    queryHelpers
      .getUserById(req.session.userId)
      .then((data) => {
        if (!data) res.redirect("/");
        res.render("profile", { user: data });
      })
      .catch((err) => {
        console.log("Error Here:", err);
        res.redirect("/");
      });
  });

  return router;
};
