import { UserTemplate } from "@/components";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import router from "next/router";

const ComplexUnitAdd: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };
  const [addData, setAddData] = useState({
    packaging: "",
    unit: 0,
    unit_packaging: "",
  });
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
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setAddData({
      ...addData,
      [name]: name === "unit" ? parseInt(value, 10) : value,
    });
  };
  const add = api.complex.create.useMutation({
    onError: (err, complexUnit, context) => {
      alert(`${err.message}`);
    },
    onSuccess: () => {
      router.push("/packaging-unit");
    },
  });

  const create = () => {
    console.log(addData);
    if (
      addData.packaging != "" ||
      addData.unit_packaging != "" ||
      addData.unit != 0
    ) {
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
            Complex Unit Add
          </p>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Name
            <div className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none">
              {addData.packaging} of ({addData.unit_packaging} X {addData.unit})
            </div>
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Unit
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              name="unit"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Unit Packaging
            <select
              name="unit_packaging"
              id=""
              className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              onChange={handleInputChange}
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

export default ComplexUnitAdd;
