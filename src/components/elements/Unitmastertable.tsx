import React from "react";
import Tablecomponent from "./Tablecomponent";
const columns = [
  { header: "S", field: "s" },
  { header: "Qty / Unit", field: "qntUnit" },
  { header: "Packaging", field: "packaging" },
  { header: "Short Code", field: "shortCode" },
  { header: "Name", field: "name" },
];
const Unitmastertable = () => {
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
  ];

  return (
    <div>
      <div>
        <Tablecomponent columns={columns} data={tableData} />
      </div>
    </div>
  );
};

export default Unitmastertable;
