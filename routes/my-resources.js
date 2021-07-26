const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("my-resources");
  });

  router.get("/new", (req, res) => {
    res.render("resources_new");
  });

  router.post("/new", (req, res) => {
    const resource = req.body;
    //All fields mandatory
    //If user logged in, store new resource in db, store cateogry in resource_categories
    const queryString = `
      INSERT INTO resources (title, description, url, image_url, creator_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    db.query(queryString, [resource.title, resource.description, resource.url, resource.imageURL, req.session.userId]
    )
      .then((data) => {
        const newResource = data.rows[0];
        if (!newResource) {
          res.send({ error: "error" });
        } else {
          res.redirect("/my-resources");
        }
      })
      .catch((e) => {
        res.status(500);
        res.send(e.stack);
      });

  });

  return router;
};
