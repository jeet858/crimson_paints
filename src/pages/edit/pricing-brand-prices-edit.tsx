import { UserTemplate } from "@/components";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import GroupPricesEditTable from "~/components/tables/GroupPricesEditTable";
import { api } from "~/utils/api";
const data = [
  {
    brand: "AD Base",
    groups: [
      {
        name: "AD 01",
        values: [
          "18 Lit Jar",
          "3.6 Lit Con.",
          "9 Lit Jar",
          "900 ML. Con.",
          "Carton of (3.6 Lt. X 4 Con.)",
          "Carton of (900 ML. X 6 Con.) ",
        ],
      },
      {
        name: "AD 02",
        values: [
          "18 Lit Jar",
          "3.6 Lit Con.",
          "9 Lit Jar",
          "900 ML. Con.",
          "Carton of (3.6 Lt. X 4 Con.)",
          "Carton of (900 ML. X 6 Con.) ",
        ],
      },
      {
        name: "AD 03",
        values: [
          "18 Lit Jar",
          "3.6 Lit Con.",
          "9 Lit Jar",
          "900 ML. Con.",
          "Carton of (3.6 Lt. X 4 Con.)",
          "Carton of (900 ML. X 6 Con.) ",
        ],
      },
      {
        name: "AD 04",
        values: [
          "18 Lit Jar",
          "3.6 Lit Con.",
          "9 Lit Jar",
          "900 ML. Con.",
          "Carton of (3.6 Lt. X 4 Con.)",
          "Carton of (900 ML. X 6 Con.) ",
        ],
      },
      {
        name: "AD 05",
        values: [
          "18 Lit Jar",
          "3.6 Lit Con.",
          "9 Lit Jar",
          "900 ML. Con.",
          "Carton of (3.6 Lt. X 4 Con.)",
          "Carton of (900 ML. X 6 Con.) ",
        ],
      },
    ],
  },
];
const BrandPrices = () => {
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };
  const { brand_name, list_name } = router.query;

  useEffect(() => {}, [brand_name, list_name]);
  const {
    data: groups,
    isLoading,
    isError,
  } = api.groupPricing.gorups.useQuery(brand_name as string, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
  return (
    <UserTemplate templateParams={templateParams}>
      <div className="h-fit w-full p-4">
        <div className="flex items-center justify-center">
          <div className="mb-8 flex w-full items-end justify-center">
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
              Product Group Pricing
            </div>
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
          </div>
        </div>
        {/* {groups?.map((group, index) => {
          console.log(brand_name);
          console.log(list_name);
          console.log(group.group_name);

          return (
            <GroupPricesEditTable
              brand_name={brand_name as string}
              list_name={list_name as string}
              group_name={group.group_name}
              key={index}
            />
          );
        })} */}
        <div className="w-full border-b-2 bg-[#786ADE] p-1 text-lg font-semibold text-white">
          Price List : {list_name}
        </div>
        <div className="w-full border-b-2 bg-[#786ADE] p-1 text-lg font-semibold text-white">
          Brand: {brand_name}
        </div>
        <div className="flex h-fit min-h-[50vh] w-full flex-wrap overflow-y-scroll bg-[#C4B0FF45] pb-8">
          {groups?.map((group, index) => {
            console.log(brand_name);
            console.log(list_name);
            console.log(group.group_name);
            return (
              <div className="flex w-[31%]" key={index}>
                <GroupPricesEditTable
                  brand_name={brand_name as string}
                  list_name={list_name as string}
                  group_name={group.group_name}
                  key={index}
                />
              </div>
            );
          })}
        </div>
      </div>
    </UserTemplate>
  );
};

export default BrandPrices;
