import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Login from "./pages/Login";
import UserPortal from "./pages/UserPortal";
import OwnerPortal from "./pages/OwnerPortal"; // ✅ import the real file

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user" element={<UserPortal />} />
      <Route path="/owner" element={<OwnerPortal />} /> {/* ✅ fixed */}
    </Routes>
  </BrowserRouter>
);
