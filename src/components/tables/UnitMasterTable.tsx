import React from "react";
import TableComponent from "./TableComponent";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
const columns = [
  { header: "S", field: "s" },
  { header: "Qty / Unit", field: "qntUnit" },
  { header: "Packaging", field: "packaging" },
  { header: "Short Code", field: "shortCode" },
  { header: "Name", field: "name" },
];
const UnitMasterTable: React.FunctionComponent = () => {
  const tableData = [
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },

    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },

    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },

    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },

    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },

    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
    {
      s: 1,
      qntUnit: "0.20 kilogram",
      packaging: "contaner",
      shortCode: "2 kg. con.",
      name: "0.2 kg. con.",
    },
  ];

  return (
    <div>
      <div>
        <TableComponent
          columns={columns}
          data={tableData}
          userType="admin"
          idField={[]}
          editUrl=""
          deleteUrl=""
        />
      </div>
    </div>
  );
};

export default UnitMasterTable;
