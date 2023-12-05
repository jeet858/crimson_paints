import React from "react";

import { useRouter } from "next/router";
import Link from "next/link";

interface DataItem {
  address: string;
  bank_branch: string;
  account: string;
  code: string;
  distributor: string;
  district: string;
  pin_code: string;
  email: string;
  gst: string;
  ifsc: string;
  legal_name: string;
  location: string;
  phone_primary: string;
  phone_secondary: string;
  sales_representative: string;
  state: string;
  trade_license: string;
  type: string;
  unique_name: string;
  is_cheque: boolean;
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
        <div className="flex w-1/4 items-center justify-center py-2 text-center">
          Actions
        </div>
      </div>
      <div className="overflow-y-auto rounded-md ">
        {props.data.map((row, rowIndex) => {
          const subTableData = props.data.filter((data) =>
            props.data.some((data2) => row.unique_name === data.distributor)
          );
          if (row.type === "Distributor") {
            return (
              <React.Fragment key={rowIndex}>
                <div className="flex border-b-[1px] border-white bg-[#C4B0FF9C] bg-opacity-25 py-2 text-center text-lg font-semibold">
                  <div className="flex w-1/4 flex-col ">
                    <div className="">{row.legal_name}</div>
                    {row.gst.length > 0 ? (
                      <div className="text-[#786ADE]">GST#:{row.gst}</div>
                    ) : (
                      <div className="text-[#786ADE]">
                        Trade License#:{row.trade_license}
                      </div>
                    )}
                  </div>
                  <div className="flex w-1/4 items-center justify-center ">
                    <div>{row.phone_primary}/</div>
                    <div>{row.email}</div>
                  </div>
                  <div className="flex w-1/4 items-center justify-center">
                    {row.address}
                  </div>
                  <div className="flex w-1/4  items-center justify-center gap-x-4 ">
                    <Link
                      className="h-8 w-16 rounded-lg bg-[#786ADE] text-white"
                      href={{
                        pathname: props.editUrl,
                        query: {
                          unique_name: row.unique_name,
                        },
                      }}
                    >
                      Edit
                    </Link>

                    <Link
                      className="h-8 w-16 rounded-lg bg-[#FF6E65] text-white"
                      href={{
                        pathname: props.deleteUrl,
                        query: {
                          unique_name: row.unique_name,
                        },
                      }}
                    >
                      Delete
                    </Link>
                  </div>
                </div>

                {subTableData.map((filteredRow, subRowIndex) => (
                  <div
                    key={subRowIndex}
                    className="flex border-b-[1px] border-white bg-[#C4B0FF52] bg-opacity-25 py-2 text-center"
                  >
                    <div className="flex w-1/4 flex-col">
                      <div className=" ">{filteredRow.legal_name}</div>
                      {row.gst.length > 0 ? (
                        <div className="text-[#786ADE]">GST#:{row.gst}</div>
                      ) : (
                        <div className="text-[#786ADE]">
                          Trade License#:{row.trade_license}
                        </div>
                      )}
                    </div>
                    <div className="flex w-1/4 items-center justify-center">
                      <div>{filteredRow.phone_primary}/</div>
                      <div>{filteredRow.email}</div>
                    </div>
                    <div className="flex w-1/4 items-center justify-center">
                      {filteredRow.address}
                    </div>
                    <div className="flex w-1/4 items-center justify-center gap-x-4">
                      <Link
                        className="h-8 w-16 rounded-lg bg-[#786ADE] text-white"
                        href={{
                          pathname: props.editUrl,
                          query: {
                            unique_name: filteredRow.unique_name,
                          },
                        }}
                      >
                        Edit
                      </Link>

                      <Link
                        className="h-8 w-16 rounded-lg bg-[#FF6E65] text-white"
                        href={{
                          pathname: props.deleteUrl,
                          query: {
                            unique_name: filteredRow.unique_name,
                          },
                        }}
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ClientPartyListTable;
