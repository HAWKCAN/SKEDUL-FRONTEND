import Header from "../components/Header.jsx";
import KotakBorder from "../components/KotakBorder.jsx";
export default function Lantai3() {
  return (
    <body className="bg-linear-to-t from-[#edf2fb] via-[#ccdbfd] to-[#abc4ff] min-h-screen max-h-dvh">
      <Header />
      <div className="border-2 m-5 grid grid-rows-[1fr_1fr_3fr] rounded-md h-[calc(100vh-150px)] bg-[#C1D3FE]">
        <div className="grid grid-cols-[3fr_1fr_3fr]  gap-4 m-5 h-[150px]">
          <KotakBorder />
          <div className="flex flex-col justify-center text-[20px] text-[#00000042] items-center text-center">
            <i class="fa-solid fa-arrow-up"></i>
            <p>TANGGA</p>
          </div>
          <KotakBorder />
        </div>
        <div className=" grid grid-cols-[1fr_1fr_1fr] gap-5 m-5 h-[150px] ">
          <div className="flex  flex-row  justify-start text-[20px] items-center text-center text-[#00000042]  content-center">
           
          </div>
          <div className="flex justify-center text-[40px] text-[#00000042] items-center text-center">
            LANTAI 3
          </div>
          <div className="flex  flex-row  justify-end text-[20px] items-center text-center text-[#00000042]  content-center">
   
          </div>
        </div>
        <div className="grid grid-cols-[2fr_2fr_1fr_2fr_2fr] gap-4 m-5 ">
          <KotakBorder />
          <KotakBorder />
          <div className="flex  flex-col  justify-end text-[20px] items-center text-center text-[#00000042]  content-center">
         
          </div>
          <KotakBorder />
          <KotakBorder />
        </div>
      </div>
    </body>
  );
}

