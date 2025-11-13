import Header from "../components/Header.jsx";
import KotakBorder from "../components/KotakBorder.jsx";
import LeftSide from "../components/LeftSide.jsx";
function Lantai2() {
  return (
    <body className="bg-[#EDF2FB] min-h-screen max-h-dvh">
      <Header />

      <div className="grid grid-cols-[1fr_4fr]">
        <div>
          <LeftSide />
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
              LANTAI 2
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

export default Lantai2;
