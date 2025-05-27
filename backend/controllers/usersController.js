import pool from "../db.js";

export const getUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await pool.query('SELECT * FROM "user" WHERE userid = $1', [
      userId,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result.rows[0]);

  } catch (err) {
    console.error("Error fetching user:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "user"');
    res.json(result.rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const updateUser = async (req, res) => {
  const userId = req.userId;
  const { name, city, profilepicture } = req.body;

  try {
    const result = await pool.query(
      'UPDATE "user" SET name = $1, city = $2, profilepicture = $3 WHERE userid = $4 RETURNING *',
      [name, city, profilepicture, userId]
    );
    res.json(result.rows[0]);

  } catch (err) {
    console.error("Update user error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.userId;

  try {
    await pool.query('DELETE FROM "user" WHERE userid = $1', [userId]);
    res.json({ message: "User deleted successfully" });
    
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};