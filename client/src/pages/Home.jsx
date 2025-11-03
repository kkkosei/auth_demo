import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  async function fetchUser() {
    // ① まず /me にアクセスしてユーザー情報を取得
    let res = await fetch("http://localhost:4000/api/me", {
      credentials: "include", // ← Cookie を送る
    });

    if (res.status === 403) {
      // ② Access Token が期限切れ → /refresh を実行
      const refreshRes = await fetch("http://localhost:4000/api/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (!refreshRes.ok) {
        // refresh も失敗 → 本当に期限切れ or 不正 → ログアウト扱い
        return window.location.href = "/";
      }

      // ③ 新しい token がセットされたので、もう一度 /me を叩き直す
      res = await fetch("http://localhost:4000/api/me", {
        credentials: "include",
      });
    }

    // 最終的なユーザー情報をセット
    const data = await res.json();
    setUser(data);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  function handleLogout() {
    fetch("http://localhost:4000/api/logout", {
      method: "POST",
      credentials: "include"
    }).then(() => window.location.href = "/");
  }

  return (
    <div style={{ margin: "50px" }}>
      {user ? (
        <>
          <h2>ホーム</h2>
          <p>{user.name} さん、ログイン中です 🎉</p>
          <button onClick={handleLogout}>ログアウト</button>
        </>
      ) : (
        <p>読み込み中...</p>
      )}
    </div>
  );
}
