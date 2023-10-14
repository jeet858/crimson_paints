import Link from "next/link";
import React from "react";
import { api } from "~/utils/api";

interface OrderableUnitListProps {
  brand_name: string;
  list_name: string;
}

const OrderableUnitList: React.FC<OrderableUnitListProps> = ({
  brand_name,
  list_name,
}) => {
  const {
    data: listDetails,
    isLoading,
    isError,
  } = api.orderableUnit.brand_packaging.useQuery({
    brand_name: brand_name,
    list_name: list_name,
  });
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
          return <div className="ml-2 font-normal">{listDetail.packaging}</div>;
        })}
      </div>
    </div>
  );
};

export default OrderableUnitList;
