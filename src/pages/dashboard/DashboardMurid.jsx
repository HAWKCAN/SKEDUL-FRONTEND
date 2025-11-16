import {
  Header,
  LeftSide,
  Lantai,
  Card,
} from "../../components";
export default function Dashboard() {
  return (
    <div className="text-[#191c4d] bg-[#FFFFFF]">
      <Header />
      <div className="grid grid-cols-[1fr_4fr] ">
        <div>
          <LeftSide />
        </div>

        <div className=" h-[calc(100dvh-100px)] grid grid-rows-[1fr_5fr] pl-2 pt-5 pr-5 ">
          <div className="border border-[#7d99fc] rounded-md bg-[#C5D8FF] grid grid-cols-[1fr_1fr_1fr] text-center text-[18px] p-5">
            <div className="border-r pl-2 border-[#7d99fc]">
              <p className="pb-3 font-bold ">Peminjaman Pending</p>
            </div>
            <div className="border-r pl-5 border-[#7d99fc] font-bold ">
              <p>Peminjaman Diterima</p>
            </div>
            <div className="pl-5 font-bold ">
              <p>Peminjaman Ditolak</p>
            </div>
          </div>
          <div className="grid grid-cols-3 grid-rows-3 gap-5 mt-10 mb-10">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
}
