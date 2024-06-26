import { UserTemplate } from "@/components";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const PackagingTypeAdd: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };

  const [addData, setAddData] = useState("");

  const router = useRouter();

  const add = api.packagingType.create.useMutation({
    onError: (err, newTodo, context) => {
      alert(`An error occured }`);
    },
    onSuccess: () => {
      alert("Data added successfully");
      router.push("/product-packaging-list");
    },
  });

  const create = () => {
    console.log(addData);
    if (addData != "") {
      add.mutate({ name: addData });
    } else {
      alert("Be sure to fill all fields");
    }
  };
  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-1/3 w-1/3 flex-col rounded-xl bg-[#C4B0FF45]">
          <p className="h-1/3 w-full flex items-center border-b-2 border-[#11009E] pl-4 text-lg font-semibold">
            Packaging Details
          </p>
          <div className="flex h-1/3 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Name
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] outline-none"
              value={addData}
              onChange={(event) => {
                setAddData(event.target.value);
              }}
            />
          </div>
          <div className="flex h-1/3 w-1/2 justify-between self-end px-4">
            <button
              className="h-1/2 w-[40%] self-center rounded-md bg-[#07096E] font-semibold text-white"
              onClick={() => {
                router.push("/product-packaging-list");
              }}
            >
              Cancel
            </button>
            <button
              className="h-1/2 w-[40%] self-center rounded-md bg-[#C4B0FF] font-semibold"
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

export default PackagingTypeAdd;
