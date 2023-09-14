import React from "react";
import Tablecomponent from "../tables/TableComponent";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
const columns = [
  { header: "s", field: "s" },
  { header: "Name", field: "name" },
  { header: "Unit & Packaging", field: "unit" },
];
///////
/////
const data = [
  { s: 1, name: "Bag of (1 Kg X 20 Pou.)", unit: "20 x (1 Kg Pou.)" },
  { s: 2, name: "Bag of (1 Kg X 20 Pou.)", unit: "20 x (1 Kg Pou.)" },
];

const ComplexTypeTable: React.FunctionComponent = () => {
  return (
    <div>
      <Tablecomponent columns={columns} data={data} />
    </div>
  );
};

export default ComplexTypeTable;
