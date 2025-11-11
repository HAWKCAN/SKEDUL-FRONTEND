import React from "react";
import ReactDOM from "react-dom/client"; // ✅ gunakan ini untuk createRoot
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ import router

import "./index.css";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Lantai2 from "./pages/Lantai2.jsx";
import Lantai3 from "./pages/Lantai3.jsx";
import Lantai1 from "./pages/Lantai1.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Lantai1" element={<Lantai1 /> } />
        <Route path="/Lantai2" element={<Lantai2 /> } />
        <Route path="/Lantai3" element={<Lantai3 /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
