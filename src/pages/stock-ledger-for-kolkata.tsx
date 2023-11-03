import { InsideNav, UserTemplate } from "@/components";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import StockLedger from "~/components/tables/StockLedger";

const StockLedgerForKolkata = () => {
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
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
  const [selectedUser, setSelectedUser] = useState("Uday");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleUserChange = (user: string) => {
    setSelectedUser(user);
  };
  const [selectedColor, setSelectedColor] = useState<string>("");

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };
  const userOptions = ["User 1", "User 2", "User 3"];
  const columns = [
    { header: "Opening Date", field: "OpeningDate" },
    { header: "Open Stock", field: "OpenStock" },
    { header: "Added", field: "Added" },
    { header: "Executed", field: "Executed" },
    { header: "Closing", field: "Closing" },
    { header: "Ord#", field: "Ord" },
    { header: "Notes", field: "Notes" },
    { header: "Client Name", field: "ClientName" },
  ];
  const data = [
    {
      OpeningDate: "25-Apr-2021",
      OpenStock: "0",
      Added: "0",
      Executed: "30",
      Closing: "-30",
      Ord: "2021-03/0573",
      Notes: "",
      ClientName: "S P TRADERS",
      id: "item_id_1",
    },
    {
      OpeningDate: "25-Apr-2021",
      OpenStock: "0",
      Added: "0",
      Executed: "30",
      Closing: "-30",
      Ord: "2021-03/0573",
      Notes: "",
      ClientName: "S P TRADERS",
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
  const dropdownItemsList = [
    { id: "item_id_1", name: "A-1 Oxide", color: ["red", "black", "blue"] },
    { id: "item_id_2", name: "AD Base", color: ["red", "black", "blue"] },
    { id: "item_id_3", name: "ARF Oxide", color: [] },
    { id: "item_id_4", name: "Classic Oxide", color: [] },
    { id: "item_id_5", name: "Colour Universe", color: [] },
  ];
  return (
    <UserTemplate templateParams={templateParams}>
      <InsideNav />
      <div className="h-fit w-full p-4">
        <div className="flex items-center justify-center">
          <div className="flex w-full items-end justify-center ">
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
              Stock Ledger for Kolkata
            </div>
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
          </div>
          <div className="flex items-end justify-end">
            <button className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]">
              Add
            </button>
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
        <div className="flex flex-row p-4">
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
          {selectedValue && (
            <div>
              <select
                id="dropdown-color"
                value={selectedColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="mr-4 w-32 rounded-lg bg-blue-800 px-2 py-1 text-white"
              >
                <option value="">All</option>
                {dropdownItemsList
                  .filter((item) => item.id === selectedValue)
                  .map((item) =>
                    item.color.map((color, index) => (
                      <option key={index} value={color}>
                        {color}
                      </option>
                    ))
                  )}
              </select>
            </div>
          )}
          {!selectedValue && (
            <div>
              <select
                id="dropdown-color"
                className="mr-4 w-32 rounded-lg bg-blue-800 px-2 py-1 text-white"
                disabled
              >
                <option value=""></option>
              </select>
            </div>
          )}
          <div>
            <select
              id="dropdown-select"
              value={selectedValue}
              onChange={(e) => handleDropdownChange(e.target.value)}
              className="mr-4 rounded-lg bg-blue-800 px-2 py-1 text-white"
            >
              <option value=""></option>
              {dropdownItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <StockLedger
          columns={columns}
          data={filteredData.length > 0 ? filteredData : data}
          idField={["id"]}
          deleteUrl=""
        />
      </div>
    </UserTemplate>
  );
};

export default StockLedgerForKolkata;
