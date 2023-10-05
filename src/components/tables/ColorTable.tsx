import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import Link from "next/link";
interface Column {
  header: string;
  field: string;
  render?: (data: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: {}[] | any;
  onEditClick: (rowData: { [key: string]: string }) => void;
  onDeleteClick: (rowData: { [key: string]: string }) => void;
  editUrl: string;
  deleteUrl: string;
}

const tstyle: {} = {
  width: "100%",
  overflowY: "auto",
  height: "50vh",
  overscrollBehaviorY: "auto",
};

const tableRowStyle: {} = {
  borderBottomWidth: 1,
  borderStyle: "solid",
  borderColor: "black",
};

const ColorTable: React.FunctionComponent<TableProps> = (props) => {
  return (
    <div className="flex w-full items-start justify-center">
      <div className="w-[90%]">
        <div className="flex items-center justify-between border-b-[3px] border-white bg-[#C4B0FF] p-2 font-semibold">
          {props.columns.map((column, index) => (
            <div key={index} className="w-[33.3%] py-2 text-center">
              {column.header}
            </div>
          ))}
          <div className="w-[33.3%] py-2 text-center">Actions</div>
        </div>
        <div className="max-h-[40vh] overflow-y-auto">
          {props.data.map((row: any, rowIndex) => (
            <div
              key={rowIndex}
              className="flex w-full items-center justify-between border-b-[2px] border-solid border-b-[#e7e0ff78] bg-[#e7e0ff78] p-2 text-[14px]"
            >
              {props.columns.map((column, colIndex) => (
                <div
                  key={colIndex}
                  className="flex w-[33.3%] justify-center text-center"
                >
                  {column.render
                    ? column.render(row[column.field])
                    : row[column.field]}
                </div>
              ))}
              <div className="w-[33.3%] space-x-2 py-2 text-center">
                <Link href={props.editUrl}>
                  <button
                    className="h-8 w-16 rounded-lg bg-[#786ADE] text-white"
                    onClick={() => props.onEditClick(row)}
                  >
                    Edit
                  </button>
                </Link>
                <Link href={props.deleteUrl}>
                  <button
                    className="h-8 w-16 rounded-lg bg-[#FF6E65] text-white"
                    onClick={() => props.onDeleteClick(row)}
                  >
                    Delete
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorTable;
