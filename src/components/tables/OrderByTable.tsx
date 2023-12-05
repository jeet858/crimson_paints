import React from "react";

interface TableProps {
  columns: {
    header: string;
    field: string;
  }[];
  data: {}[] | any;
  userType?: string;
  clientname?: string;
}

const OrderByTable: React.FunctionComponent<TableProps> = (props) => {
  const { clientname } = props;

  return (
    <div className="flex w-full flex-col rounded-b-xl bg-[#C4B0FF45]">
      <div className="flex gap-8 p-4 text-xl font-semibold text-[#11009E]">
        Notes{" "}
        {clientname && (
          <span className="text-lg text-black"> {clientname}</span>
        )}
      </div>

      <div className="min-w-full rounded-b-xl">
        <div className="flex bg-[#C4B0FF] p-2 ">
          {props.columns.map((column, index) => (
            <div
              key={index}
              className="flex-1 p-2 text-center text-lg font-semibold"
            >
              {column.header}
            </div>
          ))}
        </div>
        <div className="h-[50vh] overflow-scroll ">
          {props.data.map((row: any, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex  ${
                rowIndex % 2 === 0 ? "bg-[#c4b0ff42]" : "bg-[#c4b0ff6f]"
              }`}
            >
              {props.columns.map((column, colIndex) => (
                <div
                  key={colIndex}
                  className="flex flex-1 items-center justify-center border-r-2 border-[#C4B0FF]  p-2 text-center text-lg"
                >
                  {row[column.field]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderByTable;
