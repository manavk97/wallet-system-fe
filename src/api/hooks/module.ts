import { useQuery, useMutation } from "@tanstack/react-query";

// Services Imports
import {
  getAllTransactions,
  getWallet,
  postTransaction,
  setUpWallet,
} from "../services/apiService";

// Types Imports
import {
  WalletDataType,
  transactionPayload,
  trasactionCreateType,
} from "wallet-app/types";

export const useSetupWallet = (payload: WalletDataType | {}) =>
  useMutation(() => setUpWallet(payload));

export const useSetUpTransaction = (payload: trasactionCreateType) =>
  useMutation(() => postTransaction(payload));

export const useModuleDetailQuery = (id: string) =>
  useQuery(["detail"], () => getWallet(id));

export const useGetAllTransaction = ({
  walletId,
  pageNo,
  pageLimit,
}: transactionPayload) =>
  useQuery(["details", pageNo], () =>
    getAllTransactions({ walletId, pageNo, pageLimit })
  );
