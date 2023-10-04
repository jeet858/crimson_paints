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

interface TableProps {
  columns: {
    header: string;
    field: string;
  }[];
  data: {}[] | any;
  userType?: string;
  onEditClick: (rowData: { [key: string]: string }) => void;
  onDeleteClick: (rowData: { [key: string]: string }) => void;
  editUrl: string;
  deleteUrl: string;
}

const TableComponent: React.FunctionComponent<TableProps> = (props) => {
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
  return (
    <div className=" flex h-full w-full flex-col p-4">
      <TableContainer style={{ ...tstyle }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {props.columns.map((column, index) => (
                <TableCell
                  key={index}
                  style={{
                    backgroundColor: "#c4b0ff",
                    textAlign: "center",
                  }}
                >
                  {column.header}
                </TableCell>
              ))}
              <TableCell
                style={{
                  backgroundColor: "#c4b0ff",
                  textAlign: "center",
                }}
                className="w-[33.3%] py-2 text-center"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row: any, rowIndex) => (
              <TableRow key={rowIndex} style={{ ...tableRowStyle }}>
                {props.columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    style={{
                      backgroundColor: "rgba(196, 176, 255, 0.25)",
                      textAlign: "center",
                    }}
                  >
                    {row[column.field]}
                  </TableCell>
                ))}
                <TableCell
                  style={{
                    backgroundColor: "rgba(196, 176, 255, 0.25)",
                    textAlign: "center",
                  }}
                  className="w-[33.3%] space-x-2 py-2 text-center"
                >
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;
