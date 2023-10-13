import { UserTemplate } from "@/components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { FaCheck, FaList } from "react-icons/fa";
import { api } from "~/utils/api";
const BrandAndPackagingTypeEdit: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const { brand_name } = router.query;

  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [firstRender, setFirstRender] = useState(true);
  const {
    data: packagingUnits,
    isLoading,
    isError,
  } = api.packagingUnit.all.useQuery();
  const {
    data: complexUnits,
    isLoading: complexUnitLoading,
    isError: complexUnitError,
  } = api.complex.all.useQuery();
  const {
    data: existingPackaging,
    isLoading: existingPackagingLoading,
    isError: existingPackagingError,
  } = api.brandPackaging.where_brand_name.useQuery(brand_name as string);
  const update = api.brandPackaging.edit.useMutation({
    onError: (err, brandPackaging, context) => {
      alert(`An error occured }`);
    },
    onSuccess: () => {
      alert("Data updated succesfully");
      setFirstRender(true);
      router.push("/brand-and-packaging-type");
    },
  });

  const updateData = () => {
    update.mutate({
      brand_name: brand_name as string,
      packaging_array: selectedItems,
    });
  };
  useEffect(() => {
    if (selectedItems.length == 0 && existingPackaging && firstRender) {
      setFirstRender(false);
      var a: string[] = [];
      const packagingValues = existingPackaging.map((item) => item.packaging);
      setSelectedItems(packagingValues);
    }
  });
  if (isLoading || complexUnitLoading || existingPackagingLoading) {
    return (
      <UserTemplate templateParams={templateParams}>
        <div className="flex w-full items-end justify-end p-4">
          <button className="flex h-10 w-28 items-center justify-evenly rounded-lg bg-blue-700 text-2xl font-semibold text-white">
            <FaList className="text-3xl font-bold text-[#E7E0FF78]" />
            List
          </button>
        </div>
        <div className="flex h-[60vh] w-full flex-col p-4">
          <div className="flex h-fit w-full justify-between rounded-t-[10px]  bg-[#C4B0FF45] p-2 text-2xl font-bold">
            <h1>Brand Wise Qty & Packaging List Details</h1>
          </div>
          <div className="overflow-scroll  bg-[#C4B0FF8d]">
            <p className="p-2 text-lg font-semibold">{brand_name}</p>
          </div>
          <div className="flex h-fit w-full items-center justify-center gap-4 rounded-b-[10px]  bg-[#c4b0ff8d] p-2 text-xl font-semibold">
            <button className="h-10 w-28 rounded-lg bg-[#07096E] text-white">
              Cancel
            </button>
            <button className="h-10 w-28 rounded-lg bg-[#C4B0FF]">Save</button>
          </div>
        </div>
      </UserTemplate>
    );
  }
  if (isError || complexUnitError || existingPackagingError) {
    return <UserTemplate templateParams={templateParams}></UserTemplate>;
  }

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex w-full items-end justify-end p-4">
        <button className="flex h-10 w-28 items-center justify-evenly rounded-lg bg-blue-700 text-2xl font-semibold text-white">
          <FaList className="text-3xl font-bold text-[#E7E0FF78]" />
          List
        </button>
      </div>
      <div className="flex h-[60vh] w-full flex-col p-4">
        <div className="flex h-fit w-full justify-between rounded-t-[10px]  bg-[#C4B0FF45] p-2 text-2xl font-bold">
          <h1>Brand Wise Qty & Packaging List Details</h1>
        </div>
        <div className="bg-[#C4B0FF8d]">
          <p className="p-2 text-lg font-semibold">{brand_name}</p>
          <div className="flex w-full flex-wrap p-2">
            {packagingUnits.map((packagingUnit, index) => {
              const isSelected = selectedItems.includes(packagingUnit.name);
              const handleCheckboxClick = () => {
                if (isSelected) {
                  setSelectedItems(
                    selectedItems.filter((item) => item !== packagingUnit.name)
                  );
                } else {
                  setSelectedItems([...selectedItems, packagingUnit.name]);
                }
              };
              return (
                <div className="m-4 flex w-[22%] min-w-[22%] items-center">
                  <div
                    className="mr-4 flex h-4 w-4 items-center justify-center border-2 border-black"
                    onClick={handleCheckboxClick}
                  >
                    {isSelected ? (
                      <FaCheck className="h-8 w-8 text-[#07096E]" />
                    ) : null}
                  </div>
                  {packagingUnit.name}
                </div>
              );
            })}
            {complexUnits.map((complexUnit, index) => {
              const isSelected = selectedItems.includes(complexUnit.name);
              const handleCheckboxClick = () => {
                if (isSelected) {
                  setSelectedItems(
                    selectedItems.filter((item) => item !== complexUnit.name)
                  );
                } else {
                  setSelectedItems([...selectedItems, complexUnit.name]);
                }
              };
              return (
                <div className="m-4 flex w-[22%] min-w-[22%] items-center">
                  <div
                    className="mr-4 flex h-4 w-4 items-center justify-center border-2 border-black"
                    onClick={handleCheckboxClick}
                  >
                    {isSelected ? (
                      <FaCheck className="h-8 w-8 text-[#07096E]" />
                    ) : null}
                  </div>
                  {complexUnit.name}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex h-fit w-full items-center justify-center gap-4 rounded-b-[10px]  bg-[#c4b0ff8d] p-2 text-xl font-semibold">
          <button
            className="h-10 w-28 rounded-lg bg-[#07096E] text-white"
            onClick={() => {
              console.log(selectedItems);
            }}
          >
            Cancel
          </button>
          <button
            className="h-10 w-28 rounded-lg bg-[#C4B0FF]"
            onClick={updateData}
          >
            Save
          </button>
        </div>
      </div>
    </UserTemplate>
  );
};
export default BrandAndPackagingTypeEdit;
