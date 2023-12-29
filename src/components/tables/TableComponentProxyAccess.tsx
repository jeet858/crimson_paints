import React from "react";

interface RowData {
  username: string;
  type: string;
  status: string;
  proxyFor: string[];
}

interface TableComponentProps {
  tableData: RowData[];
  onActionButtonClick: (rowData: RowData) => void;
}

const TableComponentProxyAccess: React.FC<TableComponentProps> = ({
  tableData,
  onActionButtonClick,
}) => {
  return (
    <div className="flex  h-full items-center justify-center">
      <div className="mt-8  w-[90%] ">
        <div className=" flex justify-between border-b-[3px] border-white bg-[#C4B0FF] font-semibold">
        <div className="w-1/12 p-3">Serial No</div>
          <div className="w-1/6 p-3">User name</div>
          <div className="w-1/6 p-3">Type</div>
          <div className="w-1/6 p-3">Status</div>
          <div className="w-2/6 p-3">Proxy For</div>
          <div className="w-1/6 p-3">Actions</div>
        </div>
        <div className="max-h-[40vh]  overflow-y-auto">
          {tableData.map((row, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b-2 border-violet-50 bg-[#C4B0FF45]"
            >
              <div className="w-1/12 p-3">{index + 1}</div>
              <div className="w-1/6 p-3">{row.username}</div>
              <div className="w-1/6 p-3">{row.type}</div>
              <div className="flex w-1/6 items-center p-3">
                <span className="mr-2 font-semibold">{row.status}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="8"
                    fill={row.status === "Active" ? "#09EB3B" : "#FF0000"}
                  />
                </svg>
              </div>
              <div className="flex w-2/6 flex-wrap gap-1 p-3">
                {row.proxyFor.map((name, nameIndex) => (
                  <div
                    key={nameIndex}
                    className={`p-3 ${
                      row.type === "admin"
                        ? "rounded border-[1px] border-[#09EB3B] bg-[#07096E] px-2 py-1 text-center text-xs text-white"
                        : row.type === "GNRL"
                        ? "rounded border-[1px] bg-[#D7D7D7] px-2 py-1 text-center text-xs text-[#787878]"
                        : ""
                    }`}
                  >
                    {name}
                  </div>
                ))}
              </div>
              <div className="w-1/6 p-3">
                <button
                  className="h-[25px] w-[80px] rounded border-[1px] border-[#999691] bg-[#786ADE] text-xs text-white hover:bg-blue-700"
                  onClick={() => onActionButtonClick(row)}
                >
                  Assign
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableComponentProxyAccess;
