const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("edit_profile");
  });

  router.post("/", (req, res) => {
    const user = req.body.username;
    const pass = req.body.password;
    db.query(
      `SELECT COUNT(*) as occurences FROM users
              WHERE users.username = $1`,
      [user]
    ).then((data) => {
      if (Number(data.rows[0].occurences) > 0) {
        // $('#errorMessage').html('💥 Username already taken, please try again! 💥');
        // $('#errorMessage').slideDown();
      } else if (user === "") {
        // $('#errorMessage').html('💥 Username cannot be blank, please try again! 💥');
        // $('#errorMessage').slideDown();
      } else if (pass === "") {
        // $('#errorMessage').html('💥 Password cannot be blank, please try again! 💥');
        // $('#errorMessage').slideDown();
      } else {
        // $('#errorMessage').slideUp();
        const newUserName = user;
        const newPassword = pass;

        db.query(
          `UPDATE users
                  SET username = $2, password = $3
                  WHERE users.id = $1`,
          [req.session.userId, newUserName, newPassword]
        ).then(res.redirect("profile"));
      }
    });
  });

  return router;
};
