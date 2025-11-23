export default function LeftSide() {
  return (
    <div className="flex flex-col items-center justify-center text-center rounded-md p-5">
      <input
        className="border border-[#2c34a7] bg-white m-2 p-2 w-full text-center rounded-md"
        type="text"
        name="cari"
        id="cari"
        placeholder="Cari Ruangan"
      />
    </div>
  );
}
