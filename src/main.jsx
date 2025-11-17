import React from "react";
import ReactDOM from "react-dom/client"; // ✅ gunakan ini untuk createRoot
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ import router

import "./index.css";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import DashboardAdmin from "./pages/dashboard/Dashboard.jsx";

import Mhs_Reg from "./pages/Register/Mhs_Reg.jsx";
import ProtectedRoute from "./components/ProtectedRoutes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />

        <Route path="/Mhs_Reg" element={<Mhs_Reg />} />
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
  </React.StrictMode>
);
