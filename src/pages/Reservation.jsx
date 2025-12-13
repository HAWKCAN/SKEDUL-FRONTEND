import { Header } from "../components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Reservation() {
  const { id } = useParams();
  const [kelas, setKelas] = useState(null);

  // Form state
  const [nama, setNama] = useState("");
  const [hari, setHari] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const [alasan, setAlasan] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [loadingAvail, setLoadingAvail] = useState(false);

  // Ambil detail kelas
  useEffect(() => {
    const token = localStorage.getItem("token");
    const API = import.meta.env.VITE_API_URL + "/api";

    fetch(`${API}/mahasiswa/kelas/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setKelas(data))
      .catch((err) => console.log("Fetch error:", err));
  }, [id]);

  // Load availability slot dari backend
  const loadAvailability = async () => {
    if (!hari || !tanggal) {
      alert("Pilih hari dan tanggal dulu");
      return;
    }

    setLoadingAvail(true);

    const token = localStorage.getItem("token");
    const API = import.meta.env.VITE_API_URL + "/api";

    try {
      const res = await fetch(
        `${API}/mahasiswa/kelas/${id}/availability?hari=${hari}&tanggal=${tanggal}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setAvailability(data.slots || []);
    } catch (err) {
      console.error(err);
    }

    setLoadingAvail(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const API = import.meta.env.VITE_API_URL + "/api";

    const payload = {
      kelas_id: id,
      nama,
      hari,
      tanggal,
      jam_mulai: `${tanggal} ${jamMulai}:00`,
      jam_selesai: `${tanggal} ${jamSelesai}:00`,

      alasan,
    };

    try {
      const res = await fetch(`${API}/mahasiswa/reservasi`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Peminjaman berhasil diajukan!");
      } else {
        alert("Gagal mengajukan: " + data.message);
      }
    } catch (err) {
      console.error("POST Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FF] text-[#191c4d]">
      <Header to="/DashboardMurid" />
      <div className="p-8 mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Ajukan Peminjaman</h1>

        <div className="bg-white shadow-sm border border-[#a2beff] rounded-xl p-6">
          {/* DATA KELAS */}
          <div className="mb-4">
            <h2 className="text-xl font-bold">
              Kelas: {kelas?.nama_kelas || "Loading..."}
            </h2>
            <p className="text-sm text-gray-600">
              Kapasitas: {kelas?.kapasitas || "-"}
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div>
              <label className="font-semibold">Nama Peminjam</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full mt-1 p-2 border border-[#a2beff] rounded-md"
                required
              />
            </div>

            <div>
              <label className="font-semibold">Hari</label>
              <select
                className="w-full mt-1 p-2 border border-[#a2beff] rounded-md"
                value={hari}
                onChange={(e) => setHari(e.target.value)}
                required
              >
                <option value="">Pilih Hari</option>
                <option value="Senin">Senin</option>
                <option value="Selasa">Selasa</option>
                <option value="Rabu">Rabu</option>
                <option value="Kamis">Kamis</option>
                <option value="Jumat">Jumat</option>
                <option value="Sabtu">Sabtu</option>
              </select>

              {/* Tombol lihat jadwal — DITARUH DI SINI */}
              <button
                type="button"
                disabled={!hari}
                onClick={() => {
                  setShowModal(true);
                  loadAvailability();
                }}
                className={`mt-2 py-2 px-4 text-white font-bold rounded-lg ${
                  hari
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Lihat Ketersediaan Ruangan
              </button>
            </div>

            <div>
              <label className="font-semibold">Tanggal</label>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="w-full mt-1 p-2 border border-[#a2beff] rounded-md"
                required
              />
            </div>

            <div>
              <label className="font-semibold">Waktu Mulai</label>
              <input
                type="time"
                value={jamMulai}
                onChange={(e) => setJamMulai(e.target.value)}
                className="w-full p-2 border border-[#a2beff] rounded-md"
                required
              />
            </div>

            <div>
              <label className="font-semibold">Waktu Selesai</label>
              <input
                type="time"
                value={jamSelesai}
                onChange={(e) => setJamSelesai(e.target.value)}
                className="w-full p-2 border border-[#a2beff] rounded-md"
                required
              />
            </div>

            <div>
              <label className="font-semibold">Alasan Peminjaman</label>
              <textarea
                value={alasan}
                onChange={(e) => setAlasan(e.target.value)}
                className="w-full h-[150px] mt-1 p-2 border border-[#a2beff] rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="py-2 bg-[#414dea] hover:bg-[#5e74f6] text-white font-bold rounded-lg"
            >
              Ajukan
            </button>
          </form>
        </div>
      </div>

      {/* MODAL SLOT */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-3">
              Ketersediaan Ruangan ({hari})
            </h2>

            {loadingAvail ? (
              <p className="text-center">Loading...</p>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {availability.map((slot, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg flex justify-between cursor-pointer ${
                      slot.status === "kosong"
                        ? "bg-green-100 hover:bg-green-200"
                        : "bg-red-100"
                    }`}
                    onClick={() => {
                      if (slot.status === "kosong") {
                        setJamMulai(slot.jam_mulai);
                        setJamSelesai(slot.jam_selesai);
                        setShowModal(false);
                      }
                    }}
                  >
                    <span className="font-bold">
                      {slot.jam_mulai} - {slot.jam_selesai}
                    </span>
                    <span>
                      {slot.status === "kosong" ? "Tersedia" : "Dipakai"}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
