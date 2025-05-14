import db from "../config/pgDB.js";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import fs from "fs";
import path from "path";

export const createTabletWithQR = async (req, res) => {
  const { mid, expiry_date } = req.body;
  const qrUUID = uuidv4();

  try {
    const insertQuery = `
      INSERT INTO tablets (mid, expiry_date, qrUUID)
      VALUES ($1, $2, $3)
      RETURNING tid
    `;
    const result = await db.query(insertQuery, [mid, expiry_date, qrUUID]);
    const tid = result.rows[0].tid;

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${qrUUID}&size=45x45`;
const assetsDir = path.resolve('assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir);
}
const qrImagePath = path.join(assetsDir, `${qrUUID}.png`);

const response = await axios.get(qrUrl, { responseType: "stream" });
const writer = fs.createWriteStream(qrImagePath);

response.data.pipe(writer);

writer.on("finish", () => {
  res.json({ tid, qrUUID, message: "Tablet registered successfully." });
});

writer.on("error", (err) => {
  console.error("Error saving QR image:", err);
  res.status(500).json({ message: "Failed to save QR image" });
});
  } catch (err) {
    console.error("Error inserting tablet:", err);
    res.status(500).json({ message: "Server error" });
  }
};