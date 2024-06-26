import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { InsideNav, TableComponent, UserTemplate } from "@/components";
import { api } from "~/utils/api";

const MasterDistrict: React.FunctionComponent = () => {
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };

  const columns = [
    { header: "State", field: "state" },
    { header: "District", field: "district" },
  ];

  const {
    data: districts,
    isLoading,
    isError,
  } = api.location.all_district.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <UserTemplate templateParams={templateParams}>
        <div className="w-full">
          <InsideNav />
          <div className="h-fit w-full p-4">
            <div className="flex items-center justify-center">
              <div className="flex w-full items-end justify-center ">
                <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
                <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
                  District
                </div>
                <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
              </div>
              <div className="flex items-end justify-end">
                <button className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]">
                  Add
                </button>
              </div>
            </div>
          </div>
          <p>Loading District</p>
        </div>
      </UserTemplate>
    );
  if (isError)
    return (
      <UserTemplate templateParams={templateParams}>
        <div className="w-full">
          <InsideNav />
          <div className="h-fit w-full p-4">
            <div className="flex items-center justify-center">
              <div className="flex w-full items-end justify-center ">
                <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
                <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
                  District
                </div>
                <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
              </div>
              <div className="flex items-end justify-end">
                <button
                  className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]"
                  onClick={async () => {
                    await router.push("/add/district-add");
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <p>Error fetching District ❌</p>
        </div>
      </UserTemplate>
    );

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="w-full">
        <InsideNav />
        <div className="h-fit w-full p-4">
          <div className="flex items-center justify-center">
            <div className="flex w-full items-end justify-center ">
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
              <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
                District
              </div>
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            </div>
            <div className="flex items-end justify-end">
              <button
                className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]"
                onClick={async () => {
                  await router.push("/add/district-add");
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <TableComponent
          columns={columns}
          data={districts}
          idField={["state", "district"]}
          editUrl="edit/district-edit"
          deleteUrl="delete/district-delete"
        />
      </div>
    </UserTemplate>
  );
};

export default MasterDistrict;
