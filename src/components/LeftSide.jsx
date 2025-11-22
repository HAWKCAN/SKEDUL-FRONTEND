
export default function LeftSide() {
  return (
    <div className="  flex flex-col content-center justify-center items-center  text-center  rounded-md  h-auto max-h-[300px] p-5 lg:p-0 lg:mb-5   ">

        <input
          className="border-1 border-solid border-[#2c34a7] bg-[#ffffff] m-2 p-1 w-[100%] text-center  rounded-md"
          type="text"
          name="cari"
          id="cari"
          placeholder="Cari Ruangan"
        />
    </div>
  );
}
