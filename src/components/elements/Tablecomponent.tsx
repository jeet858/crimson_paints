import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";

const Tablecomponent = ({ columns, data }) => {
  const tableCellStyle = {
    width: "4rem",
    padding: "0.25rem",
  };
  const tstyle = {
    width: "100%",
    maxHeight: "400px",
    overflowY: "auto",
  };
  return (
    <div className=" w-[81%] p-4">
      <TableContainer style={tstyle}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
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
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                style={{ borderBottom: "1px solid black" }}
              >
                {columns.map((column, colIndex) => (
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
