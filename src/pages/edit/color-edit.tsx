import { UserTemplate } from "@/components";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

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
  const { color_name, rgb_code } = router.query;

  const update = api.colors.edit.useMutation({
    onError: (err, newColor, context) => {
      alert(`An error occured }`);
    },
    onSuccess: () => {
      router.push("/colors");
    },
  });

  useEffect(() => {
    if (color_name && rgb_code) {
      setEditData({
        existingName: color_name as string,
        newName: color_name as string,
        rgb_code: rgb_code as string,
      });
    }
  }, [color_name, rgb_code]);

  const [editData, setEditData] = useState({
    existingName: color_name as string,
    newName: color_name as string,
    rgb_code: rgb_code as string,
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
        <div className="flex h-1/2 w-1/3 flex-col rounded-xl bg-[#C4B0FF45]">
          <p className="h-fit w-full items-center border-b-2 border-[#11009E] py-8 pl-4 text-lg font-semibold">
            Color Details
          </p>
          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] px-4 py-8 text-lg font-semibold">
            Color Name
            <input
              className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              value={editData.newName}
              name="newName"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] px-4 py-8 text-lg font-semibold">
            HTML Code
            <input
              className="h-10  w-24  resize-none rounded-md border border-[#11009E] bg-[#C4B0FF45] outline-none"
              type="color"
              name="rgb_code"
              value={editData.rgb_code}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex h-1/4 w-1/2 justify-between self-end px-4">
            <button
              className="h-1/2 w-[40%] self-center rounded-md bg-[#07096E] font-semibold text-white"
              onClick={async () => {
                await router.push("/colors");
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
