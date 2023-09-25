import React from "react";
// import { api } from "~/utils/api";

interface BrandTableProps {
  columns: { header: string; field: string }[];
  data: { [key: string]: string }[];
}
const BrandTable: React.FunctionComponent<BrandTableProps> = ({
  columns,
  data,
}) => {
  // const br={
  //   brand_name,
  //   hsn_code
  // }
  // const {
  //   data: brand,
  //   isLoading,
  //   isError,
  // } = api.brand.where_categories.useQuery(props.category);
  // console.log(brand);
  // if (isError) {
  //   return <div>Error</div>;
  // }
  // if (isLoading) {
  //   return <div>Loading</div>;
  // }
  return (
    <div className="flex w-full items-start justify-center">
      <div className="h-fit w-full p-4">
        <div className="flex items-center justify-between border-b-[3px] border-white bg-[#C4B0FF] p-2 font-semibold">
          {columns.map((column, index) => (
            <div key={index} className="w-[33.3%] py-2 text-center">
              {column.header}
            </div>
          ))}
        </div>
        <div className="h-[40vh] overflow-auto">
          {data.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex  items-center justify-between border-b-[2px] border-solid border-b-[#e7e0ff78] bg-[#e7e0ff78] p-2 text-[14px]"
            >
              {columns.map((column, colIndex) => (
                <div key={colIndex} className="w-[33.3%] py-2 text-center">
                  {row[column.field]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandTable;
