import React, { useState } from "react";
import { useRouter } from "next/router";
import { RiArrowDropDownLine } from "react-icons/ri";
import { InsideNav, UserTemplate } from "@/components";

import MasterTable from "../components/elements/MasterTable";
import StockTable from "../components/elements/StockTable";
import OrderTable from "../components/elements/OrderTable";
import ReportsTable from "../components/elements/ReportsTable";
import UploadTable from "../components/elements/UploadTable";

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

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
  };
  const handleSectionClick = (section: keyof typeof sectionToComponent) => {
    setSelectedSection(section);
  };
  const sectionToComponent = {
    Order: <OrderTable />,
    Stock: <StockTable />,
    Reports: <ReportsTable />,
    Uploads: <UploadTable />,
    Master: <MasterTable />,
  };

  return (
    <UserTemplate templateParams={templateParams}>
      <InsideNav />
      <div className=" h-5/6 w-full  ">
        <div className="flex  items-center justify-center">
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
        <div className="ml-8 mt-8 flex">
          <div className="w-[10%] text-lg font-semibold">Select User:</div>
          <select
            value={selectedUser}
            onChange={handleUserChange}
            className="block h-[30px] w-[8rem]   rounded-xl border border-violet-500 bg-violet-100  text-center text-base font-semibold leading-tight text-gray-400 shadow focus:border-blue-500 focus:outline-none"
          >
            <option value="Select User" disabled>
              {selectedUser === "Select User" && (
                <RiArrowDropDownLine className="inline-block" />
              )}
              Sales
              <RiArrowDropDownLine className="inline-block" />
            </option>
            <option value="User1">User 1</option>
            <option value="User2">User 2</option>
            <option value="User3">User 3</option>
          </select>
          <div className="flex pb-4 pl-[30rem]">
            <div className=" flex">
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
        <div className="px-8 py-4">
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
