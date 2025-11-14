import client from "./client";

export const login = (email, password) =>
  client.post("/login", { email, password });

export const register = (data) => client.post("/register", data);

export const logout = () => client.post("/logout");
