import React from "react";
import styled from "styled-components";

import errorImg from "../../assets/images/error.svg";
import AppButton from "./AppButton";

function AppError({ onReload }: { onReload: () => void }) {
  return (
    <ErrorWrapper>
      <ErrorImage src={errorImg} />
      <ErrorP> Network error</ErrorP>
      <AppButton text="try again" variant="primary" onClick={onReload} />
    </ErrorWrapper>
  );
}

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ErrorImage = styled.img`
  width: 80px;
  height: 80px;
`;

const ErrorP = styled.p`
  color: #3e4c59;
  font-size: 14px;
  text-align: center;
  margin-bottom: 30px;
`;
export default AppError;
