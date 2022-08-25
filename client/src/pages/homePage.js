import React, { useState } from "react";

import Sidebar from "../components/sidebarComponent";
import Footer from "../components/footerComponent";
import Navbar from "../components/navbarComponent";

import { Outlet } from "react-router-dom";
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar toggle={toggle} />
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
