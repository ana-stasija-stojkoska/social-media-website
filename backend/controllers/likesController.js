import pool from "../db.js";

export const getLike = async (req, res) => {
  const likeId = req.params.id;

  try {
    const result = await pool.query("SELECT * FROM likes WHERE likesid = $1", [
      likeId,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Like not found" });
    }
    res.json(result.rows[0]);

  } catch (err) {
    console.error("Error fetching like:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getLikes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM likes");
    res.json(result.rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getLikesByPost = async (req, res) => {
  const { postid } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM likes WHERE postid = $1 ORDER BY timecreated DESC",
      [postid]
    );
    res.json(result.rows);

  } catch (err) {
    console.error("Error fetching likes by post:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const createLike = async (req, res) => {
  const userId = req.userId;
  const { postid } = req.body;
  const timecreated = new Date();

  try {
    const existing = await pool.query(
      "SELECT * FROM likes WHERE userid = $1 AND postid = $2",
      [userId, postid]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Post already liked" });
    }
    const result = await pool.query(
      "INSERT INTO likes (userid, postid, timecreated) VALUES ($1, $2, $3) RETURNING *",
      [userId, postid, timecreated]
    );
    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error("Create like error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteLike = async (req, res) => {
  const userId = req.userId;
  const { postid } = req.params;

  try {
    const like = await pool.query(
      "SELECT * FROM likes WHERE userid = $1 AND postid = $2",
      [userId, postid]
    );
    if (like.rows.length === 0) {
      return res.status(404).json({ message: "Like not found" });
    }
    await pool.query("DELETE FROM likes WHERE userid = $1 AND postid = $2", [
      userId,
      postid,
    ]);
    res.json({ message: "Like removed" });

  } catch (err) {
    console.error("Delete like error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};