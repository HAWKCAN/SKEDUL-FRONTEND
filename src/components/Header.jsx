import ButtonType from "./button/ButtonType.jsx";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ to }) {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleProfileClick = () => {
    navigate("/profile"); 
  };

  return (
    <div>
      <header className="shadow-md lg:flex flex-row hidden max-h-[100px] p-10 lg:pl-20 border-b border-[#7d99fc] lg:pr-20 bg-[#EDF4FF] justify-between items-center text-center">
        <Link to={to}>
          <span className="content-center font-bold text-[30px] cursor-pointer">
            SKEDUL
          </span>
        </Link>

        {/* 🔹 Tampilkan tombol berbeda tergantung status login */}
        {isLoggedIn ? (
          <button
            onClick={handleProfileClick}
            className="w-12 h-12 rounded-full bg-[#ABC4FF] hover:bg-[#7d99fc] flex items-center justify-center font-bold text-white text-lg"
            title="Profil"
          >
            <span>👤</span>
          </button>
        ) : (
          <ButtonType to="/login" Name="Login" />
        )}
      </header>


      <header className="flex flex-row lg:hidden max-h-[100px] p-[30px] justify-between align-center text-center bg-[#EDF4FF] border-b border-[#7d99fc]">
        <p className="content-center text-[25px] font-bold">SKEDUL</p>
        <button
          onClick={() => setOpen(!open)}
          className="text-[#14A9FF] text-2xl font-bold"
        >
          ☰
        </button>

        {open && (
          <div className="flex absolute flex-col gap-[5px] p-[10px] right-5 top-[80px] border rounded-md bg-[#FDFDFD] shadow-md">
      
            {isLoggedIn ? (
              <button
                onClick={handleProfileClick}
                className="border p-[5px] w-[80px] h-[35px] rounded-full bg-[#ABC4FF] hover:bg-[#7d99fc] text-white"
              >
                👤 Profil
              </button>
            ) : (
              <ButtonType to="/login" Name="Login" />
            )}
          </div>
        )}
      </header>
    </div>
  );
}
