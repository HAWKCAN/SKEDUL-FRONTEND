import { Header, CardList } from "../../components";
import { useState, useEffect } from "react";

export default function DashboardDosen() {
  const API = import.meta.env.VITE_API_URL + "/api";

  const [jadwalSaya, setJadwalSaya] = useState([]);
  const [reservasi, setReservasi] = useState([]);
    console.log(reservasi);
  const [kelas, setKelas] = useState([]);

  const [pending, setPending] = useState(0);
  const [approved, setApproved] = useState(0);
  const [rejected, setRejected] = useState(0);

  const getToken = () => localStorage.getItem("token");

  const hitungStatus = (list) => {
    setPending(list.filter((x) => x.status === "pending").length);
    setApproved(list.filter((x) => x.status === "approved").length);
    setRejected(list.filter((x) => x.status === "rejected").length);
  };

  const loadJadwal = () => {
    const token = getToken();
    if (!token) return;

    fetch(`${API}/dosen/kelas`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setJadwalSaya(Array.isArray(data) ? data : []))
      .catch(() => {});
  };

  const loadReservasi = () => {
    const token = getToken();
    if (!token) return;

    fetch(`${API}/dosen/reservasi`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;
        setReservasi(data);
        hitungStatus(data);
      })
      .catch(() => {});
  };

  const loadKelas = () => {
    // universal, gak perlu auth, tapi gapapa kalau pakai
    const token = getToken();

    fetch(`${API}/kelas`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => res.json())
      .then((data) => setKelas(Array.isArray(data) ? data : []))
      .catch(() => {});
  };

  const cancelKelas = (id) => {
    const token = getToken();
    if (!token) return;

    if (!confirm("Batalkan kelas ini?")) return;

    fetch(`${API}/dosen/kelas/${id}/cancel`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Kelas berhasil dibatalkan");
        loadJadwal();
      })
      .catch(() => {
        alert("Gagal membatalkan kelas");
      });
  };

  useEffect(() => {
    loadJadwal();
    loadReservasi();
    loadKelas();
  }, []);

  const formatJam = (t) => (t ? t.slice(11, 16) : "-");

  return (
    <div className="text-[#191c4d] bg-white">
      <Header to="/DashboardDosen" />
      <div className="flex top-8 left-[500px] absolute">
        <button
          onClick={() => (window.location.href = "/ReservasiSaya")}
          className="py-2 px-4 bg-[#414dea] hover:bg-[#5e74f6] text-white font-bold rounded-lg"
        >
          Lihat Reservasi Saya
        </button>
      </div>

      <div className="p-5">
        {/* STATUS RESERVASI SAYA */}
        <div className="bg-[#C5D8FF] border border-[#7d99fc] rounded p-4">
          <table className="w-full text-center">
            <tbody>
              <tr>
                <th className="border-r border-[#7d99fc]">Pending</th>
                <th className="border-r border-[#7d99fc]">Diterima</th>
                <th>Ditolak</th>
              </tr>
              <tr>
                <td className="border-r border-[#7d99fc]">{pending}</td>
                <td className="border-r border-[#7d99fc]">{approved}</td>
                <td>{rejected}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* JADWAL MENGAJAR SAYA */}
        <h2 className="text-xl font-bold mt-6">Jadwal Mengajar Saya</h2>
        <div className="bg-[#F5F8FF] border border-[#7d99fc] rounded p-4">
          {jadwalSaya.length === 0 ? (
            <p className="text-gray-500">Belum ada jadwal.</p>
          ) : (
            jadwalSaya.map((item) => (
              <div key={item.id} className="p-3 bg-white rounded shadow mt-2">
                <p>
                  <b>{item.mata_kuliah}</b>
                </p>
                <p>
                  {item.hari} | {formatJam(item.jam_mulai)} -{" "}
                  {formatJam(item.jam_selesai)}
                </p>

                <button
                  onClick={() => cancelKelas(item.id)}
                  className="bg-red-400 text-white px-3 py-1 rounded mt-2"
                >
                  Batalkan Kelas
                </button>
              </div>
            ))
          )}
        </div>

        {/* PINJAM KELAS PENGGANTI (pakai CardList yang sama dengan mahasiswa) */}
        <h2 className="text-xl font-bold mt-6">Pinjam Kelas Pengganti</h2>
        <CardList kelas={kelas} />
      </div>
    </div>
  );
}
