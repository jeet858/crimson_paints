import React, { useState } from "react";
import { useRouter } from "next/router";
import { UserTemplate } from "@/components";
import { RiArrowDropDownLine } from "react-icons/ri";

const StockListForKolkataEdit: React.FunctionComponent = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState("Uday");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleUserChange = (user: string) => {
    setSelectedUser(user);
  };
  const handleDropdownChange = (id: string) => {
    if (id === "") {
      setSelectedValue(id);
      setFilteredData(data);
    } else {
      setSelectedValue(id);
      const newData = data.filter((item) => item.id === id);
      setFilteredData(newData);
    }
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
    { header: "Color Name", field: "ColorName" },
    { header: "Packaging", field: "Packaging" },
    { header: "Current Stock", field: "CurrentStock" },
  ];

  const data = [
    {
      ColorName: "Black",
      Packaging: "12x1 Kg Con.",
      CurrentStock: "340",

      id: "item_id_1",
    },
    {
      ColorName: "Black",
      Packaging: "12x1 Kg Con.",
      CurrentStock: "340",

      id: "item_id_1",
    },

    {
      ColorName: "Black",
      Packaging: "24x0.5 Kg Con.",
      CurrentStock: "188",

      id: "item_id_2",
    },
  ];

  const dropdownItems = [
    { id: "item_id_1", name: "A-1 Oxide" },
    { id: "item_id_2", name: "AD Base" },
    { id: "item_id_3", name: "ARF Oxide" },
    { id: "item_id_4", name: "Classic Oxide" },
    { id: "item_id_5", name: "Colour Universe" },
  ];
  const userOptions = ["User 1", "User 2", "User 3"];
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
              {selectedUser}
              <RiArrowDropDownLine className="ml-1 text-xl" />
            </div>
            {isDropdownOpen ? (
              <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-md border  border-violet-500 bg-violet-100 shadow-md">
                {userOptions.map((user) => {
                  return (
                    <div
                      key={user}
                      className="border-b-1 cursor-pointer border-violet-500 px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        handleUserChange(user);
                        setIsDropdownOpen(!isDropdownOpen);
                        console.log(isDropdownOpen);
                      }}
                    >
                      {user}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col p-4">
          <div>
            <select
              id="dropdown-select"
              value={selectedValue}
              onChange={(e) => handleDropdownChange(e.target.value)}
              className="mr-4 rounded-lg bg-blue-800 px-2 py-1 text-white"
            >
              <option value="">All</option>
              {dropdownItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className=" h-[50vh] rounded-lg">
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
              {filteredData.map((row, rowIndex) => (
                <div key={rowIndex} className="flex flex-row  p-1">
                  {columns.map((column, colIndex) => (
                    <div key={colIndex} className="flex-1 p-2 text-center">
                      {row[column.field]}
                    </div>
                  ))}
                  <div className="flex-1 p-2 text-center">
                    <input
                      className="h-10 w-28 rounded-md border border-[#786ADE] bg-[#c4b0ff4f] px-2 outline-none"
                      type="text"
                    />
                  </div>
                  <div className="flex-1 p-2 text-center">
                    <input
                      className="h-10 w-full rounded-md border border-[#786ADE] bg-[#c4b0ff4f] px-2 outline-none"
                      type="text"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </UserTemplate>
  );
};

export default StockListForKolkataEdit;
