// server/routes/auth.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// 新規登録
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 既に登録済みか確認
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "このメールはすでに登録されています" });
    }

    // パスワードをハッシュ化
    const hashed = await bcrypt.hash(password, 10);

    // 新しいユーザーを作成
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashed]
    );

    res.json({ message: "登録が完了しました" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "サーバーエラー" });
  }
});

// ログイン
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length === 0) {
      return res.status(400).json({ error: "ユーザーが見つかりません" });
    }

    const valid = await bcrypt.compare(password, user.rows[0].password);
    if (!valid) {
      return res.status(400).json({ error: "パスワードが違います" });
    }

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,   // JS から読めない → XSS対策
      secure: false,    // 本番では true（HTTPS 必須）
      sameSite: "lax",
    });
    

    res.json({ message: "ログイン成功" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "サーバーエラー" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "ログアウトしました" });
});


// ログイン済みユーザー情報を返す
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [req.user.id]   // ← token の中に入ってる id
    );

    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "サーバーエラー" });
  }
});

export default router;
