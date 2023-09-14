import React from "react";
import UserAccessTable from "./UserAccessTable";

const StockTable: React.FC = () => {
  const stockData = [
    {
      title: "Current Stock",
      access: false,
      edit: false,
    },
    {
      title: "Stock Ledger",
      access: false,
      edit: false,
    },
  ];
  return <UserAccessTable data={stockData} title="Stock" />;
};

export default StockTable;
