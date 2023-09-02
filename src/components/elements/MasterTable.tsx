import React from "react";
import UserAccessTable from "./UserAccessTable";

const MasterTable: React.FC = () => {
  const masterData = [
    {
      title: "Basic Units",
      access: false,
      edit: false,
    },
    {
      title: "Packaging Units",
      access: false,
      edit: false,
    },
    {
      title: "Colors",
      access: false,
      edit: false,
    },
    {
      title: "Orderable Units",
      access: false,
      edit: false,
    },
  ];
  return <UserAccessTable data={masterData} title="Master" />;
};

export default MasterTable;
