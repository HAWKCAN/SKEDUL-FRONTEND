import { Header, LeftSide, Card, ButtonType } from "../../components";
// import { logout } from "../../api/auth";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setNama] = useState("");

  // 🔹 data kelas dari API
  const [kelas, setKelas] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");
    setIsLoggedIn(!!token);
    if (storedName) setNama(storedName);
  }, []);

  function loadKelas() {
    const token = localStorage.getItem("token");
    const API = import.meta.env.VITE_API_URL + "/api";

    console.log("TOKEN:", token);

    fetch(`${API}/mahasiswa/kelas`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA KELAS:", data);
        setKelas(data); // Pastikan ini array → card akan tampil
      })
      .catch((err) => console.error("Gagal load kelas:", err));
  }

  // 🔹 auto refresh setiap 15 detik
  useEffect(() => {
    const interval = setInterval(loadKelas, 1000);
    return () => clearInterval(interval);
  }, []);

  // function handleLogout() {
  //   const token = localStorage.getItem("token");

  //   logout(token)
  //     .then(() => {
  //       localStorage.clear();
  //       window.location.href = "/login";
  //     })
  //     .catch(() => alert("Gagal logout!"));
  // }

  return (
    <div className="text-[#191c4d] bg-[#FFFFFF]">
      <div className="text-[#191c4d] lg:flex flex-col hidden bg-[#FFFFFF]">
        <div>
          <Header className="relative" to="/" />
          {isLoggedIn && (
            <div className="flex absolute flex-row justify-between top-7 right-50 items-center">
              <h1 className="text-[20px]  mr-10 font-medium">
                Halo, {name || "kamu"}
              </h1>
            </div>
          )}
        </div>

        <div className="grid  ">
          <div className="h-[calc(100dvh-100px)] grid grid-rows-[1fr_1fr_5fr] lg:mr-35 lg:ml-35   p-5">
            <LeftSide />
            <div className="border border-[#7d99fc] rounded-md lg:max-h[100px] bg-[#C5D8FF] grid grid-cols-[1fr_1fr_1fr] text-center text-[18px] p-5">
              <div className="border-r pl-2 border-[#7d99fc]">
                <p className="pb-3 font-bold">Peminjaman Pending</p>
              </div>
              <div className="border-r pl-5 border-[#7d99fc] font-bold">
                <p>Peminjaman Diterima</p>
              </div>
              <div className="pl-5 font-bold">
                <p>Peminjaman Ditolak</p>
              </div>
            </div>

            <div
              id="card"
              className="grid grid-flow-row-dense grid-cols-3 gap-5 mt-10  mb-10"
            >
              {kelas.length > 0 ? (
                kelas.map((item) => <Card key={item.id} data={item} />)
              ) : (
                <p>Loading data kelas...</p>
              )}
            </div>
          </div>
        </div>
      </div>

      

      <div className="text-[#191c4d] flex flex-col lg:hidden bg-[#FFFFFF]">
        <div>
          <Header className="relative" to="/" />
          {isLoggedIn && (
            <div className="flex absolute flex-row top-4 right-15 items-center">
              <h1 className="text-[10px] font-medium">
                Halo, {name || "kamu"}
              </h1>
            </div>
          )}
        </div>

        <div className="grid  w-dvw">
          {/* BAGIAN KANAN DASHBOARD */}
          <div className="h-[calc(100dvh-100px)] grid grid-rows-[1fr_5fr] pl-2 pt-5 pr-5">
            <div className="border border-[#7d99fc] rounded-md bg-[#C5D8FF] grid grid-cols-[1fr_1fr_1fr] text-center text-[18px] p-5">
              <div className="border-r pl-2 border-[#7d99fc]">
                <p className="pb-3 font-bold">Peminjaman Pending</p>
              </div>
              <div className="border-r pl-5 border-[#7d99fc] font-bold">
                <p>Peminjaman Diterima</p>
              </div>
              <div className="pl-5 font-bold">
                <p>Peminjaman Ditolak</p>
              </div>
            </div>

            {/* 🟦 CARD KELAS */}
            <div
              id="card"
              className="grid lg:grid-cols-3 lg:grid-rows-3 gap-5 mt-10 mb-10"
            >
              {kelas.length > 0 ? (
                kelas.map((item) => <Card key={item.id} data={item} />)
              ) : (
                <p>Loading data kelas...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
