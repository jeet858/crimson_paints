import { UserTemplate } from "@/components";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const HSNCodeAdd: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };
  const router = useRouter();
  const [hsnData, setHsnData] = useState({
    code: 0,
    description: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setHsnData({
      ...hsnData,
      [name]: name === "code" ? parseInt(value, 10) : value,
    });
  };

  const add = api.hsn.create.useMutation({
    onError: (err, hsn, context) => {
      alert(`${err.message}`);
    },
    onSuccess: () => {
      alert("Data added successfully");
      router.push("/hsn-code");
    },
  });

  const create = () => {
    console.log(hsnData);
    if (hsnData.code != 0) {
      add.mutate(hsnData);
    } else {
      alert("Be sure to fill hsn code");
    }
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
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              type="number"
              name="code"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex h-fit items-center justify-between border-b-2 border-[#11009E] px-4 py-8 text-lg font-semibold">
            Description
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              name="description"
              onChange={handleInputChange}
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
              onClick={create}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </UserTemplate>
  );
};

export default HSNCodeAdd;
