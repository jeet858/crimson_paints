import { useRouter } from "next/router";
import React from "react";
interface DataItem {
  id: number;
  branchname: string;
  phone: string;
  gst: string;
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
  salesmanurl: string;
  subTableData: DataItem[];
}
const InterCompanyTable: React.FunctionComponent<TableProps> = (props) => {
  const router = useRouter();
  return (
    <div className="flex h-[50vh] w-full flex-col p-4">
      <div className="flex w-full rounded-md bg-[#C4B0FF] text-lg font-semibold">
        {props.columns.map((column, index) => (
          <div key={index} className="w-1/4 py-4 text-center">
            {column.header}
          </div>
        ))}
        <div className="w-[33.33%] py-2 text-center">Actions</div>
      </div>
      <div className="overflow-y-auto rounded-md">
        {props.data.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div
              key={rowIndex}
              className="flex border-b-[1px] border-white bg-[#C4B0FF9C] bg-opacity-25 py-4 text-center text-base font-semibold "
            >
              <div className="flex w-1/4 flex-col">
                <div>{row.branchname}</div>
              </div>
              <div className="flex w-1/4 justify-center gap-x-4">
                <div>Phone: {row.phone}</div>
                <div>GST: {row.gst}</div>
              </div>
              <div className="flex w-[33.33%] items-center justify-center gap-x-8">
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
                <button
                  className="h-8 w-20 rounded-lg bg-[#39952A] text-base text-white"
                  onClick={async () => {}}
                >
                  Salesman
                </button>
              </div>
            </div>
            {props.subTableData
              .filter((subRow) => subRow.id === row.id)
              .map((filteredRow, subRowIndex) => (
                <div
                  key={subRowIndex}
                  className="flex border-b-[1px] border-white bg-[#C4B0FF52] bg-opacity-25 py-4 text-center text-base "
                >
                  <div className="flex w-1/4 flex-col">
                    <div>{filteredRow.branchname}</div>
                  </div>
                  <div className="flex w-1/4 justify-center gap-x-4">
                    <div>Phone: {filteredRow.phone}</div>
                    <div>GST: {filteredRow.gst}</div>
                  </div>
                  <div className="flex w-[33.33%] items-center justify-center gap-x-8">
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
                    <button
                      className="h-8 w-20 rounded-lg bg-[#39952A] text-base text-white"
                      onClick={async () => {}}
                    >
                      Salesman
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

export default InterCompanyTable;
