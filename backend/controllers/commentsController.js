import pool from "../db.js";

export const getComment = async (req, res) => {
  const commentId = req.params.id;

  try {
    const result = await pool.query(
      "SELECT * FROM comment WHERE commentid = $1",
      [commentId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json(result.rows[0]);

  } catch (err) {
    console.error("Error fetching comment:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getComments = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM comment ORDER BY timecreated DESC"
    );
    res.json(result.rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getCommentsByPost = async (req, res) => {
  const { postid } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM comment WHERE postid = $1 ORDER BY timecreated DESC",
      [postid]
    );
    res.json(result.rows);

  } catch (err) {
    console.error("Error getting comments by post:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const createComment = async (req, res) => {
  const userId = req.userId;
  const { postid, descr } = req.body;
  const timecreated = new Date();

  try {
    const result = await pool.query(
      "INSERT INTO comment (userid, postid, descr, timecreated) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, postid, descr, timecreated]
    );
    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error("Create comment error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateComment = async (req, res) => {
  const userId = req.userId;
  const commentId = req.params.id;
  const { descr } = req.body;

  try {
    const comment = await pool.query(
      "SELECT * FROM comment WHERE commentid = $1",
      [commentId]
    );
    if (comment.rows.length === 0)
      return res.status(404).json({ message: "Comment not found" });
    if (comment.rows[0].userid !== userId)
      return res.status(403).json({ message: "Forbidden" });
    const result = await pool.query(
      "UPDATE comment SET descr = $1 WHERE commentid = $2 RETURNING *",
      [descr, commentId]
    );
    res.json(result.rows[0]);

  } catch (err) {
    console.error("Update comment error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteComment = async (req, res) => {
  const userId = req.userId;
  const commentId = req.params.id;

  try {
    const comment = await pool.query(
      "SELECT * FROM comment WHERE commentid = $1",
      [commentId]
    );
    if (comment.rows.length === 0)
      return res.status(404).json({ message: "Comment not found" });
    if (comment.rows[0].userid !== userId)
      return res.status(403).json({ message: "Forbidden" });

    await pool.query("DELETE FROM comment WHERE commentid = $1", [commentId]);
    res.json({ message: "Comment deleted" });

  } catch (err) {
    console.error("Delete comment error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};