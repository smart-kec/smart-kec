import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages";
import StudentEmailSignup from "./components/Signup/EmailCollect/EmailPage";
import SignIn from "./components/Signin";
import Navbar from "./components/Navbar";

import Login from "./components/Logingeneral";
import Signup from "./components/Signup";

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
        <Route path="/login/admin" element={<SignIn />} />

        <Route path="/admin/organizer/add" element={<Organiserinfo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
