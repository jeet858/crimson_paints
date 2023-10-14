import { InsideNav, UserTemplate } from "@/components";
import { useRouter } from "next/router";
import React from "react";
import OrderableUnitTable from "~/components/tables/OrderableUnitTable";
import { api } from "~/utils/api";

const orderableunit = () => {
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };
  const {
    data: orderableUnits,
    isError,
    isLoading,
  } = api.orderableUnit.all.useQuery();
  if (isLoading) {
    return (
      <UserTemplate templateParams={templateParams}>
        <InsideNav />
        <div className="h-fit w-full p-4">
          <div className="flex items-center justify-center">
            <div className="flex w-full items-end justify-center ">
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
              <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
                Orderable Unit
              </div>
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            </div>
            <div className="flex items-end justify-end">
              <button
                className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]"
                onClick={async () => {
                  await router.push("add/orderable-units-add");
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="h-fit">Loading</div>
      </UserTemplate>
    );
  }
  if (isError) {
    return (
      <UserTemplate templateParams={templateParams}>
        <InsideNav />
        <div className="h-fit w-full p-4">
          <div className="flex items-center justify-center">
            <div className="flex w-full items-end justify-center ">
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
              <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
                Orderable Unit
              </div>
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            </div>
            <div className="flex items-end justify-end">
              <button
                className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]"
                onClick={async () => {
                  await router.push("add/orderable-units-add");
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="h-fit">Error</div>
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
              Orderable Unit
            </div>
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
          </div>
          <div className="flex items-end justify-end">
            <button
              className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]"
              onClick={async () => {
                await router.push("add/orderable-units-add");
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <div className="h-fit">
        {orderableUnits.map((orderableunit, index) => {
          return (
            <OrderableUnitTable
              key={index}
              listName={orderableunit.list_name}
              editUrl="edit/orderable-unit-edit"
              deleteUrl="delete/orderable-unit-delete"
            />
          );
        })}
      </div>
    </UserTemplate>
  );
};

export default orderableunit;
