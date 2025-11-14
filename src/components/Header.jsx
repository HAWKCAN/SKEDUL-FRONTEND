import LoginButtonLink from "./button/LoginButtonLink.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <header className="lg:flex flex-row hidden max-h-[100px] p-10 lg:pl-20 border-b lg:pr-20  bg-[#ffffff]  justify-between items-center  text-center">
        <Link to="/">
          <a className="content-center font-bold text-[30px]">SKEDUL</a>{" "}
        </Link>

        <div className="flex flex-row gap-2  p-[5px] justify-center ">
          <Link to="/Lantai1">
            <button className="p-[5px] bg-[#ABC4FF] rounded-md hover:bg-[#5e74f6] w-30 text-center h-10">
              Lantai 1
            </button>
          </Link>
          <Link to="/Lantai2">
            <button className="p-[5px] bg-[#ABC4FF] rounded-md hover:bg-[#5e74f6] w-30 text-center h-10">
              Lantai 2
            </button>
          </Link>
          <Link to="/Lantai3">
            <button className="p-[5px] bg-[#ABC4FF] rounded-md hover:bg-[#5e74f6] w-30 text-center h-10">
              Lantai 3
            </button>
          </Link>
        </div>
        <LoginButtonLink />
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
            <LoginButtonLink />
          </div>
        )}
      </header>
    </div>
  );
}
