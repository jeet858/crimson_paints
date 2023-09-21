import React from "react";
import { useRouter } from "next/router";
import { InsideNav, TableComponent, UserTemplate } from "@/components";
import { api } from "~/utils/api";

const masterbasicunit = () => {
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };

  const columns = [
    { header: "Symbol", field: "symbol" },
    { header: "Name", field: "name" },
    { header: "Short Code", field: "short_code" },
  ];

  const { data: basicUnits, isLoading, isError } = api.basicUnit.all.useQuery();

  if (isLoading)
    return (
      <UserTemplate templateParams={templateParams}>
        <div className="w-full">
          <InsideNav />
          <div className="flex items-end justify-center py-8">
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
              Basic Units
            </div>
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
          </div>
          <p>Loading Basic Units</p>
        </div>
      </UserTemplate>
    );
  if (isError)
    return (
      <UserTemplate templateParams={templateParams}>
        <div className="w-full">
          <InsideNav />
          <div className="flex items-end justify-center py-8">
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
              Basic Units
            </div>
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
          </div>
          <p>Error fetching Basic Units ❌</p>
        </div>
      </UserTemplate>
    );

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="w-full">
        <InsideNav />
        <div className="flex items-end justify-center py-8">
          <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
          <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
            Basic Units
          </div>
          <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
        </div>
        <TableComponent columns={columns} data={basicUnits} />
      </div>
    </UserTemplate>
  );
};

export default masterbasicunit;
