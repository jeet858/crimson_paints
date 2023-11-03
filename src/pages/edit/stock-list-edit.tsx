import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserTemplate } from "@/components";
import { RiArrowDropDownLine } from "react-icons/ri";
import { api } from "~/utils/api";

const StockListEdit: React.FunctionComponent = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [colorArray, setColorArray] = useState([
    {
      brand_name: "",
      color_name: "",
    },
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const router = useRouter();
  const { userType, brand_name, location } = router.query;
  useEffect(() => {
    if (brand_name) {
      setSelectedBrand(brand_name as string);
    }
    if (location) {
      setSelectedLocation(location as string);
    }
  }, [brand_name, location]);

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
  ];

  const {
    data: brands,
    isLoading: isBrandsLoading,
    isError: isBrandsError,
  } = api.brand.all.useQuery(undefined, {
    onSuccess(data) {},
  });
  const {
    data: locations,
    isLoading: isLocationLoading,
    isError: isLocationError,
  } = api.location.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const {
    data: groupColors,
    isLoading,
    isError,
  } = api.groupPricing.brand_wise_fetch.useQuery(selectedBrand, {
    onSuccess(data) {
      if (data) {
        setColorArray(data);
        setSelectedColor(data[0]?.color_name as string);
      }
    },
  });

  useEffect(() => {
    if (brand_name && location) {
      setSelectedBrand(brand_name as string);
      setSelectedLocation(location as string);
      console.log(brand_name);
    }
  }, [brand_name, location]);
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
  return (
    <UserTemplate templateParams={templateParams}>
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
        <div className="flex gap-x-4">
          <div className="w-fit text-xl font-semibold">Select User:</div>
          <div className="relative inline-block">
            <div
              className="flex  w-36 cursor-pointer items-center justify-center rounded-md border border-violet-500 bg-violet-100 p-1 text-[#787878]"
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
                console.log(isDropdownOpen);
              }}
            >
              {selectedLocation}
              <RiArrowDropDownLine className="ml-1 text-xl" />
            </div>
            {isDropdownOpen ? (
              <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-md border  border-violet-500 bg-violet-100 shadow-md">
                {locations?.map((location) => {
                  return (
                    <div
                      key={location.location}
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
        <div className="flex flex-col p-4">
          <div className="flex flex-row">
            <select
              id="dropdown-select"
              value={selectedBrand}
              onChange={handleBrandChange}
              className="mr-4 rounded-lg bg-blue-800 px-2 py-1 text-white"
            >
              {brands?.map((brand, index) => (
                <option key={index} value={brand.brand_name}>
                  {brand.brand_name}
                </option>
              ))}
            </select>
            <select
              id="dropdown-select"
              onChange={handleColorChange}
              className="mr-4 rounded-lg bg-blue-800 px-2 py-1 text-white"
              value={selectedColor}
            >
              {colorArray?.map((color, index) => (
                <option key={index} value={color.color_name}>
                  {color.color_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <StockListEditTable
          brand={selectedBrand}
          location={selectedLocation}
          color={selectedColor}
          columns={columns}
        />
      </div>
    </UserTemplate>
  );
};

export default StockListEdit;

interface StockListEditTableProps {
  columns: {
    field: string;
    header: string;
  }[];
  location: string;
  brand: string;
  color: string;
}

const StockListEditTable: React.FunctionComponent<StockListEditTableProps> = ({
  columns,
  brand,
  color,
  location,
}) => {
  const router = useRouter();
  const {
    data: existingPackaging,
    isLoading: existingPackagingLoading,
    isError: existingPackagingError,
  } = api.brandPackaging.where_brand_name.useQuery(brand, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const {
    data: stocks,
    isLoading: isStocksLoading,
    isError: isStocksError,
  } = api.stock.stock_filter.useQuery(
    {
      brand_name: brand,
      color_name: color,
      location: location,
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
  const updateStockLedger = api.stock.stock_ledger_create.useMutation({
    onError: (err) => {
      alert(`${err.message}`);
    },
    onSuccess: async () => {
      alert("Ledger updated succesfully");
    },
  });
  const update = api.stock.stock_edit.useMutation({
    onError: (err) => {
      alert(`${err.message}`);
    },
    onSuccess: async () => {
      alert("Stock updated succesfully");
      await router.reload();
    },
  });
  const listData = existingPackaging?.map((existingItem) => {
    const list = stocks?.find(
      (data) =>
        data.brand_name === brand && data.packaging === existingItem.packaging
    );
    if (list) {
      return {
        brand_name: existingItem.brand_name,
        packaging: existingItem.packaging,
        location: location,
        color_name: color,
        current_stock: list.current_stock,
      };
    } else {
      return {
        brand_name: existingItem.brand_name,
        packaging: existingItem.packaging,
        location: location,
        color_name: color,
        current_stock: 0,
      };
    }
  });
  const [editData, setEditData] = useState([
    {
      packaging: "",
      updated_value: 0,
      notes: "",
    },
  ]);
  useEffect(() => {});
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    const initialValueCheck = editData.findIndex(
      (item) => item.packaging === ""
    );
    if (initialValueCheck !== -1) {
      const removeInitialValue = editData;
      removeInitialValue.splice(initialValueCheck, 1);
      setEditData(removeInitialValue);
    }

    const array = editData;
    const index = array.findIndex((item) => item.packaging === name);
    if (index !== -1) {
      // If it exists, update its value
      array[index] = {
        packaging: name,
        updated_value: parseInt(value),
        notes: array[index]?.notes ? (array[index]?.notes as string) : "",
      };
    } else {
      // If it doesn't exist, add a new object to the array
      array.push({
        packaging: name,
        updated_value: parseInt(value),
        notes: array[index]?.notes ? (array[index]?.notes as string) : "",
      });
    }
    setEditData(array);
  };
  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    const initialValueCheck = editData.findIndex(
      (item) => item.packaging === ""
    );
    if (initialValueCheck !== -1) {
      const removeInitialValue = editData;
      removeInitialValue.splice(initialValueCheck, 1);
      setEditData(removeInitialValue);
    }

    const array = editData;
    const index = array.findIndex((item) => item.packaging === name);
    if (index !== -1) {
      // If it exists, update its value
      array[index] = {
        packaging: name,
        updated_value: array[index]?.updated_value
          ? (array[index]?.updated_value as number)
          : 0,
        notes: value,
      };
    } else {
      // If it doesn't exist, add a new object to the array
      array.push({
        packaging: name,
        updated_value: array[index]?.updated_value
          ? (array[index]?.updated_value as number)
          : 0,
        notes: value,
      });
    }
    setEditData(array);
  };
  const onUpdate = () => {
    var currentDate = new Date();
    const StockLedgerArray: {
      brand_name: string;
      color_name: string;
      client_name: string;
      packaging: string;
      notes: string;
      location: string;
      date: string;
      open_stock: number;
      added: number;
      closing: number;
      executed: number;
    }[] = [];
    editData.forEach((editItem) => {
      // Find the corresponding listData item by packaging
      const listDataItem = listData?.find(
        (listItem) => listItem.packaging === editItem.packaging
      );
      if (listDataItem) {
        // Update the current_stock value
        const obj = {
          brand_name: brand,
          color_name: color,
          packaging: editItem.packaging,
          notes: editItem.notes,
          location: location,
          date: currentDate.toDateString(),
          added: editItem.updated_value,
          open_stock: listDataItem?.current_stock,
          closing: listDataItem.current_stock + editItem.updated_value,
          client_name: "",
          executed: 0,
        };
        listDataItem.current_stock += editItem.updated_value;
        StockLedgerArray.push(obj);
      }
    });
    console.log(StockLedgerArray);
    console.log(editData);
    if (listData) {
      update.mutate({
        brand_name: brand,
        color_name: color,
        location: location,
        data: listData,
      });
      updateStockLedger.mutate(StockLedgerArray);
    } else {
      alert("Data is empty");
    }
  };
  return (
    <div className="flex h-fit w-full flex-col">
      <div className=" h-[50vh] w-full rounded-lg">
        <div className="flex flex-row rounded-t-lg bg-[#C4B0FF] p-1 font-bold">
          {columns.map((column, index) => (
            <div key={index} className="flex-1 p-2 text-center">
              {column.header}
            </div>
          ))}
          <div className="flex-1 p-2 text-center">Add</div>
          <div className="flex-1 p-2 text-center">Notes</div>
        </div>
        <div className="h-[45vh] overflow-x-auto rounded-b-lg bg-[#C4B0FF45]">
          {listData?.map((row, rowIndex) => {
            return (
              <div key={rowIndex} className="flex flex-row  p-1">
                {columns.map((column, colIndex) => (
                  <div key={colIndex} className="flex-1 p-2 text-center">
                    {row[column.field]}
                  </div>
                ))}
                <div className="flex-1 p-2 text-center" key={rowIndex}>
                  <input
                    key={`${row.brand_name}, ${color}, ${row.packaging}`}
                    className="h-10 w-28 rounded-md border border-[#786ADE] bg-[#c4b0ff4f] px-2 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    type="number"
                    name={row.packaging}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex-1 p-2 text-center">
                  <input
                    key={`${row.brand_name}, ${color}, ${row.packaging} notes`}
                    className="h-10 w-full rounded-md border border-[#786ADE] bg-[#c4b0ff4f] px-2 outline-none"
                    type="text"
                    id="notes"
                    name={row.packaging}
                    onChange={handleNoteChange}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button
        className="flex h-12 w-24 items-center justify-center self-end rounded-md bg-[#786ADE] text-white"
        onClick={() => {
          onUpdate();
        }}
      >
        Update
      </button>
    </div>
  );
};
