import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface GroupForProcingTableProps {
  data: {
    id: string;
    name: string;
    headers: string[];
    bodyData: string[][];
  }[];
  idField: string[];
  editUrl: string;
  deleteUrl: string;
}

const GroupForProcingTable: React.FC<GroupForProcingTableProps> = ({
  data,
  idField,
  editUrl,
  deleteUrl,
}) => {
  const router = useRouter();
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
              <div className="flex  items-center justify-between rounded-lg border-[1px] border-[#786ADE] bg-[#ECE5FF99] p-2 text-xl font-semibold">
                {item.headers.map((header, headerIndex) => (
                  <div key={headerIndex} className="table-cell-header">
                    {header}
                  </div>
                ))}
                <div className="w-[33.3%] py-2 text-center">Actions</div>
              </div>
              <div className="w-full text-lg ">
                {item.bodyData.map((rowData, bodyIndex) => (
                  <div
                    key={bodyIndex}
                    className="flex w-full flex-row justify-between rounded-lg border-b-[1px] border-l-[1px] border-r-[1px] border-[#786ADE] bg-[#ECE5FF99] p-2"
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
                    ))}{" "}
                    <div className="w-[33.3%] space-x-2 py-2 text-center">
                      <button
                        className="h-8 w-16 rounded-lg bg-[#786ADE] text-white"
                        onClick={async () => {
                          const queryObj = {
                            ...router.query,
                          };
                          for (let i = 0; i < idField.length; i++) {
                            const id = idField[i] as string;
                            queryObj[id] = item[id];
                          }
                          await router.push({
                            pathname: editUrl,
                            query: queryObj,
                          });
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="h-8 w-16 rounded-lg bg-[#FF6E65] text-white"
                        onClick={async () => {
                          const queryObj = {
                            ...router.query,
                          };
                          for (let i = 0; i < idField.length; i++) {
                            const id = idField[i] as string;
                            queryObj[id] = item[id];
                          }
                          await router.push({
                            pathname: deleteUrl,
                            query: queryObj,
                          });
                        }}
                      >
                        Delete
                      </button>
                    </div>
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
