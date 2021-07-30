const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const getResourceComments = (id, userId = null) => {
    return new Promise((resolve, reject) => {
      
      const resourceQuery = `
      SELECT id, title, url
      FROM resources
      WHERE resources.id = $1;`;
      
      const firstThreeCommentsQuery = `
      SELECT resource_comments.id, resource_comments.title, resource_comments.resource_id, resource_comments.user_id, resource_comments.content, to_char(resource_comments.updated_at, 'MON-DD-YYYY HH12:MIPM') AS post_time, users.username AS username
      FROM resource_comments
      JOIN users ON resource_comments.user_id = users.id
      WHERE resource_id = $1 
      ORDER BY resource_comments.updated_at DESC
      LIMIT 3;`

      const moreCommentsQuery = `
      SELECT resource_comments.id, resource_comments.title, resource_comments.resource_id, resource_comments.user_id, resource_comments.content, to_char(resource_comments.updated_at, 'MON-DD-YYYY HH12:MIPM') AS post_time, users.username AS username
      FROM resource_comments
      JOIN users ON resource_comments.user_id = users.id
      WHERE resource_id = $1 
      ORDER BY resource_comments.id DESC
      OFFSET 3;`
      
      const firstThreeCommentsQueryFunc = (prevResources) => {
        return new Promise((resolve) => {
          db.query(firstThreeCommentsQuery, [id]).then((data) => {
            const firstThree = data.rows;
            const combined = prevResources.map((comments) => {
              comments.firstThreeComments = firstThree;
              return comments;
            });

            resolve(combined);
          });
        });
      };
      
      const moreCommentsQueryFunc = (prevResources) => {
        // get comment info for comments 4 and on
        return new Promise((resolve) => {
          db.query(moreCommentsQuery, [id]).then((data) => {
            const moreComments = data.rows;
            const combined = prevResources.map((comments) => {
              comments.moreComments = moreComments;
              return comments;
            });

            resolve(combined);
          });
        });
      };
      
      db.query(resourceQuery, [id])
        .then((data) => {
          const comments = data.rows;
          return comments;
        })
        .then(firstThreeCommentsQueryFunc)
        .then(moreCommentsQueryFunc)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
      
      
    });
  }

  
  router.get("/:id", (req, res) => {
    // TODO: Add authorization to permit users of the required scope to access user data
    const { id } = req.params;
    const userId = req.session.userId;
    getResourceComments(id, userId)
      .then((data) => res.json(data))
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  
  router.post("/:id", (req, res) => {

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
