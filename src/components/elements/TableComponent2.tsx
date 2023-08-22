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
const tstyle: {} = {
  width: "100%",
  overflowY: "auto",
  height: "50vh",
};
const tableCellStyle = {
  width: "4rem",
  padding: "0.25rem",
};

const Tablecomponent2: React.FunctionComponent<TableProps> = (props) => {
  return (
    <div className=" flex h-full w-full flex-col p-4">
      <TableContainer style={tstyle}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {props.columns.map((column, index) => (
                <TableCell key={index} style={tableCellStyle}>
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row: any, rowIndex) => (
              <TableRow key={rowIndex}>
                {props.columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>{row[column.field]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tablecomponent2;
