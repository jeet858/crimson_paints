import { InsideNav, UserTemplate } from "@/components";
import { useRouter } from "next/router";
import React from "react";
import InterCompanyTable from "~/components/tables/InterCompanyTable";
const columns = [
  { header: "Branch Name", field: "branchname" },
  { header: "Details", field: "details" },
];
const tableData = [
  {
    id: 1,
    branchname: "Colour Coat Industries",
    gst: "12345",
    phone: "1234567890",
  },
];
const subTableData = [
  {
    id: 1,
    branchname: "Crimson Paints",
    gst: "12345",
    phone: "1234567890",
  },
  {
    id: 1,
    branchname: "Crimson Paints Pvt Ltd. Agartala",
    gst: "12345",
    phone: "1234567890",
  },
  {
    id: 1,
    branchname: "Crimson Paints Pvt Ltd. Jharkhand",
    gst: "12345",
    phone: "1234567890",
  },
  {
    id: 1,
    branchname: "Crimson Paints Pvt Ltd. Kolkata",
    gst: "12345",
    phone: "1234567890",
  },
];
const InterCompany = () => {
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
      <InterCompanyTable
        columns={columns}
        data={tableData}
        idField={["id"]}
        editUrl=""
        deleteUrl=""
        salesmanurl=""
        subTableData={subTableData}
      />
    </UserTemplate>
  );
};

export default InterCompany;
