import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import { UseTRPCQueryResult } from "@trpc/react-query/shared";

interface TableProps {
  columns: {
    header: string;
    field: string;
  }[];
  data: {}[] | any;
  userType?: string;
  editIcon?: JSX.Element;
  deleteIcon?: JSX.Element;
}

const TableComponent: React.FunctionComponent<TableProps> = (props) => {
  const tableCellStyle = {
    width: 64,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#e7e0ff78",
    backgroundColor: "#e7e0ff78",
    padding: 4,
    fontSize: 14,
    justifyContent: "center",
  };
  const tstyle: {} = {
    width: "100%",
    overflowY: "auto",
    height: "50vh",
    overscrollBehaviorY: "auto",
  };
  const headerCellStyle: {} = {
    width: "4rem",
    backgroundColor: "#c4b0ff",
    padding: "4px",
    fontSize: "15px",
    fontWeight: 600,
  };
  const headerIconStyle: {} = {
    width: "64px",
    backgroundColor: "#c4b0ff",
    padding: "4px",
    fontSize: "15px",
    fontWeight: 600,
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
              {props.userType === "admin" ? (
                <>
                  <TableCell style={{ backgroundColor: "#c4b0ff" }}>
                    Edit
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#c4b0ff" }}>
                    Delete
                  </TableCell>
                </>
              ) : null}
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
                {props.userType === "admin" ? (
                  <>
                    <TableCell
                      style={{
                        backgroundColor: "rgba(196, 176, 255, 0.25)",
                      }}
                    >
                      {props.editIcon}
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: "rgba(196, 176, 255, 0.25)",
                      }}
                    >
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
