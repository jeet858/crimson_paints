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

const BasicUnitsDelete: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Hsn Code",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };

  const router = useRouter();
  const { code, description } = router.query;

  const del = api.hsn.delete.useMutation({
    onError: (err, hsn, context) => {
      alert(`An error occured }`);
    },
    onSuccess: () => {
      alert("Data deleted successfully");
      router.push("/hsn-code");
    },
  });

  const deleteData = () => {
    confirmed
      ? del.mutate({ code: parseInt(code as string, 10) })
      : alert("Please confirm that you want to delete this hsn code");
  };
  const [confirmed, setConfirmed] = useState(false);

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-4/6 w-1/3 flex-col rounded-xl bg-[#C4B0FF45]">
          <p className="h-1/4 w-full items-center border-b-2 border-[#11009E] pl-4 pt-2 text-lg font-semibold">
            HSN Code Details
          </p>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            HSN Code
            <p className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none">
              {code}
            </p>
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Description
            <p className="w-4/6 resize-none rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none">
              {description}
            </p>
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
              className="h-1/2 w-[25%] self-center rounded-md bg-[#07096E] font-semibold text-white"
              onClick={async () => {
                await router.push("/hsn-code");
              }}
            >
              Cancel
            </button>
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

export default BasicUnitsDelete;
