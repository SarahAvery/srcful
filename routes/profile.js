const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// THIS IS AN HTML REQUEST/RENDER
// ALL REQUESTS SHOULD BE MOCKED USING THIS STRUCTURE

module.exports = (db) => {
  router.get("/", (req, res) => {
    fetch(process.env.API_URL + "/users")
      .then((data) => data.json())
      .then((json) => {
        if (json.users) {
          const currentUser = json.users.filter((obj) => {
            return obj.id === req.session.userId;
          });
          db.query(`SELECT COUNT(*) FROM resource_likes WHERE user_id = $1`, [
            req.session.userId,
          ]).then((data) => {
            const userLikes = data.rows[0];
            db.query(`SELECT COUNT(*) FROM resources WHERE creator_id =$1`, [
              req.session.userId,
            ]).then((data) => {
              const createdResources = data.rows[0];
              const templateVars = {
                user: currentUser[0],
                userLikes: userLikes.count,
                createdResources: createdResources.count,
              };
              res.render("profile", templateVars);
            });
          });
        } else {
          res.redirect("/");
        }
      });
  });

  return router;
};
