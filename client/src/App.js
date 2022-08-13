import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages";
import StudentEmailSignup from "./components/Signup/Details";
import AdminLogin from "./components/Admin/Login";
import Navbar from "./components/Navbar";

import Login from "./components/Login";
import Signup from "./components/Signup/EmailCollect";
import Organiserform from "./components/Organizer/organiser";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Navbar toggle={toggle} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup/stdemail" element={<StudentEmailSignup />} />
        <Route path="/login/admin" element={<AdminLogin />} />

        <Route path="/admin/organizer/add" element={<Organiserform />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
