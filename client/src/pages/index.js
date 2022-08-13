import React, { useState } from "react";
import HeroSection from "../components/Homepage/HeroSection";
import InfoSection from "../components/Homepage/InfoSection";
import { homeObjOne } from "../components/Homepage/InfoSection/Data";
import Sidebar from "../components/Navbar/Sidebar";
import Services from "../components/Homepage/Services";
import Footer from "../components/Homepage/Footer";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <HeroSection />
      <InfoSection {...homeObjOne} />
      <Services />
      <Footer />
    </>
  );
};

export default Home;
