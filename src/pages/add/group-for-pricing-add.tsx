import { UserTemplate } from "@/components";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { FaCheck } from "react-icons/fa";

const GroupForPricingAdd: React.FunctionComponent = () => {
  const router = useRouter();
  const [addData, setAddData] = useState({
    group_name: "",
    brand_name: "",
    group_code: "",
  });
  const [colorArray, setColorArray] = useState<
    {
      brand_name: string;
      group_name: string;
      group_code: string;
      color_name: string;
      rgb_code: string;
    }[]
  >([]);
  const { data: brands, isLoading, isError } = api.brand.all.useQuery();
  const {
    data: colors,
    isLoading: isColorsLoading,
    isError: isColorsError,
  } = api.colors.all.useQuery();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setAddData({
      ...addData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (colorObject: {
    brand_name: string;
    group_name: string;
    group_code: string;
    color_name: string;
    rgb_code: string;
  }) => {
    const updatedColorArray = [...colorArray];
    const foundIndex = updatedColorArray.findIndex(
      (item) => item.color_name === colorObject.color_name
    );

    if (foundIndex !== -1) {
      // Color object exists in the array, so remove it
      updatedColorArray.splice(foundIndex, 1);
    } else {
      // Color object doesn't exist in the array, so add it
      updatedColorArray.push(colorObject);
    }

    setColorArray(updatedColorArray);
  };
  const add = api.groupPricing.create.useMutation({
    onError: (err, newGroupPricing, context) => {
      alert(`An error occured }`);
    },
    onSuccess: () => {
      alert("Data inserted succesfully");
      router.push("/group-for-pricing");
    },
  });
  const addGroupInfo = api.groupPricing.create_groupInfo.useMutation();

  const create = () => {
    if (colorArray.length === 0) {
      alert("Be sure to select atleast one color");
    } else {
      add.mutate({ data: colorArray });
      addGroupInfo.mutate(addData);
    }
  };
  if (isError || isColorsError) {
    return (
      <UserTemplate
        templateParams={{
          title: "Admin",
          userID: 123,
          userImage: "user.jpg",
          userType: "admin",
        }}
      ></UserTemplate>
    );
  }
  if (isLoading || isColorsLoading) {
    return (
      <UserTemplate
        templateParams={{
          title: "Admin",
          userID: 123,
          userImage: "user.jpg",
          userType: "admin",
        }}
      ></UserTemplate>
    );
  }
  return (
    <UserTemplate
      templateParams={{
        title: "Admin",
        userID: 123,
        userImage: "user.jpg",
        userType: "admin",
      }}
    >
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-[80%] w-1/3 flex-col overflow-auto   rounded-xl bg-[#C4B0FF45] p-4">
          <p className=" h-fit w-full items-center border-b-2 border-[#11009E]  p-4 text-lg font-semibold">
            Product Group Details
          </p>
          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] p-4 text-lg font-semibold">
            Group Name
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              name="group_name"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] p-4 text-lg font-semibold">
            Code
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              name="group_code"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] p-4 text-lg font-semibold">
            Brand
            <select
              name="brand_name"
              id=""
              className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              onChange={handleInputChange}
            >
              <option value="">--Select Brand--</option>
              {brands.map((brand, index) => {
                return (
                  <option value={brand.brand_name} key={index}>
                    {brand.brand_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] p-4 text-lg font-semibold">
            Colors
            <div className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none">
              {addData.brand_name != "" &&
              addData.group_name != "" &&
              addData.group_code != "" ? (
                colors.map((color, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      key={index}
                      className="mr-2 flex items-center justify-center font-normal"
                    >
                      <div
                        key={index}
                        className="mr-4 flex h-4 w-4 items-center justify-center border-2 border-black"
                        onClick={() => {
                          const object = {
                            brand_name: addData.brand_name,
                            group_name: addData.group_name,
                            group_code: addData.group_code,
                            color_name: color.color_name,
                            rgb_code: color.rgb_code,
                          };
                          handleCheckboxChange(object);
                        }}
                      >
                        {colorArray.some(
                          (c) => c.color_name === color.color_name
                        ) ? (
                          <FaCheck className="h-8 w-8 text-[#07096E]" />
                        ) : null}
                      </div>
                      {color.color_name}
                    </div>
                  </div>
                ))
              ) : (
                <div>Please fill Brand Name, Code and Group Name</div>
              )}
            </div>
          </div>
          <div className="flex h-fit w-1/2 justify-between self-end p-4">
            <button
              className="h-fit w-[40%] self-center rounded-md bg-[#07096E] font-semibold text-white transition-transform hover:scale-105"
              onClick={async () => {
                await router.push("/group-for-pricing");
                console.log(colorArray);
              }}
            >
              Cancel
            </button>
            <button
              className="h-fit w-[40%] self-center rounded-md bg-[#C4B0FF] font-semibold transition-transform hover:scale-105"
              onClick={create}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </UserTemplate>
  );
};

export default GroupForPricingAdd;
