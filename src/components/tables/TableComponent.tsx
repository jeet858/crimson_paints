import React, { MouseEventHandler } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

interface TableProps {
  columns: {
    header: string;
    field: string;
  }[];
  data: {}[] | any;
  userType?: string;
  editUrl: string;
  idField: string[];

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
  const router = useRouter();

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
                  <button
                    className="h-8 w-16 rounded-lg bg-[#786ADE] text-white"
                    onClick={async () => {
                      const queryObj = {
                        ...router.query,
                      };
                      for (let i = 0; i < props.idField.length; i++) {
                        const id = props.idField[i] as string;
                        queryObj[id] = row[id];
                      }
                      await router.push({
                        pathname: props.editUrl,
                        query: queryObj,
                      });
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="h-8 w-16 rounded-lg bg-[#FF6E65] text-white"
                    onClick={async () => {
                      const queryObj = {
                        ...router.query,
                      };
                      for (let i = 0; i < props.idField.length; i++) {
                        const id = props.idField[i] as string;
                        queryObj[id] = row[id];
                      }
                      await router.push({
                        pathname: props.deleteUrl,
                        query: queryObj,
                      });
                    }}
                  >
                    Delete
                  </button>
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
