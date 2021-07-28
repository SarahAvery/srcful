const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    const id = req.params.id

    db.query(`SELECT *, username FROM resource_comments JOIN users ON user_id = users.id WHERE resource_id = $1 ORDER BY resource_comments.updated_at ASC;`
      , [id])

      .then((data) => {
        const comments = data.rows;
        res.json(comments);
        }) 
 
      .catch((err) => {
        console.log(err);
        res.json({ error: "An unknown error occurred." });
      });
  });

  return router;
};
