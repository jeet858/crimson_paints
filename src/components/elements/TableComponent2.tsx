import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Button,
} from "@mui/material";
import { FaCheck } from "react-icons/fa";

interface TableProps {
  columns: {
    header: React.ReactNode;
    field: string;
  }[];
  data: {
    [key: string]: any;
  }[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}

const Tablecomponent2: React.FunctionComponent<TableProps> = (props) => {
  const handleCheckboxChange = (index, field) => {
    const updatedData = [...props.data];
    if (field === "access" || field === "edit") {
      updatedData[index][field] = !updatedData[index][field];
    } else if (field === "check") {
      updatedData[index]["check"] = !updatedData[index]["check"];
    }
    props.setData(updatedData);
  };

  return (
    <div className=" ml-[3%] h-full w-[90%] ">
      <TableContainer className="h-[35vh] w-full overscroll-y-auto">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {props.columns.map((column, index) => (
                <TableCell
                  key={index}
                  className=" border-[#fefefe] bg-[#c4b0ff] p-1 text-[15px] font-semibold"
                >
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="border-b">
            {props.data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {props.columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className=" border-b-[1px] border-solid border-[#c4b0ff33] bg-[#c4b0ff47] p-1 text-[15px] "
                  >
                    {column.field === "check" ? (
                      <div
                        onClick={() =>
                          handleCheckboxChange(rowIndex, column.field)
                        }
                        style={{
                          width: "27px",
                          height: "21px",
                          border: "2px solid #11009E",
                          backgroundColor: "#c4b0ff00",
                          borderRadius: "4px",
                          marginLeft: "4px",
                        }}
                      >
                        {row[column.field] ? (
                          <FaCheck
                            style={{
                              color: "#11009E",
                              height: "16px",
                              width: "27px",
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    ) : column.field === "access" || column.field === "edit" ? (
                      <div
                        onClick={() =>
                          handleCheckboxChange(rowIndex, column.field)
                        }
                        style={{
                          width: "50px",
                          height: "33px",
                          border: row[column.field]
                            ? "2px solid #C4B0FF"
                            : "2px solid #11009E",
                          backgroundColor: row[column.field]
                            ? "#C4B0FF"
                            : "#c4b0ff00",
                          borderRadius: "4px",
                        }}
                      >
                        {row[column.field] ? (
                          <FaCheck
                            style={{
                              color: "white",
                              height: "28px",
                              width: "44px",
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      row[column.field]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className=" mt-2 flex justify-end">
        <Button
          className="h-[39px] w-28 bg-[#786ADE] text-white hover:bg-[#241e4e]"
          variant="contained"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Tablecomponent2;
