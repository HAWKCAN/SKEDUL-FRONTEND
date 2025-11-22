function klik() {
  alert("iya ini tersedia");
}
export default function Tersedia() {
  return (
    <div className="flex border text-[15px] w-[100px]  font-bold text-[#ffffff] bg-[#20af78] justify-center  items-center h-[30px] rounded-md p-5">
      <button className="cursor-pointer" onClick={klik}>
        TERSEDIA
      </button>
    </div>
  );
}
