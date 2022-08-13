import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages";
import AdminLogin from "./components/Admin/Login";
import Login from "./components/Login";
import StudentEmailSignup from "./components/Signup/EmailCollect";
import OTPBox from "./components/Signup/OTP";
// import Signup from "./components/Signup/Details";
// import Organiserform from "./components/Organizer/organiser";

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
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login" element={<Login />} />
         <Route path="/signup/stdemail" element={<StudentEmailSignup />} /> 
        <Route path="/signup/otp" element={<OTPBox/>} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/admin/organizer/add" element={<Organiserform />} /> */}
      </Routes>
    </>
  );
}

export default App;
