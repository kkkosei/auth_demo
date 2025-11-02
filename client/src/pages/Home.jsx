import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/me", {
      credentials: "include", // Cookie を送る
    })
      .then(res => {
        if (!res.ok) throw new Error("not authenticated");
        return res.json();
      })
      .then(data => setUser(data))
      .catch(() => {
        window.location.href = "/";
      });
  }, []);

  return (
    <div style={{ margin: "50px" }}>
      {user ? (
        <>
          <h2>ホーム</h2>
          <p>{user.name} さん、ログイン中です 🎉</p>
          <button
            onClick={() => {
              fetch("http://localhost:4000/api/logout", { method: "POST", credentials: "include" })
                .then(() => window.location.href = "/");
            }}
          >
            ログアウト
          </button>
        </>
      ) : (
        <p>読み込み中...</p>
      )}
    </div>
  );
}
