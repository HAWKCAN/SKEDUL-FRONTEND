import React from "react";
import ReactDOM from "react-dom/client"; // ✅ gunakan ini untuk createRoot
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ import router

import "./index.css";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import DashboardAdmin from "./pages/dashboard/Dashboard.jsx";
import Reservation from "./pages/Reservation.jsx";
import Profile from "./pages/Profile.jsx";
import Mhs_Reg from "./pages/Register/Mhs_Reg.jsx";
import Dosen_Reg from "./pages/Register/Dosen_Reg.jsx";
import ProtectedRoute from "./components/ProtectedRoutes.jsx";
import DashboardMurid from "./pages/dashboard/DashboardMurid.jsx";
import DashboardDosen from "./pages/dashboard/DashboardDosen.jsx";
import Isi_Jadwal from "./pages/Register/Isi_Jadwal.jsx";
import ReservasiSaya from "./pages/ReservasiSaya.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Mhs_Reg" element={<Mhs_Reg />} />
      <Route path="/Dosen_Reg" element={<Dosen_Reg />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/DashboardMurid" element={<DashboardMurid />} />
      <Route path="/DashboardDosen" element={<DashboardDosen />} />
      <Route path="/Reservation/:id" element={<Reservation />} />
      <Route path="/Isi_Jadwal" element={<Isi_Jadwal />} />
      <Route path="/ReservasiSaya" element={<ReservasiSaya />} />
      <Route
        path="/DashboardAdmin"
        element={
          <ProtectedRoute>
            <DashboardAdmin />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);
