import { Tersedia, Penuh, DetailButton, ButtonType } from "../../components";

export default function Card({ data }) {
  const statusUI = data.status === "tersedia" ? <Tersedia /> : <Penuh />;

  return (
    <div className="bg-[#F5F8FF] border border-[#a2beff] mr-10 ml-10 lg:mr-0 lg:ml-0 rounded-md lg:h-[300px] h-[300px]  lg:min-w-[250px] w-auto p-5 grid grid-rows-[1fr_1fr_1fr]">
      {/* HEADER */}
      <div className="flex lg:flex-row  justify-between">
        <div className="text-[25px] font-bold">
          <h1>{data.nama_kelas}</h1>
        </div>
        <div>{statusUI}</div>
      </div>


      <div className="flex flex-col justify-end text-[20px]">
        <h3>
          {data.dipakai_oleh ? `User ID: ${data.dipakai_oleh}` : "Tidak ada"}
        </h3>
        <p>{data.jam_mulai ? `${data.jam_mulai} - ${data.jam_selesai}` : ""}</p>
      </div>

 
      <div className="flex flex-row justify-between items-end">
        <DetailButton />

      <ButtonType type='submit' Name='Reservasi' to="/Reservation"/>

      </div>
    </div>
  );
}
