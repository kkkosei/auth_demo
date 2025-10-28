// src/pages/Home.jsx
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("ログインが必要です");
      window.location.href = "/";
    }
  }, []);

  return (
    <div style={{ margin: "50px" }}>
      <h2>ホーム</h2>
      <p>ログイン済みです 🎉</p>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        ログアウト
      </button>
    </div>
  );
}
