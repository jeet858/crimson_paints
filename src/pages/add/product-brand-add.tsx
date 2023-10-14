import { UserTemplate } from "@/components";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const ProductBrandAdd: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };
  const router = useRouter();
  const { category } = router.query;
  const [addData, setAddData] = useState({
    hsnCode_id: 0,
    brand_name: "",
    categoriesName: category as string,
  });
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setAddData({
      ...addData,
      [name]: name === "hsnCode_id" ? parseInt(value, 10) : value,
    });
  };
  const { data: hsnCodes, isLoading, isError } = api.hsn.all.useQuery();
  const add = api.brand.create.useMutation({
    onError: (err, newBrand, context) => {
      alert(`${err.message}`);
    },
    onSuccess: () => {
      alert("Data added sucessfully");
      router.push("/product-brand");
    },
  });

  const create = () => {
    console.log(addData);
    if (addData.brand_name != "" || addData.hsnCode_id != 0) {
      add.mutate(addData);
    } else {
      alert("Be sure to fill all fields");
    }
  };

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-1/3 w-1/3 flex-col rounded-xl bg-[#C4B0FF45]">
          <p className="h-1/4 w-full items-center border-b-2 border-[#11009E] pl-4 text-lg font-semibold">
            Product Brand Details
          </p>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Brand Name
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              name="brand_name"
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
            <div className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none">
              {category}
            </div>
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

export default ProductBrandAdd;
