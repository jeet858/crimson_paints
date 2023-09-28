import React from "react";

interface GroupForProcingTableProps {
  data: {
    id: string;
    name: string;
    headers: string[];
    bodyData: string[][];
  }[];
}

const GroupForProcingTable: React.FC<GroupForProcingTableProps> = ({
  data,
}) => {
  return (
    <div className="flex h-[50vh] w-full flex-col">
      <h1 className="h-fit w-full rounded-[5px] bg-[#786ADE] p-2 text-2xl font-bold">
        Brand Name / Code
      </h1>
      <div className="overflow-auto rounded-[5px] bg-[#c4b2f8]">
        {data.map((item, index) => (
          <div key={index} id={item.id} className="flex flex-col p-1">
            <div className="text-md p-2 font-semibold">{item.name}:</div>
            <div className="table">
              <div className="flex  items-center justify-around rounded-lg border-[1px] border-[#786ADE] bg-[#ECE5FF99] p-2 text-xl font-semibold">
                {item.headers.map((header, headerIndex) => (
                  <div key={headerIndex} className="table-cell-header">
                    {header}
                  </div>
                ))}
              </div>
              <div className="w-full text-lg ">
                {item.bodyData.map((rowData, bodyIndex) => (
                  <div
                    key={bodyIndex}
                    className="flex w-full flex-row justify-around rounded-lg border-b-[1px] border-l-[1px] border-r-[1px] border-[#786ADE] bg-[#ECE5FF99] p-2"
                  >
                    {rowData.map((cellData, cellIndex) => (
                      <div key={cellIndex}>
                        {item.headers[cellIndex] === "Group color" ? (
                          <div
                            style={{
                              backgroundColor: cellData,
                              width: "120px",
                              height: "30px",
                            }}
                          ></div>
                        ) : (
                          cellData
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupForProcingTable;
