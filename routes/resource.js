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
          res.render("resource", {
            resource: json[0],
            user: req.session.userId,
          });
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

  router.get("/:id/edit", (req, res) => {
    fetch(`${process.env.API_URL}/resources/all`, {
      method: "GET",
      ...(req.headers && {
        headers: req.headers,
      }),
    })
      .then((data) => data.json())
      .then((json) => {
        if (json.resources) {
          const currentResource = json.resources.filter((resource) => {
            return resource.resource_id === req.params.id;
          });
          res.render("resource/edit", {
            resource: currentResource[0],
            user: req.session.userId,
          });
        } else {
          res.redirect("/");
        }
      });
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
        res.redirect(`/resource/${req.params.id}`);
      })
      .catch((e) => {
        res.status(500);
        res.send(e.stack);
      });
  });

  router.get("/:id/delete", (req, res) => {
    // 403 forbidden if not resource creator
    // 404 not found if resource doesn't exist
    const queryString = `
      DELETE FROM resources
      WHERE id = ${req.params.id};
    `;
    db.query(queryString)
      .then(() => res.redirect("/resources"))
      .catch((e) => res.send(e.stack));
  });

  return router;
};
