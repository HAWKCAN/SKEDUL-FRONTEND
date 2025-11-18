import { Tersedia, Penuh, DetailButton, ButtonType } from "../../components";

export default function Card({ data }) {
  const statusUI = data.status === "tersedia" ? <Tersedia /> : <Penuh />;

  return (
    <div className="bg-[#F5F8FF] border border-[#a2beff] rounded-md h-[300px] w-auto p-5 grid grid-rows-[1fr_1fr_1fr]">
      {/* HEADER */}
      <div className="flex flex-row justify-between">
        <div className="text-[30px] font-bold">
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

 
      <div className="flex flex-row gap-5 items-end">
        <DetailButton />
<<<<<<< HEAD
        <ButtonType type="submit" Name="Reservasi" />
=======
        <ButtonType type='submit' Name='Reservasi' to="/Reservation"/>
>>>>>>> 6a982d5c4db5b658ca43368d52eaa715e0e1b506
      </div>
    </div>
  );
}
