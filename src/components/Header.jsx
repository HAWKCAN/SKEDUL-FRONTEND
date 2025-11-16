import ButtonType from "./button/ButtonType.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <header className="shadow-md lg:flex flex-row hidden max-h-[100px] p-10 lg:pl-20 border-b border-[#7d99fc] lg:pr-20  bg-[#EDF4FF]  justify-between items-center  text-center">
        <Link to="/">
          <a className="content-center font-bold text-[30px]">SKEDUL</a>{" "}
        </Link>

        <div className="flex flex-row gap-2  p-[5px] justify-center ">
          <ButtonType to="/lantai1" Name="Lantai 1" />
          <ButtonType to="/lantai2" Name="Lantai 2" />
          <ButtonType to="/lantai3" Name="Lantai 3" />
        </div>
        <ButtonType to="/login" Name="Login" />
      </header>

      <header className="flex flex-row lg:hidden max-h-[100px] p-[30px] justify-between align-center text-center">
        <p className="content-center text-[25px]">SKEDUL</p>
        <button
          onClick={() => setOpen(!open)}
          className="text-[#14A9FF] text-2xl font-bold"
        >
          ☰
        </button>

        {open && (
          <div className="flex absolute flex-col gap-[5px]  p-[5px] justify-center align-end right-5 top-[80px]  border-1 rounded-md bg-[#FDFDFD]">
            <Link to="/Lantai1">
              {" "}
              <button className="border-1 p-[5px] w-10 text-center h-10">
                Lantai 1
              </button>
            </Link>
            <Link to="/Lantai2">
              {" "}
              <button className="border-1 p-[5px] w-10 text-center h-10">
                Lantai 2
              </button>
            </Link>
            <Link to="Lantai3">
              {" "}
              <button className="border-1 p-[5px] w-10 text-center h-10">
                Lantai 3
              </button>
            </Link>
            <ButtonType to="/login" Name="Login" />
          </div>
        )}
      </header>
    </div>
  );
}
