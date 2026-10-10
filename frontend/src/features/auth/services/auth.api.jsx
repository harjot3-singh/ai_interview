import axios from "axios"
const api= axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    withCredentials:true
})
// by default axios don't give cookies access so with credientials true
export async function register({ username, email, password }) {
  const response = await api.post('/api/auth/register', { username, email, password });
  return response.data;
}
export async function login({ email, password }) {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
}
export async function logout() {
  await api.get('/api/auth/logout');
}
export async function getMe() {
  const response = await api.get('/api/auth/get-me');
  return response.data;
}