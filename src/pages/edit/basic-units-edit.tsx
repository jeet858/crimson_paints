import { UserTemplate } from "@/components";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const BasicUnitsEdit: React.FunctionComponent = () => {
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
      if (
        err.message.split("\n")[4] ===
        "Unique constraint failed on the constraint: `BasicUnits_symbol_key`"
      ) {
        alert("This data already exist");
      } else {
        alert(`${err.message}`);
      }
    },
    onSuccess: () => {
      alert("Data added successfully");
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const updateData = () => {
    if (editData.newName != "" || editData.symbol != "") {
      update.mutate(editData);
    } else {
      alert("Be sure to fill all fields");
    }
  };

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-4/6 w-1/3 flex-col rounded-xl bg-[#C4B0FF45]">
          <p className="h-1/4 w-full flex items-center border-b-2 border-[#11009E] pl-4 text-lg font-semibold">
            Basic Unit Details
          </p>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Symbol
            <input
              name="symbol"
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              value={editData.symbol}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Name
            <input
              name="newName"
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              value={editData.newName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex h-1/4 w-1/2 justify-between self-end px-4">
            <button
              className="h-1/2 w-[40%] self-center rounded-md bg-[#07096E] font-semibold text-white"
              onClick={async () => {
                await router.push("/basic-unit");
              }}
            >
              Cancel
            </button>
            <button
              className="h-1/2 w-[40%] self-center rounded-md bg-[#C4B0FF] font-semibold"
              onClick={updateData}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </UserTemplate>
  );
};

export default BasicUnitsEdit;
