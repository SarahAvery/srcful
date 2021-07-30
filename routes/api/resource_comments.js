const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

module.exports = (db) => {
  
  router.post("/", (req, res) => {

    const title = req.body.title;
    const comment = req.body.content;
    const userId = req.session.userId;
    const resId = req.body.resourceId;
    
    if (comment && userId) {
      db.query(`INSERT INTO resource_comments (title, content, user_id, resource_id)
                VALUES ($1, $2, $3, $4);`, 
                [title, comment, userId, resId])
      }
              
  });
  
  return router;
  
};
