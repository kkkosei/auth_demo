// src/pages/Register.jsx
import { useState } from "react";
import { register } from "../api/auth";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await register(name, email, password);
    alert(res.message || res.error || "登録完了！");
  }

  return (
    <div style={{ margin: "50px" }}>
      <h2>新規登録</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br />
        <input
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">登録</button>
      </form>
      <p>
        すでにアカウントをお持ちの方は <Link to="/">ログイン</Link>
      </p>
    </div>
  );
}
