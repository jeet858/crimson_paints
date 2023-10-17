import { UserTemplate } from "@/components";
import React, { useState } from "react";

import { BsCheckLg } from "react-icons/bs";

const staticColors = [{ name: "Red" }, { name: "Blue" }, { name: "Green" }];

interface Color {
  name: string;
}
const GroupForPricingDelete = () => {
  const [selectedColors, setSelectedColors] = useState<Color[]>([]);

  const [isChecked, setIsChecked] = useState(false);

  const getStaticValues = () => {
    return {
      GroupName: "Black",
      Code_id: "B1",
      BrandName: "A-1 Oxide",
    };
  };
  const updateData = () => {
    alert("Data updated successfully");
  };
  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const valueAsString = value as string;
    if (selectedColors.some((color) => color.name === valueAsString)) {
      setSelectedColors(
        selectedColors.filter((color) => color.name !== valueAsString)
      );
    } else {
      setSelectedColors([...selectedColors, { name: valueAsString }]);
    }
  };
  const staticValues = getStaticValues();
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
            Product Brand Details
          </p>
          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] p-4 text-lg font-semibold">
            Group Name
            <div className="h-[30px] w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4">
              {staticValues.GroupName}
            </div>
          </div>
          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] p-4 text-lg font-semibold">
            Code
            <div className="h-[30px] w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4">
              {staticValues.Code_id}
            </div>
          </div>

          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] p-4 text-lg font-semibold">
            Brand
            <div className="h-[30px] w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none">
              {staticValues.BrandName}
            </div>
          </div>
          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] p-4 text-lg font-semibold">
            Colors
            <div className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none">
              {staticColors.map((color, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-5 w-8 bg-[#C4B0FF45] "
                    id={color.name}
                    name={color.name}
                    value={color.name}
                    checked={selectedColors.some((c) => c.name === color.name)}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={color.name} className="ml-2">
                    {color.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex  h-fit w-full justify-between self-end p-2">
            <div className="flex  items-center justify-center gap-2">
              <div
                className={`custom-checkbox flex h-6 w-8 cursor-pointer items-center justify-center rounded-sm border-2 border-gray-600 ${
                  isChecked ? "checked" : "bg-transparent"
                }`}
                onClick={handleCheckboxClick}
              >
                {isChecked && (
                  <BsCheckLg className="text-4xl font-bold text-blue-900" />
                )}
              </div>
              <span>I confirm the deletion</span>
            </div>
            <div className="flex gap-2">
              <button className="h-[30px] w-[70px] self-center rounded-md bg-[#07096E] text-base font-semibold text-white transition-transform hover:scale-105">
                Cancel
              </button>
              <button
                className="h-[30px] w-[70px] self-center rounded-md  border-[1px] border-[#07096E] bg-[#FF6E65] text-base font-semibold text-white transition-transform hover:scale-105"
                onClick={updateData}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </UserTemplate>
  );
};

export default GroupForPricingDelete;
