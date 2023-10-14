import { UserTemplate } from "@/components";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

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
  const router = useRouter();
  const { name, symbol } = router.query;

  const update = api.basicUnit.edit.useMutation({
    onError: (err, newTodo, context) => {
      alert(`An error occured }`);
    },
    onSuccess: () => {
      router.push("/basic-unit");
    },
  });

  useEffect(() => {
    if (name && symbol) {
      setEditData({
        existingName: name as string,
        newName: name as string,
        symbol: symbol as string,
      });
    }
  }, [name, symbol]);

  const [editData, setEditData] = useState({
    existingName: name as string,
    newName: name as string,
    symbol: symbol as string,
  });

  const trpc = api.useContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const updateData = () => {
    update.mutate(editData);
  };

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-5/6 w-5/6 flex-col rounded-xl bg-[#C4B0FF45]">
          {/* Client Party List Edit */}
          <p className="h-[10%] w-full items-center border-b-2 border-[#11009E] pl-4 text-lg font-semibold">
            Distributor Details
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
          <div className="flex h-[10%] w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/4 justify-normal">Type</p>
            <div className="w-1/4 flex-1">
              {/* <input
                className="rounded-md border flex-1 border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              /> */}
              <select
                name=""
                id=""
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none "
              >
                <option value="" className="bg-[#C4B0FF] font-semibold">
                  Kilogram
                </option>
                <option value="" className="bg-[#C4B0FF] font-semibold">
                  Gram
                </option>
                <option value="" className="bg-[#C4B0FF] font-semibold">
                  Mililitre
                </option>
              </select>
            </div>
            <p className="flex w-1/4 justify-normal">Name</p>
            <div className="w-1/4 flex-1">
              <input className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none" />
            </div>
          </div>
          <div className="flex h-[10%] w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/4 justify-normal">Alternate Name</p>
            <div className="w-1/4 flex-1">
              <input className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4  outline-none" />
            </div>
            <p className="flex w-1/4 justify-normal">Distributor</p>
            <div className="w-1/4 flex-1">
              {/* <input
                className="rounded-md border flex-1 border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              /> */}
              <select
                name=""
                id=""
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              >
                <option value="" className="bg-[#C4B0FF] font-semibold">
                  Kilogram
                </option>
                <option value="" className="bg-[#C4B0FF] font-semibold">
                  Gram
                </option>
                <option value="" className="bg-[#C4B0FF] font-semibold">
                  Mililitre
                </option>
              </select>
            </div>
          </div>
          <div className="flex h-[10%] w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/4 justify-normal">Sales Representative</p>
            <div className="w-1/4 flex-1">
              {/* <input
                className="rounded-md border flex-1 border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              /> */}
              <select
                name=""
                id=""
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none "
              >
                <option value="" className="bg-[#C4B0FF] font-semibold">
                  Kilogram
                </option>
                <option value="" className="bg-[#C4B0FF] font-semibold">
                  Gram
                </option>
                <option value="" className="bg-[#C4B0FF] font-semibold">
                  Mililitre
                </option>
              </select>
            </div>
            <p className="flex w-1/4 justify-normal">Code</p>
            <div className="w-1/4 flex-1">
              <input className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none" />
            </div>
          </div>
          <div className="flex h-[10%] w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/4 justify-normal">GST #</p>
            <div className="w-1/4 flex-1">
              <input className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none" />
            </div>
            <p className="flex w-1/4 justify-normal">PIN Code</p>
            <div className="w-1/4 flex-1">
              <input className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none" />
            </div>
          </div>
          <div className="flex h-[10%] w-full flex-row  items-center border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/4 justify-normal">Address</p>
            <div className="w-3/4 flex-1 pl-4 ">
              <input className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none" />
            </div>
          </div>
          <div className="flex h-[10%] w-full flex-row  items-center border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/4 justify-normal">Location</p>
            <div className="w-3/4 flex-1 pl-4">
              <input className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none" />
            </div>
          </div>
          <div className="flex h-[10%] w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/4 justify-normal">State</p>
            <div className="w-1/4 flex-1">
              {/* <input
                className="rounded-md border flex-1 border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              /> */}
              <select
                name=""
                id=""
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              >
                <option value="" className="bg-[#C4B0FF] font-semibold">
                  Kilogram
                </option>
                <option value="" className="bg-[#C4B0FF] font-semibold">
                  Gram
                </option>
                <option value="" className="bg-[#C4B0FF] font-semibold">
                  Mililitre
                </option>
              </select>
            </div>
            <p className="flex w-1/4 justify-normal">District</p>
            <div className="w-1/4 flex-1">
              {/* <input
                className="rounded-md border flex-1 border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              /> */}
              <select
                name=""
                id=""
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none "
              >
                <option value="" className="bg-[#C4B0FF] font-semibold">
                  Kilogram
                </option>
                <option value="" className="bg-[#C4B0FF] font-semibold">
                  Gram
                </option>
                <option value="" className="bg-[#C4B0FF] font-semibold">
                  Mililitre
                </option>
              </select>
            </div>
          </div>
          <div className="flex h-[10%] w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/4 justify-normal">Phone</p>
            <div className="w-1/4 flex-1">
              <input className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none" />
            </div>
            <p className="flex w-1/4 justify-normal">Email</p>
            <div className="w-1/4 flex-1">
              <input className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none" />
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
