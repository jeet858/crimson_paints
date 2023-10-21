import { UserTemplate } from "@/components";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Link from "next/link";

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
  const { name, code } = router.query;

  const update = api.categories.edit.useMutation({
    onError: (err, newTodo, context) => {
      alert(`An error occured }`);
    },
    onSuccess: async () => {
      alert("Data updated successfully");
      await router.push("/product-categories");
    },
  });
  const [editData, setEditData] = useState({
    existingName: name as string,
    newName: name as string,
    code: code as string,
  });
  useEffect(() => {
    if (name && code) {
      setEditData({
        existingName: name as string,
        newName: name as string,
        code: code as string,
      });
    }
  }, [name, code]);

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
        <div className="flex h-4/6 w-1/3 flex-col rounded-xl bg-[#C4B0FF45]">
          <p className="h-1/4 w-full items-center border-b-2 border-[#11009E] pl-4 text-lg font-semibold">
            Product Categories Details
          </p>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Name
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              value={editData.newName}
              onChange={handleInputChange}
              name="newName"
            />
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Code
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              value={editData.code}
              onChange={handleInputChange}
              name="code"
            />
          </div>
          <div className="flex h-1/4 w-1/2 justify-between self-end px-4">
            <Link
              className="flex h-1/2 w-[40%] items-center justify-center self-center rounded-md bg-[#07096E] font-semibold text-white"
              href="/product-categories"
            >
              Cancel
            </Link>
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
