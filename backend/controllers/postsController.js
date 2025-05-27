import pool from "../db.js";

export const getPost = async (req, res) => {
  const postId = req.params.id;

  try {
    const result = await pool.query("SELECT * FROM post WHERE postid = $1", [
      postId,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(result.rows[0]);

  } catch (err) {
    console.error("Error fetching post:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM post ORDER BY timecreated DESC");
    res.json(result.rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const createPost = async (req, res) => {
  const userId = req.userId;
  const { descr, img } = req.body;
  const timecreated = new Date();

  try {
    const result = await pool.query(
      "INSERT INTO post (userid, descr, img, timecreated) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, descr, img, timecreated]
    );
    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error("Error creating post:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const updatePost = async (req, res) => {
  const userId = req.userId;
  const postId = req.params.id;
  const { descr, img } = req.body;

  try {
    const post = await pool.query("SELECT * FROM post WHERE postid = $1", [
      postId,
    ]);
    if (post.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.rows[0].userid !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const result = await pool.query(
      "UPDATE post SET descr = $1, img = $2 WHERE postid = $3 RETURNING *",
      [descr, img, postId]
    );
    res.json(result.rows[0]);

  } catch (err) {
    console.error("Error updating post:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const deletePost = async (req, res) => {
  const userId = req.userId;
  const postId = req.params.id;

  try {
    const post = await pool.query("SELECT * FROM post WHERE postid = $1", [
      postId,
    ]);
    if (post.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.rows[0].userid !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    await pool.query("DELETE FROM post WHERE postid = $1", [postId]);
    res.json({ message: "Post deleted" });

  } catch (err) {
    console.error("Error deleting post:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};