import React, { useState } from "react";
import styled from "styled-components";
import LogoImage from "../utils/Images/LogoC1.png";
import AuthImage from "../utils/Images/pexels-olly-864990.jpg";
import SignUp from "../components/SignUp.jsx";
import SignIn from "../components/SignIn.jsx";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  background: ${({ theme }) => theme.bg};
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

// Image and Logo side(Left side)
const Left = styled.div`
  flex: 1;
  background: blue;
  position: relative;
  @media (max-width: 700px) {
    display: none;
  }
`;

const Logo = styled.img`
  position: absolute;
  width: 100px;
  top: 50px;
  left: 320px;
  z-index: 10;
  border-radius:50px;
@media(max-width:700px)
{
width: 100px;
  top: 50px;
  left: 180px;
}
`;
const Image = styled.img`
  position: relative;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

// Form side (Right Side)
const Right = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 16px;
  align-items: center;
  justify-content: center;
  // background-color:#91a3b0;
  // background-color:#A78DA5;
  // background-color:#7C9473;
  // background-color:#8F738A;
  background-color:#6C93A4;

`;
const Text = styled.div`
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 16px;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;
const TextButton = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
`;

const Authentication = () => {
  const [login, setLogin] = useState(false);
  return (
    <Container>
      <Left>
        {/* <Logo src={LogoImage} /> */}
        <Image src={AuthImage} />
      </Left>
      <Right>
      <Logo src={LogoImage} />
      {!login ? (
          <>
            <SignIn />
            <Text>
              Don't have an account?{" "}
              <TextButton onClick={() => setLogin(true)}>SignUp</TextButton>
            </Text>
          </>
        ) : (
          <>
            <SignUp />
            <Text>
              Already have an account?{" "}
              <TextButton onClick={() => setLogin(false)}>SignIn</TextButton>
            </Text>
          </>
        )}
      </Right>
    </Container>
  );
};

export default Authentication;
