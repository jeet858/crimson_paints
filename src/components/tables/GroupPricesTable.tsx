import React from "react";

interface Group {
  name: string;
  values: string[];
}

interface Item {
  priceList: string;
  brand: string;
  groups: Group[];
}

interface GroupPricesTableProps {
  data: Item[];
}

const GroupPricesTable: React.FC<GroupPricesTableProps> = ({ data }) => {
  return (
    <div className="flex h-[50vh]  flex-col pt-6">
      {data.map((item: Item, index: number) => (
        <div key={index}>
          <div className="w-full border-b-2 bg-[#786ADE] p-1 text-lg font-semibold text-white">
            Price List: {item.priceList}
          </div>
          <div className="w-full border-b-2 bg-[#786ADE] p-1 text-lg font-semibold text-white">
            Brand: {item.brand}
          </div>
          <div className="flex h-[50vh] w-full flex-wrap items-center justify-center gap-8 overflow-scroll border-2 border-[#11009E] bg-[#C4B0FF45]">
            {item.groups.map((group: Group, groupIndex: number) => (
              <div
                key={groupIndex}
                className="w-[30%] border-2 border-[#11009E]"
              >
                <div className="bg-[#786ADE] p-1 text-lg font-semibold text-white">
                  Group: {group.name}
                </div>
                <div className="bg-[#C4B0FF45] p-2">
                  {group.values.map((valueItem: string, valueIndex: number) => (
                    <div
                      key={valueIndex}
                      className="flex h-fit flex-row justify-between p-2"
                    >
                      <div>{valueItem}</div>
                      <div>
                        <input
                          className="h-10 w-24 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-2 outline-none"
                          type="text"
                          placeholder="Enter Value"
                        />
                      </div>
                    </div>
                  ))}
                  <div className="flex w-full items-end justify-end">
                    <button className="flex h-8 w-24 items-center justify-center rounded-lg bg-[#786ADE] text-lg text-white">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupPricesTable;
