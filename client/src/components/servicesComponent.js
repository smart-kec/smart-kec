import React from "react";
// import { useState, useEffect } from "react";

import Icon1 from "../assets/images/svg-4.svg";
import Icon2 from "../assets/images/svg-3.svg";
import Icon3 from "../assets/images/svg-2.svg";

import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
} from "../assets/styles/style/ServicesElements";

// const[image2,setImage] = useState(null)
// useEffect(() => {
//   setImage(require('../../images/'+Icon2))
// }, [])

// const[image3,setImage] = useState(null)
// useEffect(() => {
//   setImage(require('../../images/'+Icon3))
// }, [])

const Services = () => {
  //TODO: Set State from image
  // const [image, setImage] = useState({});
  // useEffect(() => {
  //   const imageCopy = image;
  //   imageCopy.img1 = Icon1;
  //   imageCopy.img2 = Icon2;
  //   imageCopy.img3 = Icon3;
  //   setImage(imageCopy);
  // }, []);
  return (
    <ServicesContainer id="services">
      <ServicesH1>Our Services</ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon1} alt="image" />
          <ServicesH2>Event updates</ServicesH2>
          <ServicesP>
            We help you with the regular update of events in KEC.
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon2} alt="image" />
          <ServicesH2>Registration</ServicesH2>
          <ServicesP>You can register for the events easily.</ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon3} alt="image" />
          <ServicesH2>Keep Track</ServicesH2>
          <ServicesP>
            We help you keep track of the events happening in KEC and the ones
            you've attended.
          </ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  );
};

export default Services;
