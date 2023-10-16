import { UserTemplate } from "@/components";
import React, { useState } from "react";
import { useRouter } from "next/router";

const staticBrand = [
  { name: "A-1 Oxide" },
  { name: "AD Base" },
  { name: "ARF Oxide" },
];
const staticColors = [{ name: "Red" }, { name: "Blue" }, { name: "Green" }];

interface Color {
  name: string;
}
const GroupForPricingEdit = () => {
  const [selectedColors, setSelectedColors] = useState<Color[]>([]);
  const router = useRouter();
  const { GroupName, BrandName, Code_id, color } = router.query;

  const [editData, setEditData] = useState({
    GroupName: GroupName as string,
    BrandName: BrandName as string,
    Code_id: Code_id as string,
    color: color as string,
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setEditData({
      ...editData,
      [name]: name === "Code_id" ? parseInt(value, 10) : value,
    });
  };

  const updateData = () => {
    alert("Data updated successfully");
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
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              name="GroupName"
              value={editData.GroupName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] p-4 text-lg font-semibold">
            Code
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              name="Code_id"
              value={editData.Code_id}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] p-4 text-lg font-semibold">
            Brand
            <select
              name="BrandName"
              id=""
              className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              onChange={handleInputChange}
              value={editData.BrandName}
            >
              <option value="">--Select Brand--</option>
              {staticBrand.map((Brand, index) => {
                return (
                  <option value={Brand.name} key={index}>
                    {Brand.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] p-4 text-lg font-semibold">
            Colors
            <div className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none">
              {staticColors.map((color, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
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
          <div className="flex h-fit w-1/2 justify-between self-end p-4">
            <button className="h-fit w-[40%] self-center rounded-md bg-[#07096E] font-semibold text-white transition-transform hover:scale-105">
              Cancel
            </button>
            <button
              className="h-fit w-[40%] self-center rounded-md bg-[#C4B0FF] font-semibold transition-transform hover:scale-105"
              onClick={updateData}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </UserTemplate>
  );
};

export default GroupForPricingEdit;
