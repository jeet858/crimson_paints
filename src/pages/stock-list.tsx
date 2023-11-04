import { InsideNav, UserTemplate } from "@/components";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import StockListTable from "~/components/tables/StockListTable";
import { api } from "~/utils/api";

const StockList = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
  };
  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSelectedBrand(value);
    console.log(value);
    console.log(name);
    console.log(selectedBrand);
  };
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };
  const columns = [
    { header: "Color Name", field: "color_name" },
    { header: "Packaging", field: "packaging" },
    { header: "Current Stock", field: "current_stock" },
    { header: "Pending", field: "pending" },
    { header: "Production Shortage", field: "production_shortage" },
  ];
  const {
    data: brands,
    isLoading: isBrandsLoading,
    isError: isBrandsError,
  } = api.brand.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const {
    data: locations,
    isLoading: isLocationLoading,
    isError: isLocationError,
  } = api.location.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (locations) {
      setSelectedLocation(locations[0]?.location as string);
    }
    if (brands) {
      setSelectedBrand(brands[0]?.brand_name as string);
    }
  }, [locations]);
  return (
    <UserTemplate templateParams={templateParams}>
      <InsideNav />
      <div className="h-fit w-full p-4">
        <div className="flex items-center justify-center">
          <div className="flex w-full items-end justify-center ">
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
              Stock List for Kolkata
            </div>
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
          </div>
        </div>
        <div className="flex gap-x-4 p-4">
          <div className="w-fit text-xl font-semibold">Select Location:</div>
          <div className="relative inline-block">
            <div
              className="flex  w-36 cursor-pointer items-center justify-center rounded-md border border-violet-500 bg-violet-100 p-1 text-[#787878]"
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
                console.log(locations);
              }}
            >
              {selectedLocation}
              <RiArrowDropDownLine className="ml-1 text-xl" />
            </div>
            {isDropdownOpen ? (
              <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-md border  border-violet-500 bg-violet-100 shadow-md">
                {locations?.map((location, index) => {
                  return (
                    <div
                      key={index}
                      className="border-b-1 cursor-pointer border-violet-500 px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        handleLocationChange(location.location);
                        setIsDropdownOpen(!isDropdownOpen);
                        console.log(isDropdownOpen);
                      }}
                    >
                      {location.location}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex h-fit w-full items-center justify-between px-4">
          <div className="flex h-14 w-full items-center">
            <select
              className="overflow-scroll rounded-md bg-[#11009E] p-4 text-white outline-none"
              name="brand"
              onChange={handleBrandChange}
            >
              {brands?.map((brand, index) => {
                return (
                  <option
                    key={index}
                    value={brand.brand_name}
                    className="bg-[#EBE6FB]"
                  >
                    {brand.brand_name}
                  </option>
                );
              })}
            </select>
          </div>
          <Link
            href={{
              pathname: "/edit/stock-list-edit",
              query: {
                brand_name: selectedBrand,
                location: selectedLocation,
              },
            }}
            className="ml-4 flex h-14 w-36 items-center justify-center rounded-md bg-[#00b5ad] text-white"
          >
            Update Stock
          </Link>
        </div>
        <StockListTable
          columns={columns}
          location={selectedLocation}
          brand_name={selectedBrand}
        />
      </div>
    </UserTemplate>
  );
};

export default StockList;
