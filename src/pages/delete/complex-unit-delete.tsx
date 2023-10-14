import { UserTemplate } from "@/components";
import React, { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const get = async () => {
  const session = await getSession();
  return session;
};

const BasicUnitsEdit: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };

  const router = useRouter();
  const { name, packaging, unit, unit_packaging } = router.query;

  const del = api.complex.delete.useMutation({
    onError: (err, packagingUnit, context) => {
      alert(`${err}`);
    },
    onSuccess: () => {
      alert("Data deleted successfully");
      router.push("/packaging-unit");
    },
  });

  const deleteData = () => {
    confirmed
      ? del.mutate({ name: name as string })
      : alert("Please confirm that you want to delete this hsn code");
  };

  const [confirmed, setConfirmed] = useState(false);

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-4/6 w-1/3 flex-col rounded-xl bg-[#C4B0FF45]">
          <p className="h-1/4 w-full items-center border-b-2 border-[#11009E] pl-4 text-lg font-semibold">
            Package Details
          </p>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Name
            <div className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none">
              {name}
            </div>
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Qty
            <div className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none">
              {unit_packaging}
            </div>
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Unit
            <div className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none">
              {unit}
            </div>
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Packaging
            <div className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none">
              {packaging}
            </div>
          </div>
          <div className="flex h-1/4 w-full justify-between self-end px-4">
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
            <button
              className="h-8 w-[25%] self-center rounded-md bg-[#07096E] font-semibold text-white"
              onClick={async () => {
                await router.push("product-packaging-list");
              }}
            >
              Cancel
            </button>
            <button
              className="h-8 w-[25%] self-center rounded-md bg-[#FF6E65] font-semibold text-white"
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

export default BasicUnitsEdit;
