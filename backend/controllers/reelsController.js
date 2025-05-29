import pool from "../db.js";

export const getReel = async (req, res) => {
  const reelId = req.params.id;

  try {
    const result = await pool.query("SELECT * FROM reel WHERE reelid = $1", [reelId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Reel not found" });
    }
    res.json(result.rows[0]);

  } catch (err) {
    console.error("Error fetching reel:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getReels = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM reel ORDER BY reelid DESC");
    res.json(result.rows);

  } catch (err) {
    console.error("Error fetching reels:", err.message);
    res.status(500).send("Server error");
  }
};

export const getReelsByUser = async (req, res) => {
  const { userid } = req.params;

  try {
    const result = await pool.query("SELECT * FROM reel WHERE userid = $1 ORDER BY reelid DESC", [userid]);
    res.json(result.rows);

  } catch (err) {
    console.error("Error fetching user's reels:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const createReel = async (req, res) => {
  const userId = req.userId;
  const { image } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO reel (image, userid) VALUES ($1, $2) RETURNING *",
      [image, userId]
    );
    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error("Error creating reel:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteReel = async (req, res) => {
  const userId = req.userId;
  const reelId = req.params.id;

  try {
    const reel = await pool.query("SELECT * FROM reel WHERE reelid = $1", [reelId]);

    if (reel.rows.length === 0) {
      return res.status(404).json({ message: "Reel not found" });
    }

    if (reel.rows[0].userid !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await pool.query("DELETE FROM reel WHERE reelid = $1", [reelId]);
    res.json({ message: "Reel deleted" });

  } catch (err) {
    console.error("Error deleting reel:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};