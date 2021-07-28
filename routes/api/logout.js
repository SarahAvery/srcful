const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    // db.query(
    //   `
    //   INSERT INTO resource_likes(user_id, resource_id)
    //   VALUES(${req.session.userId}, ${req.params.id});
    // `
    // ).then((data) => {
    //   res.json({});
    // });
  });

  router.post("/remove", (req, res) => {
    // db.query(
    //   `
    //   DELETE FROM resource_likes
    //   WHERE user_id = ${req.session.userId} AND resource_id = ${req.params.id};
    // `
    // ).then((data) => {
    //   res.json({});
    // });
  });

  return router;
};
