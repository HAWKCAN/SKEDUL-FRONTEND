import { Header, LeftSide, Lantai, ButtonType } from "../../components";
import { logout } from "../../api/auth";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setNama] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");
    setIsLoggedIn(!!token);
    if (storedName) setNama(storedName);
  }, []);

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

  return (
    <div className="max-h-dvh"> 
      <Header to="/DashboardAdmin" />
      <div className="grid grid-cols-[1fr_4fr]">
        <div className="flex flex-col "> 
          <LeftSide />

          <div className="border h-[140px] w-auto m-5 p-5 flex flex-col justify-center items-center gap-5">
            <h1 className="font-bold text-[20px] text-center">
              Registrasi Mahasiswa
            </h1>
            <ButtonType type="button" Name="Daftar" to="/Mhs_Reg" />
          </div>

          <div className="border h-[140px] w-auto m-5 p-5 flex flex-col justify-center items-center gap-5">
            <h1 className="font-bold text-[20px] text-center">
              Registrasi Dosen
            </h1>
            <ButtonType type="button" Name="Daftar" />
          </div>

          <div className="border h-[140px] w-auto m-5 p-5 flex flex-col justify-center items-center gap-5">
            <h1 className="font-bold text-[20px] text-center">LOGOUT</h1>
            <ButtonType type="button" Name="Logout" onClick={handleLogout} />
          </div>
        </div>

        {/* Bagian kanan */}
        <div>
          {isLoggedIn ? (
            <div className="flex flex-row justify-between items-center">
              <h1 className="mt-2 text-[36px] font-bold">Dashboard</h1>
              <h1 className="text-[20px]  mr-10 font-medium">
                Halo, {name || "kamu"} 
              </h1>
            </div>
          ) : (
            <h1 className="mt-2 text-[36px] font-bold">Dashboard</h1>
          )}

          <p className="text-[20px]">Sabtu, 14 November 2025</p>
          <div className="bg-[#ffffff] h-[12vh] border-solid border-1 rounded-md mt-3 mr-5">
            <table className="w-[100%] h-[70%] text-center text-[18px] mt-3">
              <tr>
                <th>Peminjaman Pending</th>
                <th className="border-r border-l">Peminjaman Diterima</th>
                <th>Peminjaman Ditolak</th>
              </tr>
              <tr>
                <td>3</td>
                <td className="border-r border-l">3</td>
                <td>3</td>
              </tr>
            </table>
          </div>

          <h1 className="text-[20px] font-bold mt-5">Daftar Pending</h1>
          <div className="bg-[#ffffff] border-solid rounded-md border-1 mr-5 pl-2">
            <table className="w-[100%] text-center mt-2 mb-2">
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Tanggal Peminjaman</th>
                <th>Ruangan</th>
                <th>Keterangan</th>
                <th>Aksi</th>
              </tr>
              <tr>
                <td>1</td>
                <td className="w-[32%]">Mohammad Ferdian Samputra</td>
                <td>20-11-2025</td>
                <td>E205</td>
                <td>
                  <a href="">Selengkapnya...</a>
                </td>
                <td>
                  <button className="bg-[#ABC4FF] rounded-md hover:bg-[#5e74f6] w-15 h-7 mr-1 cursor-pointer">
                    Terima
                  </button>
                  <button className="bg-[#ABC4FF] rounded-md hover:bg-[#5e74f6] w-15 h-7 ml-1 cursor-pointer">
                    Tolak
                  </button>
                </td>
              </tr>
            </table>
          </div>

          <div className="bg-[#ffffff] border-solid border-1 rounded-md mt-5 mr-5">
            <h1 className="text-[18px] font-bold ml-2 mt-2">
              Histori Peminjaman
            </h1>
            <table className="w-[100%] text-center mb-2">
              <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>Nama</th>
                <th>Tanggal Peminjaman</th>
                <th>Ruangan</th>
                <th>Status</th>
                <th>Keterangan</th>
              </tr>
              <tr>
                <td>1</td>
                <td>15-11-2025</td>
                <td>Mohammad Ferdian Samputra</td>
                <td>20-11-2025</td>
                <td>E205</td>
                <td>Approved</td>
                <td>Selengkapnya...</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
