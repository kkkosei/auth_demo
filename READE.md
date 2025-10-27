# Pomodoro Auth Prototype

このリポジトリは、Pomodoroアプリに認証機能を組み込むための試作です。  
バックエンドでは Express と PostgreSQL を使い、ログイン・登録処理を動かすことを目的にしています。  
まずは小さく動かして、JWTを使ったセッション管理とDB接続の流れを理解したいと思っています。

---

## 技術構成
- Node.js / Express
- PostgreSQL
- JWT / bcrypt
- React (Vite)

---

## 現状
- [x] Express + PostgreSQL の接続確認  
- [ ] `/register` `/login` の実装  
- [ ] JWT 認証テスト  
- [ ] Pomodoroアプリとの連携

---

## メモ
本番用というより、学習・試作目的のコードです。  
後でPomodoro本体に組み込む予定。  
その前に、まずはこのリポジトリでDB接続とJWT周りをしっかり動かすことを目標にしています。
