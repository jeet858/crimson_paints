import { UserTemplate } from "@/components";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { BsCheckLg } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { api } from "~/utils/api";

const staticColors = [{ name: "Red" }, { name: "Blue" }, { name: "Green" }];

const GroupForPricingDelete = () => {
  const router = useRouter();
  const { brand_name, group_code, group_name } = router.query;

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  const {
    data: existingList,
    isLoading: existingListLoading,
    isError: existingListError,
  } = api.groupPricing.group_colors.useQuery(
    {
      brand_name: brand_name as string,
      group_code: group_code as string,
      group_name: group_name as string,
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
  const del = api.groupPricing.group_colors_delete.useMutation({
    onError: (err, newGroupPricing, context) => {
      alert(`An error occured }`);
    },
    onSuccess: () => {
      alert("Data deleted succesfully");
      router.push("/group-for-pricing");
    },
  });
  const deleteData = () => {
    isChecked
      ? del.mutate({
          brand_name: brand_name as string,
          group_code: group_code as string,
          group_name: group_name as string,
        })
      : alert("Please confirm that you want to delete this group");
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
            <div className="h-[30px] w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4">
              {group_name}
            </div>
          </div>
          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] p-4 text-lg font-semibold">
            Code
            <div className="h-[30px] w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4">
              {group_code}
            </div>
          </div>

          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] p-4 text-lg font-semibold">
            Brand
            <div className="h-[30px] w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none">
              {brand_name}
            </div>
          </div>
          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] p-4 text-lg font-semibold">
            Colors
            <div className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none">
              {existingList?.map((color, index) => (
                <div key={index} className="flex items-center">
                  <div
                    key={index}
                    className="mr-2 flex items-center justify-center font-normal"
                  >
                    <div
                      key={index}
                      className="mr-4 flex h-4 w-4 items-center justify-center border-2 border-black"
                    >
                      <FaCheck className="h-8 w-8 text-[#07096E]" />
                    </div>
                    {color.color_name}
                  </div>
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
              <button
                className="h-[30px] w-[70px] self-center rounded-md bg-[#07096E] text-base font-semibold text-white transition-transform hover:scale-105"
                onClick={async () => {
                  await router.push("/group-for-pricing");
                }}
              >
                Cancel
              </button>
              <button
                className="h-[30px] w-[70px] self-center rounded-md  border-[1px] border-[#07096E] bg-[#FF6E65] text-base font-semibold text-white transition-transform hover:scale-105"
                onClick={deleteData}
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
