import { Link } from "react-router-dom";
import LoginButton from "../components/LoginButton";
export default function Login() {
  return (
    <div className="flex bg-[url(public/images/background_login2.jpg)]  bg-cover bg-center bg-no-repeat flex-col h-dvh lg:w-dvw justify-center text-center items-center">
      <title>Login Page</title>
      <div className="grid grid-rows-[1fr_1fr_1fr_2fr] relative lg:flex lg:flex-col lg:text-[20px] text-[10px] gap-2  p-10 text-[#000000] rounded-[10px] bg-[#e5e5e594]  lg:h-[50%] lg:w-[30%] w-[80%] justify-center lg:justify-around  items-center ">
        <div className="absolute left-8 top-5">
          <Link to='/'> 
            <i class="fa-solid fa-arrow-left"></i>
          </Link>
        </div>
        <p className="text-[20px] ">LOGIN </p>
        <div className="gap-2 flex  lg:text-[20px] text-[15px] lg:flex-row items-center flex-col">
          <label className="text-start " htmlFor="">
            Username :
          </label>
          <input
            className="border-solid border-2 p-2 "
            placeholder="Username"
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div className="gap-2 flex  lg:text-[20px] text-[15px] lg:flex-row items-center  flex-col">
          <label className="text-start" htmlFor="">
            Password :
          </label>
          <input
            className="border-solid border-2  p-2"
            placeholder="*********"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="flex flex-row  justify-center items-center lg:gap-30 gap-5">
          <LoginButton type='submit' className='hover:bg-[]' />
        
          <button className="lg:text-[20px] ">forgot Password?</button>
        </div>
      </div>
    </div>
  );
}
