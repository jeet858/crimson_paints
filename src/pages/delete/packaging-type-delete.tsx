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

const ProductPackagingListDelete: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };

  const [confirmed, setConfirmed] = useState(false);
  const router = useRouter();
  const { name } = router.query;

  const del = api.packagingType.delete.useMutation({
    onError: (err, type, context) => {
      alert(`An error occured }`);
    },
    onSuccess: () => {
      alert("Deletion succesfull");
      router.push("/product-packaging-list");
    },
  });

  const deleteData = () => {
    confirmed
      ? del.mutate({ name: name as string })
      : alert("Please confirm that you want to delete this color");
  };

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-fit w-2/6 flex-col rounded-xl bg-[#C4B0FF45] py-8">
          <p className="h-fit w-full items-center border-b-2 border-[#11009E] pb-8 pl-4 pt-2 text-lg font-semibold">
            Packaging Type Details
          </p>
          <div className="flex h-[10%] flex-row">
            <div className="flex w-2/6 justify-center border-2 border-[#11009E] text-xl font-semibold">
              Package Name
            </div>
            <div className="flex w-4/6 justify-center border-2 border-[#11009E] text-xl font-semibold">
              {name}
            </div>
          </div>
          <div className="flex h-fit w-full justify-between self-end px-4 pt-8">
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
                await router.push("/product-packaging-list");
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
export default ProductPackagingListDelete;
