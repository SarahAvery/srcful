const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// THIS IS AN HTML REQUEST/RENDER
// ALL REQUESTS SHOULD BE MOCKED USING THIS STRUCTURE
module.exports = (db) => {
  router.get("/", (req, res) => {
    if (!req.session.userId) res.redirect("/");

    fetch(`${process.env.API_URL}/user`, {
      method: "GET",
      // We must forward the request headers to the api request to access session data
      ...(req.headers && { headers: req.headers }),
    })
      .then((data) => data.json())
      .then((json) => {
        console.log(json);
        if (!json) res.redirect("/");
        res.render("profile", { user: json });
      })
      .catch((err) => {
        console.log("Error Here:", err);
        res.redirect("/");
      });
  });

  return router;
};
