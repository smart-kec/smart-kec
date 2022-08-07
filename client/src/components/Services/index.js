import React from 'react'
import Icon1 from '../../images/svg-1.svg'
import Icon2 from '../../images/svg-1.svg'
import Icon3 from '../../images/svg-1.svg'
import { useState, useEffect } from 'react'
import { ServicesContainer, ServicesH1, ServicesWrapper, ServicesCard, ServicesIcon, ServicesH2, ServicesP } from './ServicesElements'



// const[image2,setImage] = useState(null)
// useEffect(() => {
  //   setImage(require('../../images/'+Icon2))
  // }, [])
  
  // const[image3,setImage] = useState(null)
  // useEffect(() => {
    //   setImage(require('../../images/'+Icon3))
    // }, [])
    
    const Services = () => {
      const[image,setImage] = useState({})
      useEffect(() => {
        const imageCopy = image;
        imageCopy.img1 = require('../../images/'+Icon1)
        imageCopy.img2 = require('../../images/'+Icon2)
        imageCopy.img3 = require('../../images/'+Icon3)
        setImage(imageCopy)
      }, [])
      return (
        <ServicesContainer id="services">
    <ServicesH1>Our Services</ServicesH1>
    <ServicesWrapper>
        <ServicesCard>
            <ServicesIcon src={image.img1}/>
            <ServicesH2>Event updates</ServicesH2>
            <ServicesP>We help you with the regular update of events in KEC.</ServicesP>
        </ServicesCard>
        <ServicesCard>
            <ServicesIcon src={image.img2}/>
            <ServicesH2>Registration</ServicesH2>
            <ServicesP>You can register for the events easily.</ServicesP>
        </ServicesCard>
        <ServicesCard>
            <ServicesIcon src={image.img3}/>
            <ServicesH2>Keep Track</ServicesH2>
            <ServicesP>We help you keep track of the events happening in KEC and the ones you've attended.</ServicesP>
        </ServicesCard>
    </ServicesWrapper>
    </ServicesContainer>
  )
}

export default Services