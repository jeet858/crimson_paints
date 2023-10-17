import Link from "next/link";
import React from "react";
interface OrderableColorData {
  name: string;
  packaging: string[];
}

interface OrderableColorTableProps {
  data: OrderableColorData[];
  onEditClick: () => void;
  onDeleteClick: () => void;
  editUrl: string;
  deleteUrl: string;
}
const OrderableColorTable: React.FC<OrderableColorTableProps> = ({
  data,
  onDeleteClick,
  onEditClick,
  editUrl,
  deleteUrl,
}) => {
  return (
    <div className="flex h-[50vh] w-full flex-col p-4">
      <div className="flex h-fit w-full justify-between rounded-[5px] bg-[#C4B0FF] p-2 text-2xl font-bold">
        <h1>Name & Colors</h1>
        <h1>Action</h1>
      </div>

      <div className=" flex justify-between rounded-[5px] bg-[#C4B0FF52]">
        <h1 className="p-2 text-xl font-bold text-[#0D369F]">
          Orrisa (Phiroza Green of ARF)
        </h1>
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
      <div className="overflow-scroll   bg-[#C4B0FF52] ">
        {data.map((item, index) => (
          <div key={index} className="flex w-full gap-8  p-1 ">
            <div className="text-md flex  flex-wrap items-start justify-start  font-semibold">
              {item.name}:
            </div>
            <div className="text-md  ">
              <ul className="t flex flex-wrap gap-x-6">
                {item.packaging.map((packageItem, i) => (
                  <li key={i}>{packageItem},</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderableColorTable;
