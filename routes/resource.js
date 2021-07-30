const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

module.exports = (db, queryHelpers) => {
  router.get("/new", (req, res) => {
    fetch(process.env.API_URL + "/categories", {
      ...(req.headers && { headers: req.headers }),
    })
      .then((data) => data.json())
      .then((data) => {
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
          let resource = json[0];

          queryHelpers.getUserById(req.session.userId).then((userData) => {
            db.query(`SELECT creator_id FROM resources WHERE id = $1`, [
              req.params.id,
            ]).then((data) => {
              let creator = false;
              if (data.rows.length === 0) {
                res.redirect("/");
              }
              if (data.rows[0].creator_id == req.session.userId) {
                creator = true;
              }

              fetch(
                process.env.API_URL + "/resource_comments/" + req.params.id,
                {
                  ...(req.headers && { headers: req.headers }),
                }
              )
                .then((data) => data.json())
                .then((json) => {
                  if (json) {
                    const comments = json;
                    res.render("resource", {
                      resource,
                      comments,
                      user: {
                        id: req.session.userId,
                        username: userData.username,
                      },
                      creator,
                    });
                  }
                });
            });
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
    db.query(`SELECT creator_id FROM resources WHERE id = $1`, [req.params.id])
      .then((data) => {
        if (data.rows.length === 0 || data.rows[0].creator_id != req.session.userId) {
          res.redirect(`/resource/${req.params.id}`);
        } else {
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
                  return resource.resource_id == req.params.id;
                });
                res.render("resource/edit", {
                  resource: currentResource[0],
                  user: req.session.userId,
                });
              } else {
                res.redirect("/");
              }
            });
        }
      })
      .catch((e) => res.send(e.stack));
  });

  router.post("/:id/edit", (req, res) => {
    const update = req.body;
    //Check if inputs blank
    if (!update.description && !update.image_url) {
      return res.redirect(`/resource/${req.params.id}/edit`);
    }

    db.query(`SELECT creator_id FROM resources WHERE id = $1`, [req.params.id])
      .then((data) => {
        if (data.rows.length !== 0 && data.rows[0].creator_id == req.session.userId) {
          let queryString = "UPDATE resources SET ";
          const values = [];
          const queryBuilder = [];

          if (update.description) {
            values.push(update.description);
            queryBuilder.push(`description = $${values.length} `);
          }
          if (update.image_url) {
            values.push(update.image_url);
            queryBuilder.push(`image_url = $${values.length} `);
          }

          queryString += queryBuilder.join(", ");
          values.push(req.params.id);
          queryString += `WHERE id = $${values.length};`;

          // Update resource in database
          db.query(queryString, values).then(() => {
            res.redirect(`/resource/${req.params.id}`);
          });
        } else {
          res.redirect(`/resource/${req.params.id}`);
        }
      })
      .catch((e) => res.send(e.stack));
  });

  router.get("/:id/delete", (req, res) => {
    // 403 forbidden if not resource creator
    db.query(`SELECT creator_id FROM resources WHERE id = $1`, [req.params.id])
      .then((data) => {
        if (data.rows.length !== 0 && data.rows[0].creator_id == req.session.userId) {
        const queryString = `
        DELETE FROM resources
        WHERE id = ${req.params.id};
        `;
          db.query(queryString).then(() => res.redirect("/resources"));
        } else {
          res.redirect(`/resource/${req.params.id}`);
        }
      })
      .catch((e) => res.send(e.stack));
    // 404 not found if resource doesn't exist
  });

  return router;
};
