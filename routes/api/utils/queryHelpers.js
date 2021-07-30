/**
 * Returns a set of helper functions with the db dependency injected
 * @param {Pool} db
 */
const generateHelpers = (db) => ({
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT users.id, users.username, users.email, users.created_at FROM users WHERE users.id = $1`;
      const likesQuery = `SELECT COUNT(*) FROM resource_likes WHERE user_id = $1`;
      const resourcesCountQuery = `SELECT COUNT(*) FROM resources WHERE creator_id = $1`;

      Promise.all([
        db.query(query, [id]),
        db.query(likesQuery, [id]),
        db.query(resourcesCountQuery, [id]),
      ]).then(([user, likes, resouces]) => {
        const userData = {
          ...user.rows[0],
          userLikesCount: likes.rows[0].count || 0,
          resourcesCount: resouces.rows[0].count || 0,
        };

        resolve(userData);
      });
    });
  },
  getResourcesByUserId: (userId) => {
    return new Promise((resolve, reject) => {
      const resourceQuery = `
        SELECT users.username AS username, users.id, resources.title, resources.image_url, resources.id AS resource_id, resources.url
        FROM resources
        JOIN users ON creator_id = users.id
        WHERE users.id = $1;`;

      const likedResourceQuery = `
      SELECT  users.id AS user_id, resources.title, resources.image_url, resources.id AS resource_id, resources.url
        FROM resource_likes
        JOIN users ON user_id = users.id
        JOIN resources ON resource_id = resources.id
        WHERE users.id = $1;`;

      Promise.all([
        db.query(resourceQuery, [userId]),
        db.query(likedResourceQuery, [userId]),
      ])
        .then(([resources, likedResources]) => {
          const data = {
            resources: resources.rows || [],
            likedResources: likedResources.rows || [],
          };

          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getResourceCommentsById: (id, limitNum = null) => {
    return new Promise((resolve, reject) => {
      const commentsQuery = `
      SELECT resource_comments.id, resource_comments.title, resource_comments.resource_id, resource_comments.user_id, resource_comments.content, to_char(resource_comments.updated_at, 'mon dd, YYYY, HH12:MIPM') AS post_time, users.username AS username
      FROM resource_comments
      JOIN users ON resource_comments.user_id = users.id
      WHERE resource_id = $1 
      ORDER BY resource_comments.updated_at DESC
      ${limitNum ? `LIMIT $2` : ""};`;

      const commentsQueryFunc = () =>
        db
          .query(commentsQuery, [id, limitNum].filter(Boolean))
          .then((data) => data.rows);

      commentsQueryFunc()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
});

module.exports = {
  generateHelpers,
};
