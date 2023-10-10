import { UserTemplate } from "@/components";
import React from "react";
import { getSession, useSession } from "next-auth/react";

const get = async () => {
  const session = await getSession();
  return session;
};

const InterCompanyEdit: React.FunctionComponent = () => {
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

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-5/6 w-5/6 flex-col rounded-xl bg-[#C4B0FF45]">
          Inter Company Edit
          <p className="h-1/6 w-full flex items-center border-b-2 border-[#11009E] pl-4 text-lg font-semibold">
            Branch  Details
          </p>
          <div className="h-1/6 flex flex-row px-4 space-x-4 justify-center items-center w-full border-b-2 border-[#11009E] text-lg font-semibold">
            <p className="w-1/6 flex justify-normal">Company Name</p>
            <div className="w-2/6 flex">
              <input
                className="rounded-md border grow border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              />
            </div>
            <p className="w-1/6 flex justify-normal">Type</p>
            <div className="w-2/6 flex">
              {/* <input
                className="rounded-md border grow border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              /> */}
              <select name="" id="" className="rounded-md border border-[#11009E] bg-[#C4B0FF45] grow px-4 outline-none w-4/6">
                <option value="" className="bg-[#C4B0FF] font-semibold">Kilogram</option>
                <option value="" className="bg-[#C4B0FF] font-semibold">Gram</option>
                <option value="" className="bg-[#C4B0FF] font-semibold">Mililitre</option>
              </select>
            </div>
          </div>
          <div className="h-1/6 flex flex-row px-4  items-center w-full border-b-2 border-[#11009E] text-lg font-semibold">
            <p className="w-1/6 flex justify-normal">Address</p>
            <div className="w-5/6 flex pl-2">
              <input
                className="rounded-md border grow border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              />
            </div>
          </div>
          <div className="h-1/6 flex flex-row px-4 space-x-4 justify-center items-center w-full border-b-2 border-[#11009E] text-lg font-semibold">
            <p className="w-1/6 flex justify-normal">PIN Code</p>
            <div className="w-2/6 flex">
              <input
                className="rounded-md border grow border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              />
            </div>
            <p className="w-1/6 flex justify-normal">City</p>
            <div className="w-2/6 flex">
              <input
                className="rounded-md border grow border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              />
            </div>
          </div>
          <div className="h-1/6 flex flex-row px-4 space-x-4 justify-center items-center w-full border-b-2 border-[#11009E] text-lg font-semibold">
            <p className="w-1/6 flex justify-normal">GST #</p>
            <div className="w-2/6 flex">
              <input
                className="rounded-md border grow border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              />
            </div>
            <p className="w-1/6 flex justify-normal">Phone</p>
            <div className="w-2/6 flex">
              <input
                className="rounded-md border grow border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              />
            </div>
          </div>
          <div className="h-1/6 flex px-4 justify-normal items-center w-full border-b-2 border-[#11009E] text-lg font-semibold">
            <div className="w-3/6 flex flex-row">
              <p className="w-1/3 flex justify-normal">Bill</p>
              <div className="w-2/3 flex px-2">
                {/* <input
                  className="rounded-md border w-full border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                  value={editData.Symbol}
                /> */}
                <select name="" id="" className="rounded-md w-full border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none ">
                  <option value="" className="bg-[#C4B0FF] font-semibold">Kilogram</option>
                  <option value="" className="bg-[#C4B0FF] font-semibold">Gram</option>
                  <option value="" className="bg-[#C4B0FF] font-semibold">Mililitre</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex h-1/6 w-1/2 justify-center self-center space-x-4 px-4">
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

export default InterCompanyEdit;
