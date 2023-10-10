import { UserTemplate } from "@/components";
import React from "react";
import { getSession, useSession } from "next-auth/react";

const get = async () => {
  const session = await getSession();
  return session;
};

const ClientPartyListEdit: React.FunctionComponent = () => {
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
          {/* Client Party List Edit */}
          <p className="h-[10%] w-full items-center border-b-2 border-[#11009E] pl-4 text-lg font-semibold">
            Distributor  Details
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
          <div className="h-[10%] flex flex-row px-4 space-x-4 justify-center items-center w-full border-b-2 border-[#11009E] text-lg font-semibold">
            <p className="w-1/4 flex justify-normal">Type</p>
            <div className="w-1/4 flex-1">
              {/* <input
                className="rounded-md border flex-1 border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              /> */}
              <select name="" id="" className="rounded-md border border-[#11009E] bg-[#C4B0FF45] w-full px-4 outline-none ">
                <option value="" className="bg-[#C4B0FF] font-semibold">Kilogram</option>
                <option value="" className="bg-[#C4B0FF] font-semibold">Gram</option>
                <option value="" className="bg-[#C4B0FF] font-semibold">Mililitre</option>
              </select>
            </div>
            <p className="w-1/4 flex justify-normal">Name</p>
            <div className="w-1/4 flex-1">
              <input
                className="rounded-md border w-full border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              />
            </div>
          </div>
          <div className="h-[10%] flex flex-row px-4 space-x-4 justify-center items-center w-full border-b-2 border-[#11009E] text-lg font-semibold">
            <p className="w-1/4 flex justify-normal">Alternate Name</p>
            <div className="w-1/4 flex-1">
              <input
                className="rounded-md border w-full px-4 border-[#11009E] bg-[#C4B0FF45]  outline-none"
                value={editData.Symbol}
              />
            </div>
            <p className="w-1/4 flex justify-normal">Distributor</p>
            <div className="w-1/4 flex-1">
              {/* <input
                className="rounded-md border flex-1 border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              /> */}
              <select name="" id="" className="rounded-md border border-[#11009E] bg-[#C4B0FF45] w-full px-4 outline-none">
                <option value="" className="bg-[#C4B0FF] font-semibold">Kilogram</option>
                <option value="" className="bg-[#C4B0FF] font-semibold">Gram</option>
                <option value="" className="bg-[#C4B0FF] font-semibold">Mililitre</option>
              </select>
            </div>
          </div>
          <div className="h-[10%] flex flex-row px-4 space-x-4 justify-center items-center w-full border-b-2 border-[#11009E] text-lg font-semibold">
            <p className="w-1/4 flex justify-normal">Sales Representative</p>
            <div className="w-1/4 flex-1">
              {/* <input
                className="rounded-md border flex-1 border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              /> */}
              <select name="" id="" className="rounded-md border border-[#11009E] bg-[#C4B0FF45] w-full px-4 outline-none ">
                <option value="" className="bg-[#C4B0FF] font-semibold">Kilogram</option>
                <option value="" className="bg-[#C4B0FF] font-semibold">Gram</option>
                <option value="" className="bg-[#C4B0FF] font-semibold">Mililitre</option>
              </select>
            </div>
            <p className="w-1/4 flex justify-normal">Code</p>
            <div className="w-1/4 flex-1">
              <input
                className="rounded-md border w-full border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              />
            </div>
          </div>
          <div className="h-[10%] flex flex-row px-4 space-x-4 justify-center items-center w-full border-b-2 border-[#11009E] text-lg font-semibold">
            <p className="w-1/4 flex justify-normal">GST #</p>
            <div className="w-1/4 flex-1">
              <input
                className="rounded-md border w-full border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              />
            </div>
            <p className="w-1/4 flex justify-normal">PIN Code</p>
            <div className="w-1/4 flex-1">
              <input
                className="rounded-md border w-full border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              />
            </div>
          </div>
          <div className="h-[10%] flex flex-row px-4  items-center w-full border-b-2 border-[#11009E] text-lg font-semibold">
            <p className="w-1/4 flex justify-normal">Address</p>
            <div className="w-3/4 flex-1 pl-4 ">
              <input
                className="rounded-md border w-full border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              />
            </div>
          </div>
          <div className="h-[10%] flex flex-row px-4  items-center w-full border-b-2 border-[#11009E] text-lg font-semibold">
            <p className="w-1/4 flex justify-normal">Location</p>
            <div className="w-3/4 flex-1 pl-4">
              <input
                className="rounded-md border w-full border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              />
            </div>
          </div>
          <div className="h-[10%] flex flex-row px-4 space-x-4 justify-center items-center w-full border-b-2 border-[#11009E] text-lg font-semibold">
            <p className="w-1/4 flex justify-normal">State</p>
            <div className="w-1/4 flex-1">
              {/* <input
                className="rounded-md border flex-1 border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              /> */}
              <select name="" id="" className="rounded-md border border-[#11009E] bg-[#C4B0FF45] w-full px-4 outline-none">
                <option value="" className="bg-[#C4B0FF] font-semibold">Kilogram</option>
                <option value="" className="bg-[#C4B0FF] font-semibold">Gram</option>
                <option value="" className="bg-[#C4B0FF] font-semibold">Mililitre</option>
              </select>
            </div>
            <p className="w-1/4 flex justify-normal">District</p>
            <div className="w-1/4 flex-1">
              {/* <input
                className="rounded-md border flex-1 border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              /> */}
              <select name="" id="" className="rounded-md border border-[#11009E] bg-[#C4B0FF45] w-full px-4 outline-none ">
                <option value="" className="bg-[#C4B0FF] font-semibold">Kilogram</option>
                <option value="" className="bg-[#C4B0FF] font-semibold">Gram</option>
                <option value="" className="bg-[#C4B0FF] font-semibold">Mililitre</option>
              </select>
            </div>
          </div>
          <div className="h-[10%] flex flex-row px-4 space-x-4 justify-center items-center w-full border-b-2 border-[#11009E] text-lg font-semibold">
            <p className="w-1/4 flex justify-normal">Phone</p>
            <div className="w-1/4 flex-1">
              <input
                className="rounded-md border w-full border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              />
            </div>
            <p className="w-1/4 flex justify-normal">Email</p>
            <div className="w-1/4 flex-1">
              <input
                className="rounded-md border w-full border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              />
            </div>
          </div>
          <div className="flex h-[20%] w-1/2 justify-between self-center px-4">
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

export default ClientPartyListEdit;
