import { Link } from "react-router-dom";
export default function LoginButton() {
  return (
    <Link
      className="items-center p-1 w-25 rounded-md text-[#ffffff] font-bold bg-[#414dea] hover:bg-[#5e74f6] text-center"
      to="/login"
    >
      <button className="text-[20px]  ">Login</button>
    </Link>
  );
}
