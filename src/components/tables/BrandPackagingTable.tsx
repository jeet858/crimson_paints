import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface OrderableUnitData {
  id: string;
  name: string;
  packaging: string[];
}

interface BrandPackagingTableProps {
  data: OrderableUnitData[];
  idField: string[];
  editUrl: string;
  deleteUrl: string;
}

const BrandPackagingTable: React.FC<BrandPackagingTableProps> = ({
  data,
  idField,
  editUrl,
  deleteUrl,
}) => {
  const router = useRouter();
  return (
    <div className="flex h-[50vh] w-full flex-col">
      <h1 className="h-fit w-full rounded-[5px] bg-[#786ADE] p-2 text-2xl font-bold">
        Brand Name / Code
      </h1>
      <div className="overflow-auto  rounded-[5px] bg-[#C4B0FF52] ">
        {data.map((item, index) => (
          <div key={index} id={item.id} className="flex flex-col p-1 ">
            <div className="flex justify-between">
              <div className="text-md  p-2 font-semibold">{item.name}:</div>
              <div className="w-[33.3%] space-x-2 py-2 text-center">
                <button
                  className="h-8 w-16 rounded-lg bg-[#786ADE] text-white"
                  onClick={async () => {
                    const queryObj = {
                      ...router.query,
                    };
                    for (let i = 0; i < idField.length; i++) {
                      const id = idField[i] as string;
                      queryObj[id] = item[id];
                    }
                    router.push({
                      pathname: editUrl,
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
                    for (let i = 0; i < idField.length; i++) {
                      const id = idField[i] as string;
                      queryObj[id] = item[id];
                    }
                    router.push({
                      pathname: deleteUrl,
                      query: queryObj,
                    });
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="text-md">
              <ul className="flex flex-wrap  p-2">
                {item.packaging.map((packageItem, i) => (
                  <li
                    key={i}
                    className=" mb-2 mr-4 rounded border-[1px] bg-[#786ADE6B]  px-2 py-1 text-center text-xs text-white"
                  >
                    {packageItem}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandPackagingTable;
