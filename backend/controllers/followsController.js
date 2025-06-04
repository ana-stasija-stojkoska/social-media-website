import pool from "../db.js";

// Get All Following
export const getFollowing = async (req, res) => {
  const userId = req.params.userid;

  try {
    const result = await pool.query(
      "SELECT * FROM follows WHERE followeruserid = $1",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching following list:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Followers
export const getFollowers = async (req, res) => {
  const userId = req.params.userid;

  try {
    const result = await pool.query(
      "SELECT * FROM follows WHERE followeduserid = $1",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching followers list:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Follow
export const followUser = async (req, res) => {
  const followerId = req.userId;
  const { followeduserid } = req.body;

  if (followerId === followeduserid) {
    return res.status(400).json({ message: "You can't follow yourself" });
  }

  try {
    const exists = await pool.query(
      "SELECT * FROM follows WHERE followeruserid = $1 AND followeduserid = $2",
      [followerId, followeduserid]
    );

    if (exists.rows.length > 0) {
      return res.status(409).json({ message: "Already following this user" });
    }

    const result = await pool.query(
      "INSERT INTO follows (followeruserid, followeduserid) VALUES ($1, $2) RETURNING *",
      [followerId, followeduserid]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error following user:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Unfollow
export const unfollowUser = async (req, res) => {
  const followerId = req.userId;
  const followedId = req.params.followedid;

  try {
    const result = await pool.query(
      "DELETE FROM follows WHERE followeruserid = $1 AND followeduserid = $2 RETURNING *",
      [followerId, followedId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Follow relationship not found" });
    }

    res.json({ message: "Unfollowed successfully" });
  } catch (err) {
    console.error("Error unfollowing user:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};