const express = require("express");
const router = express.Router();

module.exports = () => {
  router.use("/", (req, res, next) => {
    // const whiteList = ['/', '/login', '/signup'];
    // if(req.session.userId || whiteList.includes(req.path)) {
    if (req.session.userId) {
      return next();
    }
    res.redirect("/");
  });

  return router;
};
