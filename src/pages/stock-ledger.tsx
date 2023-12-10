import { InsideNav, UserTemplate } from "@/components";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import StockLedger from "~/components/tables/StockLedger";
import { api } from "~/utils/api";

const Stock_Ledger = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedPackaging, setSelectedPackaging] = useState("");
  const [packagingArray, setPackagingArray] = useState([
    {
      brand_name: "",
      packaging: "",
    },
  ]);

  const [colorArray, setColorArray] = useState([
    {
      brand_name: "",
      color_name: "",
    },
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
  };
  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSelectedBrand(value);
  };
  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSelectedColor(value);
  };
  const handlePackagingChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setSelectedPackaging(value);
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
    { header: "Opening Date", field: "date" },
    { header: "open_stock", field: "open_stock" },
    { header: "Added", field: "added" },
    { header: "Executed", field: "executed" },
    { header: "Closing", field: "closing" },
    { header: "Ord#", field: "id" },
    { header: "Notes", field: "notes" },
    { header: "Client Name", field: "client_name" },
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
  } = api.location.all_state.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const {
    data: groupColors,
    isLoading,
    isError,
  } = api.groupPricing.brand_wise_fetch.useQuery(selectedBrand, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
    onSuccess(data) {
      if (data) {
        setColorArray(data);
        setSelectedColor(data[0]?.color_name as string);
      }
    },
  });
  const {
    data: packaging,
    isLoading: isPackagingLoading,
    isError: isPackagingError,
  } = api.brandPackaging.where_brand_name.useQuery(selectedBrand, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
    onSuccess(data) {
      if (data) {
        setPackagingArray(data);
        setSelectedPackaging(data[0]?.packaging as string);
      }
    },
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
        <div className="flex h-fit w-full items-center justify-between">
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
            <select
              className="ml-4 overflow-scroll rounded-md bg-[#11009E] p-4 text-white outline-none"
              name="colors"
              onChange={handleColorChange}
            >
              {colorArray?.map((color, index) => {
                return (
                  <option
                    key={index}
                    value={color.color_name}
                    className="bg-[#EBE6FB]"
                  >
                    {color.color_name}
                  </option>
                );
              })}
            </select>
            <select
              className="ml-4 overflow-scroll rounded-md bg-[#11009E] p-4 text-white outline-none"
              name="packaging"
              onChange={handlePackagingChange}
            >
              {packagingArray?.map((packaging, index) => {
                return (
                  <option
                    key={index}
                    value={packaging.packaging}
                    className="bg-[#EBE6FB]"
                  >
                    {packaging.packaging}
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
        <StockLedger
          columns={columns}
          brand_name={selectedBrand}
          color={selectedColor}
          location={selectedLocation}
          packaging={selectedPackaging}
        />
      </div>
    </UserTemplate>
  );
};

export default Stock_Ledger;
