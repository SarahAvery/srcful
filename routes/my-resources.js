const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("my-resources");
  });

  router.get("/new", (req, res) => {
    fetch(process.env.API_URL + "/categories")
      .then((data) => data.json())
      .then((json) => {
        if (json.categories) {
          const templateVars = { categories: json.categories };
          res.render("resources_new", templateVars);
        } else {
          res.redirect("/");
        }
      });
  });

  router.post("/new", (req, res) => {
    const resource = req.body;
    console.log(resource);
    //All fields mandatory

    // Get the category id
    let queryString = `
      SELECT id FROM categories
      WHERE title = $1;
    `;
    let categoryId;
    db.query(queryString, [resource.category])
      .then((data) => {
        categoryId = data.rows[0].id;

        //If user logged in, store new resource in db
        queryString = `
        INSERT INTO resources (title, description, url, image_url, creator_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
        db.query(queryString, [
          resource.title,
          resource.description,
          resource.url,
          resource.imageURL,
          req.session.userId,
        ]).then((data) => {
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
            db.query(queryString, [categoryId, newResource.id]).then((data) => {
              const newResourceCategory = data.rows[0];
              if (!newResourceCategory) {
                res.send({ error: "error" });
              } else {
                res.redirect("/my-resources");
              }
            });
          }
        });
      })
      .catch((e) => {
        res.status(500);
        res.send(e.stack);
      });
  });

  router.delete("/:id", (req, res) => {
    // 403 forbidden if not resource creator
    // 404 not found if resource doesn't exist
    const queryString = `
      DELETE FROM resources
      WHERE id = ${req.params.id};
    `;
    db.query(queryString)
      .then(() => res.redirect("/my-resources"))
      .catch((e) => res.send(e.stack));
  });

  router.post("/:id/edit", (req, res) => {
    const update = req.body;

    // Update resource in database
    db.query(
      `
      UPDATE resources
      SET description = $1,
          image_url = $2
      WHERE id = $3;
      `,
      [update.description, update.image_url, req.params.id]
    )
    .then(() => {
      res.redirect("/resource");
    })
    .catch((e) => {
      res.status(500);
      res.send(e.stack);
    });
  });

  router.get("/:id/edit", (req, res) => {
    fetch(process.env.API_URL + "/resources")
      .then((data) => data.json())
      .then((json) => {
        if (json.resources) {
          const currentResource = (json.resources).filter(resource => {
            // return resource.id === req.params.id;
            return resource.resource_id === 1;
          });
          res.render("edit-resource", { resource: currentResource[0] });
        } else {
          res.redirect("/");
        }
    });
  });

  return router;
};
