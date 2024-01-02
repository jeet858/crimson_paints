import { InsideNav, UserTemplate } from "@/components";
import { useRouter } from "next/router";
import React, { useState } from "react";
import PriceListTable from "~/components/tables/PriceListTable";

const PriceList: React.FunctionComponent = () => {
  const [selectedPriceList, setSelectedPriceList] = useState("priceList1");
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };
  const yourData = [
    {
      id: "1",
      brandName: "Crimocem Super",
      content: [
        "20 Kg Bag",
        "20 Kg Bag",
        "5 Kg Con.",
        "10 Kg Jar",
        "25 Kg Jar",
        "5 Kg Pouch",
        "5 Kg Carton ( 5 Kg X 4 Cont.)",
        "25 Kg Bag ( 5 Kg X 5 Pouch)",
      ],

      body: [
        {
          mainvalue: "Deep Shades",
          value: ["Aquamarine", "Brick red", "Light Olive", "Lime"],
          price: [
            "100",
            "200",
            "514",
            "534",
            "345",
            "444",
            "433",
            "334",
            "111",
          ],
        },
        {
          mainvalue: "Deep Shades",
          value: ["Aquamarine", "Brick red", "Light Olive", "Lime"],
          price: [
            "100",
            "200",
            "514",
            "534",
            "345",
            "444",
            "433",
            "334",
            "111",
          ],
        },
      ],
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
              Price List
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
        <PriceListTable data={yourData} />
      </div>
    </UserTemplate>
  );
};

export default PriceList;
