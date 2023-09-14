import React from "react";

interface Column {
  header: string;
  field: string;
  render?: (data: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
}

const BasicUnitTable: React.FunctionComponent<TableProps> = (props) => {
  return (
    <div className="flex w-full items-start justify-center">
      <div className="w-[90%]">
        <div className="flex items-center justify-between rounded-md border-b-[3px] border-white bg-[#C4B0FF] p-2 font-semibold">
          {props.columns.map((column, index) => (
            <div key={index}>{column.header}</div>
          ))}
        </div>
        <div className="max-h-[40vh] overflow-y-auto">
          {props.data.map((row: any, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex items-center justify-between rounded-md border-b-[2px]  border-solid border-b-[#e7e0ff78] p-2 text-[14px] ${
                rowIndex % 2 === 0 ? "bg-[#c4b0ff42]" : "bg-[#c4b0ff52]"
              }`}
            >
              {props.columns.map((column, colIndex) => (
                <div
                  key={colIndex}
                  className="border-b-[1px] border-solid border-[#e7e0ff78]"
                >
                  {column.render
                    ? column.render(row[column.field])
                    : row[column.field]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicUnitTable;
