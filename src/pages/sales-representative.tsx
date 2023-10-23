import { InsideNav, UserTemplate } from "@/components";
import { useRouter } from "next/router";
import React from "react";
import SalesRepresentativeTable from "~/components/tables/SalesRepresentativeTable";
import { api } from "~/utils/api";
const columns = [
  { header: "Name", field: "name" },
  { header: "Phone", field: "phone" },
  { header: "Location", field: "location" },
];
const tableData = [{ name: "Ajit", phone: "123456789", location: "Kolkata" }];
const SalesRepresentative = () => {
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };
  const {
    data: salesRepresentative,
    isLoading,
    isError,
  } = api.salesRepresentative.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  if (isLoading)
    return (
      <UserTemplate templateParams={templateParams}>
        <div className="w-full">
          <InsideNav />
          <div className="h-fit w-full p-4">
            <div className="flex items-center justify-center">
              <div className="flex w-full items-end justify-center ">
                <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
                <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
                  Sales Representatives
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
          <p>Loading Basic Units</p>
        </div>
      </UserTemplate>
    );
  if (isError)
    return (
      <UserTemplate templateParams={templateParams}>
        <div className="w-full">
          <InsideNav />
          <div className="h-fit w-full p-4">
            <div className="flex items-center justify-center">
              <div className="flex w-full items-end justify-center ">
                <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
                <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
                  Sales Representatives
                </div>
                <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
              </div>
              <div className="flex items-end justify-end">
                <button
                  className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]"
                  onClick={async () => {
                    await router.push("/add/basic-units-add");
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <p>Error fetching Basic Units ❌</p>
        </div>
      </UserTemplate>
    );
  return (
    <UserTemplate templateParams={templateParams}>
      <InsideNav />
      <div className="h-fit w-full p-4">
        <div className="flex items-center justify-center">
          <div className="flex w-full items-end justify-center ">
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
              Sales Representatives
            </div>
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
          </div>
          <div className="flex items-end justify-end">
            <button
              className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]"
              onClick={async () => {
                await router.push("add/sales-representative-add");
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <SalesRepresentativeTable
        columns={columns}
        data={salesRepresentative}
        idField={["name", "phone", "location"]}
        editUrl="/edit/sales-representative-edit"
        deleteUrl="/delete/sales-representative-delete"
      />
    </UserTemplate>
  );
};

export default SalesRepresentative;
