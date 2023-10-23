import Link from "next/link";
import React from "react";
import { api } from "~/utils/api";
interface OrderableColorData {
  name: string;
  packaging: string[];
}

interface OrderableColorTableProps {
  editUrl: string;
  deleteUrl: string;
  listName: string;
}
const OrderableColorTable: React.FC<OrderableColorTableProps> = ({
  editUrl,
  deleteUrl,
  listName,
}) => {
  const {
    data: brands,
    isLoading,
    isError,
  } = api.brand.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex w-full flex-col p-4">
      <div className="flex h-fit w-full justify-between rounded-[5px] bg-[#C4B0FF] p-2 text-2xl font-bold">
        <div className="w-4/5 ">Name & Packaging Units</div>
        <div className="flex w-1/5 justify-center">Action</div>
      </div>
      <div className="rounded-[5px] bg-[#C4B0FF52] ">
        <div className=" flex justify-between ">
          <h1 className="w-4/5 border-r-2 border-black p-2 text-xl  font-bold text-[#0D369F]">
            {listName}
          </h1>
          <div className=" flex w-1/5 justify-center space-x-2 py-2 text-center ">
            <Link href={{ pathname: editUrl, query: { list_name: listName } }}>
              <button className="h-8 w-16 rounded-lg bg-[#786ADE] text-white">
                Edit
              </button>
            </Link>
            <Link
              href={{ pathname: deleteUrl, query: { list_name: listName } }}
            >
              <button className="h-8 w-16 rounded-lg bg-[#FF6E65] text-white">
                Delete
              </button>
            </Link>
          </div>
        </div>
        {brands?.map((brand, index) => {
          return (
            <OrderableUnitList
              key={index}
              brand_name={brand.brand_name}
              list_name={listName}
            />
          );
        })}
        {/* {data.map((item, index) => (
          <div key={index} className="flex  w-4/5 border-r-2 border-black p-1">
            <div className="text-md  font-semibold">{item.name}:</div>
            <div className="text-md">
              <ul className="flex flex-wrap">
                {item.packaging.map((packageItem, i) => (
                  <li key={i}>{packageItem}</li>
                ))}
              </ul>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default OrderableColorTable;
interface OrderableColorListProps {
  brand_name: string;
  list_name: string;
}
const OrderableUnitList: React.FC<OrderableColorListProps> = ({
  brand_name,
  list_name,
}) => {
  const {
    data: listDetails,
    isLoading,
    isError,
  } = api.orderablrColor.list_details.useQuery(
    {
      list_name: list_name,
      brand_name: brand_name,
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
  if (isLoading) {
    return <div className="flex w-full bg-red-400"></div>;
  }
  if (isError) {
    return <div className="flex w-full bg-red-400"></div>;
  }
  const cn =
    listDetails.length > 0 ? "w-4/5 border-r-2 border-black p-2" : "hidden";
  return (
    <div className={cn}>
      <div className="flex flex-wrap whitespace-nowrap font-semibold">
        {brand_name}:
        {listDetails.map((listDetail, index) => {
          return (
            <div className="ml-2 font-normal" key={index}>
              {listDetail.color_name},
            </div>
          );
        })}
      </div>
    </div>
  );
};
