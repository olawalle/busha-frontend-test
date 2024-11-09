import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "../components/shared/Loader";

import UserWallet from "../components/shared/UserWallet";
import Modal from "../components/shared/Modal";
import AddNewWallet from "../components/shared/AddNewWallet";
import AppError from "../components/shared/AppError";

export interface IAccount {
  id: string;
  currency: string;
  hold: string;
  pending_balance: string;
  balance: string;
  name: string;
  type: string;
  deposit: boolean;
  payout: boolean;
  imgURL: string;
}
export interface IWallet {
  currency: string;
  name: string;
  type: string;
  imgURL: string;
}

const Wallets: FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [wallets, setWallets] = useState<IWallet[]>([]);

  const getAccounts = async (reload = true) => {
    setIsLoading(reload);
    try {
      const [response1, response2] = await Promise.all([
        fetch(`${process.env.REACT_APP_API_URL}/accounts`),
        fetch(`${process.env.REACT_APP_API_URL}/wallets`),
      ]);
      if (!response1.ok || !response2.ok) {
        setIsError(true);
        throw new Error(`Error: ${response1.status} ${response1.statusText}`);
      }
      const result1 = await response1.json();
      const result2 = await response2.json();
      setAccounts(result1);
      setWallets(result2);
      setIsError(false);
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAccounts();
    return () => {};
  }, []);

  return (
    <WalletsDiv>
      {isLoading ? (
        <WalletsBody>
          <Loader />
        </WalletsBody>
      ) : isError ? (
        <WalletsBody>
          <AppError onReload={getAccounts} />
        </WalletsBody>
      ) : (
        <>
          <WalletHeader>
            <WalletsH1>Wallets</WalletsH1>

            <AddWalletButton onClick={() => setModalOpen(true)}>
              + Add new wallet
            </AddWalletButton>
          </WalletHeader>
          <WalletsContent>
            {accounts.map((account, i) => (
              <UserWallet account={account} key={i} />
            ))}
          </WalletsContent>
        </>
      )}

      <Modal isOpen={modalOpen}>
        <AddNewWallet
          closeModal={(reload: boolean) => {
            setModalOpen(false);
            reload && getAccounts(false);
          }}
          userWallets={wallets}
        />
      </Modal>
    </WalletsDiv>
  );
};

const WalletsDiv = styled.div`
  width: 100%;
  padding-left: 100px;
`;

const WalletHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AddWalletButton = styled.button`
  background-color: #ffffff;
  border: 0;
  font-weight: 500;
  cursor: pointer;
`;

const WalletsH1 = styled.h1`
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
  color: #000000;
  margin: 0;
`;

const WalletsBody = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  width: 100%;
`;

const WalletsContent = styled.div`
  border-top: 1px solid #d3d5d880;
  margin-top: 20px;
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
`;

export default Wallets;
