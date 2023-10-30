import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Select,
  MenuItem,
} from "@mui/material";

import { useRouter } from "next/router";

interface TableProps {
  columns: {
    header: string;
    field: string;
  }[];
  data: { id: string }[] | any;
  userType?: string;
  editUrl: string;
  idField: string[];
  dropdownItems: { id: string; name: string }[];
  deleteUrl: string;
}

const StockListTable: React.FunctionComponent<TableProps> = (props) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [filteredData, setFilteredData] = useState(props.data);
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
  const router = useRouter();

  const handleDropdownChange = (id: string) => {
    if (id === "") {
      setSelectedValue(id);
      setFilteredData(props.data);
    } else {
      setSelectedValue(id);
      const newData = props.data.filter(
        (item: { id: string }) => item.id === id
      );
      setFilteredData(newData);
    }
  };
  return (
    <div className="flex h-full w-full flex-col p-4">
      <div>
        <Select
          id="dropdown-select"
          value={selectedValue}
          onChange={(e) => handleDropdownChange(e.target.value as string)}
          style={{
            marginRight: "20px",
            width: "fit-contain",
            height: "2rem",
            backgroundColor: "#11009E",
            color: "white",
          }}
        >
          <MenuItem value="">All</MenuItem>
          {props.dropdownItems.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </div>
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
                      router.push({
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
                      router.push({
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

export default StockListTable;
