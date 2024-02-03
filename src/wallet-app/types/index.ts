export type TableHeaderType = {
  amount: number;
  description: string;
  balance: number;
  type: number;
  date: string;
};

export type WalletDataType = {
  name: string;
  balance: number;
  date: string;
  id: string;
};

export type transactionPayload = {
  walletId: string;
  pageNo: number;
  pageLimit: number;
};

export type trasactionCreateType = {
    amount: number,
    type: string,
    description: string,
    id: string,
  };