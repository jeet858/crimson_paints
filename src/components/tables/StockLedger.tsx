import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import { useRouter } from "next/router";
import { MdDeleteOutline } from "react-icons/md";
interface TableProps {
  columns: {
    header: string;
    field: string;
  }[];
  data: { id: string }[] | any;
  userType?: string;

  idField: string[];

  deleteUrl: string;
}
const StockLedger: React.FunctionComponent<TableProps> = (props) => {
  const router = useRouter();
  const tstyle: {} = {
    width: "100%",
    overflowY: "auto",
    height: "50vh",
    overscrollBehaviorY: "auto",
    position: "relative",
  };

  const tableRowStyle: {} = {
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
  };
  return (
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
                className=" border-r-[1px] border-[#11009E33]"
              >
                {column.header}
              </TableCell>
            ))}
            <TableCell
              style={{
                backgroundColor: "#c4b0ff",
                textAlign: "center",
              }}
              className="w-[20%] border-r-[1px] border-[#11009E33] py-2 text-center"
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row: any) => (
            <TableRow
              key={row.id}
              id={`table-row-${row.id}`}
              style={{ ...tableRowStyle }}
            >
              {props.columns.map((column, colIndex) => (
                <TableCell
                  key={colIndex}
                  style={{
                    backgroundColor: "rgba(196, 176, 255, 0.25)",
                    textAlign: "center",
                  }}
                  className="border-r-[1px] border-[#11009E33]"
                >
                  {row[column.field]}
                </TableCell>
              ))}
              <TableCell
                style={{
                  backgroundColor: "rgba(196, 176, 255, 0.25)",
                  textAlign: "center",
                }}
                className="w-[20%] space-x-2 border-r-[1px] border-[#11009E33] py-2 text-center"
              >
                <button
                  className="text-4xl  text-[#11009E]"
                  onClick={async () => {
                    const queryObj = {
                      ...router.query,
                    };
                    for (let i = 0; i < props.idField.length; i++) {
                      const id = props.idField[i] as string;
                      queryObj[id] = row[id];
                    }
                    router.push({
                      pathname: props.deleteUrl,
                      query: queryObj,
                    });
                  }}
                >
                  <MdDeleteOutline />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockLedger;
