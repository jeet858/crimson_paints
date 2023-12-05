import React, { useState } from "react";
import { FaCheck, FaEye } from "react-icons/fa";
import LoginTemplate from "../template/LoginTemplate";
import { BiDownArrow } from "react-icons/bi";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { boolean, number } from "zod";
const AddUserForm: React.FunctionComponent = () => {
  const templateParams = { title: "Add User" };
  const [userTypeDropdown, setUserTypeDropdown] = useState(false);
  const [userType, setUserType] = useState("Set User Type");
  const [locationType, setLocationType] = useState(false);
  const userTypeList = [
    "Admin",
    "GNRL",
    "Salesman",
    "Backoffice",
    "Production",
  ];
  const orderableLocation = ["Kolkata", "Rajasthan", "Bihar", "Odisha"];
  const router = useRouter();
  const navigate = async () => {
    await router.push({
      pathname: "/admin",
      query: { userType: "admin" },
    });
  };
  const {
    data: locations,
    isLoading: isLocationLoading,
    isError: isLocationError,
  } = api.location.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const { data: orderablrColorsList } = api.orderablrColor.all_list.useQuery(
    undefined,
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
  const { data: orderablrUnitList } = api.orderableUnit.all.useQuery(
    undefined,
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
  const { data: interCompanys } = api.interComapny.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const [addData, setAddData] = useState({
    id: "",
    type: "",
    name: "",
    phone: 0,
    email: "",
    self_data: false,
    password: "",
    confirm_password: "",
    orderableLocation: [] as string[],
    acessLocation: [] as string[],
    company: "",
    orderable_color_list: "",
    orderable_unit_list: "",
  });
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setAddData({
      ...addData,
      [name]: name === "phone" ? parseInt(value) : value,
    });
  };
  const add = api.user.create.useMutation({
    onError: (err, newTodo, context) => {
      if (
        err.message.split("\n")[4] ===
        "Unique constraint failed on the constraint: `BasicUnits_symbol_key`"
      ) {
        alert("This data already exist");
      } else {
        alert(`${err.message}`);
      }
    },
    onSuccess: () => {
      alert("Data added successfully");
      // router.push("/");
    },
  });

  const create = () => {
    console.log(addData);
    if (
      addData.id != "" ||
      addData.type != "" ||
      addData.name != "" ||
      addData.phone != 0 ||
      addData.email != "" ||
      addData.password != "" ||
      addData.confirm_password != "" ||
      addData.company != "" ||
      addData.orderable_color_list != "" ||
      addData.orderable_unit_list != "" ||
      addData.acessLocation.length === 0 ||
      addData.orderableLocation.length === 0 ||
      addData.password === addData.confirm_password
    ) {
      add.mutate(addData);
    } else {
      alert("Be sure to fill all fields");
    }
  };
  return (
    <LoginTemplate templateParams={templateParams}>
      <div className="flex w-[500px] flex-col items-center justify-center gap-y-1">
        <h2 className="font-[sans-serif] text-2xl font-semibold text-[#181823]">
          Add User
        </h2>
        <span className="font-[open-sans]">Hey,Add User Account</span>
        <div className="flex w-full gap-x-4">
          <input
            className="block h-fit w-1/2 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#23b196] focus:outline-none focus:ring-[#23b196] sm:text-sm"
            placeholder="Add User Id"
            name="id"
            onChange={handleInputChange}
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
                        setAddData({
                          ...addData,
                          ["type"]: type,
                        });
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
          name="name"
          onChange={handleInputChange}
        />
        <input
          placeholder="Enter Phone Number"
          className="m-1 block h-fit w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#23b196] focus:outline-none focus:ring-[#23b196] sm:text-sm"
          name="phone"
          onChange={handleInputChange}
        />
        <input
          placeholder="Enter Email Id"
          className="m-1 block h-fit w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#23b196] focus:outline-none focus:ring-[#23b196] sm:text-sm"
          name="email"
          onChange={handleInputChange}
        />
        <div className="flex w-full items-center">
          <p>Self Data Acess?</p>{" "}
          <div
            className="ml-2 flex h-4 w-4 cursor-pointer items-center justify-center border-2"
            onClick={() => {
              setAddData({
                ...addData,
                ["self_data"]: !addData.self_data,
              });
            }}
          >
            {addData.self_data ? <FaCheck /> : null}
          </div>
        </div>
        <div className="my-2 flex h-fit w-full flex-col gap-y-2 rounded-md bg-[#F5F5F5] pb-4 text-[#787878]">
          <div className="flex">
            <div className="flex h-fit cursor-pointer flex-col  px-2">
              <div className="flex">
                <p className="border-b-4 border-[#787878] pr-2">
                  Orderable Locations
                </p>
              </div>
              <div className="flex">
                {locations?.map((location, index) => {
                  return (
                    <div
                      className="flex items-center justify-center"
                      key={index}
                    >
                      <p className="mr-2">{location.location}</p>
                      <input
                        type="checkbox"
                        className="mr-2"
                        value={location.location}
                        key={index * index}
                        name={`${location.location}${index}`}
                        onChange={() => {
                          if (
                            addData.orderableLocation.includes(
                              location.location
                            )
                          ) {
                            const arr = addData.orderableLocation.filter(
                              (item) => item !== location.location
                            );
                            setAddData({
                              ...addData,
                              ["orderableLocation"]: arr,
                            });
                          } else {
                            const arr = addData.orderableLocation;
                            arr.push(location.location);
                            setAddData({
                              ...addData,
                              ["orderableLocation"]: arr,
                            });
                          }
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="my-2 flex h-fit w-full flex-col gap-y-2 rounded-md bg-[#F5F5F5] pb-4 text-[#787878]">
          <div className="flex">
            <div className="flex h-fit cursor-pointer flex-col  px-2">
              <div className="flex">
                <p className="border-b-4 border-[#787878]">Access Locations</p>
              </div>
              <div className="flex">
                {locations?.map((location, index) => {
                  return (
                    <div
                      className="flex items-center justify-center"
                      key={index}
                    >
                      <p className="mr-2">{location.location}</p>
                      <input
                        type="checkbox"
                        className="mr-2"
                        value={location.location}
                        key={index}
                        name={`${location.location}${index}${index}`}
                        onChange={() => {
                          if (
                            addData.acessLocation.includes(location.location)
                          ) {
                            const arr = addData.acessLocation.filter(
                              (item) => item !== location.location
                            );
                            setAddData({
                              ...addData,
                              ["acessLocation"]: arr,
                            });
                          } else {
                            const arr = addData.acessLocation;
                            arr.push(location.location);
                            setAddData({
                              ...addData,
                              ["acessLocation"]: arr,
                            });
                          }
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-x-4">
          <div className="group relative w-1/2 cursor-pointer">
            <select
              onChange={handleInputChange}
              name="orderable_color_list"
              className=" flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 shadow-sm hover:bg-[#F5F5F5] focus:border-[#23b196] focus:outline-none focus:ring-[#23b196] sm:text-sm"
            >
              <option>---Select Orderable color list---</option>
              {orderablrColorsList?.map((orderablrColor, index) => {
                return (
                  <option value={orderablrColor.list_name} key={index}>
                    {orderablrColor.list_name}
                  </option>
                );
              })}
            </select>
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
            <select
              name="orderable_unit_list"
              onChange={handleInputChange}
              className=" flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 shadow-sm hover:bg-[#F5F5F5] focus:border-[#23b196] focus:outline-none focus:ring-[#23b196] sm:text-sm"
            >
              <option>---Select Orderable unit list---</option>
              {orderablrUnitList?.map((orderablrUnit, index) => {
                return (
                  <option value={orderablrUnit.list_name} key={index}>
                    {orderablrUnit.list_name}
                  </option>
                );
              })}
            </select>
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
        <div className="group relative w-full cursor-pointer">
          <select
            name="company"
            onChange={handleInputChange}
            className=" flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 shadow-sm hover:bg-[#F5F5F5] focus:border-[#23b196] focus:outline-none focus:ring-[#23b196] sm:text-sm"
          >
            <option>---Select Company---</option>
            {interCompanys?.map((interCompany, index) => {
              return (
                <option value={interCompany.name} key={index}>
                  {interCompany.name}
                </option>
              );
            })}
          </select>
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
        <div className="m-1 flex w-full justify-between rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-[#23b196] sm:text-sm">
          <input
            className="w-[90%] focus:outline-none"
            placeholder="Password"
            name="password"
            onChange={handleInputChange}
          />
          <button type="button" className="">
            <FaEye />
          </button>
        </div>
        <div className="m-1 flex w-full justify-between rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-[#23b196] sm:text-sm">
          <input
            className="w-[90%] focus:outline-none"
            placeholder="Confirm Password"
            name="confirm_password"
            onChange={handleInputChange}
          />
          <button type="button" className="">
            <FaEye />
          </button>
        </div>
        <button
          type="button"
          className="w-[40%] rounded-full bg-indigo-700 px-4 py-2 font-semibold text-white hover:bg-indigo-800 focus:bg-indigo-800 focus:outline-none"
          onClick={() => {
            console.log(addData);
            create();
          }}
        >
          Create Account
        </button>
      </div>
    </LoginTemplate>
  );
};

export default AddUserForm;
