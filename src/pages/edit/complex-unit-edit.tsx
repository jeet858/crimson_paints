import { UserTemplate } from "@/components";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const get = async () => {
  const session = await getSession();
  return session;
};

const ComplexUnitEdit: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };
  const router = useRouter();
  const { name, packaging, unit, unit_packaging } = router.query;

  const update = api.complex.edit.useMutation({
    onError: (err, complexUnit, context) => {
      alert(`${err.message}`);
    },
    onSuccess: () => {
      alert("Data updated successfully");

      router.push("/packaging-unit");
    },
  });

  const [editData, setEditData] = useState({
    existingName: name as string,
    packaging: packaging as string,
    unit: parseInt(unit as string),
    unit_packaging: unit_packaging as string,
  });

  useEffect(() => {
    if (name && packaging && unit && unit_packaging) {
      setEditData({
        existingName: name as string,
        packaging: packaging as string,
        unit: parseInt(unit as string),
        unit_packaging: unit_packaging as string,
      });
    }
  }, [name, packaging, unit, unit_packaging]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setEditData({
      ...editData,
      [name]: name === "unit" ? parseInt(value, 10) : value,
    });
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
    data: packagingUnit,
    isLoading: isPackagingUnitLoading,
    isError: isPackagingUnitError,
  } = api.packagingUnit.all.useQuery();
  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-1/3 w-1/3 flex-col rounded-xl bg-[#C4B0FF45]">
          <p className="h-1/4 w-full items-center border-b-2 border-[#11009E] pl-4 text-lg font-semibold">
            Complex Unit Add
          </p>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Name
            <div className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none">
              {editData.packaging} of ({editData.unit_packaging} X{" "}
              {editData.unit})
            </div>
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Unit
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              name="unit"
              onChange={handleInputChange}
              value={editData.unit}
            />
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Unit Packaging
            <select
              name="unit_packaging"
              id=""
              className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              onChange={handleInputChange}
              value={editData.unit_packaging}
            >
              <option value="">--Select Packaging--</option>
              {packagingUnit?.map((packaging, index) => {
                return (
                  <option
                    value={packaging.name}
                    key={index}
                    onClick={() => {
                      console.log(packaging.name);
                    }}
                  >
                    {packaging.name}
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
              <option value="">--Select Packaging--</option>
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

export default ComplexUnitEdit;
