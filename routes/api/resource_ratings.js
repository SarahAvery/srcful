const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

module.exports = (db) => {
  
  router.post("/", (req, res) => {

    const rating = req.body.rating;
    const resourceId = req.body.resourceId;
    if (rating) {
      db.query(`INSERT INTO resource_ratings (rating, user_id, resource_id)
                VALUES ($1, $2, $3) ON CONFLICT (user_id, resource_id) DO UPDATE SET rating = $1;`, 
                [rating, req.session.userId, resourceId])
    }
              
  });
  
  return router;
  
};
