import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";

import { useRouter } from "next/router";
import { api } from "~/utils/api";

interface TableProps {
  columns: {
    header: string;
    field: string;
  }[];
  userType?: string;
  location: string;
  brand_name: string;
}

const StockListTable: React.FunctionComponent<TableProps> = (props) => {
  // const [filteredData, setFilteredData] = useState(props.data);
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

  const {
    data: stocks,
    isLoading: isStocksLoading,
    isError: isStocksError,
  } = api.stock.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  if (isStocksLoading) {
    return <div></div>;
  }
  if (isStocksError) {
    return <div></div>;
  }
  const filteredData = stocks.filter((stock) => {
    return (
      stock.brand_name === props.brand_name && stock.branch === props.location
    );
  });
  return (
    <div className="flex h-full w-full flex-col px-4">
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
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row: any) => (
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

export default StockListTable;
