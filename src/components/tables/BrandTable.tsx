import Link from "next/link";
import React from "react";
import { api } from "~/utils/api";
interface BrandItem {
  brand_name: string;
  categoriesName: string;
  hsnCode_id: number;
}
interface BrandTableProps {
  category: string;
  columns: { header: string; field: string }[];
  onEditClick: (rowData: BrandItem) => void;
  onDeleteClick: (rowData: BrandItem) => void;
  editUrl: string;
  deleteUrl: string;
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
            <div className="w-[33.3%] py-2 text-center">Actions</div>
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
                <div className="w-[33.3%] space-x-2 py-2 text-center">
                  <Link href={props.editUrl}>
                    <button
                      className="h-8 w-16 rounded-lg bg-[#786ADE] text-white"
                      onClick={() => props.onEditClick(brand)}
                    >
                      Edit
                    </button>
                  </Link>
                  <Link href={props.deleteUrl}>
                    <button
                      className="h-8 w-16 rounded-lg bg-[#FF6E65] text-white"
                      onClick={() => props.onDeleteClick(brand)}
                    >
                      Delete
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandTable;
