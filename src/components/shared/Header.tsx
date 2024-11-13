import React, { FC } from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.svg";
import menu from "../../assets/images/menu.svg";
import close from "../../assets/images/close.svg";

const Header: FC<{
  isSidebarOpen: boolean;
  setIsSidebarOpen: (e: boolean) => void;
}> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <HeaderDiv>
      <HeaderContent>
        <Logo alt="logo" src={logo} />

        <RightHeaderDiv>
          <UserName>
            <Avatar>O</Avatar>
            <Name>Oluwatobi Akindunjoye</Name>
          </UserName>

          <ToggleSidebarButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon src={isSidebarOpen ? close : menu} alt="" />
          </ToggleSidebarButton>
        </RightHeaderDiv>
      </HeaderContent>
    </HeaderDiv>
  );
};

const HeaderDiv = styled.div`
  box-shadow: 0px 4px 12px 0px #0000000d;
  position: sticky;
  top: 0;
  left: 0;
`;
const RightHeaderDiv = styled.div`
  display: flex;
`;

const ToggleSidebarButton = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: block;
    margin-left: 10px;
    background: transparent;
    border: 0;
  }
`;

const MenuIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const HeaderContent = styled.div`
  height: 60px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1142px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Logo = styled.img`
  src: ${logo};
`;

const UserName = styled.div`
  font-size: 18px;
  line-height: 22px;
  font-weight: 700;
  color: #000000;
  display: flex;
  align-items: center;
  font-family: "Host Grotesk", sans-serif;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #9aa5b14d;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3e4c59;
`;

const Name = styled.span`
  margin-left: 10px;
  font-size: 14px;
  color: #3e4c59;
  font-size: 14px;
  font-weight: 500;

  @media (max-width: 768px) {
    display: none;
  }
`;

export default Header;
