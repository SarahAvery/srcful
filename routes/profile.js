const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const bcrypt = require("bcrypt");

// THIS IS AN HTML REQUEST/RENDER
// ALL REQUESTS SHOULD BE MOCKED USING THIS STRUCTURE
module.exports = (db) => {
  router.get("/", (req, res) => {
    fetch(process.env.API_URL + "/users")
      .then((data) => data.json())
      .then((json) => {
        if (json.users) {
          const currentUser = (json.users).filter(obj => {
            return obj.id === req.session.userId;
          });
          db.query(`SELECT COUNT(*) FROM resource_likes WHERE user_id = $1`, [req.session.userId])
            .then ((data) => {
              const user_likes = data.rows[0];
              db.query(`SELECT COUNT(*) FROM resources WHERE creator_id =$1`, [req.session.userId])
                .then ((data) => {
                  const created_resources = data.rows[0];
                  const templateVars = { user: currentUser[0], user_likes: user_likes.count, created_resources: created_resources.count };
                  res.render("profile", templateVars);
                });
            });
        } else {
          res.redirect("/");
        }
    });
  });

  router.post("/", (req, res) => {
    const update = req.body;
    const templateVars = {};

    //If inputs blank?
    // Hash password
    update.password = bcrypt.hashSync(update.password, 12);

    //If username taken, error
    // Else update user in database
    db.query(
      `
      UPDATE users
      SET username = $1,
          password = $2
      WHERE id = $3;
      `,
      [update.username, update.password, req.session.userId]
    )
    .then(() => {
      res.redirect("/profile");
    })
    .catch((e) => {
      res.status(500);
      if (e.constraint === 'users_username_key') {
        fetch(process.env.API_URL + "/users")
        .then((data) => data.json())
        .then((json) => {
          if (json.users) {
            const templateVars = { users: json.users, error: "Username already taken" };
            res.render("profile", templateVars);
          } else {
            res.redirect("/");
          }
        });
      } else {
        res.send(e.stack);
      }
    });
  });

  return router;
};
