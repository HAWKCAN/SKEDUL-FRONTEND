import { Link } from "react-router-dom";
export default function Profile() {
  const name = localStorage.getItem("name") || "User";
  const email = localStorage.getItem("email") || "Tidak ada email";
  const role = localStorage.getItem("role") || "Mahasiswa";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EAF1FF] to-[#F4F8FF] flex items-center justify-center p-5">
      <div className="bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl w-full max-w-md p-8 border border-[#9DBBFF]">
        <Link to="/DashboardMurid">
          <i class="fa-solid fa-angle-left"></i>
        </Link>
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 bg-[#ABC4FF] rounded-full flex items-center justify-center text-4xl text-white shadow-md"></div>

          <h1 className="mt-4 text-2xl font-bold text-[#2C3E99]">{name}</h1>
          <p className="text-[#5F6FAE] text-sm">{role}</p>
        </div>

        <div className="mt-8 space-y-5">
          <div className="p-4 rounded-xl border border-[#ABC4FF] bg-white shadow-sm">
            <p className="text-sm text-[#6978A6]">Email</p>
            <p className="font-medium text-[#2C3E99]">{email}</p>
          </div>
          <div className="p-4 rounded-xl border border-[#ABC4FF] bg-white shadow-sm">
            <p className="text-sm text-[#6978A6]">Role</p>
            <p className="font-medium text-[#2C3E99]">{role}</p>
          </div>

          <div className="p-4 rounded-xl border border-[#ABC4FF] bg-white shadow-sm">
            <p className="text-sm text-[#6978A6]">User ID</p>
            <p className="font-medium text-[#2C3E99]">
              {localStorage.getItem("user_id") || "Tidak tersedia"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
