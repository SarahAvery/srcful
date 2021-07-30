const express = require("express");
const router = express.Router();

module.exports = (db, queryHelpers) => {
  router.post("/", (req, res) => {
    const query = req.body.search.toLowerCase();
    let results = [];
    db.query(
      "SELECT * FROM resources WHERE LOWER(title) LIKE $1 OR LOWER(description) LIKE $1",
      [`%${query}%`]
    )
      .then((data) => {
        results = results.concat(data.rows);
        const queryString = `
      SELECT resources.* FROM resources,
      (SELECT resource_id FROM resource_categories,
          (SELECT categories.id FROM categories
          WHERE LOWER(title) LIKE $1) as t
          WHERE resource_categories.category_id = t.id
        ) as z
      WHERE resources.id = z.resource_id;
      `;
        db.query(queryString, [`%${query}%`]).then((data) => {
          results = results.concat(data.rows);

          queryHelpers.getAllResources().then((data) => {
            const combined = results.map((result) => {
              const match = data.find(
                (resource) => resource.resource_id === result.id
              );
              return { ...result, ...match };
            });
            console.log(combined);

            res.render("search", {
              user: req.session.userId,
              results: combined,
            });
          });
        });
      })
      .catch((e) => res.send(e.stack));
  });

  return router;
};
