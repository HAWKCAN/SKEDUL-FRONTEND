import{ Tersedia,Penuh,DetailButton,ButtonType} from "../../components"
export default function Card() {
  return (
    <div className="border rounded-md h-[300px] w-auto p-5 grid grid-rows-[1fr_1fr_1fr]">
      <div className="flex flex-row justify-between ">
        <div className="text-[30px] font-bold">
          <h1>R.101</h1>
        </div>
        <div>
          <Tersedia />
        </div>
      </div>
      <div className="flex flex-col justify-end">
        <h3>Ibu Rina</h3>
        <p>08.00-10.00</p>
      </div>
      <div className="flex flex-row gap-5 items-end">
        <DetailButton />
        <ButtonType type='submit' Name='Reservasi' />
      </div>
    </div>
  );
}
