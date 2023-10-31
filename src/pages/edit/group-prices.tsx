import { UserTemplate } from "@/components";
import { useRouter } from "next/router";
import React from "react";
import GroupPricesTable from "~/components/tables/GroupPricesTable";
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
        <GroupPricesTable data={data} />
      </div>
    </UserTemplate>
  );
};

export default GroupPrices;
