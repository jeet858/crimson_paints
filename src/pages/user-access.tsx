import React, { useState } from "react";
import { useRouter } from "next/router";
import { RiArrowDropDownLine } from "react-icons/ri";
import { InsideNav, UserTemplate } from "@/components";
import UserAccessTable from "~/components/tables/UserAccessTable";
import OrderTable from "~/components/tables/OrderTable";
import StockTable from "~/components/tables/StockTable";
import ReportsTable from "~/components/tables/ReportsTable";
import UploadsTable from "~/components/tables/UploadsTable";
import MasterTable from "~/components/tables/MasterTable";

const Useraccess = () => {
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };

  const [selectedUser, setSelectedUser] = useState("Select User");
  const [selectedSection, setSelectedSection] = useState("Order");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleUserChange = (user: string) => {
    setSelectedUser(user);
  };

  const handleSectionClick = (section: keyof typeof sectionToComponent) => {
    setSelectedSection(section);
  };

  const sectionToComponent = {
    Order: <OrderTable />,
    Stock: <StockTable />,
    Reports: <ReportsTable />,
    Uploads: <UploadsTable />,
    Master: <MasterTable />,
  };

  const userOptions = ["User 1", "User 2", "User 3"];

  return (
    <UserTemplate templateParams={templateParams}>
      <InsideNav />
      <div className="h-5/6 w-full p-4">
        <div className="flex items-center justify-center">
          <div className="text-center text-xl font-semibold text-[#11009E]">
            User Right Management
            <svg
              width="250"
              height="18"
              viewBox="0 0 426 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 8C3.86258e-07 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 -3.86258e-07 8 0C3.58172 3.86258e-07 -3.86258e-07 3.58172 0 8ZM410 7.99996C410 12.4182 413.582 16 418 16C422.418 16 426 12.4182 426 7.99996C426 3.58169 422.418 -3.62296e-05 418 -3.58433e-05C413.582 -3.54571e-05 410 3.58169 410 7.99996ZM8 9.5L418 9.49996L418 6.49996L8 6.5L8 9.5Z"
                fill="#C4B0FF"
              />
            </svg>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-x-4">
            <div className="w-fit text-lg font-semibold">Select User:</div>
            <div className="relative inline-block">
              <div
                className="flex  cursor-pointer items-center rounded-md border border-violet-500 bg-violet-100 px-4 pb-2 text-gray-400"
                onClick={() => {
                  setIsDropdownOpen(!isDropdownOpen);
                  console.log(isDropdownOpen);
                }}
              >
                {selectedUser}
                <RiArrowDropDownLine className="ml-1" />
              </div>
              {isDropdownOpen ? (
                <div className="absolute left-0 top-full mt-1 w-full rounded-md border  border-violet-500 bg-violet-100 shadow-md">
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
          <div className="flex pb-4">
            <div className="flex">
              {Object.keys(sectionToComponent).map((section) => (
                <button
                  key={section}
                  className={`mr-4 ${
                    selectedSection === section
                      ? "border-b-4 border-r-4"
                      : "border-r-4"
                  } border-gray-700 pr-2 text-base font-medium hover:border-b-4 hover:border-r-4  hover:border-violet-500`}
                  onClick={() =>
                    handleSectionClick(
                      section as keyof typeof sectionToComponent
                    )
                  }
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex h-[80%] justify-center overflow-y-auto">
          {
            sectionToComponent[
              selectedSection as keyof typeof sectionToComponent
            ]
          }
        </div>
      </div>
    </UserTemplate>
  );
};

export default Useraccess;
