import React from "react";
import Tablecomponent from "./Tablecomponent";

const columns = [
  { header: "s", field: "s" },
  { header: "Name", field: "name" },
  { header: "Unit & Packaging", field: "unit" },
];

const data = [
  { s: 1, name: "Bag of (1 Kg X 20 Pou.)", unit: "20 x (1 Kg Pou.)" },
  { s: 2, name: "Bag of (1 Kg X 20 Pou.)", unit: "20 x (1 Kg Pou.)" },
];

const Complextypetable = () => {
  return (
    <div>
      <Tablecomponent columns={columns} data={data} />
    </div>
  );
};

export default Complextypetable;
