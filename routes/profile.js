const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// THIS IS AN HTML REQUEST/RENDER
// ALL REQUESTS SHOULD BE MOCKED USING THIS STRUCTURE

module.exports = () => {
  router.get("/", (req, res) => {
    fetch(process.env.API_URL + "/users")
      .then((data) => data.json())
      .then((json) => {
        if (json.users) {
          res.render("profile", { users: json.users });
        } else {
          res.redirect("/");
        }
      });
  });
  // router.get('/:id', (req, res) => {
  //   fetch(process.env.API_URL + '/users/' + req.params.id)
  //     .then(data => data.json())
  //     .then(json => {
  //       if (json.users) {
  //         res.render("profile", { users: json.users });
  //       }
  //       res.redirect('/');
  //     });
  // });

  return router;
};
