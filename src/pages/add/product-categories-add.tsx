import { UserTemplate } from "@/components";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const ProductCategoriesAdd: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };
  const router = useRouter();
  const [categoryData, setCategoryData] = useState({
    name: "",
    code: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  const add = api.categories.create.useMutation({
    onError: (err, category, context) => {
      alert(`An error occured }`);
    },
    onSuccess: () => {
      alert("Data added successfully");
      router.push("/product-categories");
    },
  });

  const create = () => {
    console.log(categoryData);
    if (categoryData.name != "" || categoryData.code != "") {
      add.mutate(categoryData);
    } else {
      alert("Be sure to fill all fields");
    }
  };
  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-fit w-1/3 flex-col rounded-xl bg-[#C4B0FF45] py-8">
          <p className="h-1/4  w-full items-center border-b-2 border-[#11009E] pb-8 pl-4 text-lg font-semibold">
            Product Categories Details
          </p>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 py-8 text-lg font-semibold">
            Name
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              name="name"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 py-8 text-lg font-semibold">
            Code
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              name="code"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex h-1/4 w-1/2 justify-between self-end px-4 pt-8">
            <button
              className="h-8 w-[40%] self-center rounded-md bg-[#07096E] font-semibold text-white"
              onClick={async () => {
                await router.push("/product-categories");
              }}
            >
              Cancel
            </button>
            <button
              className="h-8 w-[40%] self-center rounded-md bg-[#C4B0FF] font-semibold"
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

export default ProductCategoriesAdd;
