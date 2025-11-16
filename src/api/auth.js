import client from "./client";

export const login = (email, password) =>
  client.post("/login", { email, password });

// untuk admin membuat akun baru (hanya email, password, role)
export const register = (data, isAdmin = false) =>
  isAdmin
    ? client.post("/admin/register", data)
    : client.post("/register", data);


export const logout = () => client.post("/logout");
