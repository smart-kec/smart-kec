import React from "react";
import { animateScroll as scroll } from "react-scroll";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import {
  FooterContainer,
  FooterWrap,
  FooterLinksContainer,
  FooterLinksWrapper,
  FooterLinkItems,
  FooterLinkTitle,
  FooterLink,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
  WebsiterRights,
  SocialIcons,
  SocialIconLink,
} from "../assets/styles/style/FooterElements";

const Footer = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <FooterContainer>
      <FooterWrap>
        <FooterLinksContainer>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>About Us</FooterLinkTitle>
              <FooterLink to="https://kongu.ac.in/">About</FooterLink>
              <FooterLink to="#">Terms of Service</FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>Contact</FooterLinkTitle>
              <FooterLink to="#">MailUs</FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>Social Media</FooterLinkTitle>
              <FooterLink to="https://www.instagram.com/konguengineeringcollege/">
                Instagram
              </FooterLink>
              <FooterLink to="https://www.facebook.com/konguengineeringcollegeperundurai">
                Facebook
              </FooterLink>
              <FooterLink to="https://www.youtube.com/c/konguengineeringcollege">
                Youtube
              </FooterLink>
              <FooterLink to="https://twitter.com/KonguOfficial">
                Twitter
              </FooterLink>

              <FooterLink to="https://www.linkedin.com/school/kongu-engineering-collegeerode/">
                LinkedIn
              </FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
        </FooterLinksContainer>
        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to="/" onClick={toggleHome}>
              Smart KEC
            </SocialLogo>
            <WebsiterRights>
              Smart KEC © {new Date().getFullYear()} All rights reserved.
            </WebsiterRights>
            <SocialIcons>
              <SocialIconLink
                href="https://www.facebook.com/konguengineeringcollegeperundurai"
                target="_blank"
                aria-label="Facebook"
              >
                <FaFacebook />
              </SocialIconLink>
              <SocialIconLink
                href="https://www.instagram.com/konguengineeringcollege/"
                target="_blank"
                aria-label="Instagram"
              >
                <FaInstagram />
              </SocialIconLink>
              <SocialIconLink
                href="https://www.youtube.com/c/konguengineeringcollege"
                target="_blank"
                aria-label="Youtube"
              >
                <FaYoutube />
              </SocialIconLink>
              <SocialIconLink
                href="https://twitter.com/KonguOfficial"
                target="_blank"
                aria-label="Twitter"
              >
                <FaTwitter />
              </SocialIconLink>
              <SocialIconLink
                href="https://www.linkedin.com/school/kongu-engineering-collegeerode/"
                target="_blank"
                aria-label="Linkedin"
              >
                <FaLinkedin />
              </SocialIconLink>
            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
