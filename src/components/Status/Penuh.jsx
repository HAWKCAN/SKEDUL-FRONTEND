function klik() {
  alert("sudah terpakai");
}
export default function Penuh() {
  return (
    <div className="flex border text-[15px] w-[100px] font-bold text-[#ffffff] bg-[#af2220] justify-center  items-center h-[30px] rounded-md p-5">
      <button className="cursor-pointer" onClick={klik}>
        TERPAKAI
      </button>
    </div>
  );
}
