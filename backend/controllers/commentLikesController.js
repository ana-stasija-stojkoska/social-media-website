import pool from "../db.js";

export const getCommentLike = async (req, res) => {
  const commentLikeId = req.params.id;

  try {
    const result = await pool.query(
      "SELECT * FROM commentlikes WHERE commentlikeid = $1",
      [commentLikeId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Like not found" });
    }
    res.json(result.rows[0]);

  } catch (err) {
    console.error("Error fetching comment like:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCommentLikes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM commentlikes");
    res.json(result.rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getCommentLikesByComment = async (req, res) => {
  const { commentid } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM commentlikes WHERE commentid = $1",
      [commentid]
    );
    res.json(result.rows);

  } catch (err) {
    console.error("Error fetching likes by comment:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const createCommentLike = async (req, res) => {
  const userId = req.userId;
  const { commentid } = req.body;

  try {
    const existing = await pool.query(
      "SELECT * FROM commentlikes WHERE userid = $1 AND commentid = $2",
      [userId, commentid]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Comment already liked" });
    }

    const result = await pool.query(
      "INSERT INTO commentlikes (userid, commentid) VALUES ($1, $2) RETURNING *",
      [userId, commentid]
    );
    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error("Create comment like error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteCommentLike = async (req, res) => {
  const userId = req.userId;
  const { commentid } = req.params;

  try {
    const like = await pool.query(
      "SELECT * FROM commentlikes WHERE userid = $1 AND commentid = $2",
      [userId, commentid]
    );
    if (like.rows.length === 0) {
      return res.status(404).json({ message: "Like not found" });
    }

    await pool.query(
      "DELETE FROM commentlikes WHERE userid = $1 AND commentid = $2",
      [userId, commentid]
    );
    res.json({ message: "Like removed" });

  } catch (err) {
    console.error("Delete comment like error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};