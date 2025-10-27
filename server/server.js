import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// テスト用ルート
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.send(`✅ Server is running! Database time: ${result.rows[0].now}`);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
