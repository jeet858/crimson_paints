import React, { useEffect } from "react";
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
import { api } from "~/utils/api";
interface TableProps {
  columns: {
    header: string;
    field: string;
  }[];
  userType?: string;
  location: string;
  brand_name: string;
  color: string;
  packaging: string;
}
const StockLedger: React.FunctionComponent<TableProps> = ({
  color,
  columns,
  location,
  brand_name,
  userType,
  packaging,
}) => {
  const router = useRouter();
  const tstyle: {} = {
    width: "100%",
    overflowY: "auto",
    height: "50vh",
    overscrollBehaviorY: "auto",
    position: "relative",
  };

  const {
    data: stocks,
    isLoading: isStocksLoading,
    isError: isStocksError,
  } = api.stock.stock_ledger_all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const tableRowStyle: {} = {
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
  };
  const del = api.stock.stock_ledger_delete.useMutation({
    onError: (err, newTodo, context) => {
      alert(`${err.message}`);
    },
    onSuccess: () => {
      alert("Data deleted succesfully");
      router.reload();
    },
  });
  interface deleted {
    id: bigint;
    brand_name: string;
    color_name: string;
    location: string;
    packaging: string;
    added: number;
  }
  const deleteData = ({
    id,
    brand_name,
    color_name,
    location,
    packaging,
    added,
  }: {
    id: bigint;
    brand_name: string;
    color_name: string;
    location: string;
    packaging: string;
    added: number;
  }) => {
    del.mutate({
      added: added,
      id: id,
      brand_name: brand_name,
      color_name: color_name,
      location: location,
      packaging: packaging,
    });
  };
  return (
    <TableContainer style={{ ...tstyle }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
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
              onClick={() => {
                console.log(brand_name);
                console.log(color);
                console.log(location);
                console.log(packaging);
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocks?.map((row, index) => {
            if (
              row.brand_name === brand_name &&
              row.color_name === color &&
              row.location === location &&
              row.packaging === packaging
            ) {
              return (
                <TableRow
                  key={index}
                  id={`table-row-${row.id}`}
                  style={{ ...tableRowStyle }}
                >
                  {columns.map((column, colIndex) => (
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
                      onClick={() => {
                        deleteData({
                          added: row.added,
                          brand_name: row.brand_name,
                          color_name: row.color_name,
                          location: row.location,
                          id: row.id,
                          packaging: row.packaging,
                        });
                      }}
                    >
                      <MdDeleteOutline />
                    </button>
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockLedger;
