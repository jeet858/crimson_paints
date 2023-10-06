import Link from "next/link";
import React from "react";

interface OrderableUnitData {
  name: string;
  packaging: string[];
}

interface OrderableUnitTableProps {
  data: OrderableUnitData[];
  onEditClick: () => void;
  onDeleteClick: () => void;
  editUrl: string;
  deleteUrl: string;
}

const OrderableUnitTable: React.FC<OrderableUnitTableProps> = ({
  data,
  onDeleteClick,
  onEditClick,
  editUrl,
  deleteUrl,
}) => {
  return (
    <div className="flex h-[50vh] w-full flex-col p-4">
      <div className="flex h-fit w-full justify-between rounded-[5px] bg-[#C4B0FF] p-2 text-2xl font-bold">
        <h1>Name & Packaging Units</h1>
        <h1>Action</h1>
      </div>
      <div className="overflow-scroll  rounded-[5px] bg-[#C4B0FF52] ">
        <div className=" flex justify-between ">
          <h1 className="p-2 text-xl font-bold text-[#0D369F]">Factory</h1>
          <div className=" space-x-2 py-2 text-center">
            <Link href={editUrl}>
              <button
                className="h-8 w-16 rounded-lg bg-[#786ADE] text-white"
                onClick={() => onEditClick()}
              >
                Edit
              </button>
            </Link>
            <Link href={deleteUrl}>
              <button
                className="h-8 w-16 rounded-lg bg-[#FF6E65] text-white"
                onClick={() => onDeleteClick()}
              >
                Delete
              </button>
            </Link>
          </div>
        </div>

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
