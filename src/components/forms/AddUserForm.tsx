import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import LoginTemplate from "../template/LoginTemplate";
import { BiDownArrow } from "react-icons/bi";
import { useRouter } from "next/router";
const AddUserForm: React.FunctionComponent = () => {
  const templateParams = { title: "Add User" };
  const [userTypeDropdown, setUserTypeDropdown] = useState(false);
  const [userType, setUserType] = useState("Set User Type");
  const [locationType, setLocationType] = useState(false);
  const userTypeList = ["Admin", "GNRL", "Sales", "Backoffice", "Production"];
  const orderableLocation = ["Kolkata", "Rajasthan", "Bihar", "Odisha"];
  const router = useRouter();
  const navigate = async () => {
    await router.push({
      pathname: "/admin",
      query: { userType: "admin" },
    });
  };
  return (
    <LoginTemplate templateParams={templateParams}>
      <div className="flex w-[500px] flex-col items-center justify-center gap-y-1">
        <h2 className="font-[sans-serif] text-2xl font-semibold text-[#07096E]">
          Add User
        </h2>
        <span className="font-[open-sans]">Hey,Add User Account</span>
        <div className="flex w-full gap-x-4">
          <input
            className="block h-fit w-1/2 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#23b196] focus:outline-none focus:ring-[#23b196] sm:text-sm"
            placeholder="Add User Id"
          />
          <div className="group relative w-1/2 cursor-pointer">
            <div
              onClick={() => {
                setUserTypeDropdown(!userTypeDropdown);
              }}
              className="flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 shadow-sm hover:bg-[#F5F5F5] focus:border-[#23b196] focus:outline-none focus:ring-[#23b196] sm:text-sm"
            >
              {userType}
              <BiDownArrow />
            </div>
            {userTypeDropdown ? (
              <div className="absolute m-1 h-fit w-full rounded-md bg-white shadow-lg">
                {userTypeList.map((type) => {
                  return (
                    <div
                      key={type}
                      className="cursor-pointer px-4 py-1 text-[#787878] hover:bg-[#F5F5F5]"
                      onClick={() => {
                        setUserTypeDropdown(!userTypeDropdown);
                        setUserType(type);
                      }}
                    >
                      {type}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
        <input
          placeholder="Enter Full Name"
          className="m-1 block h-fit w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#23b196] focus:outline-none focus:ring-[#23b196] sm:text-sm"
        />
        <input
          placeholder="Enter Phone Number"
          className="m-1 block h-fit w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#23b196] focus:outline-none focus:ring-[#23b196] sm:text-sm"
        />
        <input
          placeholder="Enter Email Id"
          className="m-1 block h-fit w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#23b196] focus:outline-none focus:ring-[#23b196] sm:text-sm"
        />
        <div className="flex items-center justify-center gap-x-2 self-start">
          <input type="checkbox" />
          <p>Self Data Access</p>
        </div>
        <div className="my-2 flex h-fit w-full flex-col gap-y-2 rounded-md bg-[#F5F5F5] pb-4 text-[#787878]">
          <div className="flex">
            {locationType ? (
              <div
                className="h-fit cursor-pointer border-r-4 border-[#787878] px-2"
                onClick={() => {
                  setLocationType(!locationType);
                }}
              >
                Orderable Locations
              </div>
            ) : (
              <div
                className="h-fit cursor-pointer border-b-4 border-r-4 border-[#787878] px-2"
                onClick={() => {
                  setLocationType(!locationType);
                }}
              >
                Orderable Locations
              </div>
            )}
            {locationType ? (
              <div
                className="h-fit cursor-pointer border-b-4 border-[#787878] px-2"
                onClick={() => {
                  setLocationType(!locationType);
                }}
              >
                Access Location
              </div>
            ) : (
              <div
                className="h-fit cursor-pointer border-[#787878] px-2"
                onClick={() => {
                  setLocationType(!locationType);
                }}
              >
                Access Location
              </div>
            )}
          </div>
          <div className="flex flex-wrap">
            {orderableLocation.map((location) => {
              return (
                <div className="flex gap-x-2 px-4">
                  <input type="checkbox" />
                  <p>{location}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex w-full gap-x-4">
          <div className="group relative w-1/2 cursor-pointer">
            <div
              // onClick={() => {
              //   setUserTypeDropdown(!userTypeDropdown);
              // }}
              className=" flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 shadow-sm hover:bg-[#F5F5F5] focus:border-[#23b196] focus:outline-none focus:ring-[#23b196] sm:text-sm"
            >
              Assign Oderable Unit
              <BiDownArrow />
            </div>
            {/* {userTypeDropdown ? (
              <div className="m-1 h-fit w-full rounded-md shadow-lg absolute">
                {userTypeList.map((type) => {
                  return (
                    <div
                      key={type}
                      className="cursor-pointer px-4 py-1 text-[#787878] hover:bg-[#F5F5F5]"
                      onClick={() => {
                        setUserTypeDropdown(!userTypeDropdown);
                        setUserType(type);
                      }}
                    >
                      {type}
                    </div>
                  );
                })}
              </div>
            ) : null} */}
          </div>
          <div className="group relative w-1/2 cursor-pointer">
            <div
              // onClick={() => {
              //   setUserTypeDropdown(!userTypeDropdown);
              // }}
              className=" flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 shadow-sm hover:bg-[#F5F5F5] focus:border-[#23b196] focus:outline-none focus:ring-[#23b196] sm:text-sm"
            >
              Assign Oderable Color
              <BiDownArrow />
            </div>
            {/* {userTypeDropdown ? (
              <div className="m-1 h-fit w-full rounded-md shadow-lg absolute">
                {userTypeList.map((type) => {
                  return (
                    <div
                      key={type}
                      className="cursor-pointer px-4 py-1 text-[#787878] hover:bg-[#F5F5F5]"
                      onClick={() => {
                        setUserTypeDropdown(!userTypeDropdown);
                        setUserType(type);
                      }}
                    >
                      {type}
                    </div>
                  );
                })}
              </div>
            ) : null} */}
          </div>
        </div>
        <div className="m-1 flex w-full justify-between rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-[#23b196] sm:text-sm">
          <input
            className="w-[90%] focus:outline-none"
            placeholder="Password"
          />
          <button type="button" className="">
            <FaEye />
          </button>
        </div>
        <div className="m-1 flex w-full justify-between rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-[#23b196] sm:text-sm">
          <input
            className="w-[90%] focus:outline-none"
            placeholder="Password"
          />
          <button type="button" className="">
            <FaEye />
          </button>
        </div>
        <button
          type="button"
          className="w-[40%] rounded-full bg-indigo-700 px-4 py-2 font-semibold text-white hover:bg-indigo-800 focus:bg-indigo-800 focus:outline-none"
          onClick={navigate}
        >
          Create Account
        </button>
      </div>
    </LoginTemplate>
  );
};

export default AddUserForm;
