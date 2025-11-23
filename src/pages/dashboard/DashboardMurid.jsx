import { Header, CardList } from "../../components";
import { useState, useEffect, useRef } from "react";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setNama] = useState("");

  const [kelas, setKelas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredKelas, setFilteredKelas] = useState([]);

  const lastDataRef = useRef(null);

  // Ambil nama user
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");
    setIsLoggedIn(!!token);
    if (storedName) setNama(storedName);
  }, []);

  // Fetch data kelas
  const loadKelas = () => {
    const token = localStorage.getItem("token");
    const API = import.meta.env.VITE_API_URL + "/api";

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
        if (!Array.isArray(data)) {
          console.warn("Data bukan array:", data);
          setKelas([]); // biar tidak error
          return;
        }

        if (JSON.stringify(data) !== JSON.stringify(lastDataRef.current)) {
          lastDataRef.current = data;
          setKelas(data);
        }
      });
  };

  // Polling (Realtime update)
  useEffect(() => {
    loadKelas();
    const interval = setInterval(loadKelas, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!Array.isArray(kelas)) {
      setFilteredKelas([]);
      return;
    }

    const q = searchQuery.toLowerCase();
    const result = kelas.filter(
      (item) =>
        item.nama_kelas.toLowerCase().includes(q) ||
        (item.kode_ruangan && item.kode_ruangan.toLowerCase().includes(q))
    );

    setFilteredKelas(result);
  }, [searchQuery, kelas]);

  // Filtering berdasarkan input search
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
    <div className="text-[#191c4d] bg-[#FFFFFF]">
      <div className="text-[#191c4d] lg:flex flex-col hidden bg-[#FFFFFF]">
        <div>
          <Header to="/" onSearch={(value) => setSearchQuery(value)} />

          {isLoggedIn && (
            <div className="flex absolute flex-row justify-between top-7 right-50 items-center">
              <h1 className="text-[20px] mr-10 font-medium">
                Halo, {name || "kamu"}
              </h1>
            </div>
          )}
        </div>

        <div className="grid">
          <div className="h-[calc(100dvh-100px)] grid grid-rows-[1fr_1fr_5fr] lg:mr-35 lg:ml-35 p-5">
            <div className="border border-[#7d99fc] rounded-md bg-[#C5D8FF] grid grid-cols-[1fr_1fr_1fr] text-center text-[18px] p-5">
              <div className="border-r pl-2 border-[#7d99fc] font-bold">
                Peminjaman Pending
              </div>
              <div className="border-r pl-5 border-[#7d99fc] font-bold">
                Peminjaman Diterima
              </div>
              <div className="pl-5 font-bold">Peminjaman Ditolak</div>
            </div>

            <CardList kelas={filteredKelas} />
          </div>
        </div>
      </div>
    </div>
  );
}
