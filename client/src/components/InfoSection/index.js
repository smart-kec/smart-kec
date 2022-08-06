import React from 'react';
import { Button } from '../ButtonElements';

import { InfoContainer, InfoWrapper, InfoRow, Column1, Column2, TextWrapper, TopLine, Heading, Subtitle, BtnWrap, ImgWrap, Img } from './InfoElements';

import { homeObjOne } from './Data';
const InfoSection = ({lightBg, id, imgStart, topLine, lightText, headLine, darkText, description, buttonLabel, img, alt}) => {

console.log(homeObjOne);

    
  return (
    <>
   
 
     <InfoContainer lightBg={homeObjOne.lightBg} id={homeObjOne.id}>
        <InfoWrapper>
            <InfoRow imgStart={'imgStart'}> 
                <Column1>
                    <TextWrapper>
                        <TopLine>{homeObjOne.topLine}</TopLine>
                          <Heading lightText={homeObjOne.lightText}>{homeObjOne.headLine}</Heading>
                           <Subtitle darkText={homeObjOne.darkText}>{homeObjOne.description}</Subtitle>
                        <BtnWrap>
                            <Button to="home">{homeObjOne.buttonLabel}</Button>
                        </BtnWrap> 
                    </TextWrapper>
                </Column1>
                <Column2>
                    <ImgWrap>
                        <Img src={homeObjOne.img} alt={homeObjOne.alt}/>
                    </ImgWrap>
                </Column2> 
            </InfoRow>
        </InfoWrapper>
     </InfoContainer> 
    </>
  )
}

export default InfoSection