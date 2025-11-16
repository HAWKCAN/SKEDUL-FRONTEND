import { useState } from "react";
export default function ToggleButton() {
  const [aktif, setAktif] = useState(false);
  return (
    <div>
      <div
        className={`border w-15 h-6 flex items-center rounded-full m-2 transition ${
          aktif ? "bg-[#7d99fc]" : "bg-[#fffffff]"
        }
        `}
        onClick={() => setAktif(!aktif)}
      >
        <div
          className={`border w-4 m-1 h-4 rounded-full transition-transform duration-300 bg-white ${
            aktif ? "translate-x-8" : "translate-x-0"
          }`}
        ></div>
      </div>
    </div>
  );
}
