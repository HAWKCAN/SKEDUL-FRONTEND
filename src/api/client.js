import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// interceptor untuk otomatis kirim token
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
