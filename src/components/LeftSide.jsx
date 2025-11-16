import ToggleButton from "./button/ToggleButton.jsx";
export default function LeftSide() {
  return (
    <div className="border border-[#A2B8FF] flex flex-col items-center  text-center gap-2 rounded-md bg-[#DCE8FF] h-auto m-5 pb-5 pt-5">
      <label className="m-2 text-[20px] w-full font-bold" htmlFor="">
        Cari Ruangan
      </label>
      <input
        className="border-1 border-solid border-[#2c34a7] bg-[#ffffff] m-2 p-2 w-[80%] rounded-md"
        type="text"
        name="cari"
        id="cari"
        placeholder="Masukkan Nama Ruangan"
      />
      <div className="flex flex-row justify-between font-bold text-[20px] items-center m-2 ">
        <p>Hanya yang tersedia</p>
        <ToggleButton />
      </div>
      <button className="border border-[#2c34a7] rounded-md p-2 m-2 w-[80%] font-bold text-[#ffffff] bg-[#414dea] hover:bg-[#5e74f6]">
        {" "}
        Reset
      </button>
    </div>
  );
}
