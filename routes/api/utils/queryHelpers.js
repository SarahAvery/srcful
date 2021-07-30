const commentQuery = `
    SELECT resources.id, count(resource_comments.title) AS num_of_comments
    FROM resource_comments
    JOIN resources ON resource_id = resources.id
    GROUP BY resources.id;`;

const likesQuery = `
    SELECT resources.id, count(resource_likes) AS num_of_likes
    FROM resource_likes
    JOIN resources ON resource_id = resources.id
    GROUP BY resources.id;`;

const categoryQuery = `
    SELECT resources.id AS resource_id, array_agg(categories.title) AS categories
    FROM resource_categories
    JOIN resources ON resource_id = resources.id
    JOIN categories ON category_id = categories.id
    WHERE resource_categories.resource_id = resources.id
    GROUP BY resources.id;`;

const ratingQuery = `
    SELECT resources.id AS resource_id, round(avg(resource_ratings.rating),1) AS avg_rating
    FROM resource_ratings
    JOIN resources ON resource_id = resources.id
    GROUP BY resources.id;`;

const isLikedQuery = `
    SELECT  users.id AS user_id, array_agg(resources.id) AS resources_liked_arr
    FROM resource_likes
    JOIN resources ON resource_id = resources.id
    JOIN users ON user_id = users.id
    WHERE users.id = $1
    GROUP BY users.id;`;

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
  getResourcesByPageOffset: (offset, userId) => {
    const limit = 11;

    const resourceQuery = `SELECT users.username AS username, resources.title, resources.image_url, resources.id AS resource_id, resources.url, resources.description, substring(resources.description,1,140) AS substring,
    resources.created_at::date AS date, resources.created_at::time
    AS time
    FROM resources
    JOIN users ON creator_id = users.id OFFSET $1 LIMIT ${limit};`;

    const commentsQueryFunc = (prevResources) => {
      // commentsCount
      return new Promise((resolve) => {
        db.query(commentQuery).then((data) => {
          const commentData = data.rows;
          const combined = prevResources.map((resource) => {
            const match = commentData.find(
              (commentRes) => commentRes.id === resource.resource_id
            );
            resource.commentCount = (match && match.num_of_comments) || 0;
            return resource;
          });

          resolve(combined);
        });
      });
    };

    const likesQueryFunc = (prevResources) => {
      // likesCount
      return new Promise((resolve) => {
        db.query(likesQuery).then((data) => {
          const ratingData = data.rows;
          const combined = prevResources.map((resource) => {
            const match = ratingData.find(
              (likesRes) => likesRes.id === resource.resource_id
            );
            resource.likeCount = (match && match.num_of_likes) || 0;
            return resource;
          });

          resolve(combined);
        });
      });
    };

    const ratingQueryFunc = (prevResources) => {
      // avgRating
      return new Promise((resolve) => {
        db.query(ratingQuery).then((data) => {
          const ratingData = data.rows;
          const combined = prevResources.map((resource) => {
            const match = ratingData.find(
              (rating) => rating.resource_id === resource.resource_id
            );
            resource.avgRating = (match && match.avg_rating) || 0;
            return resource;
          });

          resolve(combined);
        });
      });
    };

    const categoryQueryFunc = (data) => {
      // categories
      return new Promise((resolve) => {
        db.query(categoryQuery).then((catData) => {
          const categoryData = catData.rows;

          const newResources = data.map((resource) => ({
            ...resource,
            ...(categoryData.find(
              (category) => category.resource_id === resource.resource_id
            ) || { categories: [] }),
          }));

          resolve(newResources);
        });
      });
    };

    const isLikedQueryFunc = (data, userId) => {
      // isLiked
      return new Promise((resolve) => {
        db.query(isLikedQuery, [userId]).then((isLikedData) => {
          const newResources = data.map((resource) => ({
            ...resource,
            isLiked:
              (!!isLikedData.rows.length &&
                isLikedData.rows[0].resources_liked_arr.includes(
                  resource.resource_id
                )) ||
              false,
          }));

          resolve(newResources);
        });
      });
    };

    return db
      .query(resourceQuery, [offset * limit || 0])
      .then((data) => {
        const resources = data.rows;
        return resources;
      })
      .then(commentsQueryFunc)
      .then(likesQueryFunc)
      .then(ratingQueryFunc)
      .then(categoryQueryFunc)
      .then((data) => isLikedQueryFunc(data, userId))
      .then((data) => data)
      .catch((err) => err);
  },
  getAllResources: (userId) => {
    const resourceQuery = `SELECT users.username AS username, resources.title, resources.image_url, resources.id AS resource_id, resources.url, resources.description, substring(resources.description,1,140) AS substring,
    resources.created_at::date AS date, resources.created_at::time
    AS time
    FROM resources
    JOIN users ON creator_id = users.id;`;

    const commentsQueryFunc = (prevResources) => {
      // commentsCount
      return new Promise((resolve) => {
        db.query(commentQuery).then((data) => {
          const commentData = data.rows;
          const combined = prevResources.map((resource) => {
            const match = commentData.find(
              (commentRes) => commentRes.id === resource.resource_id
            );
            resource.commentCount = (match && match.num_of_comments) || 0;
            return resource;
          });

          resolve(combined);
        });
      });
    };

    const likesQueryFunc = (prevResources) => {
      // likesCount
      return new Promise((resolve) => {
        db.query(likesQuery).then((data) => {
          const ratingData = data.rows;
          const combined = prevResources.map((resource) => {
            const match = ratingData.find(
              (likesRes) => likesRes.id === resource.resource_id
            );
            resource.likeCount = (match && match.num_of_likes) || 0;
            return resource;
          });

          resolve(combined);
        });
      });
    };

    const ratingQueryFunc = (prevResources) => {
      // avgRating
      return new Promise((resolve) => {
        db.query(ratingQuery).then((data) => {
          const ratingData = data.rows;
          const combined = prevResources.map((resource) => {
            const match = ratingData.find(
              (rating) => rating.resource_id === resource.resource_id
            );
            resource.avgRating = (match && match.avg_rating) || 0;
            return resource;
          });

          resolve(combined);
        });
      });
    };

    const categoryQueryFunc = (data) => {
      // categories
      return new Promise((resolve) => {
        db.query(categoryQuery).then((catData) => {
          const categoryData = catData.rows;

          const newResources = data.map((resource) => ({
            ...resource,
            ...(categoryData.find(
              (category) => category.resource_id === resource.resource_id
            ) || { categories: [] }),
          }));

          resolve(newResources);
        });
      });
    };

    const isLikedQueryFunc = (data, userId) => {
      // isLiked
      return new Promise((resolve) => {
        db.query(isLikedQuery, [userId]).then((isLikedData) => {
          const newResources = data.map((resource) => ({
            ...resource,
            isLiked:
              (!!isLikedData.rows.length &&
                isLikedData.rows[0].resources_liked_arr.includes(
                  resource.resource_id
                )) ||
              false,
          }));

          resolve(newResources);
        });
      });
    };

    return db
      .query(resourceQuery)
      .then((data) => data.rows)
      .then(commentsQueryFunc)
      .then(likesQueryFunc)
      .then(ratingQueryFunc)
      .then(categoryQueryFunc)
      .then((data) => isLikedQueryFunc(data, userId))
      .then((data) => data)
      .catch((err) => err);
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

      const likedResourcesCreatorsQuery = `
        SELECT users.username FROM users,
        (SELECT  users.id AS user_id, resources.title, resources.image_url, resources.id AS resource_id, resources.url, resources.creator_id
        FROM resource_likes
        JOIN users ON user_id = users.id
        JOIN resources ON resource_id = resources.id
        WHERE users.id = $1) as t
        WHERE users.id = t.creator_id;`;

      Promise.all([
        db.query(resourceQuery, [userId]),
        db.query(likedResourceQuery, [userId]),
        db.query(likedResourcesCreatorsQuery, [userId]),
      ])
        .then(([resources, likedResources, likedResourcesCreators]) => {
          const data = {
            resources: resources.rows || [],
            likedResources: likedResources.rows || [],
            likedResourcesCreators: likedResourcesCreators.rows || [],
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
