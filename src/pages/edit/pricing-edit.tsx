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
  const { name, symbol } = router.query;

  const update = api.basicUnit.edit.useMutation({
    onError: (err, newTodo, context) => {
      alert(`An error occured }`);
    },
    onSuccess: () => {
      router.push("/basic-unit");
    },
  });

  useEffect(() => {
    if (name && symbol) {
      setEditData({
        existingName: name as string,
        newName: name as string,
        symbol: symbol as string,
      });
    }
  }, [name, symbol]);

  const [editData, setEditData] = useState({
    existingName: name as string,
    newName: name as string,
    symbol: symbol as string,
  });

  const trpc = api.useContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const updateData = () => {
    update.mutate(editData);
  };

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-4/6 w-1/3 flex-col rounded-xl bg-[#C4B0FF45]">
          Pricing Edit
          <p className="h-1/6 w-full items-center border-b-2 border-[#11009E] pl-4 text-lg font-semibold">
            Rule Details
          </p>
          <div className="flex h-1/6 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg">
            <div className="w-1/3 font-semibold">Price Chart</div>
            
            <div className="grow text-lg">
              Price List 1  
            </div>
          </div>
          <div className="flex h-1/6 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg ">
            <div className="w-1/3 font-semibold">Brand Name</div>
            
            <div className="grow text-lg ">
              A-1 Oxide
            </div>
          </div>
          <div className="flex h-1/6 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg ">
            <div className="w-1/3 font-semibold">Group</div>
            
            <div className="grow text-lg">
              Black
            </div>
          </div>
          <div className="flex h-1/6 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg">
            <div className="w-1/3 font-semibold">Unit</div>
            {/* <input className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none" /> */}
            <div className="grow">
              <select
                name=""
                id=""
                className="rounded-md w-full border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none "
              >
                <option value="" className="bg-[#C4B0FF] font-semibold">
                  0.50 Kg Con.
                </option>
                <option value="" className="bg-[#C4B0FF] font-semibold">
                  1.00 Kg Con.
                </option>
              </select>
            </div>
          </div>
          <div className="flex h-1/6 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg">
            <div className="w-1/3 font-semibold">Price</div>
            
            <div className="grow">
              <input className="rounded-md w-full border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none" />
            </div>
          </div>
          <div className="flex h-1/6 w-1/2 justify-between self-end px-4">
            <button className="h-1/2 w-[40%] self-center rounded-md bg-[#07096E] font-semibold text-white">
              Cancel
            </button>
            <button className="h-1/2 w-[40%] self-center rounded-md bg-[#C4B0FF] font-semibold">
              Save
            </button>
          </div>
        </div>
      </div>
    </UserTemplate>
  );
};

export default PricingEdit;
