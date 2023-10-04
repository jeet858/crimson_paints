import React from "react";
import { api } from "~/utils/api";

interface BrandTableProps {
  category: string;
  columns: { header: string; field: string }[];
}
const BrandTable: React.FunctionComponent<BrandTableProps> = (props) => {
  const {
    data: brands,
    isLoading,
    isError,
  } = api.brand.where_categories.useQuery(props.category);
  console.log(brands);
  if (isError) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <div className="px-4 text-2xl font-bold">
        Categories: {props.category}
      </div>
      <div className="flex w-full items-start justify-center">
        <div className="h-fit w-full p-4">
          <div className="flex items-center justify-between border-b-[3px] border-white bg-[#C4B0FF] p-2 font-semibold">
            {props.columns.map((column, index) => (
              <div key={index} className="w-[33.3%] py-2 text-center">
                {column.header}
              </div>
            ))}
          </div>
          <div className="overflow-auto">
            {brands.map((brand, rowIndex) => (
              <div
                key={rowIndex}
                className="flex  items-center justify-between border-b-[2px] border-solid border-b-[#e7e0ff78] bg-[#e7e0ff78] p-2 text-[14px]"
              >
                {props.columns.map((column, colIndex) => (
                  <div key={colIndex} className="w-[33.3%] py-2 text-center">
                    {brand[column.field]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandTable;
