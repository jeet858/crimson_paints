import React from "react";

interface OrderableUnitData {
  name: string;
  packaging: string[];
}

interface OrderableUnitTableProps {
  data: OrderableUnitData[];
}

const OrderableUnitTable: React.FC<OrderableUnitTableProps> = ({ data }) => {
  return (
    <div className="flex h-[50vh] w-full flex-col p-4">
      <h1 className="h-fit w-full rounded-[5px] bg-[#C4B0FF] p-2 text-2xl font-bold">
        Name & Packaging Units
      </h1>
      <div className="overflow-scroll  rounded-[5px] bg-[#C4B0FF52] ">
        <div className=" p-2 text-xl font-bold text-[#0D369F]">Factory</div>

        {data.map((item, index) => (
          <div key={index} className="flex  p-1 ">
            <div className="text-md  font-semibold">{item.name}:</div>
            <div className="text-md">
              <ul className="flex flex-wrap">
                {item.packaging.map((packageItem, i) => (
                  <li key={i}>{packageItem}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderableUnitTable;
