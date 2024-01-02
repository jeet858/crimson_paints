import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { api } from "~/utils/api";
interface PriceListTableProps {
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
const PriceListTable: React.FC<PriceListTableProps> = ({ data }) => {
  const router = useRouter();

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
    return brands?.map((brand, index) => (
      <button
        key={index}
        className="border-1 mb-2 mr-2 h-[1.8rem] w-fit rounded-xl bg-[#d5c9fc] px-4 font-semibold"
        onClick={() => handleButtonClick(brand.brand_name)}
      >
        {brand.brand_name}
      </button>
    ));
  };
  const {
    data: brands,
    isLoading: isBrandsLoading,
    isError: isBrandsError,
  } = api.brand.all.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
  const {
    data: pricings,
    isLoading: isPricingsLoading,
    isError: isPricingError,
  } = api.pricing.all.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
  const {
    data: groupPricings,
    isLoading: isGroupPricingsLoading,
    isError: isGroupPricingsError,
  } = api.groupPricing.all.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
  const {
    data: groups,
    isLoading: isGroupsLoading,
    isError: isGroupsError,
  } = api.groupPricing.groups_all.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
  const {
    data: existingPackaging,
    isLoading: existingPackagingLoading,
    isError: existingPackagingError,
  } = api.brandPackaging.all.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  if (
    isBrandsError ||
    isGroupPricingsError ||
    isGroupsError ||
    existingPackagingError ||
    isPricingError
  ) {
    return <div>Error</div>;
  }
  if (
    isBrandsLoading ||
    isGroupPricingsLoading ||
    isGroupsLoading ||
    existingPackagingLoading ||
    isPricingsLoading
  ) {
    return <div>Loading</div>;
  }

  return (
    <div className="h-[50vh] w-full overflow-scroll " ref={tableRef}>
      <div className="border-1 h-fit w-full overflow-auto bg-[#b39df5] p-2">
        {generateButtons()}
      </div>
      <div className="flex flex-col rounded-bl-lg rounded-br-lg">
        {brands.map((brand, index) => {
          const arr = existingPackaging.filter(
            (data) => data.brand_name === brand.brand_name
          );
          return (
            <div className="h-fit w-full flex-col">
              {/* <div className="flex h-fit w-full border-y-2 border-white">
                <div className="flex w-1/5 flex-col">
                  <div className="flex h-12 w-full items-center justify-center border-b-4 border-r-4 border-[#b39df5] bg-[#786ADE] text-2xl text-white">
                    {brand.brand_name}
                  </div>
                  <div className="flex h-fit w-full flex-col items-center justify-center  border-[#b39df5] bg-[#d5c9fc] text-base text-black">
                    {groups.map((group, index) => {
                      if (group.brand_name === brand.brand_name) {
                        return (
                          <div className="flex h-fit min-h-[3rem] w-full flex-wrap items-center border-b-2 border-r-4 border-[#786ADE] bg-[#d5c9fc] px-1 text-base text-black">
                            {group.group_name}:
                            {groupPricings.map((groupPricing, index) => {
                              if (
                                groupPricing.brand_name === brand.brand_name &&
                                groupPricing.group_name === group.group_name
                              ) {
                                return (
                                  <span className="mx-1">
                                    {`${groupPricing.color_name},`}
                                  </span>
                                );
                              }
                            })}
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
                <div className="flex h-12 w-[80%] items-center  bg-[#786ADE] px-4 text-white">
                  {existingPackaging.map((packaging, index) => {
                    if (packaging.brand_name === brand.brand_name) {
                      const price = pricings?.find(
                        (data) =>
                          data.brand_name === brand.brand_name &&
                          data.packaging === packaging.packaging &&
                          data.list_name === "Factory"
                      );
                      return (
                        <div className="flex h-full flex-col items-center justify-center border-r-4 border-[#b39df5] px-1 text-center text-base">
                          {packaging.packaging}
                          <div></div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div> */}
              <div className="flex h-fit w-full items-center border-x-4 border-b-4 border-[#b39df5] text-2xl text-white">
                <div className="flex h-full w-full flex-col bg-[#786ADE]">
                  <div className="flex h-fit min-h-[3rem] w-full flex-row ">
                    <div className=" flex w-[12.5%] min-w-[12.5%] flex-wrap items-center justify-center text-center">
                      {brand.brand_name}
                    </div>
                    {arr.map((item, index) => {
                      return (
                        <div className="flex w-[80px] flex-wrap items-center justify-center border-x-2 border-[#b39df5] p-2 text-center text-base">
                          {item.packaging}
                        </div>
                      );
                    })}
                  </div>
                  {groups.map((group, index) => {
                    if (group.brand_name === brand.brand_name) {
                      return (
                        <div className="flex h-fit min-h-[3rem]  w-full items-center border-b-2 border-[#786ADE] bg-[#d5c9fc] text-base text-black">
                          <div className=" flex h-fit min-h-[3rem] w-[12.5%] min-w-[12.5%] flex-wrap  items-center border-r-2 border-[#786ADE]">
                            <div className="">{group.group_name}:</div>
                            {groupPricings.map((groupPricing, index) => {
                              if (
                                groupPricing.brand_name === brand.brand_name &&
                                groupPricing.group_name === group.group_name
                              ) {
                                return (
                                  <span className="">
                                    {`${groupPricing.color_name}, `}
                                  </span>
                                );
                              }
                            })}
                          </div>
                          {arr.map((item, index) => {
                            const price = pricings.find(
                              (data) =>
                                data.brand_name === brand.brand_name &&
                                data.packaging === item.packaging &&
                                data.list_name === "Factory" &&
                                data.group_name === group.group_name
                            );
                            return (
                              <div className="flex w-[80px] max-w-[80px] flex-grow items-center justify-center border-x-2 border-[#b39df5] text-center text-base">
                                {price ? price.price : "x"}
                              </div>
                            );
                          })}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PriceListTable;
