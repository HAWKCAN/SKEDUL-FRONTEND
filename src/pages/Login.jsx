import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ButtonType from "../components/button/ButtonType.jsx";
import { login } from "../api/auth.js";

export default function Login() {
  const [email, setEmail] = useState(""); // email state
  const [password, setPassword] = useState(""); // password state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login(email, password);
      const role = res.data.user.role;
      const user = res.data.user;

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", role);
      localStorage.setItem("name", user.name);

      if (role === "admin") navigate("/DashboardAdmin");
      else if (role === "dosen") navigate("/DashboardDosen");
      else navigate("/DashboardMurid");
    } catch (err) {
      alert("Email atau password salah!");
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="flex bg-login bg-cover bg-center bg-no-repeat flex-col h-dvh lg:w-dvw justify-center text-center items-center">
        <title>Login Page</title>

        <div className="grid grid-rows-[1fr_1fr_1fr_2fr] relative lg:flex lg:flex-col lg:text-[20px] text-[10px] gap-2 p-10 text-[#000000] rounded-[10px] bg-[#e5e5e594] lg:h-[50%] lg:w-[30%] w-[80%] justify-center lg:justify-around items-center">

          <p className="text-[30px] font-bold">LOGIN</p>

          <table>
            <tbody>
              <tr>
                <td>
                  <label className="text-start">Email</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="border-solid border-[1.5px] rounded-md p-2 m-2"
                    /* Hubungkan input ke state */
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
                    className="border-solid border-[1.5px] rounded-md p-2 m-2"
                    /* Hubungkan input ke state */
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex flex-row justify-center items-center lg:gap-30 gap-5">
            <ButtonType type="submit" Name="Login" />

            <button type="button" className="lg:text-[20px]">
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
