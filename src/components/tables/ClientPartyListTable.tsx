import React from "react";

import { useRouter } from "next/router";

interface DataItem {
  id: string;
  nameoraltname: string;
  gstid: number;
  phone: string | number;
  email: string;
  address: string;
}

interface TableProps {
  columns: {
    header: string;
    field: string;
  }[];
  data: DataItem[];
  idField: string[];
  editUrl: string;
  deleteUrl: string;
  subTableData: DataItem[];
}

const ClientPartyListTable: React.FunctionComponent<TableProps> = (props) => {
  const router = useRouter();

  return (
    <div className="flex h-[50vh] w-full flex-col p-4">
      <div className=" flex w-full rounded-md bg-[#C4B0FF] text-lg font-semibold">
        {props.columns.map((column, index) => (
          <div key={index} className="w-1/4 py-4 text-center">
            {column.header}
          </div>
        ))}
        <div className="w-1/4 py-2 text-center">Actions</div>
      </div>
      <div className="overflow-y-auto rounded-md ">
        {props.data.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div className="flex border-b-[1px] border-white bg-[#C4B0FF9C] bg-opacity-25 py-2 text-center text-lg font-semibold">
              <div className="flex w-1/4 flex-col ">
                <div className="">{row.nameoraltname}</div>
                <div className="text-[#786ADE]">GST#:{row.gstid}</div>
              </div>
              <div className="flex w-1/4 items-center justify-center ">
                <div>{row.phone}/</div>
                <div>{row.email}</div>
              </div>
              <div className="w-1/4 ">{row.address}</div>
              <div className="flex w-1/4  items-center justify-center gap-x-4 ">
                <button
                  className="h-8 w-16 rounded-lg bg-[#786ADE] text-base text-white"
                  onClick={async () => {}}
                >
                  Edit
                </button>

                <button
                  className="h-8 w-16 rounded-lg bg-[#FF6E65] text-base text-white"
                  onClick={async () => {}}
                >
                  Delete
                </button>
              </div>
            </div>

            {props.subTableData
              .filter((subRow) => subRow.id === row.id)
              .map((filteredRow, subRowIndex) => (
                <div
                  key={subRowIndex}
                  className="flex border-b-[1px] border-white bg-[#C4B0FF52] bg-opacity-25 py-2 text-center"
                >
                  <div className="flex w-1/4 flex-col">
                    <div className=" ">{filteredRow.nameoraltname}</div>
                    <div className="text-[#786ADE]">
                      GST#:{filteredRow.gstid}
                    </div>
                  </div>
                  <div className="flex w-1/4 items-center justify-center">
                    <div>{filteredRow.phone}/</div>
                    <div>{filteredRow.email}</div>
                  </div>
                  <div className="w-1/4 ">{filteredRow.address}</div>
                  <div className="flex w-1/4 items-center justify-center gap-x-4">
                    <button
                      className="h-8 w-16 rounded-lg bg-[#786ADE] text-white"
                      onClick={async () => {}}
                    >
                      Edit
                    </button>

                    <button
                      className="h-8 w-16 rounded-lg bg-[#FF6E65] text-white"
                      onClick={async () => {}}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ClientPartyListTable;
