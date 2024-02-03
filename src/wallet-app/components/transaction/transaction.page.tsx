import React, { useState, useMemo, useEffect } from "react";

// Other libraries related imports
import styled from "styled-components";
import { Table } from "antd";
import moment from "moment";
import { CSVLink } from "react-csv";

// Services related imports
import { useGetAllTransaction, useSetUpTransaction } from "api/hooks/module";
import { invalidateQuery } from "api/services/react-query-instance";

// Types related imports
import { TableHeaderType, WalletDataType } from "wallet-app/types";

// Shared
import { BorderRadius, Spacing } from "shared/styles/styles";
import { Colors } from "shared/styles/colors";
import { LocalStorageKey, get } from "shared/helpers/local-storage";

// Transanction Table Header
const columns = [
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    sorter: (a: TableHeaderType, b: TableHeaderType) => a.amount - b.amount,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    sorter: (a: TableHeaderType, b: TableHeaderType) =>
      moment(a.date).unix() - moment(b.date).unix(),
  },
];

export const TransactionPage: React.FC = () => {
  // States
  const [selectedbalance, setSelectedbalance] = useState<number>(0);
  const [selectedTransacType, setSelectedTransacType] = useState<string>("");
  const [selectedDescription, setSelectedDescription] = useState<string>("");
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageLimit, setPageLimit] = useState<number>(10);
  const walletData: any = get(LocalStorageKey.walletdata);

  useEffect(() => {
    invalidateQuery(["details"]);
  }, [pageNo]);

  // Functions
  const postData = {
    amount: selectedbalance,
    type: selectedTransacType,
    description: selectedDescription,
    id: walletData?.id,
  };

  const postTransactions: any = useSetUpTransaction(postData);

  const { data: TransactionTableData } = useGetAllTransaction({
    walletId: walletData?.id,
    pageNo,
    pageLimit,
  });

  const handleCreateTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postTransactions.mutate(postData, {
      onSuccess: () => {
        invalidateQuery(["details"]);
      },
    });
  };

  const transactionData: any = useMemo(() => {
    console.log(TransactionTableData);
    if (TransactionTableData) {
      const result =
        TransactionTableData &&
        TransactionTableData?.length &&
        TransactionTableData?.map(
          (d: TableHeaderType, index: number) => {
            return {
              ...d,
              date: d?.date.slice(0, 10),
              key: index,
            };
          }
        );
      return result;
    }
    return "";
  }, [TransactionTableData]);

  return (
    <Styled.Container>
      <div className="transaction-container">
        <h1>Transactions</h1>
        <form onSubmit={(e) => handleCreateTransaction(e)}>
          <div className="form-section">
            <label>Transaction amount:</label>
            <br />
            <input
              placeholder="Amount"
              name="balance"
              type="number"
              min={1}
              onChange={(e) => setSelectedbalance(Number(e.target.value))}
            />
          </div>
          <div className="form-section">
            <label>Description:</label>
            <br />
            <input
              placeholder="Description"
              name="description"
              onChange={(e) => setSelectedDescription(e.target.value)}
            />
          </div>
          <div
            className="form-section"
            onChange={(e) =>
              setSelectedTransacType((e.target as HTMLInputElement).value)
            }
          >
            <label>Transaction type:</label>
            <br />
            <div className="radio-button-section">
              <input type="radio" name="transaction-type" value="CREDIT" />
              <label>CREDIT</label>
            </div>
            <div className="radio-button-section">
              <input type="radio" name="transaction-type" value="DEBIT" />
              <label>DEBIT</label>
            </div>
          </div>
          <button className="submit-btn">Create Transaction</button>
        </form>
      </div>
      <div className="table-container">
        <CSVLink
          filename={"transaction-data.csv"}
          data={transactionData || []}
          className="download-btn"
        >
          Download csv
        </CSVLink>
        <Table
          columns={columns}
          dataSource={transactionData || []}
          pagination={{
            defaultPageSize: 10,
            total: TransactionTableData?.total,
            onChange: (page, limit) => {
              setPageNo((page - 1) * limit);
            },
          }}
        />
      </div>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: ${Spacing.u4} auto 0;
    background-color: ${Colors.neutral.white};
    border-radius: ${BorderRadius.default};
    box-shadow: 0 2px 7px rgb(5 66 145 / 13%);
    .transaction-container {
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
    .radio-button-section {
      display: flex;
      justify-content: start;
      gap: 5px;
      align-items: center;
    }
    .radio-button-section input {
      width: auto;
      padding: 0;
      margin: 0;
    }
    .submit-btn {
      margin-top: 20px;
      font-size: 14px;
      cursor: pointer;
      border-radius: 4px;
      padding: 6px 14px;
      background-color: ${Colors.grey.lighter};
    }
    .table-container {
      max-width: 1100px;
      margin: 0 auto;
    }
    .download-btn {
      float: right;
      padding: 4px 8px;
      background-color: ${Colors.grey.lighter};
      border-radius: 4px;
      border: 1px solid ${Colors.neutral.base};
      text-decoration: none;
    }
  `,
};
