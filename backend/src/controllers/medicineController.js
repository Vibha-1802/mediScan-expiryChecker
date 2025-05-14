import db from "../config/pgDB.js";

export const getAllMedicines = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM medicines");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching medicines:", err);
    res.status(500).json({ message: "Server error" });
  }
};
