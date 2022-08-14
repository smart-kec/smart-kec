import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbarComponent";
import Home from "./pages/homePage";
import AdminLogin from "./components/adminLogin";
import Login from "./components/loginComponent";
import StudentEmailSignup from "./components/studentSignupEmailComponent";
import OTPBox from "./components/studentSignupOtpComponent";
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
        <Route path="/" element={<Home />} />{" "}
        <Route path="/login/admin" element={<AdminLogin />} />{" "}
        <Route path="/login" element={<Login />} />{" "}
        <Route path="/signup/stdemail" element={<StudentEmailSignup />} />{" "}
        <Route path="/signup/otp" element={<OTPBox />} />{" "}
        {/* <Route path="/signup" element={<Signup />} /> */}{" "}
        {/* <Route path="/admin/organizer/add" element={<Organiserform />} /> */}{" "}
      </Routes>{" "}
    </>
  );
}

export default App;
