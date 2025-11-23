import React, { useState } from "react";
import { Tersedia, Penuh, DetailButton, ButtonType } from "../../components";

export default React.memo(function Card({ data }) {
  const [open, setOpen] = useState(false);
  const statusUI = data.status === "tersedia" ? <Tersedia /> : <Penuh />;

  return (
    <>
      <div className="bg-[#F5F8FF] border border-[#a2beff] mr-10 ml-10 lg:mr-0 lg:ml-0 rounded-md lg:h-[300px] h-[300px] lg:min-w-[250px] w-auto p-5 grid grid-rows-[1fr_1fr_1fr]">
        {/* HEADER */}
        <div className="flex lg:flex-row justify-between">
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
          {/* Klik ini buat buka modal */}
          <div onClick={() => setOpen(true)} className="cursor-pointer">
            <DetailButton />
          </div>

          <ButtonType type="submit" Name="Reservasi" to={`/Reservation/${data.id}`} />
        </div>
      </div>

      {/* POPUP / MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)}/>

          {/* box modal */}
          <div className="relative z-10 w-[90%] max-w-md bg-white shadow-lg rounded-lg border border-[#a2beff] p-5">
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-bold">Detail Ruangan</h2>
              <button onClick={() => setOpen(false)} className="text-xl leading-none">×</button>
            </div>

            <div className="mt-3 text-lg space-y-2">
              <p><b>Nama Kelas:</b> {data.nama_kelas}</p>
              <p><b>Lantai:</b> {data.lantai ?? "-"}</p>
              <p><b>Kapasitas:</b> {data.kapasitas ?? "-"} orang</p>
              <p><b>Gedung:</b> {data.lokasi ?? "-"}</p>
              <p><b>Status:</b> {data.status}</p>
            </div>

            <div className="mt-4 flex justify-end">
              <button onClick={() => setOpen(false)} className="px-3 py-1 rounded text-white font-bold bg-[#414dea] hover:bg-[#5e74f6]">Tutup</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
