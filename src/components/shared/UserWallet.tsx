import React, { FC } from "react";
import { IAccount } from "../../Pages/Wallets";
import styled from "styled-components";
import ngn from "../../assets/images/ngn.svg";
import eth from "../../assets/images/eth.svg";
import ltc from "../../assets/images/ltc.svg";
import btc from "../../assets/images/btc.svg";
import caret from "../../assets/images/caret.svg";
import walletBG from "../../assets/images/wallet-bg.svg";

const UserWallet: FC<{ account: IAccount }> = ({ account }) => {
  const getWalletIcon = (): string => {
    switch (account.currency) {
      case "NGN":
        return ngn;
      case "ETH":
        return eth;
      case "LTC":
        return ltc;
      case "BTC":
        return btc;
      default:
        return ltc;
    }
  };

  const formatBalance = (balance: string): string => {
    return Intl.NumberFormat("en-NG", {
      maximumFractionDigits: 8,
      minimumFractionDigits: 0,
    }).format(parseFloat(balance));
  };

  return (
    <UserWalletDiv>
      <WalletHeader>
        <WalletIcon src={getWalletIcon()} />
        <WalletName>{account.name}</WalletName>
      </WalletHeader>
      <WalletBalance>
        {account.balance} {account.currency}
      </WalletBalance>

      <CaretWrapper>
        <img src={caret} alt="caret" />
      </CaretWrapper>
    </UserWalletDiv>
  );
};

const UserWalletDiv = styled.div`
  box-shadow: 0px 10px 20px 0px #8a8a8a80;
  width: 260px;
  height: 150px;
  border-radius: 10px;
  background-color: #111111;
  padding: 20px;
  background-image: url(${walletBG});
  background-size: cover;
`;

const WalletHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const WalletIcon = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  margin-right: 10px;
`;

const WalletName = styled.p`
  color: #9aa5b1;
  font-size: 14px;
  margin: 0;
`;

const WalletBalance = styled.h2`
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
`;

const CaretWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background-color: #303030;
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;
`;

export default UserWallet;
