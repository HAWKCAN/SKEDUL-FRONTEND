import { Header, CardList } from "../../components";
import { useState, useEffect, useRef } from "react";

export default function Dashboard() {
  const [kelas, setKelas] = useState([]);
  const [reservasi, setReservasi] = useState([]);
  console.log(reservasi);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredKelas, setFilteredKelas] = useState([]);

  const lastKelasRef = useRef("[]");
  const API = import.meta.env.VITE_API_URL + "/api";

  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  // Hitung status reservasi
  const hitungStatus = (data) => {
    setPendingCount(data.filter((x) => x.status === "pending").length);
    setApprovedCount(data.filter((x) => x.status === "approved").length);
    setRejectedCount(data.filter((x) => x.status === "rejected").length);
  };

  // FETCH RESERVASI
  const loadReservasi = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${API}/mahasiswa/reservasi`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReservasi(data);
          hitungStatus(data);
        }
      })
      .catch(() => {});
  };

  // FETCH KELAS (card kelas)
  const loadKelas = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${API}/mahasiswa/kelas`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;

        const now = JSON.stringify(data);
        if (now !== lastKelasRef.current) {
          lastKelasRef.current = now;
          setKelas(data);
        }
      })
      .catch(() => {});
  };

  // Polling keduanya
  useEffect(() => {
    loadKelas();
    loadReservasi();

    const interval = setInterval(() => {
      loadKelas();
      loadReservasi();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Search filter
  useEffect(() => {
    const q = searchQuery.toLowerCase();
    setFilteredKelas(
      kelas.filter(
        (item) =>
          item.nama_kelas.toLowerCase().includes(q) ||
          (item.kode_ruangan && item.kode_ruangan.toLowerCase().includes(q))
      )
    );
  }, [searchQuery, kelas]);

  return (
    <div className="text-[#191c4d] bg-white">
      <div className="lg:flex relative flex-col hidden">
        <Header to="/DashboardMurid" onSearch={setSearchQuery} />

        <div className="grid">
          <div className="h-[calc(100dvh-100px)] grid grid-rows-[auto_auto_1fr] p-5">
            {/* STATUS PEMINJAMAN */}
            <div className="border-[#7d99fc] bg-[#C5D8FF] h-[12vh] border rounded-md mr-5">
              <table className="w-full h-full text-center text-[18px]">
                <tbody>
                  <tr>
                    <th>Pending</th>
                    <th className="border-x border-[#7d99fc]">Diterima</th>
                    <th>Ditolak</th>
                  </tr>
                  <tr>
                    <td>{pendingCount}</td>
                    <td className="border-x border-[#7d99fc]">
                      {approvedCount}
                    </td>
                    <td>{rejectedCount}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* CARD LIST */}
            <CardList kelas={filteredKelas} />
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden flex-col">
        <Header to="/DashboardMurid" onSearch={setSearchQuery} />

        <div className="grid p-5">
          <div className="border bg-[#C5D8FF] grid grid-cols-3 text-center text-[18px] p-5 font-bold">
            <div className="border-r border-[#7d99fc]">Pending</div>
            <div className="border-r border-[#7d99fc]">Diterima</div>
            <div>Ditolak</div>
          </div>

          <div className="grid grid-cols-3 text-center mt-3">
            <div>{pendingCount}</div>
            <div>{approvedCount}</div>
            <div>{rejectedCount}</div>
          </div>

          <CardList kelas={filteredKelas} />
        </div>
      </div>
    </div>
  );
}
