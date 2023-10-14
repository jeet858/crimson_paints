import { UserTemplate } from "@/components";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const PackagingUnitAdd: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };
  const [addData, setAddData] = useState({
    name: "",
    unit: "",
    packaging: "",
    unit_value: 0,
  });
  const router = useRouter();
  const {
    data: packagingType,
    isLoading,
    isError,
  } = api.packagingType.all.useQuery();
  const {
    data: basicUnit,
    isLoading: isBasicUnitLoading,
    isError: isBasicUnitError,
  } = api.basicUnit.all.useQuery();
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setAddData({
      ...addData,
      [name]: name === "unit_value" ? parseInt(value, 10) : value,
      name: `${addData.unit_value} ${addData.unit} ${addData.packaging}`,
    });
  };

  const add = api.packagingUnit.create.useMutation({
    onError: (err, packagingUnit, context) => {
      alert(`An error occured }`);
    },
    onSuccess: () => {
      alert("Data added sucessfully");
      router.push("/packaging-unit");
    },
  });

  const create = () => {
    if (
      addData.packaging != "" ||
      addData.unit != "" ||
      addData.unit_value != 0
    ) {
      add.mutate(addData);
    } else {
      alert("Be sure to fill all fields");
    }
  };
  if (isLoading || isBasicUnitLoading) {
    return (
      <UserTemplate templateParams={templateParams}>
        <div>Loading</div>
      </UserTemplate>
    );
  }
  if (isError || isBasicUnitError) {
    return (
      <UserTemplate templateParams={templateParams}>
        <div>Error</div>
      </UserTemplate>
    );
  }

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-1/3 w-1/3 flex-col rounded-xl bg-[#C4B0FF45]">
          <p className="h-1/4 w-full items-center border-b-2 border-[#11009E] pl-4 text-lg font-semibold">
            Package Details
          </p>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Unit
            <select
              name="unit"
              id=""
              className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              onChange={handleInputChange}
            >
              <option value="">--Select unit--</option>
              {basicUnit?.map((unit, index) => {
                return <option value={unit.symbol}>{unit.name}</option>;
              })}
            </select>
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Qty
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              onChange={handleInputChange}
              name="unit_value"
            />
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Packaging
            <select
              name="packaging"
              id=""
              className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              onChange={handleInputChange}
            >
              <option value="">--Select unit--</option>
              {packagingType?.map((packaging, index) => {
                return <option value={packaging.name}>{packaging.name}</option>;
              })}
            </select>
          </div>
          <div className="flex h-1/4 w-1/2 justify-between self-end px-4">
            <button
              className="h-1/2 w-[40%] self-center rounded-md bg-[#07096E] font-semibold text-white"
              onClick={async () => {
                router.push("/packaging-unit");
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

export default PackagingUnitAdd;
