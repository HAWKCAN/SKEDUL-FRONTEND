
import KotakBorder from "../components/KotakBorder.jsx";
import ToggleButton from "../components/ToggleButton.jsx";
function Lantai1() {
  return (
    <body className="bg-[#EDF2FB] min-h-screen max-h-dvh">


      <div className="grid grid-cols-[1fr_4fr]">
        <div className="w-auto">
          <div className="border flex flex-col items-center text-center gap-2 rounded-md bg-[#ffffff] h-auto m-5 pb-5 pt-5">
            <label className="m-2 text-[20px] w-full font-bold" htmlFor="">
              Cari Ruangan
            </label>
            <input
              className="border-2 border-solid m-2 p-2 w-[80%] rounded-md"
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
        </div>

        <div className="  grid grid-rows-[1fr_1fr_3fr] border-l rounded-md h-[calc(100vh-100px)] ">
          <div className="grid grid-cols-[3fr_1fr_3fr]  gap-4 m-5 h-[150px]">
            <KotakBorder />
            <div className="flex flex-col justify-center text-[20px] text-[#00000042] items-center text-center">
              <i class="fa-solid fa-arrow-up"></i>{" "}
              <i class="fa-solid fa-arrow-down"></i>
              <p>TANGGA</p>
            </div>
            <KotakBorder />
          </div>
          <div className=" grid grid-cols-[1fr_1fr_1fr] gap-5 m-5 h-[150px] ">
            <div className="flex  flex-row  justify-start text-[20px] items-center text-center text-[#00000042]  content-center">
              <i class="fa-solid fa-arrow-left"></i>
              <p>PINTU 3</p>
            </div>
            <div className="flex justify-center text-[40px] text-[#00000042] items-center text-center">
              LANTAI 1
            </div>
            <div className="flex  flex-row  justify-end text-[20px] items-center text-center text-[#00000042]  content-center">
              <p>PINTU 2</p>
              <i class="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          <div className="grid grid-cols-[2fr_2fr_1fr_2fr_2fr] gap-4 m-5 ">
            <KotakBorder />
            <KotakBorder />
            <div className="flex  flex-col  justify-end text-[20px] items-center text-center text-[#00000042]  content-center">
              <p>PINTU 1</p>
              <i class="fa-solid fa-arrow-down"></i>
            </div>
            <KotakBorder />
            <KotakBorder />
          </div>
        </div>
      </div>
    </body>
  );
}

export default Lantai1;
