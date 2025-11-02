// src/api/auth.js
const API_URL = "http://localhost:4000/api";

export async function register(name, email, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",   // Cookie を送る
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}
