import React, { useEffect, useState } from "react";
import { Button } from "../ButtonElements";

import {
  InfoContainer,
  InfoWrapper,
  InfoRow,
  Column1,
  Column2,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  BtnWrap,
  ImgWrap,
  Img,
} from "./InfoElements";

import { homeObjOne } from "./Data";
const InfoSection = ({
  lightBg,
  id,
  imgStart,
  topLine,
  lightText,
  headLine,
  darkText,
  description,
  buttonLabel,
  img,
  alt,
  primary,
  dark,
  dark2,
}) => {
  console.log(homeObjOne);
  const [image, setImage] = useState(null);
  useEffect(() => {
    setImage(require("../../images/" + homeObjOne.img));
  }, []);

  return (
    <>
      <InfoContainer lightBg={homeObjOne.lightBg} id={homeObjOne.id}>
        <InfoWrapper>
          <InfoRow imgStart={homeObjOne.imgStart}>
            <Column1>
              <TextWrapper>
                <TopLine>{homeObjOne.topLine}</TopLine>
                <Heading lightText={homeObjOne.lightText}>
                  {homeObjOne.headLine}
                </Heading>
                <Subtitle darkText={homeObjOne.darkText}>
                  {homeObjOne.description}
                </Subtitle>
                <BtnWrap>
                  <Button
                    to="home"
                    smooth={true}
                    duration={500}
                    spy={true}
                    offset={-80}
                    primary={homeObjOne.primary ? 1 : 0}
                    dark={homeObjOne.dark ? 1 : 0}
                    dark2={homeObjOne.dark2 ? 1 : 0}
                  >
                    {homeObjOne.buttonLabel}
                  </Button>
                </BtnWrap>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgWrap>
                <Img src={image} alt={homeObjOne.alt} />
              </ImgWrap>
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
};

export default InfoSection;
