import { UserTemplate } from "@/components";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const get = async () => {
  const session = await getSession();
  return session;
};

const InterCompanyDelete: React.FunctionComponent = () => {
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
  const { name, address, bill, city, gst, phone, pin, type } = router.query;

  useEffect(() => {}, [name, address, bill, city, gst, phone, pin, type]);

  const del = api.interComapny.delete.useMutation({
    onError: (err, newTodo, context) => {
      alert(`An error occured }`);
    },
    onSuccess: async () => {
      await router.push("/inter-company");
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
        <div className="flex h-4/6 w-2/4 flex-col rounded-xl bg-[#C4B0FF45]">
          <p className="flex h-1/4 w-full items-center border-b-2 border-[#11009E] pl-4 pt-2 text-lg font-semibold">
            Branch Details
          </p>
          <div className="flex h-1/6 flex-row border-y-2 border-[#11009E]">
            <div className="flex w-2/6 items-center justify-start border-r-2 border-[#11009E] px-4 font-[Inter] font-semibold">
              Branch Name
            </div>
            <div className="flex w-4/6 items-center justify-start border-l-2 border-[#11009E] font-[Inter] font-semibold">
              {name}
            </div>
          </div>
          <div className="flex h-1/6 flex-row border-y-2 border-[#11009E]">
            <div className="flex w-2/6 items-center justify-start border-r-2 border-[#11009E] px-4 font-[Inter] font-semibold">
              Address
            </div>
            <div className="flex w-4/6 items-center justify-start border-l-2 border-[#11009E] px-4 font-[Inter] font-semibold">
              {address},{city},{pin}
            </div>
          </div>
          <div className="flex h-1/6 flex-row border-y-2 border-[#11009E]">
            <div className="flex w-2/6 items-center justify-start border-r-2 border-[#11009E] px-4 font-[Inter] font-semibold">
              Phone / GST{" "}
            </div>
            <div className="flex w-4/6 items-center justify-start border-l-2 border-[#11009E] px-4 font-[Inter] font-semibold">
              Phone :{phone} , GST :{gst}
            </div>
          </div>
          <div className="flex h-1/6 w-full justify-between self-end border-t-2 border-[#11009E] px-4">
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
            <button className="h-1/2 w-[25%] self-center rounded-md bg-[#07096E] font-semibold text-white">
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

export default InterCompanyDelete;
