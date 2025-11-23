export default function SearchBar({ placeholder, onChange }) {

    
  return (
    <div className="flex items-center justify-center p-5">
      <input
        type="text"
        placeholder={placeholder || "Cari..."}
        className="border border-[#2c34a7] bg-white p-2 w-full rounded-md text-center"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
