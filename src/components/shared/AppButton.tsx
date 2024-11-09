import React, { FC } from "react";
import styled from "styled-components";
import Loader from "./Loader";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  text?: string;
  loading?: boolean;
}

const AppButton: FC<ButtonProps> = ({
  children,
  text,
  variant,
  loading,
  ...props
}) => {
  return (
    <ButtonWrapper variant={variant} {...props}>
      {loading ? <Loader /> : text ? text : children}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 54px;
  padding: 0 50px;
  cursor: pointer;
  color: ${(props) => (props.variant === "primary" ? "#ffffff" : "#000000")};
  font-size: 16px;
  border-width: 1px;
  border-color: #000000;
  border-radius: 30px;
  background-color: ${(props) =>
    props.variant === "primary" ? "#000000" : "#f5f7fa"};
`;

export default AppButton;
