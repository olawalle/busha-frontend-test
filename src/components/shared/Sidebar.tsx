import React, { FC } from "react";
import styled from "styled-components";

interface LinkItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active: boolean;
}

const Sidebar: FC<{
  isOpen: boolean;
  setIsSidebarOpen: (e: boolean) => void;
}> = ({ isOpen, setIsSidebarOpen }) => {
  const linkItems: string[] = [
    "Wallets",
    "Prices",
    "Peer2Peer",
    "Activity",
    "Settings",
  ];
  const [activelink, setActiveLink] = React.useState(0);

  const handleClick = (index: number) => {
    setActiveLink(index);
  };
  return (
    <SidebarDiv isOpen={isOpen}>
      {linkItems.map((item, index) => (
        <LinkItem
          key={index}
          onClick={() => {
            handleClick(index);
            setIsSidebarOpen(false);
          }}
          active={index === activelink}
        >
          {item}
        </LinkItem>
      ))}
    </SidebarDiv>
  );
};

const SidebarDiv = styled.div<{ isOpen: boolean }>`
  width: 240px;
  font-family: "Host Grotesk", sans-serif;
  display: block;
  @media (max-width: 768px) {
    width: 100%;
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    position: absolute;
    top: 80px;
    background: white;
    height: calc(100vh - 80px);
    left: 0;
    padding: 20px;
  }
`;

const LinkItem = styled.div<LinkItemProps>`
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;
  color: #3e4c59;
  display: flex;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  border-radius: 5px;
  padding-left: 15px;
  font-size: 16px;
  &:hover {
    background-color: #f5f7fa;
  }
  ${({ active }) =>
    active &&
    `
    color: #000000;
    font-weight: 500;
    background-color: #F5F7FA;
  `}
  @media (max-width: 768px) {
    width: 200px;
  }
`;
export default Sidebar;
