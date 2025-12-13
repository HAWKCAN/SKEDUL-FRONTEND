import client from "./client";

export const login = (email, password) =>
  client.post("/login", { email, password });

export const register = async (data, isAdmin = false) => {
  const token = localStorage.getItem("token");

  if (isAdmin) {
    return client.post("/admin/register", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
  }

  return client.post("/register", data);
};

export const getDosen = () => {
  return client.get("/admin/jadwal-kelas/dosen");
};

export const getKelas = () => {
  return client.get("/admin/jadwal-kelas/kelas");
};

export const tambahJadwal = (data) => {
  return client.post("/admin/jadwal-kelas", data);
};

export const logout = () => client.post("/logout");
