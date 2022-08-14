import React, { useState } from "react";
import HeroSection from "../components/heroSection";
import InfoSection from "../components/infoComponent";
import homeObjOne from "../assets/data/Data.json";
import Sidebar from "../components/sidebarComponent";
import Services from "../components/servicesComponent";
import Footer from "../components/footerComponent";

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
