import { Header, CardList } from "../../components";
import { useState, useEffect, useRef } from "react";

export default function Dashboard() {
  const [kelas, setKelas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredKelas, setFilteredKelas] = useState([]);

  const lastDataRef = useRef("[]");
  const API = import.meta.env.VITE_API_URL + "/api";

  const loadKelas = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

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
        if (!Array.isArray(data)) return;

        const now = JSON.stringify(data);
        if (now !== lastDataRef.current) {
          lastDataRef.current = now;
          setKelas(data);
        }
      })
      .catch(() => {});
  };

  // polling every 6 seconds (aman untuk HP)
  useEffect(() => {
    loadKelas();
    const interval = setInterval(loadKelas, 6000);
    return () => clearInterval(interval);
  }, []);

  // search filter
  useEffect(() => {
    const q = searchQuery.toLowerCase();

    const result = kelas.filter(
      (item) =>
        item.nama_kelas.toLowerCase().includes(q) ||
        (item.kode_ruangan && item.kode_ruangan.toLowerCase().includes(q))
    );

    setFilteredKelas(result);
  }, [searchQuery, kelas]);

  return (
    <div className="text-[#191c4d] bg-white">
      <div className="lg:flex relative flex-col hidden">
        <Header to="/DashboardMurid" onSearch={setSearchQuery} />

        <div className="grid">
          <div className="h-[calc(100dvh-100px)] grid grid-rows-[1fr_1fr_5fr] lg:mx-35 p-5">
            <div className="border border-[#7d99fc] rounded-md bg-[#C5D8FF] grid grid-cols-3 text-center text-[18px] p-5 font-bold">
              <div className="border-r border-[#7d99fc]">
                Peminjaman Pending
              </div>
              <div className="border-r border-[#7d99fc]">
                Peminjaman Diterima
              </div>
              <div>Peminjaman Ditolak</div>
            </div>

            <CardList kelas={filteredKelas} />
          </div>
        </div>
      </div>

      <div className="lg:flex flex-col lg:hidden">
        <Header to="/DashboardMurid" onSearch={setSearchQuery} />

        <div className="grid">
          <div className="h-[calc(100dvh-100px)] grid grid-rows-[1fr_1fr_5fr] lg:mx-35 p-5">
            <div className="border border-[#7d99fc] rounded-md bg-[#C5D8FF] grid grid-cols-3 text-center text-[18px] p-5 font-bold">
              <div className="border-r border-[#7d99fc]">
                Peminjaman Pending
              </div>
              <div className="border-r border-[#7d99fc]">
                Peminjaman Diterima
              </div>
              <div>Peminjaman Ditolak</div>
            </div>

            <CardList kelas={filteredKelas} />
          </div>
        </div>
      </div>
    </div>
  );
}
