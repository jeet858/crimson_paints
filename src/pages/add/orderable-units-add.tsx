import { UserTemplate } from "@/components";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const BasicUnitsAdd: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };

  const [addData, setAddData] = useState({
    list_name: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddData({
      ...addData,
      [name]: value,
    });
  };

  const add = api.orderableUnit.create.useMutation({
    onError: (err, newOrderableUnit, context) => {
      alert(`An error occured }`);
    },
    onSuccess: () => {
      alert("Data inserted succesfully");
      router.push("/orderable-unit");
    },
  });

  const create = () => {
    console.log(addData);
    if (addData.list_name != "") {
      add.mutate(addData);
    } else {
      alert("Be sure to fill all fields");
    }
  };

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-1/3 w-1/3 flex-col rounded-xl bg-[#C4B0FF45]">
          <p className="h-1/4 w-full items-center border-b-2 border-[#11009E] pl-4 text-lg font-semibold">
            Oderable Units Add
          </p>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Name
            <input
              name="list_name"
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex h-1/4 w-1/2 justify-between self-end px-4">
            <button className="h-1/2 w-[40%] self-center rounded-md bg-[#07096E] font-semibold text-white">
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

export default BasicUnitsAdd;
