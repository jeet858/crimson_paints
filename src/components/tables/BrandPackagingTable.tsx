import { isError } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

interface BrandPackagingTableProps {
  brandName: string;
  idField: string[];
  editUrl: string;
  deleteUrl: string;
}

const BrandPackagingTable: React.FC<BrandPackagingTableProps> = ({
  brandName,
  idField,
  editUrl,
  deleteUrl,
}) => {
  const router = useRouter();
  const {
    data: existingPackaging,
    isLoading: existingPackagingLoading,
    isError: existingPackagingError,
  } = api.brandPackaging.where_brand_name.useQuery(brandName);
  if (existingPackagingLoading) {
    return (
      <div className="flex w-full flex-col">
        <div className="overflow-auto bg-transparent ">
          <div className="flex">
            <div id={brandName} className="flex w-4/5 flex-col p-1">
              <div className="flex justify-between">
                <div className="text-md  p-2 font-semibold">{brandName}:</div>
              </div>
              <div className="text-md">
                {/* <ul className="flex flex-wrap  p-2">
                  {item.packaging.map((packageItem, i) => (
                    <li
                      key={i}
                      className=" mb-2 mr-4 rounded border-[1px] bg-[#786ADE6B]  px-2 py-1 text-center text-xs text-white"
                    >
                      {packageItem}
                    </li>
                  ))}
                </ul> */}
              </div>
            </div>
            <div className=" flex w-1/5 items-center justify-center space-x-2 py-2 text-center">
              <button
                className="h-8 w-16 rounded-lg bg-[#786ADE] text-white"
                onClick={async () => {
                  // const queryObj = {
                  //   ...router.query,
                  // };
                  // for (let i = 0; i < idField.length; i++) {
                  //   const id = idField[i] as string;
                  //   // queryObj[id] = item[id];
                  // }
                  await router.push({
                    pathname: editUrl,
                    query: { brand_name: brandName },
                  });
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (existingPackagingError) {
    return (
      <div className="flex w-full flex-col">
        <div className="overflow-auto bg-transparent ">
          <div className="flex">
            <div id={brandName} className="flex w-4/5 flex-col p-1">
              <div className="flex justify-between">
                <div className="text-md  p-2 font-semibold">{brandName}:</div>
              </div>
              <div className="text-md">
                {/* <ul className="flex flex-wrap  p-2">
                  {item.packaging.map((packageItem, i) => (
                    <li
                      key={i}
                      className=" mb-2 mr-4 rounded border-[1px] bg-[#786ADE6B]  px-2 py-1 text-center text-xs text-white"
                    >
                      {packageItem}
                    </li>
                  ))}
                </ul> */}
              </div>
            </div>
            <div className=" flex w-1/5 items-center justify-center space-x-2 py-2 text-center">
              <button
                className="h-8 w-16 rounded-lg bg-[#786ADE] text-white"
                onClick={async () => {
                  // const queryObj = {
                  //   ...router.query,
                  // };
                  // for (let i = 0; i < idField.length; i++) {
                  //   const id = idField[i] as string;
                  //   // queryObj[id] = item[id];
                  // }
                  await router.push({
                    pathname: editUrl,
                    query: { brand_name: brandName },
                  });
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <div className="overflow-auto bg-transparent ">
        <div className="flex">
          <div id={brandName} className="flex w-4/5 flex-col p-1">
            <div className="flex justify-between">
              <div className="text-md  p-2 font-semibold">{brandName}:</div>
            </div>
            <div className="text-md">
              <ul className="flex flex-wrap  p-2">
                {existingPackaging.map((packageItem, i) => (
                  <li
                    key={i}
                    className=" mb-2 mr-4 rounded border-[1px] bg-[#786ADE6B]  px-2 py-1 text-center text-xs text-white"
                  >
                    {packageItem.packaging}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className=" flex w-1/5 items-center justify-center space-x-2 py-2 text-center">
            <button
              className="h-8 w-16 rounded-lg bg-[#786ADE] text-white"
              onClick={async () => {
                // const queryObj = {
                //   ...router.query,
                // };
                // for (let i = 0; i < idField.length; i++) {
                //   const id = idField[i] as string;
                //   // queryObj[id] = item[id];
                // }
                await router.push({
                  pathname: editUrl,
                  query: { brand_name: brandName },
                });
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandPackagingTable;
