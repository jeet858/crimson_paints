import { InsideNav, UserTemplate } from "@/components";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import StockListTable from "~/components/tables/StockListTable";

const StockListForKolkata = () => {
  const [selectedUser, setSelectedUser] = useState("Uday");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleUserChange = (user: string) => {
    setSelectedUser(user);
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
    { header: "Pending", field: "Pending" },
    { header: "Production Shortage", field: "ProductionShortage" },
  ];
  const data = [
    {
      ColorName: "Black",
      Packaging: "12x1 Kg Con.",
      CurrentStock: "340",
      Pending: "-3",
      ProductionShortage: "-343",
      id: "item_id_1",
    },
    {
      ColorName: "Black",
      Packaging: "24x0.5 Kg Con.",
      CurrentStock: "188",
      Pending: "-0",
      ProductionShortage: "-188",
      id: "item_id_2",
    },
  ];
  const userOptions = ["User 1", "User 2", "User 3"];
  const dropdownItems = [
    { id: "item_id_1", name: "A-1 Oxide" },
    { id: "item_id_2", name: "AD Base" },
    { id: "item_id_3", name: "ARF Oxide" },
    { id: "item_id_4", name: "Classic Oxide" },
    { id: "item_id_5", name: "Colour Universe" },
  ];
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
          <div className="flex items-end justify-end">
            <button
              className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]"
              onClick={async () => {
                await router.push("");
              }}
            >
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
        <StockListTable
          columns={columns}
          data={data}
          idField={["id"]}
          editUrl=""
          deleteUrl=""
          dropdownItems={dropdownItems}
        />
      </div>
    </UserTemplate>
  );
};

export default StockListForKolkata;
