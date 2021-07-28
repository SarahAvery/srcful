const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");


module.exports = (db) => {
  router.get("/", (req, res) => {
    fetch(process.env.API_URL + "/resources")
      .then((data) => data.json())
      .then((json) => {
        if (json.resources) {
          const currentResource = json.resources.filter((obj) => {
            return obj.resource_id === Number(req.baseUrl.slice(10));
          });
          if (currentResource[0].title) {
            db.query(`SELECT *, username FROM resource_comments JOIN users ON user_id = users.id WHERE resource_id = $1 LIMIT 3;`, 
            [currentResource[0].resource_id])
            .then((data) => {
              const firstThreeComments = data.rows;
              db.query(`SELECT *, username FROM resource_comments JOIN users ON user_id = users.id WHERE resource_id = $1 ORDER BY resource_comments.updated_at ASC;`, 
              [currentResource[0].resource_id])
              .then((data) => {
                const allComments = data.rows;
                const templateVars = { 
                  resource: currentResource[0],
                  firstThreeComments: firstThreeComments,
                  allComments: allComments,
                  loggedInUser: req.session.userId
                };
                res.render("resource", templateVars);
              });
            });
            
          } else {
          // error: no resource with id
            res.redirect("/");
            return;
          }
        } else {
          // error: could not grab json
          res.redirect("/");
        }
      });
  });

  return router;
};
