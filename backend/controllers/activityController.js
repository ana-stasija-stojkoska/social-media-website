import pool from "../db.js";

export const getFollowingActivities = async (req, res) => {
  const userId = req.userId;

  const query = `
    SELECT u.userid, u.name, u.profilepicture, 'created a post' AS action, p.timecreated
    FROM post p
    JOIN "user" u ON u.userid = p.userid
    WHERE p.userid IN (
      SELECT followeduserid FROM follows WHERE followeruserid = $1
    )

    UNION ALL

    SELECT u.userid, u.name, u.profilepicture, 'liked a post' AS action, pl.timecreated
    FROM postlikes pl
    JOIN "user" u ON u.userid = pl.userid
    WHERE pl.userid IN (
      SELECT followeduserid FROM follows WHERE followeruserid = $1
    )

    UNION ALL

    SELECT u.userid, u.name, u.profilepicture, 'commented on a post' AS action, c.timecreated
    FROM comment c
    JOIN "user" u ON u.userid = c.userid
    WHERE c.userid IN (
      SELECT followeduserid FROM follows WHERE followeruserid = $1
    )

    UNION ALL

    SELECT u.userid, u.name, u.profilepicture, 'liked a comment' AS action, cl.timecreated
    FROM commentlikes cl
    JOIN "user" u ON u.userid = cl.userid
    WHERE cl.userid IN (
      SELECT followeduserid FROM follows WHERE followeruserid = $1
    )

    ORDER BY timecreated DESC
    LIMIT 6;
  `;

  try {
    const { rows } = await pool.query(query, [userId]);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching activities:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};