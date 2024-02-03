import React, { useState, useEffect } from "react";

// Other libraries related imports
import styled from "styled-components";

// API Hooks
import { useSetupWallet } from "api/hooks/module";

// Type related imports
import { WalletDataType } from "wallet-app/types";

// Shared
import { BorderRadius, Spacing } from "shared/styles/styles";
import { Colors } from "shared/styles/colors";
import { LocalStorageKey, get } from "shared/helpers/local-storage";

export const WalletPage: React.FC = () => {
  // States
  const [walletdata, setData] = useState<WalletDataType | {} >({});
  const [existWalletData, setExistWalletData] = useState<WalletDataType | null>(null);

  // Hooks
  useEffect(() => {
    const existingData: any = get(LocalStorageKey.walletdata);
    if (existingData) {
      setExistWalletData(existingData);
    }
  }, []);

  // SetUp Wallet API Call
  const postWallet: any = useSetupWallet(walletdata);
  
  // Form Submit handler
  const handleCreateWallet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postWallet.mutate(walletdata);
  };

  return (
    <Styled.Container>
      <div className="wallet-container">
        {!existWalletData ? (
          <>
            <h1>Create a wallet</h1>
            <form onSubmit={(e) => handleCreateWallet(e)}>
              <div className="form-section">
                <label>Username</label>
                <br />
                <input
                  placeholder="username"
                  name="name"
                  onChange={(e) =>
                    setData({ ...walletdata, name: e.target.value })
                  }
                />
              </div>
              <div className="form-section">
                <label>Balance</label>
                <br />
                <input
                  placeholder="balance"
                  name="balance"
                  type="number"
                  min={1}
                  onChange={(e) =>
                    setData({ ...walletdata, balance: Number(e.target.value) })
                  }
                />
              </div>
              <button className="submit-btn">Create Wallet</button>
            </form>
          </>
        ) : (
          <>
            <h1>Wallet Information</h1>
            <div>Wallet Id: {existWalletData?.id}</div>
            <div>UserName: {existWalletData?.name}</div>
            <div>Balance: {existWalletData?.balance}</div>
          </>
        )}
      </div>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 90vh;
    margin: ${Spacing.u4} auto 0;
    background-color: ${Colors.neutral.white};
    border-radius: ${BorderRadius.default};
    box-shadow: 0 2px 7px rgb(5 66 145 / 13%);
    .wallet-container {
      text-align: center;
      margin: 50px auto;
    }
    .form-section {
      text-align: left;
      margin-bottom: 15px;
    }
    .form-section label {
      font-size: 16px;
    }
    .form-section input {
      margin-top: 5px;
      padding: 6px 10px;
      border-radius: 4px;
      width: 100%;
      font-size: 14px;
    }
    .submit-btn {
      margin-top: 20px;
      font-size: 14px;
      cursor: pointer;
      border-radius: 4px;
      padding: 6px 14px;
      background-color: ${Colors.grey.lighter};
    }
  `,
};
