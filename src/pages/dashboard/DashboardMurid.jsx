import { Header, LeftSide, Card,ButtonType } from "../../components";
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
    <div className="text-[#191c4d] bg-[#FFFFFF]">
      <div>
        <Header className="relative" to="/" />
        {isLoggedIn ? (
          <div className="flex absolute flex-row justify-between top-8 right-50 items-center">
            <h1 className="text-[20px]  mr-10 font-medium">
              Halo, {name || "kamu"}
            </h1>
          </div>
        ) : (""
        )}
      </div>

      <div className="grid grid-cols-[1fr_4fr] ">
        <div>
          <LeftSide />
          <div className="border h-[140px] w-auto m-5 p-5 flex flex-col justify-center items-center gap-5">
            <h1 className="font-bold text-[20px] text-center">LOGOUT</h1>
            <ButtonType type="button" Name="Logout" onClick={handleLogout} />
          </div>
        </div>

        <div className=" h-[calc(100dvh-100px)] grid grid-rows-[1fr_5fr] pl-2 pt-5 pr-5 ">
          <div className="border border-[#7d99fc] rounded-md bg-[#C5D8FF] grid grid-cols-[1fr_1fr_1fr] text-center text-[18px] p-5">
            <div className="border-r pl-2 border-[#7d99fc]">
              <p className="pb-3 font-bold ">Peminjaman Pending</p>
            </div>
            <div className="border-r pl-5 border-[#7d99fc] font-bold ">
              <p>Peminjaman Diterima</p>
            </div>
            <div className="pl-5 font-bold ">
              <p>Peminjaman Ditolak</p>
            </div>
          </div>
          <div className="grid grid-cols-3 grid-rows-3 gap-5 mt-10 mb-10">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
}
