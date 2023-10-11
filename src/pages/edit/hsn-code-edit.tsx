import { UserTemplate } from "@/components";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const get = async () => {
  const session = await getSession();
  return session;
};

const HSNCodeEdit: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };

  const router = useRouter();
  const { code, description } = router.query;

  const update = api.hsn.edit.useMutation({
    onError: (err, hsn, context) => {
      alert(`An error occured }`);
    },
    onSuccess: () => {
      alert("Data updated successfully");
      router.push("/hsn-code");
    },
  });
  const [editData, setEditData] = useState({
    existingCode: parseInt(code as string, 10),
    newCode: parseInt(code as string, 10),
    description: "",
  });
  useEffect(() => {
    if (code) {
      setEditData({
        existingCode: parseInt(code as string, 10),
        newCode: parseInt(code as string, 10),
        description: description as string,
      });
    }
  }, [code]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditData({
      ...editData,
      [name]: name === "newCode" ? parseInt(value, 10) : value,
    });
  };

  const updateData = () => {
    update.mutate(editData);
  };

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-fit w-1/3 flex-col rounded-xl bg-[#C4B0FF45] py-8">
          <p className="h-fit w-full items-center border-b-2 border-[#11009E] pb-8 pl-4 text-lg font-semibold">
            HSN Code Details
          </p>
          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] px-4 py-8 text-lg font-semibold">
            HSN Code
            <input
              className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              value={editData.newCode}
              onChange={handleInputChange}
              name="newCode"
            />
          </div>
          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] px-4 py-8 text-lg font-semibold">
            Description
            <input
              className="w-4/6 resize-none rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              value={editData.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <div className="flex h-fit w-1/2 justify-between self-end px-4 pt-8">
            <button
              className="h-8 w-[40%] self-center rounded-md bg-[#07096E] font-semibold text-white"
              onClick={async () => {
                await router.push("/hsn-code");
              }}
            >
              Cancel
            </button>
            <button
              className="h-8 w-[40%] self-center rounded-md bg-[#C4B0FF] font-semibold"
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

export default HSNCodeEdit;
