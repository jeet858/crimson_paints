import { UserTemplate } from "@/components";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Link from "next/link";

const get = async () => {
  const session = await getSession();
  return session;
};

const PriceListEdit: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };
  const router = useRouter();
  const { price_list_name } = router.query;

  const update = api.namingPriceList.edit.useMutation({
    onError: (err, newPriceList, context) => {
      alert(`An error occured }`);
    },
    onSuccess: () => {
      router.push("//naming-price-list");
    },
  });

  useEffect(() => {
    if (price_list_name) {
      setEditData({
        existing_price_list_name: price_list_name as string,
        new_price_list_name: price_list_name as string,
      });
    }
  }, [price_list_name]);

  const [editData, setEditData] = useState({
    existing_price_list_name: price_list_name as string,
    new_price_list_name: price_list_name as string,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const updateData = () => {
    if (editData.new_price_list_name != "") {
      update.mutate(editData);
    } else {
      alert("Be sure to fill all fields");
    }
  };

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-1/3 w-1/3 flex-col rounded-xl bg-[#C4B0FF45]">
          <p className="h-1/3 w-full items-center border-b-2 border-[#11009E] pl-4 text-lg font-semibold">
            Price List Details
          </p>
          <div className="flex h-1/3 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Name
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              name="new_price_list_name"
              value={editData.new_price_list_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex h-1/3 w-1/2 justify-between self-end px-4">
            <Link
              className="flex h-1/2 w-[40%] items-center justify-center self-center rounded-md bg-[#07096E] font-semibold text-white"
              href="/naming-price-list"
            >
              Cancel
            </Link>
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

export default PriceListEdit;
