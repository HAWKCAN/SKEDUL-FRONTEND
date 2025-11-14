export default function LoginButton({ type }) {
  return (
    <button
      type={type}
      className="items-center p-1 w-25 rounded-md text-[#ffffff] font-bold bg-[#414dea] hover:bg-[#5e74f6] text-center text-[20px]"
    >
      Login
    </button>
  );
}
