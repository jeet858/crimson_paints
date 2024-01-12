import React, { useState } from "react";
import { useRouter } from "next/router";
import { RiArrowDropDownLine } from "react-icons/ri";
import { InsideNav, UserTemplate } from "@/components";
import UserAccessTable from "~/components/tables/UserAccessTable";

const Useraccess = () => {
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };

  const [selectedUser, setSelectedUser] = useState("Salesman");
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
    Order: <UserAccessTable title="Order" user_type={selectedUser} />,
    Stock: <UserAccessTable title="Stock" user_type={selectedUser} />,
    Master: <UserAccessTable title="Master" user_type={selectedUser} />,
  };

  const userOptions = ["Salesman", "GNRL", "Backoffice", "Production"];

  return (
    <UserTemplate templateParams={templateParams}>
      <InsideNav />
      <div className="h-5/6 w-full p-4">
        <div className="flex items-center justify-center">
          <div className="text-center text-xl font-semibold text-[#11009E]">
            User Right Management
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
