import { Header, LeftSide, ButtonType } from "../components";
// import { logout } from "../../api/auth";
// import { useState, useEffect } from "react";

export default function Reservation() {
    return (
        <div className="max-h-dvh">
            <Header to="/Reservation"/>
            <div className="grid grid-cols-[1fr_4fr]">
                <div className="flex flex-col">
                    <LeftSide/>
                </div>
                <div>
                    <h1 className="mt-2 text-[36px] font-bold">Ajukan Peminjaman</h1>
                    <div className="bg-[#F5F8FF] w-[50%] border border-[#a2beff] rounded-md mr-5 mt-3 pl-3 pt-2 pb-2 font-bold">
                        <div className="grid grid-cols-[1fr_1fr]">
                            <div>
                                <p>Nama</p>
                                <input type="text" className="bg-[#FFFFFF] w-[70%] border border-[#a2beff] rounded-md font-normal mb-3 pl-2"/>
                                <p>Tanggal Peminjaman</p>
                                <input type="date" className="bg-[#FFFFFF] w-[70%] border border-[#a2beff] rounded-md font-normal mb-3 pl-2"/>
                            </div>
                            <div>
                                <p>Waktu Mulai</p>
                                <input type="time" className="bg-[#FFFFFF] w-[50%] border border-[#a2beff] rounded-md font-normal mb-3 pl-2"/>
                                <p>Waktu Selesai</p>
                                <input type="time" className="bg-[#FFFFFF] w-[50%] border border-[#a2beff] rounded-md font-normal mb-3 pl-2"/><br />

                            </div>
                        </div>
                        <input type="submit" value="Ajukan" className="font-bold text-[#ffffff] bg-[#414dea] hover:bg-[#5e74f6] rounded-md p-1"/>
                    </div>
                </div>
            </div>
        </div>
    )
}