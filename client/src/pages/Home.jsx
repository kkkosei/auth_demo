import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
      return;
    }

    fetch("http://localhost:4000/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Token invalid");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  }, []); //useEffectの第二引数がからであるから、レンダー時に1回だけ動くようになっている

  return (
    <div style={{ margin: "50px" }}>
      {user ? (
        <>
          <h2>ホーム</h2>
          <p>{user.name} さん、ログイン中です 🎉</p>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
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
