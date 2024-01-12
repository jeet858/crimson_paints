import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { InsideNav, TableComponent, UserTemplate } from "@/components";
import { api } from "~/utils/api";

const MasterState: React.FunctionComponent = () => {
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };

  const columns = [{ header: "Name", field: "location" }];

  const {
    data: states,
    isLoading,
    isError,
  } = api.location.all_state.useQuery();

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
                  State
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
          <p>Loading States</p>
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
                  State
                </div>
                <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
              </div>
              <div className="flex items-end justify-end">
                <button
                  className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]"
                  onClick={async () => {
                    await router.push("/add/state-add");
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <p>Error fetching States ❌</p>
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
                State
              </div>
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            </div>
            <div className="flex items-end justify-end">
              <button
                className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]"
                onClick={async () => {
                  await router.push("/add/state-add");
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <TableComponent
          columns={columns}
          data={states}
          idField={["location"]}
          editUrl="edit/state-edit"
          deleteUrl="delete/state-delete"
        />
      </div>
    </UserTemplate>
  );
};

export default MasterState;
