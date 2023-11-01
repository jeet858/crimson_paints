import { UserTemplate } from "@/components";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import GroupPricesEditTable from "~/components/tables/GroupPricesEditTable";
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
    ],
  },
];
const GroupPrices = () => {
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };
  const { brand_name, group_name, list_name } = router.query;
  useEffect(() => {}, [brand_name, group_name, list_name]);
  return (
    <UserTemplate templateParams={templateParams}>
      <div className="h-fit w-full p-4">
        <div className="flex items-center justify-center">
          <div className="flex w-full items-end justify-center ">
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
              Product Group Pricing
            </div>
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
          </div>
        </div>
        {/* <GroupPricesEditTable
          brand_name={brand_name as string}
          group_name={group_name as string}
          list_name={list_name as string}
        /> */}
      </div>
      <div className="w-full border-b-2 bg-[#786ADE] p-1 text-lg font-semibold text-white">
        Price List : {list_name}
      </div>
      <div className="w-full border-b-2 bg-[#786ADE] p-1 text-lg font-semibold text-white">
        Brand: {brand_name}
      </div>
      <div className="flex h-[50vh] w-full justify-center overflow-y-scroll bg-[#C4B0FF45]">
        <div className="flex w-[31%]">
          <GroupPricesEditTable
            brand_name={brand_name as string}
            group_name={group_name as string}
            list_name={list_name as string}
          />
        </div>
      </div>
    </UserTemplate>
  );
};

export default GroupPrices;
