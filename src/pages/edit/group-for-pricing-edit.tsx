import { UserTemplate } from "@/components";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { FaCheck } from "react-icons/fa";

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
  const [firstRender, setFirstRender] = useState(true);
  const router = useRouter();
  const { brand_name, group_code, group_name } = router.query;
  const [editData, setEditData] = useState({
    group_name: group_name,
    brand_name: brand_name,
    group_code: group_code,
  });
  useEffect(() => {
    if (brand_name && group_code && group_name) {
      setEditData({
        brand_name: brand_name,
        group_code: group_code,
        group_name: group_name,
      });
    }
  }, [brand_name, group_code, group_name]);
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setEditData({
      ...editData,
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
  const {
    data: existingList,
    isLoading: existingListLoading,
    isError: existingListError,
  } = api.groupPricing.group_colors.useQuery(
    {
      brand_name: editData.brand_name as string,
      group_code: editData.group_code as string,
      group_name: editData.group_name as string,
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
  const [colorArray, setColorArray] = useState<
    {
      brand_name: string;
      group_name: string;
      group_code: string;
      color_name: string;
      rgb_code: string;
    }[]
  >([]);
  useEffect(() => {
    if (colorArray.length == 0 && existingList && firstRender) {
      setFirstRender(false);
      console.log(colorArray);
      setColorArray(existingList);
    }
  }, [existingList, firstRender]);
  const {
    data: colors,
    isLoading: isColorsLoading,
    isError: isColorsError,
  } = api.colors.all.useQuery();
  const update = api.groupPricing.group_colors_edit.useMutation({
    onError: (err, newGroupPricing, context) => {
      alert(`An error occured }`);
    },
    onSuccess: () => {
      alert("Data updated succesfully");
      router.push("/group-for-pricing");
    },
  });
  const updateData = () => {
    if (colorArray.length === 0) {
      alert("Select atleast one color");
    } else {
      update.mutate({
        brand_name: editData.brand_name as string,
        group_code: editData.group_code as string,
        group_name: editData.group_name as string,
        data: colorArray,
      });
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
            Product Brand Details Edit
          </p>
          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] p-4 text-lg font-semibold">
            Group Name
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              name="group_name"
              value={editData.group_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] p-4 text-lg font-semibold">
            Code
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              name="group_code"
              value={editData.group_code}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] p-4 text-lg font-semibold">
            Brand
            <div
              id="brand_name"
              className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
            >
              {brand_name}
            </div>
          </div>
          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] p-4 text-lg font-semibold">
            Colors
            <div className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none">
              {colors?.map((color, index) => (
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
                          brand_name: editData.brand_name as string,
                          group_name: editData.group_name as string,
                          group_code: editData.group_code as string,
                          color_name: color.color_name as string,
                          rgb_code: color.rgb_code as string,
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
              ))}
            </div>
          </div>
          <div className="flex h-fit w-1/2 justify-between self-end p-4">
            <button
              className="h-fit w-[40%] self-center rounded-md bg-[#07096E] font-semibold text-white transition-transform hover:scale-105"
              onClick={async () => {
                await router.push("/group-for-pricing");
              }}
            >
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
