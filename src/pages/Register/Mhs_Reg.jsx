import { Link } from "react-router-dom";
import { useState } from "react";
import { ButtonType } from "../../components";
import { register } from "../../api/auth.js";

export default function Mhs_Reg() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("mahasiswa");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password, role }, true);
      alert("User berhasil dibuat!");
    } catch (err) {
      alert("Gagal membuat user!");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex bg-[url(public/images/background_login2.jpg)] bg-cover bg-center bg-no-repeat flex-col h-dvh lg:w-dvw justify-center text-center items-center">
        <title>Register Page</title>

        <div className="grid grid-rows-[1fr_1fr_1fr_2fr] relative lg:flex lg:flex-col lg:text-[20px] text-[10px] gap-2 p-10 text-[#000000] rounded-[10px] bg-[#e5e5e594] lg:h-[55%] lg:w-[35%] w-[80%] justify-center lg:justify-around items-center">
          <div className="absolute left-8 top-5">
            <Link to="/">
              <i className="fa-solid fa-arrow-left"></i>
            </Link>
          </div>

          <p className="text-[30px] font-bold">REGISTER USER</p>

          <table>
            <tbody>
              <tr>
                <td>
                  <label className="text-start">Nama</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nama Lengkap"
                    className="border-solid border-[1.5px] rounded-md p-2 m-2 w-[200px]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label className="text-start">Email</label>
                </td>
                <td>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="border-solid border-[1.5px] rounded-md p-2 m-2 w-[200px]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label className="text-start">Password</label>
                </td>
                <td>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="border-solid border-[1.5px] rounded-md p-2 m-2 w-[200px]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label className="text-start">Role</label>
                </td>
                <td>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="border-solid border-[1.5px] rounded-md p-2 m-2 w-[200px]"
                  >
                    <option value="mahasiswa">Mahasiswa</option>
                    <option value="dosen">Dosen</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex flex-row justify-center items-center gap-5">
            <ButtonType type="submit" Name="Tambah User" />
          </div>
        </div>
      </div>
    </form>
  );
}
