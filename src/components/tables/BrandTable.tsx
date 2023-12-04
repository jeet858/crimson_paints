import Link from "next/link";
import { useRouter } from "next/router";
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
  idField: string[];
  editUrl: string;
  deleteUrl: string;
}
const BrandTable: React.FunctionComponent<BrandTableProps> = (props) => {
  const {
    data: brands,
    isLoading,
    isError,
  } = api.brand.where_categories.useQuery(props.category);
  const router = useRouter();
  console.log(brands);
  if (isError) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <div className="flex justify-between px-4 text-2xl font-bold">
        Categories: {props.category}
        <button
          className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]"
          onClick={async () => {
            await router.push({
              pathname: "/add/product-brand-add",
              query: { category: props.category },
            });
          }}
        >
          Add
        </button>
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
                  <button
                    className="h-8 w-16 rounded-lg bg-[#786ADE] text-white"
                    onClick={async () => {
                      const queryObj = {
                        ...router.query,
                      };
                      for (let i = 0; i < props.idField.length; i++) {
                        const id = props.idField[i] as string;
                        queryObj[id] = brand[id];
                      }
                      await router.push({
                        pathname: props.editUrl,
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
                      for (let i = 0; i < props.idField.length; i++) {
                        const id = props.idField[i] as string;
                        queryObj[id] = brand[id];
                      }
                      await router.push({
                        pathname: props.deleteUrl,
                        query: queryObj,
                      });
                    }}
                  >
                    Delete
                  </button>
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
