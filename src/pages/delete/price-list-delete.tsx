import { UserTemplate } from "@/components";
import React, { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Link from "next/link";

const PriceListDelete: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };

  const editData = {
    Symbol: "Gm",
    Name: "Gram",
  };
  const router = useRouter();
  const { price_list_name } = router.query;

  const del = api.namingPriceList.delete.useMutation({
    onError: (err, newPriceList, context) => {
      alert(`An error occured }`);
    },
    onSuccess: () => {
      router.push("/naming-price-list");
    },
  });

  const deleteData = () => {
    confirmed
      ? del.mutate({ price_list_name: price_list_name as string })
      : alert("Please confirm that you want to delete this price list");
  };

  const [confirmed, setConfirmed] = useState(false);

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-1/3 w-1/3 flex-col rounded-xl bg-[#C4B0FF45]">
          <p className="h-1/3 w-full items-center border-b-2 border-[#11009E] pl-4 pt-2 text-lg font-semibold">
            Price List Details
          </p>
          <div className="flex h-1/3 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Name
            <div className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none">
              {price_list_name}
            </div>
          </div>
          <div className="flex h-1/3 w-full justify-between self-end px-4">
            <div className="flex h-fit items-center justify-center">
              <div
                className="mr-2 flex h-4 w-4 items-center border-2 border-[#11009E] bg-[#C4B0FF45]"
                onClick={() => {
                  setConfirmed(!confirmed);
                }}
              >
                {confirmed ? <FaCheck className="h-4 w-4" /> : null}
              </div>
              <p>I confirm the deletion</p>
            </div>
            <Link
              className="flex h-1/2 w-[25%] items-center justify-center self-center rounded-md bg-[#07096E] font-semibold text-white"
              href="/naming-price-list"
            >
              Cancel
            </Link>
            <button
              className="h-1/2 w-[25%] self-center rounded-md bg-[#FF6E65] font-semibold text-white"
              onClick={deleteData}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </UserTemplate>
  );
};

export default PriceListDelete;
