import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";

interface TableProps {
  columns: {
    header: string;
    field: string;
  }[];
  data: {}[];
}

const Tablecomponent: React.FunctionComponent<TableProps> = (props) => {
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
    <div className=" flex h-full w-[96%] flex-col p-4">
      <TableContainer style={tstyle}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {props.columns.map((column, index) => (
                <TableCell
                  key={index}
                  style={{
                    backgroundColor: "rgba(196, 176, 255, 1)",
                    fontSize: "15px",
                    fontWeight: "600",
                    ...tableCellStyle,
                  }}
                >
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row: any, rowIndex) => (
              <TableRow
                key={rowIndex}
                style={{ borderBottom: "1px solid black" }}
              >
                {props.columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    style={{
                      backgroundColor: "rgba(231, 224, 255, 0.47)",
                      borderBottom: "1px solid rgba(231, 224, 255, 0.47)",
                      fontSize: "14px",
                      ...tableCellStyle,
                    }}
                  >
                    {row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tablecomponent;
