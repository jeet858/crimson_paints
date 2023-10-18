import { InsideNav, UserTemplate } from "@/components";
import { useRouter } from "next/router";
import React from "react";
import SalesRepresentativeTable from "~/components/tables/SalesRepresentativeTable";
const columns = [
  { header: "Representative Name", field: "representativename" },
  { header: "Phone", field: "phone" },
];
const tableData = [{ representativename: "Ajit", phone: "123456789" }];
const SalesRepresentative = () => {
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };
  return (
    <UserTemplate templateParams={templateParams}>
      <InsideNav />
      <div className="h-fit w-full p-4">
        <div className="flex items-center justify-center">
          <div className="flex w-full items-end justify-center ">
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
              Branch List
            </div>
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
          </div>
          <div className="flex items-end justify-end">
            <button
              className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]"
              onClick={async () => {
                await router.push("add/product-categories-add");
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <SalesRepresentativeTable
        columns={columns}
        data={tableData}
        idField={["id"]}
        editUrl=""
        deleteUrl=""
      />
    </UserTemplate>
  );
};

export default SalesRepresentative;
