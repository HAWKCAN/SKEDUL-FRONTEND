import { useState, useEffect } from "react";

export default function ReservasiSaya() {
  const [reservasi, setReservasi] = useState([]);

  const loadReservasi = async () => {
    const token = localStorage.getItem("token");
    const API = import.meta.env.VITE_API_URL + "/api";

    try {
      const res = await fetch(`${API}/mahasiswa/reservasi`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) setReservasi(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadReservasi();
  }, []);

  const cancelReservasi = async (id) => {
    const token = localStorage.getItem("token");
    const API = import.meta.env.VITE_API_URL + "/api";

    if (!confirm("Yakin ingin membatalkan reservasi ini?")) return;

    try {
      const res = await fetch(`${API}/mahasiswa/reservasi/${id}/cancel`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        alert("Reservasi dibatalkan");
        loadReservasi(); // refresh data
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan, coba lagi.");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-[#F5F7FF] text-[#191c4d]">
      <h1 className="text-3xl font-bold mb-6">Reservasi Saya</h1>

      {reservasi.length === 0 && <p>Tidak ada reservasi.</p>}

      {reservasi.map((r) => (
        <div
          key={r.id}
          className={`border p-3 rounded-md mb-2 flex justify-between items-center ${
            r.status === "canceled" ? "bg-red-100" : "bg-white"
          }`}
        >
          <div>
            <div className="font-bold">{r.nama_kelas}</div>
            <div>
              Status:{" "}
              <span
                className={`font-semibold ${
                  r.status === "pending"
                    ? "text-yellow-600"
                    : r.status === "approved"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {r.status}
              </span>
            </div>
            <div>
              {r.tanggal} | {r.jam_mulai} - {r.jam_selesai}
            </div>
          </div>

          {r.status === "pending" && (
            <button
              onClick={() => cancelReservasi(r.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Batalkan
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
