import { Header, LeftSide, ButtonType } from "../../components";
import { logout } from "../../api/auth";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setNama] = useState("");

  const [pending, setPending] = useState([]);
  const [history, setHistory] = useState([]);

  const API = import.meta.env.VITE_API_URL + "/api";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");
    setIsLoggedIn(!!token);
    if (storedName) setNama(storedName);

    if (token) {
      loadReservasi(token);
    }
  }, []);

  async function loadReservasi(token) {
    try {
      const [resPending, resHistory] = await Promise.all([
        fetch(`${API}/admin/reservasi/pending`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch(`${API}/admin/reservasi/history`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const dataPending = await resPending.json();
      const dataHistory = await resHistory.json();

      setPending(Array.isArray(dataPending) ? dataPending : []);
      setHistory(Array.isArray(dataHistory) ? dataHistory : []);
    } catch (err) {
      console.error("Error load reservasi:", err);
    }
  }

  async function handleApprove(id) {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API}/admin/reservasi/${id}/approve`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        loadReservasi(token);
      } else {
        alert(data.message || "Gagal menyetujui");
      }
    } catch (err) {
      console.error(err);
      alert("Error saat approve");
    }
  }


  async function handleReject(id) {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API}/admin/reservasi/${id}/reject`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        loadReservasi(token);
      } else {
        alert(data.message || "Gagal menolak");
      }
    } catch (err) {
      console.error(err);
      alert("Error saat reject");
    }
  }

  function handleLogout() {
    const token = localStorage.getItem("token");

    logout(token)
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        window.location.href = "/login";
      })
      .catch((err) => {
        console.error(err);
        alert("Gagal logout!");
      });
  }

  async function resetHistory() {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!confirm("Yakin ingin reset semua history?")) return;

    try {
      const res = await fetch(`${API}/admin/reservasi/history/reset`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        alert("History berhasil direset");
        loadReservasi(token);
      } else {
        alert(data.message || "Gagal reset history");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi error");
    }
  }


  // hitung ringkasan
  const pendingCount = pending.length;
  const approvedCount = history.filter((r) => r.status === "approved").length;
  const rejectedCount = history.filter((r) => r.status === "rejected").length;

  return (
    <div className="max-h-dvh">
      <Header to="/DashboardAdmin" />
      <div className="grid grid-cols-[1fr_4fr]">
        {/* SIDEBAR */}
        <div className="flex flex-col">
          <LeftSide />

          <div className="border border-[#A2B8FF] rounded-md bg-[#DCE8FF] h-[140px] w-auto m-5 p-5 flex flex-col justify-center items-center gap-5">
            <h1 className="font-bold text-[20px] text-center">
              Registrasi Mahasiswa
            </h1>
            <ButtonType type="button" Name="Daftar" to="/Mhs_Reg" />
          </div>

          <div className="border border-[#A2B8FF] rounded-md bg-[#DCE8FF] h-[140px] w-auto m-5 p-5 flex flex-col justify-center items-center gap-5">
            <h1 className="font-bold text-[20px] text-center">
              Registrasi Dosen
            </h1>
            <ButtonType type="button" Name="Daftar" />
          </div>

          <div className="border border-[#A2B8FF] rounded-md bg-[#FFFFFF] h-[140px] w-auto m-5 p-5 flex flex-col justify-center items-center gap-5">
            <h1 className="font-bold text-[20px] text-center">LOGOUT</h1>
            <ButtonType type="button" Name="Logout" onClick={handleLogout} />
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div>
          {isLoggedIn ? (
            <div className="flex flex-row justify-between items-center">
              <h1 className="mt-2 text-[36px] font-bold">Dashboard</h1>
              <h1 className="text-[20px] mr-10 font-medium">
                Halo, {name || "kamu"}
              </h1>
            </div>
          ) : (
            <h1 className="mt-2 text-[36px] font-bold">Dashboard</h1>
          )}

          {/* TODO: bisa diganti tanggal dinamis */}
          <p className="text-[20px]">Sabtu, 14 November 2025</p>

          {/* RINGKASAN */}
          <div className="border-[#7d99fc] bg-[#C5D8FF] h-[12vh] border-solid border-1 rounded-md mt-3 mr-5">
            <table className="w-[100%] h-[70%] text-center text-[18px] mt-3">
              <tbody>
                <tr>
                  <th>Peminjaman Pending</th>
                  <th className="border-r border-l border-[#7d99fc]">
                    Peminjaman Diterima
                  </th>
                  <th>Peminjaman Ditolak</th>
                </tr>
                <tr>
                  <td>{pendingCount}</td>
                  <td className="border-r border-l border-[#7d99fc]">
                    {approvedCount}
                  </td>
                  <td>{rejectedCount}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* DAFTAR PENDING */}
          <h1 className="text-[20px] font-bold mt-5">Daftar Pending</h1>
          <div className="bg-[#F5F8FF] border border-[#a2beff] rounded-md mr-5 p-2">
            <table className="w-full text-center mt-2 mb-2  border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-[#dbe5ff]">
                  <th className="py-3 px-2 rounded-l-md">No</th>
                  <th className="py-3 px-2">Nama</th>
                  <th className="py-3 px-2">Tanggal Peminjaman</th>
                  <th className="py-3 px-2">Ruangan</th>
                  <th className="py-3 px-2">Keterangan</th>
                  <th className="py-3 px-2 rounded-r-md">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {pending.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-4 text-gray-500">
                      Belum ada peminjaman pending
                    </td>
                  </tr>
                ) : (
                  pending.map((item, idx) => (
                    <tr
                      key={item.id}
                      className="bg-white shadow-sm hover:shadow-md transition rounded-md"
                    >
                      <td className="py-3 px-2">{idx + 1}</td>
                      <td className="py-3 px-2">{item.user?.name}</td>
                      <td className="py-3 px-2">{item.tanggal}</td>
                      <td className="py-3 px-2">
                        {item.kelas?.kode_ruangan ||
                          item.kelas?.nama_kelas ||
                          "-"}
                      </td>
                      <td className="py-3 px-2 max-w-[170px] truncate">
                        {item.alasan?.length > 25
                          ? item.alasan.slice(0, 25) + "..."
                          : item.alasan}
                      </td>
                      <td className="py-3 px-2 flex justify-center gap-2">
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="bg-[#ABC4FF] rounded-md hover:bg-[#5e74f6] px-3 h-7"
                        >
                          Terima
                        </button>
                        <button
                          onClick={() => handleReject(item.id)}
                          className="bg-[#ABC4FF] rounded-md hover:bg-[#5e74f6] px-3 h-7"
                        >
                          Tolak
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* HISTORI */}
          <div className="bg-[#F5F8FF] border border-[#a2beff] rounded-md mt-5 mr-5">
            <h1 className="text-[18px] font-bold ml-2 mt-2">
              Histori Peminjaman
            </h1>
            <table className="w-full text-center mt-2 mb-2 pl-2 pr-2 border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-[#dbe5ff]">
                  <th className="py-3 px-2 rounded-l-md">No</th>
                  <th className="py-3 px-2">Tanggal Pengajuan</th>
                  <th className="py-3 px-2">Nama</th>
                  <th className="py-3 px-2">Tanggal Peminjaman</th>
                  <th className="py-3 px-2">Ruangan</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2 rounded-r-md">Keterangan</th>
                </tr>
              </thead>

              <tbody>
                {history.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-4 text-gray-500">
                      Belum ada histori peminjaman
                    </td>
                  </tr>
                ) : (
                  history.map((item, idx) => (
                    <tr
                      key={item.id}
                      className="bg-white shadow-sm hover:shadow-md transition rounded-md"
                    >
                      <td className="py-3 px-2">{idx + 1}</td>
                      <td className="py-3 px-2">
                        {item.created_at?.slice(0, 10) || "-"}
                      </td>
                      <td className="py-3 px-2">{item.user?.name}</td>
                      <td className="py-3 px-2">{item.tanggal}</td>
                      <td className="py-3 px-2">
                        {item.kelas?.kode_ruangan ||
                          item.kelas?.nama_kelas ||
                          "-"}
                      </td>
                      <td className="py-3 px-2 capitalize">{item.status}</td>
                      <td className="py-3 px-2 max-w-[170px] truncate">
                        {item.alasan?.length > 25
                          ? item.alasan.slice(0, 25) + "..."
                          : item.alasan}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div> <br />
          <button
            onClick={resetHistory}
            className="bg-red-400 hover:bg-red-600 px-3 py-1 m-5 justify-center rounded text-white"
          >
            Reset History
          </button>

        </div>
      </div>
    </div>
  );
}
