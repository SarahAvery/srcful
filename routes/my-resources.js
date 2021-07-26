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

    // Get the category id
    let queryString = `
      SELECT id FROM categories
      WHERE title = $1;
    `;
    let categoryId;
    db.query(queryString, [resource.category])
    .then(data => {
      categoryId = data.rows[0].id;

      //If user logged in, store new resource in db
      queryString = `
        INSERT INTO resources (title, description, url, image_url, creator_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
      db.query(queryString, [resource.title, resource.description, resource.url, resource.imageURL, req.session.userId])
        .then((data) => {
          const newResource = data.rows[0];
          if (!newResource) {
            res.send({ error: "error" });
          } else {

            // If resource stored, store its category in resource_categories
            queryString = `
              INSERT into resource_categories(category_id, resource_id)
              VALUES ($1, $2)
              RETURNING *;
            `;
            db.query(queryString, [categoryId, newResource.id])
            .then(data => {
              const newResourceCategory = data.rows[0];
              if (!newResourceCategory) {
                res.send({ error: "error" });
              } else {
                res.redirect("/my-resources");
              }
            })
          }
        })
    })
    .catch((e) => {
      res.status(500);
      res.send(e.stack);
    });

  });

  return router;
};
