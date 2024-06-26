import { InsideNav, UserTemplate } from "@/components";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import PricingTable from "~/components/tables/PricingTable";
import { api } from "~/utils/api";

const Pricing = () => {
  const [selectedPriceList, setSelectedPriceList] = useState("Factory");
  const router = useRouter();
  const { userType } = router.query;
  const { list_name } = router.query;
  useEffect(() => {
    if (list_name) {
      setSelectedPriceList(list_name as string);
    }
  }, [list_name]);
  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };
  const {
    data: brands,
    isLoading: isBrandsLoading,
    isError: isBrandsError,
  } = api.brand.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const {
    data: price_list,
    isError,
    isLoading,
  } = api.pricing.all_list_name.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  if (isBrandsLoading || isLoading) {
    return (
      <UserTemplate templateParams={templateParams}>
        <InsideNav />
        <div className="h-fit w-full p-4">
          <div className="flex items-center justify-center">
            <div className="flex w-full items-end justify-center ">
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
              <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
                Product Group Pricing
              </div>
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            </div>
            <div className="flex items-end justify-end">
              <button
                className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]"
                onClick={async () => {
                  await router.push("");
                }}
              >
                Add
              </button>
            </div>
          </div>
          <div className="mt-4 flex h-fit w-full justify-between rounded-tl-lg rounded-tr-lg bg-[#786ADE] p-1">
            <div className="flex text-xl font-semibold text-white">
              Price Lists
            </div>
            <div className="flex flex-row justify-evenly gap-6">
              <div
                className={`h-fit w-fit rounded-lg ${
                  selectedPriceList === "priceList1"
                    ? "bg-[#C4B0FF8C]"
                    : "bg-transparent"
                } p-1 text-lg text-white`}
                onClick={() => setSelectedPriceList("priceList1")}
              >
                <button>Price Lists 1</button>
              </div>
              <div
                className={`h-fit w-fit rounded-lg ${
                  selectedPriceList === "priceList2"
                    ? "bg-[#C4B0FF8C]"
                    : "bg-transparent"
                } p-1 text-lg text-white`}
                onClick={() => setSelectedPriceList("priceList2")}
              >
                <button>Price Lists 2</button>
              </div>
            </div>
          </div>
        </div>
      </UserTemplate>
    );
  }
  if (isBrandsError || isError) {
    return (
      <UserTemplate templateParams={templateParams}>
        <InsideNav />
        <div className="h-fit w-full p-4">
          <div className="flex items-center justify-center">
            <div className="flex w-full items-end justify-center ">
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
              <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
                Product Group Pricing
              </div>
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            </div>
            <div className="flex items-end justify-end">
              <button
                className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]"
                onClick={async () => {
                  await router.push("");
                }}
              >
                Add
              </button>
            </div>
          </div>
          <div className="mt-4 flex h-fit w-full justify-between rounded-tl-lg rounded-tr-lg bg-[#786ADE] p-1">
            <div className="flex text-xl font-semibold text-white">
              Price Lists
            </div>
            <div className="flex flex-row justify-evenly gap-6">
              <div
                className={`h-fit w-fit rounded-lg ${
                  selectedPriceList === "priceList1"
                    ? "bg-[#C4B0FF8C]"
                    : "bg-transparent"
                } p-1 text-lg text-white`}
                onClick={() => setSelectedPriceList("priceList1")}
              >
                <button>Price Lists 1</button>
              </div>
              <div
                className={`h-fit w-fit rounded-lg ${
                  selectedPriceList === "priceList2"
                    ? "bg-[#C4B0FF8C]"
                    : "bg-transparent"
                } p-1 text-lg text-white`}
                onClick={() => setSelectedPriceList("priceList2")}
              >
                <button>Price Lists 2</button>
              </div>
            </div>
          </div>
        </div>
      </UserTemplate>
    );
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSelectedPriceList(value);
  };
  return (
    <UserTemplate templateParams={templateParams}>
      <InsideNav />
      <div className="h-fit w-full p-4">
        <div className="flex items-center justify-center">
          <div className="flex w-full items-end justify-center ">
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
              Product Group Pricing
            </div>
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
          </div>
          <div className="flex items-end justify-end"></div>
        </div>
        <div className="mt-4 flex h-fit w-full justify-between rounded-tl-lg rounded-tr-lg bg-[#786ADE] p-1">
          <div className="flex text-xl font-semibold text-white">
            Price Lists
          </div>
          <div className="flex flex-row justify-evenly gap-6">
            <select
              placeholder="Select Price List"
              className="h-full w-fit rounded-lg bg-[#C4B0FF8C] px-4 text-white"
              value={selectedPriceList}
              onChange={handleInputChange}
            >
              {price_list?.map((list, index) => {
                return (
                  <option value={list.price_list_name} key={index}>
                    {list.price_list_name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <h1 className="text-xl font-semibold">Quick Links</h1>

        <PricingTable data={brands} list_name={selectedPriceList} />
      </div>
    </UserTemplate>
  );
};

export default Pricing;
