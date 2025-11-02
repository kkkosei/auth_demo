// server/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

//req.cookiesを読み取れるようになる
// ブラウザは、サーバーにリクエストを送るときに Cookie を自動添付します。
// 例）
// Cookie: token=abcde.jwt.12345; theme=dark;これを以下のようにとれる
// {
//   token: "abcde.jwt.12345",
//   theme: "dark"
// }
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",//アクセス許可するサイト
    credentials: true,// ← Cookie送信を許可
  })
);

//jsonできたデータをjavascriptで読み取れるように変える
//fetch("http://localhost:4000/api/login", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ email, password }),         ここから
// });                                                    ↓になる
// 例→"{\"email\":\"test@example.com\",\"password\":\"abc123\"}"
// router.post("/login", (req, res) => {
//   console.log(req.body);
// });　express.json()ないとundefindeであると{ email: "test@example.com", password: "abc123" }

app.use(express.json());

// 認証API
app.use("/api", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
