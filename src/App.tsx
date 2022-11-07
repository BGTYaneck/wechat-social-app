import { useState } from "react";
import { Router, BrowserRouter, Route, Link, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import Login from "./pages/Auth/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
