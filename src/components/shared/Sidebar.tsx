import React from "react";
import styled from "styled-components";

interface LinkItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active: boolean;
}

const Sidebar = () => {
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
    <SidebarDiv>
      {linkItems.map((item, index) => (
        <LinkItem
          key={index}
          onClick={() => handleClick(index)}
          active={index === activelink}
        >
          {item}
        </LinkItem>
      ))}
    </SidebarDiv>
  );
};

const SidebarDiv = styled.div`
  width: 240px;
  font-family: "Host Grotesk", sans-serif;
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
`;
export default Sidebar;
