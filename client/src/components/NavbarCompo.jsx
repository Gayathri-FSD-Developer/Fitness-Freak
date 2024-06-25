import React, { useState } from "react";
import styled from "styled-components";
import LogoImage from "../utils/Images/LogoC1.png";
import { Link as LinkR, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Avatar } from "@mui/material";
import { logout } from "../redux/reducers/userSlice.js";
import { useDispatch } from "react-redux";

// Styled components
const NavWrap = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 20};
`;
const NavContainer = styled(Container)`
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;
const NavLogo = styled(LinkR)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 6px;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  color: ${({ theme }) => theme.black};
`;
const Logo = styled.img`
  height: 50px;
`;
const MobileIcon = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;
const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Navlink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 1s slide-in;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  };
  &.active {
    color: ${({ theme }) => theme.primary};
    border-bottom: 1.8px solid ${({ theme }) => theme.primary};
  };

  // color: ${(props) => (props.disabled ? '#ccc' : '#000')}; //if probs is disabled
  
`;

const UserContainer = styled.div`
height:100%;
width:100%;
display:flex;
align-items:center;
justify-content:flex-end;
color:${({ theme }) => theme.primary};
gap:16px;
padding: 0 6px;
`;
const TextButton = styled.div`
  text-align: end;
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  font-weight: 600;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const NavbarCompo = ({ currentUser }) => {
  // define dispatch to use
  const dispatch = useDispatch();

  // state managment for navbar toggle
  const [expanded, setExpanded] = useState(false);
  // Onclick Toggle handle
  const handleToggle = () => {
    setExpanded(!expanded);
  }
  // NavLink click handle 
  const handleNavClick = () => {
    setExpanded(false)
  }

  return (
    <NavWrap>
      <NavContainer>
        {/* React bootstrap for mobileview toggle */}
        <Navbar
          expand="lg"
          expanded={expanded}
          onToggle={handleToggle}
          className="custom-navbar"
        >
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto navdrop">
              <Nav.Link as={Navlink} to="/" exact onClick={handleNavClick}>
                Dashboard
              </Nav.Link>
              <Nav.Link as={Navlink} to="/workouts" onClick={handleNavClick}>
                Workouts
              </Nav.Link>
              <Nav.Link as={Navlink} to="/blogs"  onClick={handleNavClick}>
                Blogs
              </Nav.Link>
              <Nav.Link as={Navlink} to="/contact" onClick={handleNavClick}>
                Contact
              </Nav.Link>
              {/* <Nav.Link as={Navlink} to="/tutorials" disabled tabIndex="-1" aria-disabled="true" onClick={handleNavClick}>
                Tutorials
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <NavLogo to="/">
          <Logo src={LogoImage} /> Fitness Freak
        </NavLogo>

        {/* Nav link and items for large screen */}
        <NavItems>
          <Navlink to="/">Dashboard</Navlink>
          <Navlink to="/workouts">Workouts</Navlink>
          <Navlink to="/blogs" >Blogs</Navlink>
          <Navlink to="/contact" >Contact</Navlink>
         {/* <Navlink to="/tutorial" disabled>Tutorial</Navlink> */}
         
        </NavItems>

        {/* User Login */}
        <UserContainer>
        <Avatar src={currentUser?.img}>{currentUser?.name[0]}</Avatar>
        <TextButton onClick={() => dispatch(logout())}>Logout</TextButton>
        </UserContainer>
      </NavContainer>
    </NavWrap>
  );
};

export default NavbarCompo;
