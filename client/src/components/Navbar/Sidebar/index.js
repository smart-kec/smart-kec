import React from "react";

import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
  SideBtnWrap,
  SidebarRoute,
} from "./SidebarElements";

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="home" onClick={toggle}>
            Home
          </SidebarLink>
          <SidebarLink to="events" onClick={toggle}>
            Events
          </SidebarLink>
          <SidebarLink to="labs/halls" onClick={toggle}>
            Labs/Halls
          </SidebarLink>
          <SidebarLink to="/signup/email" onClick={toggle}>
            Student Signup
          </SidebarLink>
          <SideBtnWrap>
            <SidebarRoute to="/login" onClick={toggle}>
              Login
            </SidebarRoute>
          </SideBtnWrap>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
