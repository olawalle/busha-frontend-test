import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import close from "../../assets/images/close.svg";
import closeRed from "../../assets/images/close-red.svg";
import networkError from "../../assets/images/network-error.svg";
import { IWallet } from "../../Pages/Wallets";
import AppButton from "./AppButton";
import Loader from "./Loader";
import AppError from "./AppError";

const AddNewWallet: FC<{
  closeModal: (e: boolean) => void;
  userWallets: IWallet[];
}> = ({ closeModal, userWallets }) => {
  const [wallets, setWallets] = useState<IWallet[]>(userWallets);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [creationError, setCreationError] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedWallet, setSelectedWallet] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsLoading(false); // Ensure loading state is reset
    closeModal(false); // Close the modal
  };

  const getWallets = async (reload: boolean) => {
    reload && setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3090/wallets");
      if (!response.ok) {
        setIsLoading(false);
        setIsError(true);
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      } else {
        const result = await response.json();
        setWallets(result);
        setIsError(false);
        setIsLoading(false);
      }
    } catch (err) {
      setIsError(true);
      setIsLoading(false);
    } finally {
    }
  };

  const createWallet = async () => {
    if (!selectedWallet) {
      return;
    }

    setIsLoading(true);
    setCreationError(false);
    setIsSubmitting(true);
    fetch("http://localhost:3090/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currency: selectedWallet,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network error");
        }
        return res.json();
      })
      .then((data) => {
        closeModal(true);
      })
      .catch(() => {
        setCreationError(true);
      })
      .finally(() => {
        setIsLoading(false);
        setIsSubmitting(false); // Reset submitting state
      });
  };

  useEffect(() => {
    getWallets(true);

    return () => {};
  }, []);

  return (
    <ModalBody>
      {isLoading ? (
        <ModalEmptyContent>
          <Loader />
        </ModalEmptyContent>
      ) : isError ? (
        <ModalEmptyContent>
          <AppError onReload={() => getWallets(true)} />
        </ModalEmptyContent>
      ) : (
        <>
          <ModalHeader>
            <ModalHeaderText>Add new wallet</ModalHeaderText>
            <CloseButton>
              <ModalClose
                src={close}
                alt="Close button"
                onClick={handleCloseModal}
              />
            </CloseButton>
          </ModalHeader>
          <ModalP>
            The crypto wallet will be created instantly and be available in your
            list of wallets.
          </ModalP>
          <form>
            <Label>Select wallet</Label>
            <Select
              onChange={(e) => setSelectedWallet(e.target.value)}
              role="combobox"
            >
              {wallets.map((wallet, i) => (
                <option key={i} value={wallet.currency}>
                  {wallet.name}
                </option>
              ))}
            </Select>

            <ButtonDiv onClick={createWallet}>
              <AppButton
                text={"Create wallet"}
                variant="primary"
                loading={isSubmitting}
              />
            </ButtonDiv>
          </form>

          {creationError && (
            <NetworkError>
              <NetworkErrorLeft>
                <img src={networkError} alt="" />
                <NetworkErrorSpan>Network Error</NetworkErrorSpan>
              </NetworkErrorLeft>
              <NetworkErrorImg
                src={closeRed}
                onClick={() => setCreationError(false)}
              />
            </NetworkError>
          )}
        </>
      )}
    </ModalBody>
  );
};

const ModalBody = styled.div`
  padding: 30px;
  height: 100%;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;
const CloseButton = styled.button.attrs({
  "aria-label": "Close button",
})`
  background: transparent;
  border: 0;
  padding: 10px;
`;

const ModalClose = styled.img`
  cursor: pointer;
`;

const ModalHeaderText = styled.h1`
  font-size: 24px;
  line-height: 32px;
  font-weight: 500;
  color: #000000;
  margin: 0;
`;

const ModalEmptyContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ModalP = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #3e4c59;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: #3e4c59;
  margin-bottom: 6px;
`;

const Select = styled.select`
  width: 100%;
  height: 50px;
  background-color: #ffffff;
  border: 1px solid #cbd2d9;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  color: #3e4c59;
  margin-bottom: 20px;
  padding: 0 12px;
  outline: none;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
`;

const NetworkError = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-top: 40px;
  color: #d72c0d;
  border: 1px solid #e0b3b2;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff3f2;
`;

const NetworkErrorLeft = styled.div`
  display: flex;
  align-items: center;
`;

const NetworkErrorSpan = styled.span`
  margin-left: 8px;
`;

const NetworkErrorImg = styled.img`
  width: 14px;
  height: 14px;
  cursor: pointer;
`;

export default AddNewWallet;
