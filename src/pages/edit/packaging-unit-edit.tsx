import { UserTemplate } from "@/components";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { basicUnit } from "~/types";

const get = async () => {
  const session = await getSession();
  return session;
};

const PackagingUnitEdit: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };
  const router = useRouter();
  const { packaging, unit, unit_value, name } = router.query;

  const update = api.packagingUnit.edit.useMutation({
    onError: (err, packagingUnit, context) => {
      alert(`An error occured }`);
    },
    onSuccess: () => {
      alert("Data edited sucessfully");
      router.push("/packaging-unit");
    },
  });

  useEffect(() => {
    if (packaging && unit && unit_value && name) {
      setEditData({
        existingName: name as string,
        packaging: packaging as string,
        unit: unit as string,
        unit_value: parseFloat(unit_value as string),
      });
    }
  }, [name, packaging, unit, unit_value]);

  const [editData, setEditData] = useState({
    existingName: name as string,
    packaging: packaging as string,
    unit: unit as string,
    unit_value: parseFloat(unit_value as string),
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setEditData({
      ...editData,
      [name]: name === "unit_value" ? parseFloat(value) : value,
    });
    console.log(editData);
  };

  const updateData = () => {
    update.mutate(editData);
  };
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
        <div className="flex h-4/6 w-1/3 flex-col rounded-xl bg-[#C4B0FF45]">
          <p className="h-1/4 w-full flex items-center border-b-2 border-[#11009E] pl-4 text-lg font-semibold">
            Package Details
          </p>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Qty
            <input
              className="w-4/6 appearance-none rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              value={editData.unit_value}
              onChange={handleInputChange}
              name="unit_value"
              type="number"
            />
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Unit
            <select
              name="unit"
              id=""
              className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              onChange={handleInputChange}
              value={editData.unit}
            >
              {basicUnit?.map((unit: basicUnit, index) => {
                return (
                  <option value={unit.symbol} key={index}>
                    {unit.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Packaging
            <select
              name="packaging"
              id=""
              className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              onChange={handleInputChange}
              value={editData.packaging}
            >
              {packagingType?.map((packaging, index) => {
                return (
                  <option value={packaging.name} key={index}>
                    {packaging.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex h-1/4 w-1/2 justify-between self-end px-4">
            <button
              className="h-1/2 w-[40%] self-center rounded-md bg-[#07096E] font-semibold text-white"
              onClick={async () => {
                await router.push("/packaging-unit");
              }}
            >
              Cancel
            </button>
            <button
              className="h-1/2 w-[40%] self-center rounded-md borders bg-[#C4B0FF] font-semibold "
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

export default PackagingUnitEdit;
