// src/pages/Login.jsx
import { useState } from "react";
import { login } from "../api/auth";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await login(email, password);

    if (res.message === "ログイン成功") {
      // Cookie がサーバーから自動保存されるので token を保存する必要はない
      alert("ログイン成功！");
      window.location.href = "/home";
    } else {
      alert(res.error || "ログインに失敗しました");
    }
  }

  return (
    <div style={{ margin: "50px" }}>
      <h2>ログイン</h2>
      {/* formElement.addEventListener("submit", (event) => {
            handleSubmit(event); // ← Reactが自動的に e を渡している！
          }); */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
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
        <button type="submit">ログイン</button>
      </form>
      
      <p>
        アカウントをお持ちでないですか？ <Link to="/register">新規登録はこちら</Link>
      </p>
    </div>
  );
}
