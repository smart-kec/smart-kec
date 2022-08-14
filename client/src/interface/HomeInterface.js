import HeroSection from "../components/heroSection";
import InfoSection from "../components/infoComponent";
import homeObjOne from "../assets/data/Data.json";

import Services from "../components/servicesComponent";
const HomeInterface = () => {
  return (
    <>
      <HeroSection />
      <InfoSection {...homeObjOne} />
      <Services />
    </>
  );
};

export default HomeInterface;
