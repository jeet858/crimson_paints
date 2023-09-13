import React from "react";
import UserAccessTable from "./UserAccessTable";

const UploadsTable: React.FC = () => {
  const uploadData = [
    {
      title: "Upload List",
      access: false,
      edit: false,
    },
    {
      title: "Status",
      access: false,
      edit: false,
    },
  ];
  return <UserAccessTable data={uploadData} title="Uploads" />;
};

export default UploadsTable;
