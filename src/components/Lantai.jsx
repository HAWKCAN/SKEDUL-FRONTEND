import { Link } from "react-router-dom";
export default function Lantai() {
  return (
    <div className="flex flex-row gap-2  p-[5px] justify-center ">
      <Link to="/Lantai1">
        <button className=" p-[5px] bg-[#ABC4FF] rounded-md hover:bg-[#5e74f6] w-30 text-center h-10">
          Lantai 1
        </button>
      </Link>
      <Link to="/Lantai2">
        <button className="bg-[#ABC4FF] rounded-md hover:bg-[#5e74f6] p-[5px] w-30 text-center h-10">
          Lantai 2
        </button>
      </Link>
      <Link to="/Lantai3">
        <button className="bg-[#ABC4FF] rounded-md hover:bg-[#5e74f6] p-[5px] w-30 text-center h-10">
          Lantai 3
        </button>
      </Link>
    </div>
  );
}
