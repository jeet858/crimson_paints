import { UserTemplate } from "@/components";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const get = async () => {
  const session = await getSession();
  return session;
};

const PricingEdit: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };
  const router = useRouter();
  const { brand_name, group_name, list_name, packaging, price } = router.query;

  const update = api.pricing.single_edit.useMutation({
    onError: (err, newPricing, context) => {
      alert(`${err.message}`);
    },
    onSuccess: async () => {
      alert("Data updated sucessfully");
      await router.push({
        pathname: "/pricing",
        query: { list_name: list_name },
      });
    },
  });
  const [editData, setEditData] = useState({
    brand_name: brand_name as string,
    group_name: group_name as string,
    list_name: list_name as string,
    packaging: packaging as string,
    price: price ? parseFloat(price as string) : 0,
  });

  useEffect(() => {
    if (price) {
      setEditData({
        brand_name: brand_name as string,
        group_name: group_name as string,
        list_name: list_name as string,
        packaging: packaging as string,
        price: parseFloat(price as string),
      });
    }
  }, [brand_name, group_name, list_name, packaging, price]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditData({
      ...editData,
      [name]: name == "price" ? parseFloat(value) : value,
    });
    console.log(editData);
  };

  const updateData = () => {
    update.mutate(editData);
  };

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-4/6 w-1/3 flex-col rounded-xl bg-[#C4B0FF45]">
          <p className="h-1/6 w-full items-center border-b-2 border-[#11009E] pl-4 text-lg font-semibold">
            Pricing Details
          </p>
          <div className="flex h-1/6 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg">
            <div className="w-1/3 font-semibold">Price Chart</div>

            <div className="grow text-lg">{list_name}</div>
          </div>
          <div className="flex h-1/6 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg ">
            <div className="w-1/3 font-semibold">Brand Name</div>

            <div className="grow text-lg ">{brand_name}</div>
          </div>
          <div className="flex h-1/6 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg ">
            <div className="w-1/3 font-semibold">Group</div>

            <div className="grow text-lg">{group_name}</div>
          </div>
          <div className="flex h-1/6 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg">
            <div className="w-1/3 font-semibold">Unit</div>
            {/* <input className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none" /> */}
            <div className="w-full grow rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none ">
              {packaging}
            </div>
          </div>
          <div className="flex h-1/6 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg">
            <div className="w-1/3 font-semibold">Price</div>

            <div className="grow">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                name="price"
                value={editData.price}
                type="number"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex h-1/6 w-1/2 justify-between self-end px-4">
            <button className="h-1/2 w-[40%] self-center rounded-md bg-[#07096E] font-semibold text-white">
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

export default PricingEdit;
