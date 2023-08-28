import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import { jsx } from "@emotion/react";
import "tailwindcss";
interface TableProps {
  columns: {
    header: string;
    field: string;
  }[];
  data: {}[];
  userType?: string;
  editIcon?: JSX.Element;
  deleteIcon?: JSX.Element;
}

const TableComponent: React.FunctionComponent<TableProps> = (props) => {
  const tableCellStyle = {
    width: "4rem",
    padding: "0.25rem",
  };
  const tstyle: {} = {
    width: "100%",
    overflowY: "auto",
    height: "50vh",
  };
  return (
    <div className=" flex h-full w-full flex-col p-4">
      <TableContainer className="h-[50vh] w-full overscroll-y-auto">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {props.columns.map((column, index) => (
                <TableCell
                  key={index}
                  className="w-16 bg-[#c4b0ff] p-1 text-[15px] font-semibold"
                >
                  {column.header}
                </TableCell>
              ))}
              {props.userType === "admin" ? (
                <>
                  <TableCell className="w-16 bg-[#c4b0ff] p-1 text-[15px] font-semibold">
                    Edit
                  </TableCell>
                  <TableCell className="w-16 bg-[#c4b0ff] p-1 text-[15px] font-semibold">
                    Delete
                  </TableCell>
                </>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row: any, rowIndex) => (
              <TableRow
                className="borderb- border-b-[1px] border-solid border-b-black"
                key={rowIndex}
              >
                {props.columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className="w-16 border-b-[1px] border-solid border-[#e7e0ff78] bg-[#e7e0ff78] p-1 text-[14px]"
                  >
                    {row[column.field]}
                  </TableCell>
                ))}
                {props.userType === "admin" ? (
                  <>
                    <TableCell className="w-16 border-b-[1px] border-solid border-[#e7e0ff78] bg-[#e7e0ff78] p-1 text-[14px]">
                      {props.editIcon}
                    </TableCell>
                    <TableCell className="w-16 border-b-[1px] border-solid border-[#e7e0ff78] bg-[#e7e0ff78] p-1 text-[14px]">
                      {props.deleteIcon}
                    </TableCell>
                  </>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;
