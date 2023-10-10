import { UserTemplate } from "@/components";
import React, { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { FaCheck } from "react-icons/fa";

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
  const [confirmed, setConfirmed] = useState(false);

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-4/6 w-2/4 flex-col rounded-xl bg-[#C4B0FF45]">
            Inter Company Delete
          <p className="h-1/4 w-full flex items-center border-b-2 border-[#11009E] pl-4 pt-2 text-lg font-semibold">
            Branch Details
          </p>
          {/* <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Symbol
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              value={editData.Symbol}
            />
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Name
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              value={editData.Name}
            />
          </div> */}
          <div className="h-1/6 flex flex-row border-y-2 border-[#11009E]">
            <div className="w-2/6 flex items-center justify-start font-[Inter] font-semibold px-4 border-r-2 border-[#11009E]" >Branch Name</div>
            <div className="w-4/6 border-l-2 flex items-center justify-start font-[Inter] font-semibold border-[#11009E]">Colour Coat Industries</div>
          </div>
          <div className="h-1/6 flex flex-row border-y-2 border-[#11009E]">
            <div className="w-2/6 flex items-center justify-start px-4 border-r-2 font-[Inter] font-semibold border-[#11009E]">Address</div>
            <div className="w-4/6 flex items-center justify-start font-[Inter] font-semibold px-4 border-l-2 border-[#11009E]"></div>
          </div>
          <div className="h-1/6 flex flex-row border-y-2 border-[#11009E]">
            <div className="w-2/6 flex items-center justify-start font-[Inter] font-semibold px-4 border-r-2 border-[#11009E]" >Phone / GST </div>
            <div className="w-4/6 flex items-center justify-start font-[Inter] font-semibold px-4 border-l-2 border-[#11009E]">Phone : , GST :</div>
          </div>
          <div className="flex h-1/6 w-full border-t-2 border-[#11009E] justify-between self-end px-4">
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
            <button className="h-1/2 w-[25%] self-center rounded-md bg-[#FF6E65] font-semibold text-white">
              Delete
            </button>
          </div>
        </div>
      </div>
    </UserTemplate>
  );
};

export default InterCompanyDelete;
