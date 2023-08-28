import React, { useState } from "react";

import Tablecomponent2 from "./TableComponent2";

const columns = [
  { header: "Order Details", field: "orderdetails" },
  { header: "Access", field: "access" },
  {
    header: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_119_847)">
          <path
            d="M27.2917 18.7917L29.2083 20.7083L10.3333 39.5833H8.41667V37.6667L27.2917 18.7917ZM34.7917 6.25C34.2708 6.25 33.7292 6.45833 33.3333 6.85417L29.5208 10.6667L37.3333 18.4792L41.1458 14.6667C41.9583 13.8542 41.9583 12.5417 41.1458 11.7292L36.2708 6.85417C35.8542 6.4375 35.3333 6.25 34.7917 6.25ZM27.2917 12.8958L4.25 35.9375V43.75H12.0625L35.1042 20.7083L27.2917 12.8958Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_119_847">
            <rect width="50" height="50" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    field: "edit",
  },
];
const data = [{ orderdetails: "Details 1", access: false, edit: false }];
const StockTable: React.FunctionComponent = () => {
  const [tableData, setTableData] = useState(data);

  const handleSetData: React.Dispatch<React.SetStateAction<any[]>> = (
    newData
  ) => {
    setTableData(newData);
  };

  return (
    <div>
      <Tablecomponent2
        columns={columns}
        data={tableData}
        setData={handleSetData}
      />
    </div>
  );
};

export default StockTable;
