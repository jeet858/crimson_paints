import React from "react";
import UserAccessTable from "./UserAccessTable";

const OrderTable: React.FC = () => {
  const orderData = [
    {
      title: "By Salesman",
      access: false,
      edit: false,
    },
    {
      title: "By Client",
      access: false,
      edit: false,
    },
    {
      title: "By Order Number",
      access: false,
      edit: false,
    },
    {
      title: "My Orders",
      access: false,
      edit: false,
    },
    {
      title: "New Order(Mobile)",
      access: false,
      edit: false,
    },
    {
      title: "New Order(Web)",
      access: false,
      edit: false,
    },
  ];
  return <UserAccessTable data={orderData} title="Order" />;
};

export default OrderTable;
