// Copy to berry-admin/src/api.js. Set VITE_API_URL in .env (e.g. http://localhost:5000)
const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const tok = () => localStorage.getItem("token");

export async function api(path, method = "GET", body) {
  const res = await fetch(BASE + "/api" + path, {
    method,
    headers: { "Content-Type": "application/json", ...(tok() ? { Authorization: "Bearer " + tok() } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}
export async function login(email, password) {
  const d = await api("/auth/login", "POST", { email, password });
  localStorage.setItem("token", d.token);
  return d.user;
}
export const logout = () => localStorage.removeItem("token");
// Examples: api("/invoices?search=sara&page=1"), api("/orders","POST",{customer:"Ali",total:99}), api("/stats")
