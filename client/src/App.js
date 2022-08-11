import React, { useState} from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages";
import EmailPage from "./components/email/EmailPage";
import SignIn from "./components/Signin";
import Navbar from "./components/Navbar";
import Organiserinfo from './components/Organizer_Info/organiser';

function App() {
    // const [isOpen, setIsOpen] = useState(false);
  
    // const toggle = () => {
    //   setIsOpen(!isOpen);
    // };
  return (
    <>
    {/* <Navbar toggle={toggle} />
    <h1>hi</h1> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/email" element={<EmailPage />} />
        <Route path="/login/admin" element={<SignIn />} />
        <Route path="/admin/organizer/add" element={<Organiserinfo />} />
      </Routes>
    </>
  );
}

export default App;
