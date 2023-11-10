import { UserTemplate } from "@/components";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const get = async () => {
  const session = await getSession();
  return session;
};

const ProductPackagingListEdit: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };

  const router = useRouter();
  const { name } = router.query;

  const update = api.packagingType.edit.useMutation({
    onError: (err, newColor, context) => {
      alert(`An error occured }`);
    },
    onSuccess: () => {
      router.push("/product-packaging-list");
    },
  });
  const [editData, setEditData] = useState({
    existingName: name as string,
    newName: name as string,
  });
  useEffect(() => {
    if (name) {
      setEditData({
        existingName: name as string,
        newName: name as string,
      });
    }
  }, [name]);

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
        <div className="flex h-fit w-1/3 flex-col rounded-xl bg-[#C4B0FF45] py-8">
          <p className="h-fit w-full items-center border-b-2 border-[#11009E] pb-8 pl-4 text-lg font-semibold">
            Package Details
          </p>
          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] px-4 py-8 text-lg font-semibold">
            Name
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              name="newName"
              value={editData.newName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex h-fit w-1/2 justify-between self-end px-4 pt-8">
            <button 
              className="h-8 w-[40%] self-center rounded-md bg-[#07096E] font-semibold text-white"
              onClick={async ()=>{
                await router.push("/product-packaging-list")
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

export default ProductPackagingListEdit;
