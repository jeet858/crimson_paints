import { InsideNav, UserTemplate } from "@/components";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import PricingTable from "~/components/tables/PricingTable";
import PricingTable2 from "~/components/tables/PricingTable2";

const Pricing = () => {
  const [selectedPriceList, setSelectedPriceList] = useState("priceList1");
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };

  const data = [
    {
      id: "a1oxide",
      brandName: "A-1 Oxide",
      groupName: "Black",
      price: ["37.00", "37.00", "37.00", "37.00"],
      containerContent: [
        "0.5 Kg Container",
        "0.5 Kg Container",
        "0.5 Kg Container",
        "0.5 Kg Container",
      ],
    },
    {
      id: "a1oxide",
      brandName: "A-1 Oxide",
      groupName: "Red",
      price: ["37.00"],
      containerContent: ["0.5 Kg Container"],
    },
    {
      id: "adbase",
      brandName: "AD Base",
      groupName: "Black",
      price: ["37.00", "", "37.00", "37.00"],
      containerContent: [
        "0.5 Kg Container",
        "0.5 Kg Container",
        "0.5 Kg Container",
        "0.5 Kg Container",
        "0.5 Kg Container",
        "0.5 Kg Container",
        "0.5 Kg Container",
        "0.5 Kg Container",
        "0.5 Kg Container",
        "0.5 Kg Container",
        "0.5 Kg Container",
        "0.5 Kg Container",
      ],
    },
    {
      id: "adbase",
      brandName: "AD Base",
      groupName: "Red",
      price: ["37.00"],
      containerContent: ["0.5 Kg Container"],
    },
  ];
  const data1 = [
    {
      id: "a1oxide",
      brandName: "A-1 Oxide",
      groupName: "Black",
      price: [],
      containerContent: [
        "0.5 Kg Container",
        "0.5 Kg Container",
        "0.5 Kg Container",
        "0.5 Kg Container",
      ],
    },
    {
      id: "a1oxide",
      brandName: "A-1 Oxide",
      groupName: "Red",
      price: [],
      containerContent: ["0.5 Kg Container"],
    },
    {
      id: "adbase",
      brandName: "AD Base",
      groupName: "Black",
      price: [],
      containerContent: [
        "0.5 Kg Container",
        "0.5 Kg Container",
        "0.5 Kg Container",
        "0.5 Kg Container",
        "0.5 Kg Container",
        "0.5 Kg Container",
        "0.5 Kg Container",
        "0.5 Kg Container",
        "0.5 Kg Container",
        "0.5 Kg Container",
        "0.5 Kg Container",
        "0.5 Kg Container",
      ],
    },
    {
      id: "adbase",
      brandName: "AD Base",
      groupName: "Red",
      price: [],
      containerContent: ["0.5 Kg Container"],
    },
  ];
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

        <h1 className="text-xl font-semibold">Quick Links</h1>

        {selectedPriceList === "priceList1" && <PricingTable data={data} />}
        {selectedPriceList === "priceList2" && <PricingTable2 data={data1} />}
      </div>
    </UserTemplate>
  );
};

export default Pricing;
