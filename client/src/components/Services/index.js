import React from 'react'
import Icon1 from '../../images/svg-2.svg'
import Icon2 from '../../images/svg-3.svg'
import Icon3 from '../../images/svg-4.svg'
import { ServicesContainer, ServicesH1, ServicesWrapper, ServicesCard, ServicesIcon, ServicesH2, ServicesP } from './ServicesElements'


// const[image1,setImage] = useState(null)
// useEffect(() => {
//   setImage(require('../../images/'+Icon1))
// }, [])

// const[image2,setImage] = useState(null)
// useEffect(() => {
//   setImage(require('../../images/'+Icon2))
// }, [])

// const[image3,setImage] = useState(null)
// useEffect(() => {
//   setImage(require('../../images/'+Icon3))
// }, [])

const Services = () => {
  return (
    <ServicesContainer id="services">
    <ServicesH1>Our Services</ServicesH1>
    <ServicesWrapper>
        <ServicesCard>
            <ServicesIcon src={image1}/>
            <ServicesH2>Event updates</ServicesH2>
            <ServicesP>We help you with the regular update of events in KEC.</ServicesP>
        </ServicesCard>
        <ServicesCard>
            <ServicesIcon src={image2}/>
            <ServicesH2>Registration</ServicesH2>
            <ServicesP>You can register for the events easily.</ServicesP>
        </ServicesCard>
        <ServicesCard>
            <ServicesIcon src={image3}/>
            <ServicesH2>Keep Track</ServicesH2>
            <ServicesP>We help you keep track of the events happening in KEC and the ones you've attended.</ServicesP>
        </ServicesCard>
    </ServicesWrapper>
    </ServicesContainer>
  )
}

export default services