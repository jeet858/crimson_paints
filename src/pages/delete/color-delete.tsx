import { UserTemplate } from "@/components";
import React, { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { FaCheck } from "react-icons/fa";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const get = async () => {
  const session = await getSession();
  return session;
};

const BasicUnitsDelete: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };

  const [confirmed, setConfirmed] = useState(false);
  const router = useRouter();
  const { color_name, rgb_code } = router.query;

  const del = api.colors.delete.useMutation({
    onError: (err, color, context) => {
      alert(`An error occured }`);
    },
    onSuccess: () => {
      alert("Data deleted successfully")
      router.push("/colors");
    },
  });

  const deleteData = () => {
    confirmed
      ? del.mutate({ color_name: color_name as string })
      : alert("Please confirm that you want to delete this color");
  };

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-fit w-1/3 flex-col rounded-xl bg-[#C4B0FF45]">
          <p className="h-fit w-full items-center border-b-2 border-[#11009E] py-8 pl-4 text-lg font-semibold">
            Color Details
          </p>
          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] px-4 py-8 text-lg font-semibold">
            Color Name
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              value={color_name}
            />
          </div>
          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] px-4 py-8 text-lg font-semibold">
            HTML Code
            <input
              className="resize-none  rounded-md  border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              value={rgb_code}
            />
          </div>
          <div className="flex h-fit w-full justify-between self-end px-4 py-8">
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
                await router.push("/colors");
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

export default BasicUnitsDelete;
