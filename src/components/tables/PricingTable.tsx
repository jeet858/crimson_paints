import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { api } from "~/utils/api";

interface PricingTableProps {
  data: {
    brand_name: string;
    categoriesName: string;
    hsnCode_id: number;
  }[];
  list_name: string;
}

const PricingTable: React.FC<PricingTableProps> = ({ data, list_name }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tableRef.current && selectedCategory) {
      const section = document.getElementById(selectedCategory);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [selectedCategory]);
  const {
    data: pricingData,
    isLoading,
    isError,
  } = api.pricing.all.useQuery(undefined, {
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
    data: orderableUnits,
    isLoading: isOrderableUnitsLoading,
    isError: isOrderableUnitsError,
  } = api.brandPackaging.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  if (isLoading || isGroupsLoading || isOrderableUnitsLoading) {
    return <div></div>;
  }
  if (isError || isGroupsError || isOrderableUnitsError) {
    return <div></div>;
  }
  return (
    <div className="h-[50vh] w-full overflow-scroll " ref={tableRef}>
      <div className="border-1 h-fit w-full overflow-auto bg-[#b39df5] p-2">
        {data.map((brand, index) => (
          <button
            key={index}
            onClick={() => {
              const targetElement = document.getElementById(brand.brand_name);
              targetElement?.scrollIntoView();
            }}
            className="border-1 mb-4 mr-4 h-[2rem] w-fit rounded-xl bg-[#e7e0fffa] px-4 font-semibold"
          >
            {brand.brand_name}
          </button>
        ))}
      </div>
      {data.map((item, index) => (
        <div key={index} className="flex flex-col rounded-bl-lg rounded-br-lg">
          <div className="flex h-fit w-full items-center justify-between border-b-[1px] border-[#E7E0FF78] bg-[#786ADE] p-1 px-6">
            <div className="flex text-xl font-semibold text-white">
              Brands: {item.brand_name} +
            </div>
            <div className="flex flex-row justify-evenly gap-6">
              <div className="h-fit w-fit rounded-lg bg-[#C4B0FF8C] p-1 text-lg text-white">
                <Link
                  className="flex w-28 items-center justify-center font-semibold"
                  href={{
                    pathname: "/edit/pricing-brand-prices-edit",
                    query: {
                      brand_name: item.brand_name,
                      list_name: list_name,
                    },
                  }}
                >
                  Brand Prices
                </Link>
              </div>
            </div>
          </div>
          <PricingGroupTable
            brand_name={item.brand_name}
            list_name={list_name}
            pricing_data={pricingData}
            groups={groups}
            orderableUnits={orderableUnits}
          />
        </div>
      ))}
    </div>
  );
};

export default PricingTable;

interface PricingGroupTableProps {
  brand_name: string;
  list_name: string;
  pricing_data: {
    brand_name: string;
    group_name: string;
    list_name: string;
    packaging: string;
    price: number;
  }[];
  groups: {
    brand_name: string;
    group_name: string;
    group_code: string;
  }[];
  orderableUnits: {
    brand_name: string;
    packaging: string;
  }[];
}
const PricingGroupTable: React.FunctionComponent<PricingGroupTableProps> = (
  props
) => {
  const matchingGroups = props.groups.filter(
    (group) => group.brand_name === props.brand_name
  );
  const matchingOrderableUnits = props.orderableUnits.filter(
    (orderableUnit) => orderableUnit.brand_name === props.brand_name
  );

  return (
    <div className="flex flex-col  bg-[#C4B0FF42] ">
      <div className="flex w-full flex-col justify-between bg-[#C4B0FF42]">
        {matchingGroups.map((group, index) => {
          return (
            <div className="flex h-fit w-full flex-col" key={index}>
              <div
                className="flex h-fit w-full items-center justify-between border-b-[1px] border-[#E7E0FF78] bg-[#786ADE] p-1 px-6 font-semibold text-white"
                key={index}
              >
                Group: {group.group_name}
                <div className="h-fit w-fit rounded-lg bg-[#C4B0FF8C] p-1 text-lg text-white">
                  <Link
                    className="flex w-28 items-center justify-center"
                    href={{
                      pathname: "/edit/pricing-group-prices-edit",
                      query: {
                        brand_name: props.brand_name,
                        group_name: group.group_name,
                        list_name: props.list_name,
                      },
                    }}
                  >
                    Group Prices
                  </Link>
                </div>
              </div>
              <div className="flex flex-row flex-wrap">
                {matchingOrderableUnits?.map((orderableUnit, index) => {
                  return (
                    <PackagingPricingTile
                      packaging={orderableUnit.packaging}
                      key={index}
                      brand_name={props.brand_name}
                      group_name={group.group_name}
                      pricing_data={props.pricing_data}
                      list_name={props.list_name}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface PackagingPricingTileProps {
  packaging: string;
  brand_name: string;
  group_name: string;
  list_name: string;
  pricing_data: {
    brand_name: string;
    group_name: string;
    list_name: string;
    packaging: string;
    price: number;
  }[];
}
const PackagingPricingTile: React.FunctionComponent<
  PackagingPricingTileProps
> = (props) => {
  const obj = props.pricing_data.find((item) => {
    return (
      item.brand_name === props.brand_name &&
      item.group_name === props.group_name &&
      item.list_name === props.list_name &&
      item.packaging === props.packaging
    );
  });
  const del = api.pricing.single_delete.useMutation({
    onError: (err, newPricing, context) => {
      alert(`${err.message}`);
    },
    onSuccess: () => {
      alert("Deactivated sucessfully");
    },
  });
  const router = useRouter();
  return (
    <div className="flex h-40 w-[12.5%]  flex-row flex-wrap">
      <div className="flex h-full w-full">
        <div className="flex h-full  w-full flex-col items-center justify-evenly border-b-2 border-r-2 border-[#786ADE]">
          {obj ? (
            <div className="mt-2  h-16 text-lg font-semibold">
              {obj?.packaging}
            </div>
          ) : (
            <div className="mt-2 h-16 text-lg font-semibold">
              {props.packaging}
            </div>
          )}
          {obj ? (
            <div className="mt-2 text-2xl font-semibold">
              ₹{obj?.price.toFixed(2)}
            </div>
          ) : (
            <div className="mt-2 text-2xl font-semibold text-[#FF6E65]">
              Not Set
            </div>
          )}

          {obj ? (
            <div className="flex w-full flex-row self-end">
              <button
                className="m-2 w-5/12 rounded bg-[#786ADE] py-2 text-white"
                onClick={async () => {
                  await router.push({
                    pathname: "/edit/pricing-edit",
                    query: obj,
                  });
                }}
              >
                Edit
              </button>
              <button
                className="m-2 w-5/12 rounded bg-[#FF6E65] py-2 text-white"
                onClick={() => {
                  del.mutate({
                    brand_name: props.brand_name,
                    group_name: props.group_name,
                    list_name: props.list_name,
                    packaging: obj.packaging,
                  });
                }}
              >
                Deactivate
              </button>
            </div>
          ) : (
            <div className="flex w-full flex-row justify-center self-end">
              <button
                className="m-2 w-5/12 rounded bg-[#786ADE] py-2 text-white"
                onClick={async () => {
                  const queryObj = {
                    packaging: props.packaging,
                    brand_name: props.brand_name,
                    group_name: props.group_name,
                    list_name: props.list_name,
                  };
                  await router.push({
                    pathname: "/edit/pricing-edit",
                    query: queryObj,
                  });
                }}
              >
                Set Price
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
