import ToggleButton from "../components/ToggleButton.jsx";
export default function LeftSide() {
  return (
    <div className="border flex flex-col items-center  text-center gap-2 rounded-md bg-[#ffffff] h-auto m-5 pb-5 pt-5">
      <label className="m-2 text-[20px] w-full font-bold" htmlFor="">
        Cari Ruangan
      </label>
      <input
        className="border-1 border-solid m-2 p-2 w-[80%] rounded-md"
        type="text"
        name="cari"
        id="cari"
        placeholder="Masukkan Nama Ruangan"
      />
      <div className="flex flex-row justify-between font-bold text-[20px] items-center m-2 ">
        <p>Hanya yang tersedia</p>
        <ToggleButton />
      </div>
      <button className="border p-2 m-2 w-[80%] font-bold text-[#ffffff] bg-[#414dea]">
        {" "}
        Reset
      </button>
    </div>
  );
}
