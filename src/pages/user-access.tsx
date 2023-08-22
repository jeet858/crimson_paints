import React, { useState } from "react";
import { useRouter } from "next/router";
import UserTemplate from "~/components/template/UserTemplate";
import Useraccesstable from "../components/elements/Useraccesstable";
import { RiArrowDropDownLine } from "react-icons/ri";

const Useraccess = () => {
  const router = useRouter();
  const { userType } = router.query;
  const [selectedUser, setSelectedUser] = useState("Select User");

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="mt-6 w-full">
        <div className="">
          <div className="text-center text-2xl font-semibold">
            User Right Management
            <svg
              className="ml-[55px]"
              width="150px"
              height="20"
              viewBox="0 0 248 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            ></svg>
          </div>
        </div>
        <div className="ml-8  flex w-full">
          <div className="w-[8%] text-xl font-semibold">Select User:</div>
          <select
            value={selectedUser}
            onChange={handleUserChange}
            className="block h-[36px] w-[10rem]   rounded-xl border border-gray-300 bg-white text-sm leading-tight text-gray-700 shadow focus:border-blue-500 focus:outline-none"
          >
            <option value="Select User" disabled>
              {selectedUser === "Select User" && (
                <RiArrowDropDownLine className="inline-block" />
              )}
              User
              <RiArrowDropDownLine className="inline-block" />
            </option>
            <option value="User1">User 1</option>
            <option value="User2">User 2</option>
            <option value="User3">User 3</option>
          </select>
        </div>
        <div className="ml-16 mt-8">
          <Useraccesstable />
        </div>
      </div>
    </UserTemplate>
  );
};

export default Useraccess;
