import React, { useEffect, useRef, useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";

interface PricingTableProps {
  data: {
    id: string;
    brandName: string;
    groupName: string;
    price: string[];
    containerContent: string[];
  }[];
}

const PricingTable: React.FC<PricingTableProps> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const tableRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = (id: string) => {
    setSelectedCategory(id === selectedCategory ? "" : id);
  };

  useEffect(() => {
    if (tableRef.current && selectedCategory) {
      const section = document.getElementById(selectedCategory);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [selectedCategory]);

  const generateButtons = () => {
    const uniqueIds = [...new Set(data.map((item) => item.id))];
    return uniqueIds.map((id, index) => (
      <button
        key={index}
        className="border-1 mb-2 mr-2 h-[1.8rem] w-fit rounded-xl bg-[#d5c9fc] px-4 font-semibold"
        onClick={() => handleButtonClick(id)}
      >
        {data.find((item) => item.id === id)?.brandName}
      </button>
    ));
  };
  return (
    <div className="h-[50vh] w-full overflow-scroll " ref={tableRef}>
      <div className="border-1 h-[5.4rem] w-full overflow-auto bg-[#b39df5] p-2">
        {generateButtons()}
      </div>
      {data.map((item, index) => (
        <div
          key={index}
          id={item.id}
          className="flex flex-col rounded-bl-lg rounded-br-lg"
        >
          {index === 0 ||
          (data[index - 1]?.brandName !== undefined &&
            data[index - 1]?.brandName !== item.brandName) ? (
            <div className="flex h-fit w-full justify-between border-b-[1px] border-[#E7E0FF78] bg-[#786ADE] p-1 px-6">
              <div className="flex text-xl font-semibold text-white">
                Brands: {item.brandName} +
              </div>
              <div className="flex flex-row justify-evenly gap-6">
                <div className="h-fit w-fit rounded-lg bg-[#C4B0FF8C] p-1 text-lg text-white">
                  <button>Brand Prices</button>
                </div>
              </div>
            </div>
          ) : null}
          <div className="flex h-fit w-full justify-between bg-[#786ADE] p-1 px-6">
            <div className="flex text-xl font-semibold text-white">
              Group: {item.groupName}
            </div>
            <div className="flex flex-row justify-evenly gap-6">
              <div className="h-fit w-fit rounded-lg bg-[#C4B0FF8C] p-1 text-lg text-white">
                <button>Group Prices</button>
              </div>
            </div>
          </div>
          <div className="flex h-fit w-full bg-[#C4B0FF42] ">
            <div className="flex flex-wrap">
              {item.containerContent.map((content, id) => (
                <div
                  key={id}
                  className="flex flex-col items-center justify-center border-b-2 border-r-2 border-[#786ADE] p-3"
                >
                  <span className="text-lg font-semibold">{content}</span>
                  {item.price[id] ? (
                    <span className="text-base"> ₹{item.price[id]}</span>
                  ) : (
                    <span className="text-base text-[#FF6E65]">Not Set</span>
                  )}
                  {item.price[id] ? (
                    <div className="flex items-center justify-center p-4">
                      <button className="flex h-8 w-20 items-center justify-center rounded-lg bg-[#786ADE] p-2 text-white">
                        <MdOutlineModeEditOutline />
                        Edit
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-4">
                      <button className="flex h-8 w-20 items-center justify-center rounded-lg bg-[#FF6E65] p-2 text-white">
                        Set Price
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingTable;
