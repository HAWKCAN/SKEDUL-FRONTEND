import { Header, LeftSide, Lantai } from "../../components";
export default function Dashboard() {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-[1fr_4fr]">
        <div>
          <LeftSide />
        </div>
        {/* <Lantai classname="font-light" /> */}

        {/* Ini Dashboard Buat Admin */}
        <div>
          <h1 className="mt-2 text-[36px] font-bold">Dashboard</h1>
          <p className="text-[20px]">Sabtu, 14 November 2025</p>
          <div className="bg-[#ffffff] h-[12vh] border-solid border-1 rounded-md mt-3 mr-5">
            <table className="w-[100%] h-[70%] text-center text-[18px] mt-3">
              <tr>
                <th>Peminjaman Pending</th>
                <th className="border-r border-l">Peminjaman Diterima</th>
                <th>Peminjaman Ditolak</th>
              </tr>
              <tr>
                {/* Ini bisa diisi nilai aktual dari database nya */}
                <td>3</td>
                <td className="border-r border-l">3</td>
                <td>3</td>
              </tr>
            </table>
          </div>

          <div className="bg-[#ffffff] border-solid border-1 rounded-md mt-5 mr-5">
            <h1 className="text-[18px] font-bold ml-2 mt-2">Daftar Pending</h1>
            <table className="w-[100%] text-center mb-2">
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Tanggal Peminjaman</th>
                <th>Ruangan</th>
                <th>Keterangan</th>
                <th>Aksi</th>
              </tr>
              {/* Bagian di bawah ini bisa di update pake php buat setiap history yang ada*/}
              <tr>
                <td>1</td>
                <td className="w-[32%]">Mohammad Ferdian Samputra</td>
                <td>20-11-2025</td>
                <td>E205</td>
                <td>
                  <a href="">Selengkapnya...</a>
                </td>
                <td>
                  <button className="bg-[#ABC4FF] rounded-md hover:bg-[#5e74f6] w-15 h-7 mr-1 cursor-pointer">
                    Terima
                  </button>
                  <button className="bg-[#ABC4FF] rounded-md hover:bg-[#5e74f6] w-15 h-7 ml-1 cursor-pointer">
                    Tolak
                  </button>
                </td>
              </tr>
            </table>
          </div>

          <div className="bg-[#ffffff] border-solid border-1 rounded-md mt-5 mr-5">
            <h1 className="text-[18px] font-bold ml-2 mt-2">
              Histori Peminjaman
            </h1>
            <table className="w-[100%] text-center mb-2">
              <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>Nama</th>
                <th>Tanggal Peminjaman</th>
                <th>Ruangan</th>
                <th>Status</th>
                <th>Keterangan</th>
              </tr>
              {/* Bagian di bawah ini bisa di update pake php buat setiap history yang ada*/}
              <tr>
                <td>1</td>
                <td>15-11-2025</td>
                <td>Mohammad Ferdian Samputra</td>
                <td>20-11-2025</td>
                <td>E205</td>
                <td>Approved</td>
                <td>Selengkapnya...</td>
              </tr>
            </table>
          </div>
        </div>
        {/* <div className=" h-[calc(100dvh-100px)] grid grid-rows-[1fr_5fr] pl-2 pt-5 pr-5 ">
          <div className="border bg-[#ffffff] grid grid-cols-[1fr_1fr_1fr] text-center text-[18px] p-5">
            <div className="border-r pl-2 ">
              <p className="pb-3 font-bold ">Peminjaman Pending</p>
            </div>
            <div className="border-r pl-5 font-bold ">
              <p>Peminjaman Diterima</p>
            </div>
            <div className="pl-5 font-bold ">
              <p>Peminjaman Ditolak</p>
            </div>
          </div>
        </div> */}

        {/* Ini Dashboard Buat Dosen & Mahasiswa */}
      </div>
    </div>
  );
}
