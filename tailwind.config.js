/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/index.css", // pastikan CSS ikut di-scan
  ],
  safelist: [
    { pattern: /.*/ }, // paksa semua class tetap disertakan
  ],
  theme: { extend: {} },
  plugins: [],
};
