const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

module.exports = (db) => {
  router.get("/new", (req, res) => {
    fetch(process.env.API_URL + "/categories", {
      ...(req.headers && { headers: req.headers }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        res.render("resource/new", {
          categories: data,
          user: req.session.userId,
        });
      })
      .catch((err) => {
        res.redirect("/");
      });
  });

  router.get("/:id", (req, res) => {
    fetch(process.env.API_URL + "/resource/" + req.params.id, {
      ...(req.headers && { headers: req.headers }),
    })
      .then((data) => data.json())
      .then((json) => {
        if (json) {
          console.log("INDEX", json);
          db.query(`SELECT creator_id FROM resources WHERE id = $1`, [req.params.id])
          .then((data) => {
            let creator = false;
            if (data.rows[0].creator_id == req.session.userId) {
              creator = true;
            }
            res.render("resource", { resource: json[0], user: req.session.userId, creator });
            console.log(resource);
          })
        } else {
          res.redirect("/");
        }
      });
  });

  // Create a resource
  router.post("/new", (req, res) => {
    const resource = req.body;
    if (!Array.isArray(resource.categories)) {
      resource.categories = [resource.categories];
    }
    //All fields mandatory

    let queryString = `
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
    ])
      .then((data) => {
        const newResource = data.rows[0];
        resource.categories.forEach((category) => {
          db.query(
            `
            INSERT INTO resource_categories(resource_id, category_id)
              SELECT $1, id FROM categories WHERE title = $2;
          `,
            [newResource.id, category]
          );
        });
      })
      .then(() => res.redirect("/resources"))
      .catch((e) => {
        res.status(500);
        res.send(e.stack);
      });
  });

  router.get("/edit", (req, res) => {
    // TODO: render edit page
  });

  return router;
};