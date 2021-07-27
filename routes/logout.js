const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    req.session.userId = null;
    res.redirect("/");
  });

  return router;
};
