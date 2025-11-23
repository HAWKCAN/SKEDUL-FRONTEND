import { Header } from "../components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Reservation() {
  const { id } = useParams();
  const [kelas, setKelas] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const API = import.meta.env.VITE_API_URL + "/api";

    fetch(`${API}/mahasiswa/kelas/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then((data) => setKelas(data))
      .catch((err) => console.log("Fetch error:", err.message));
  }, [id]);

  return (
    <div className="min-h-screen bg-[#F5F7FF] text-[#191c4d]">
      <Header to="/DashboardMurid" />

      <div className="p-8 mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Ajukan Peminjaman</h1>

        <div className="bg-white shadow-sm border border-[#a2beff] rounded-xl p-6">
          {/* DATA KELAS */}
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-1">
              Kelas : {kelas?.nama_kelas || "Loading..."}
            </h2>
            <p className="text-sm text-gray-600">
              Kode Ruangan: {kelas?.kode_ruangan || "-"}
            </p>
            <p className="text-sm text-gray-600">
              Kapasitas: {kelas?.kapasitas || "-"}
            </p>
          </div>

          {/* FORM */}
          <form className="grid grid-cols-1 gap-6">
            <div>
              <label className="font-semibold">Nama</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-[#a2beff] rounded-md bg-white"
                placeholder="Masukkan nama"
              />
            </div>

            <div>
              <label className="font-semibold">Tanggal Peminjaman</label>
              <input
                type="date"
                className="w-full mt-1 p-2 border border-[#a2beff] rounded-md bg-white"
              />
            </div>

            <div>
              <label className="font-semibold">Waktu Mulai</label>
              <input
                type="time"
                className="w-full mt-1 p-2 border border-[#a2beff] rounded-md bg-white"
              />
            </div>

            <div>
              <label className="font-semibold">Waktu Selesai</label>
              <input
                type="time"
                className="w-full mt-1 p-2 border border-[#a2beff] rounded-md bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#414dea] hover:bg-[#5e74f6] text-white font-bold rounded-lg"
            >
              Ajukan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
