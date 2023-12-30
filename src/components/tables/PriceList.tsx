import React, { useEffect, useRef, useState } from "react";
interface PriceListProps {
  data: {
    id: string;
    brandName: string;
    content: string[];
    body: {
      mainvalue: string;
      value: string[];
      price: string[];
    }[];
  }[];
}
const PriceList: React.FC<PriceListProps> = ({ data }) => {
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
      <div className="flex flex-col rounded-bl-lg rounded-br-lg">
        {data.map((item, index) => (
          <div
            key={index}
            id={item.id}
            className="flex flex-col rounded-bl-lg rounded-br-lg"
          >
            <div className="flex h-[4rem] w-full justify-between border-b-[1px] border-[#E7E0FF78] bg-[#786ADE]   ">
              <div className="flex w-[20%] items-center justify-center border-[1px] border-[#c1baf2] text-lg  font-semibold text-white">
                <span>{item.brandName}</span>
              </div>
              <div className="flex w-[70%] items-center justify-evenly  border-2 border-[#c1baf2] text-white">
                {item.content.map((content, contentIndex) => (
                  <span
                    key={contentIndex}
                    className="w-[5rem] text-sm font-semibold"
                  >
                    {content}
                  </span>
                ))}
              </div>
              <div className="flex w-[10%] items-center justify-center  border-[1px] border-[#c1baf2]">
                <div className="h-fit   rounded-lg p-1 text-lg text-white">
                  <div>Auction</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col bg-[#C4B0FF42]">
              {item.body.map((bodyRow, bodyIndex) => (
                <div
                  key={bodyIndex}
                  className="flex h-[6rem] justify-between border-[1px]  border-[#786ADE]"
                >
                  <div className="flex  w-[20%] flex-wrap items-center gap-2 border-[1px] border-[#786ADE]  text-base text-black">
                    <div className="font-semibold">{bodyRow.mainvalue}: </div>
                    {bodyRow.value.map((value, valueIndex) => (
                      <div key={valueIndex} className="">
                        <span className="">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex w-[70%] items-center justify-evenly">
                    {bodyRow.price.map((price, priceIndex) => (
                      <div key={priceIndex} className="">
                        <span className=" w-[5rem] text-lg font-semibold">
                          ₹ {price}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex w-[10%] items-center justify-center   border-[1px] border-[#786ADE]">
                    <div className="flex h-[2rem] w-[4rem] items-center justify-center   rounded-lg bg-[#786ADE] p-1 text-lg text-white">
                      <button>Edit</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceList;
