import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { InsideNav, UserTemplate } from "@/components";
import GroupForProcingTable from "~/components/tables/GroupForProcingTable";
import { date } from "zod";
import { api } from "~/utils/api";
const GroupForPricing: React.FunctionComponent = () => {
  const router = useRouter();
  const { userType } = router.query;
  const [selectedCategory, setSelectedCategory] = useState("");
  const tableRef = useRef<HTMLDivElement | null>(null);

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };

  const {
    data: brands,
    isLoading,
    isError,
  } = api.brand.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <UserTemplate templateParams={templateParams}>
        <InsideNav />
        <div className="h-fit w-full p-4">
          <div className="flex items-center justify-center">
            <div className="flex w-full items-end justify-center ">
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
              <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
                Brand wise Qty & Packaging List
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
        <div>Still loading</div>
      </UserTemplate>
    );
  }
  if (isError) {
    return (
      <UserTemplate templateParams={templateParams}>
        <InsideNav />
        <div className="h-fit w-full p-4">
          <div className="flex items-center justify-center">
            <div className="flex w-full items-end justify-center ">
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
              <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
                Brand wise Qty & Packaging List
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
        <div>Error</div>
      </UserTemplate>
    );
  }
  return (
    <UserTemplate templateParams={templateParams}>
      <InsideNav />
      <div className="h-fit w-full p-4">
        <div className="flex items-center justify-center">
          <div className="flex w-full items-end justify-center ">
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
              Brand wise Qty & Packaging List
            </div>
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
          </div>
          <div className="flex items-end justify-end">
            <button
              className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]"
              onClick={async () => {
                await router.push("add/group-for-pricing-add");
              }}
            >
              Add
            </button>
          </div>
        </div>
        <h1 className="text-xl font-semibold">Quick Links</h1>
        <div className="border-1 w-full rounded-lg bg-[#C4B0FF] p-2">
          {brands.map((brand, index) => (
            <button
              key={index}
              onClick={() => {
                const targetElement = document.getElementById(brand.brand_name);
                targetElement!.scrollIntoView();
              }}
              className="border-1 mb-4 mr-4 h-[2rem] w-fit rounded-xl bg-[#e7e0fffa] px-4 font-semibold"
            >
              {brand.brand_name}
            </button>
          ))}
        </div>
        <div ref={tableRef}>
          <GroupForProcingTable
            data={brands}
            editUrl="edit/group-for-pricing-edit"
            deleteUrl="delete/group-for-pricing-delete"
          />
        </div>
      </div>
    </UserTemplate>
  );
};

export default GroupForPricing;
