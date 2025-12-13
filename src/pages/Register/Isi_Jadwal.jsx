import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ButtonType } from "../../components";
import { getDosen, getKelas, tambahJadwal } from "../../api/auth.js";

export default function Isi_Jadwal() {
  const [mataKuliah, setMataKuliah] = useState("");
  const [userId, setUserId] = useState("");
  const [kelasId, setKelasId] = useState("");
  const [hari, setHari] = useState("");
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");

  const [dosen, setDosen] = useState([]);
  const [kelas, setKelas] = useState([]);

  useEffect(() => {
    getDosen().then((res) => setDosen(res.data));
    getKelas().then((res) => setKelas(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await tambahJadwal({
        mata_kuliah: mataKuliah,
        user_id: userId,
        kelas_id: kelasId,
        hari,
        jam_mulai: jamMulai,
        jam_selesai: jamSelesai,
      });

      alert("Jadwal kelas berhasil ditambahkan");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Gagal menambahkan jadwal kelas";

      alert(msg);
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex bg-login bg-cover bg-center bg-no-repeat flex-col h-dvh justify-center items-center">
        <div className="relative p-10 bg-[#e5e5e594] rounded-[10px] w-[80%] lg:w-[40%]">
          <div className="absolute left-8 top-5">
            <Link to="/DashboardAdmin">
              <i className="fa-solid fa-arrow-left"></i>
            </Link>
          </div>

          <p className="text-[30px] font-bold text-center mb-5">
            TAMBAH JADWAL KELAS
          </p>

          <table className="mx-auto">
            <tbody>
              <tr>
                <td>
                  <label>Mata Kuliah</label>
                </td>
                <td>
                  <input
                    type="text"
                    className="border rounded-md p-2 m-2 w-[200px]"
                    value={mataKuliah}
                    onChange={(e) => setMataKuliah(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label>Dosen</label>
                </td>
                <td>
                  <select
                    className="border rounded-md p-2 m-2 w-[200px]"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  >
                    <option value="">Pilih Dosen</option>
                    {dosen.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>

              <tr>
                <td>
                  <label>Ruangan</label>
                </td>
                <td>
                  <select
                    className="border rounded-md p-2 m-2 w-[200px]"
                    value={kelasId}
                    onChange={(e) => setKelasId(e.target.value)}
                  >
                    <option value="">Pilih Ruangan</option>
                    {kelas.map((k) => (
                      <option key={k.id} value={k.id}>
                        {k.nama_kelas}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>

              <tr>
                <td>
                  <label>Hari</label>
                </td>
                <td>
                  <select
                    className="border rounded-md p-2 m-2 w-[200px]"
                    value={hari}
                    onChange={(e) => setHari(e.target.value)}
                  >
                    <option value="">Pilih Hari</option>
                    <option>Senin</option>
                    <option>Selasa</option>
                    <option>Rabu</option>
                    <option>Kamis</option>
                    <option>Jumat</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td>
                  <label>Jam Mulai</label>
                </td>
                <td>
                  <input
                    type="time"
                    className="border rounded-md p-2 m-2 w-[200px]"
                    value={jamMulai}
                    onChange={(e) => setJamMulai(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label>Jam Selesai</label>
                </td>
                <td>
                  <input
                    type="time"
                    className="border rounded-md p-2 m-2 w-[200px]"
                    value={jamSelesai}
                    onChange={(e) => setJamSelesai(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-center mt-5">
            <ButtonType type="submit" Name="Tambah Jadwal" />
          </div>
        </div>
      </div>
    </form>
  );
}
