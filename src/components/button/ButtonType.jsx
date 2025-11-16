import { Link } from "react-router-dom";

export default function ButtonType({ to, type = "button", Name, onClick }) {
  if (to) {
    return (
      <Link
        to={to}
        className="inline-flex items-center justify-center p-1 w-25 rounded-md text-white font-bold bg-[#414dea] hover:bg-[#5e74f6] text-[20px]"
      >
        {Name}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className="items-center p-1 w-25 rounded-md text-white font-bold bg-[#414dea] hover:bg-[#5e74f6] text-center text-[20px]"
    >
      {Name}
    </button>
  );
}
