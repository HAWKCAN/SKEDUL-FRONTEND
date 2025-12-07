import { Header, CardList } from "../../components";
import { useState, useEffect } from "react";

export default function DashboardDosen() {
  const API = import.meta.env.VITE_API_URL + "/api";
  const token = localStorage.getItem("token");

  const [jadwalSaya, setJadwalSaya] = useState([]);
  const [reservasi, setReservasi] = useState([]);
    console.log(reservasi);
  const [kelasPengganti, setKelasPengganti] = useState([]);

  const [pending, setPending] = useState(0);
  const [approved, setApproved] = useState(0);
  const [rejected, setRejected] = useState(0);

  const hitungStatus = (list) => {
    setPending(list.filter((x) => x.status === "pending").length);
    setApproved(list.filter((x) => x.status === "approved").length);
    setRejected(list.filter((x) => x.status === "rejected").length);
  };

  const loadJadwal = () => {
    fetch(`${API}/dosen/kelas`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setJadwalSaya(Array.isArray(data) ? data : []));
  };

  const loadReservasi = () => {
    fetch(`${API}/dosen/reservasi`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setReservasi(data);
        hitungStatus(data);
      });
  };

  // FIX: hanya SATU fungsi cancelKelas
  const cancelKelas = (id) => {
    if (!confirm("Batalkan kelas ini?")) return;

    fetch(`${API}/dosen/kelas/${id}/cancel`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((info) => {
        localStorage.setItem("kelas_dibatalkan", JSON.stringify(info));

        alert("Kelas dibatalkan. Silakan pilih kelas pengganti.");

        fetch(
          `${API}/dosen/kelas-pengganti?kelas_id=${info.kelas_id}&hari=${info.hari}&jam_mulai=${info.jam_mulai}&jam_selesai=${info.jam_selesai}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
          .then((res) => res.json())
          .then((data) => setKelasPengganti(data));

        loadJadwal();
      });
  };

  useEffect(() => {
    loadJadwal();
    loadReservasi();
  }, []);

  const formatJam = (t) => t?.slice(11, 16);

  return (
    <div className="text-[#191c4d] bg-white">
      <Header to="/DashboardDosen" />

      <div className="p-5">
        <div className="bg-[#C5D8FF] border border-[#7d99fc] rounded p-4">
          <table className="w-full text-center">
            <tbody>
              <tr>
                <th className="border-r">Pending</th>
                <th className="border-r">Diterima</th>
                <th>Ditolak</th>
              </tr>
              <tr>
                <td className="border-r">{pending}</td>
                <td className="border-r">{approved}</td>
                <td>{rejected}</td>
              </tr>
            </tbody>
          </table>
        </div>

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

        <h2 className="text-xl font-bold mt-6">Kelas Pengganti</h2>
        <CardList kelas={kelasPengganti} />
      </div>
    </div>
  );
}
