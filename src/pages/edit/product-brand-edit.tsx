import { UserTemplate } from "@/components";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const get = async () => {
  const session = await getSession();
  return session;
};

const ProductBrandEdit: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };
  const router = useRouter();
  const { categoriesName, brand_name, hsnCode_id } = router.query;
  const { data: hsnCodes, isLoading, isError } = api.hsn.all.useQuery();
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = api.categories.all.useQuery();

  const update = api.brand.edit.useMutation({
    onError: (err, newBrand, context) => {
      alert(`${err.message}`);
    },
    onSuccess: () => {
      alert("Data updated successfully");

      router.push("/product-brand");
    },
  });

  const [editData, setEditData] = useState({
    existingName: brand_name as string,
    newName: brand_name as string,
    categoriesName: categoriesName as string,
    hsnCode_id: parseInt(hsnCode_id as string),
  });

  useEffect(() => {
    if (brand_name && categoriesName && hsnCode_id) {
      setEditData({
        existingName: brand_name as string,
        newName: brand_name as string,
        categoriesName: categoriesName as string,
        hsnCode_id: parseInt(hsnCode_id as string),
      });
    }
  }, [categoriesName, brand_name, hsnCode_id]);
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setEditData({
      ...editData,
      [name]: name === "hsnCode_id" ? parseInt(value, 10) : value,
    });
  };

  const updateData = () => {
    update.mutate(editData);
  };

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-4/6 w-1/3 flex-col rounded-xl bg-[#C4B0FF45]">
          <p className="h-1/4 w-full items-center border-b-2 border-[#11009E] py-8 pl-4 text-lg font-semibold">
            Product Brand Details
          </p>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Brand Name
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              name="newName"
              value={editData.newName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            HSN Code
            <select
              name="hsnCode_id"
              id=""
              className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              onChange={handleInputChange}
              value={editData.hsnCode_id}
            >
              <option value="">--Select HSN Code--</option>
              {hsnCodes?.map((hsnCode, index) => {
                return (
                  <option value={hsnCode.code} key={index}>
                    {hsnCode.code}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Category
            <select
              name="categoriesName"
              id=""
              className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              onChange={handleInputChange}
              value={editData.categoriesName}
            >
              <option value="">--Select Category--</option>
              {categories?.map((category, index) => {
                return (
                  <option value={category.name} key={index}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex h-1/4 w-1/2 justify-between self-end px-4">
            <button
              className="h-1/2 w-[40%] self-center rounded-md bg-[#07096E] font-semibold text-white"
              onClick={async () => {
                await router.push("/product-brand");
              }}
            >
              Cancel
            </button>
            <button
              className="h-1/2 w-[40%] self-center rounded-md bg-[#C4B0FF] font-semibold"
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

export default ProductBrandEdit;
