import React from "react";
import { useRouter } from "next/router";
import { InsideNav, TableComponent, UserTemplate } from "@/components";
import { api } from "~/utils/api";

const PackagingUnit: React.FunctionComponent = () => {
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };

  const columns = [
    { header: "Qty / Unit", field: "name" },
    { header: "Packaging", field: "packaging" },
    { header: "Unit", field: "unit" },
  ];
  const columns2 = [
    { header: "Qty / Unit", field: "name" },
    { header: "Packaging", field: "packaging" },
    { header: "Unit", field: "unit" },
    { header: "Unit Packaging", field: "unit_packaging" },
  ];

  const {
    data: packagingUnit,
    isLoading,
    isError,
  } = api.packagingUnit.all.useQuery();
  const {
    data: complexUnits,
    isLoading: complexUnitLoading,
    isError: complexUnitError,
  } = api.complex.all.useQuery();
  if (isLoading || complexUnitLoading) {
    return (
      <UserTemplate templateParams={templateParams}>
        <InsideNav />
        <div className="h-fit w-full p-4">
          <div className="flex items-center justify-center">
            <div className="flex w-full items-end justify-center ">
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
              <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
                Packaging Units
              </div>
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            </div>
            <div className="flex items-end justify-end">
              <button className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]">
                Add
              </button>
            </div>
          </div>
        </div>
        <div>Still Loading</div>
      </UserTemplate>
    );
  }
  if (isError || complexUnitError) {
    return (
      <UserTemplate templateParams={templateParams}>
        <InsideNav />
        <div className="h-fit w-full p-4">
          <div className="flex items-center justify-center">
            <div className="flex w-full items-end justify-center ">
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
              <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
                Packaging Units
              </div>
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            </div>
            <div className="flex items-end justify-end">
              <button className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]">
                Add
              </button>
            </div>
          </div>
        </div>
        <div>Error</div>
      </UserTemplate>
    );
  }
  return (
    <UserTemplate templateParams={templateParams}>
      <InsideNav />
      <div className="h-fit w-full p-4">
        <div className="flex items-center justify-center">
          <div className="flex w-full items-end justify-center ">
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
              Packaging Units
            </div>
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-between p-4">
        <div className="text-xl font-bold">Unit Master</div>
        <button
          className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]"
          onClick={async () => {
            await router.push("/add/packaging-unit-add");
          }}
        >
          Add
        </button>
      </div>
      <TableComponent
        columns={columns}
        data={packagingUnit}
        idField={["name", "packaging", "unit", "unit_value"]}
        editUrl="edit/packaging-unit-edit"
        deleteUrl="delete/packaging-unit-delete"
      />
      <div className="flex items-end justify-between p-4">
        <div className="text-xl font-bold">Complex Units</div>
        <button
          className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]"
          onClick={async () => {
            await router.push("/add/complex-unit-add");
          }}
        >
          Add
        </button>
      </div>
      <TableComponent
        columns={columns2}
        data={complexUnits}
        idField={["name", "packaging", "unit", "unit_packaging"]}
        editUrl="edit/complex-unit-edit"
        deleteUrl="delete/complex-unit-delete"
      />
    </UserTemplate>
  );
};

export default PackagingUnit;
