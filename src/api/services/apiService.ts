import { WalletDataType, transactionPayload, trasactionCreateType } from "wallet-app/types";
import axiosClient from "./axiosClient";

// shared imports
import { LocalStorageKey, add } from "shared/helpers/local-storage";

export const setUpWallet = async (payload: WalletDataType | {}) => {
  const result = await axiosClient.post("/wallet/setup", payload);
  add(LocalStorageKey.walletdata, result.data.data);
  return result?.data;
};

export const getWallet = async (id: string) => {
  const result = await axiosClient.get(`/wallet/${id}`);
  return result?.data
};

export const getAllTransactions = async ({walletId, pageNo, pageLimit}: transactionPayload) => {
  const result = await axiosClient.get(
    `/transactions/${walletId}?&skip=${pageNo}&limit=${pageLimit}`
  );
  return result?.data?.data
};

export const  postTransaction = async (payload: trasactionCreateType) => {
  const { id } = payload;
  const result = await axiosClient.post(`/transactions/transact/${id}`, payload);
  return result?.data;
};
