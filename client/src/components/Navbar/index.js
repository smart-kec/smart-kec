import React from 'react';
import {FaBars} from 'react-icons/fa';
import {Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks,NavBtn, NavBtnLink} from './NavbarElements';

const Navbar = ({ toggle }) => {
  return (
    <>
        <Nav>
            <NavbarContainer>
                <NavLogo to='/'>Smart_KEC</NavLogo>
                <MobileIcon onClick={toggle}>
                    <FaBars />
                </MobileIcon>
                <NavMenu>
                    <NavItem>
                        <NavLinks to="home">Home</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="event">Event</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="labs/halls">Labs/Halls</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="/student_signup">Student Signup</NavLinks>
                    </NavItem>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/login">Login</NavBtnLink>
                </NavBtn>
            </NavbarContainer>
        </Nav>
    </>
  )
}

export default Navbar