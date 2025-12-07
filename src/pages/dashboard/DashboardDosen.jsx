import { Header, CardList } from "../../components";
import { useState, useEffect } from "react";

export default function DashboardDosen() {
  const API = import.meta.env.VITE_API_URL + "/api";
  const token = localStorage.getItem("token");

  const [jadwalSaya, setJadwalSaya] = useState([]);
  const [reservasi, setReservasi] = useState([]);
    console.log(reservasi);

  const [pending, setPending] = useState(0);
  const [approved, setApproved] = useState(0);
  const [rejected, setRejected] = useState(0);

  // Hitung status
  const hitungStatus = (list) => {
    setPending(list.filter((x) => x.status === "pending").length);
    setApproved(list.filter((x) => x.status === "approved").length);
    setRejected(list.filter((x) => x.status === "rejected").length);
  };

  // Load jadwal dosen
  const loadJadwal = () => {
    fetch(`${API}/dosen/kelas`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setJadwalSaya(data));
  };

  // Load status reservasi dosen
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

  // Pembatalan kelas
  const cancelKelas = (id) => {
    if (!confirm("Batalkan kelas ini?")) return;

    fetch(`${API}/dosen/kelas/${id}/cancel`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(() => loadJadwal());
  };

  useEffect(() => {
    loadJadwal();
    loadReservasi();
  }, []);

  return (
    <div className="text-[#191c4d] bg-white">
      <Header to="/DashboardDosen" />

      <div className="p-5">
        {/* Status */}
        <div className="bg-[#C5D8FF] border border-[#7d99fc] rounded p-4">
          <table className="w-full text-center">
            <tbody>
              <tr>
                <th>Pending</th>
                <th>Diterima</th>
                <th>Ditolak</th>
              </tr>
              <tr>
                <td>{pending}</td>
                <td>{approved}</td>
                <td>{rejected}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Jadwal Saya */}
        <h2 className="text-xl font-bold mt-6">Jadwal Saya</h2>
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
                  {item.hari} | {item.jam_mulai} - {item.jam_selesai}
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

        {/* PINJAM KELAS (card kelas sama seperti mahasiswa) */}
        <h2 className="text-xl font-bold mt-6">Pinjam Kelas Pengganti</h2>
        <CardList kelas={[]} />
        {/* kamu tinggal pakai komponen CardList yang sama */}
      </div>
    </div>
  );
}
