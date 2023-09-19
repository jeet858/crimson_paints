import React from "react";
import { useRouter } from "next/router";
import { InsideNav, TableComponent, UserTemplate } from "@/components";

const HsnCode = () => {
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };

  const columns = [
    { header: "Code", field: "code" },
    { header: "Description", field: "description" },
  ];
  const data = [
    {
      code: "3206",
      description: "",
    },
    {
      code: "3208",
      description: "",
    },
    {
      code: "3209",
      description: "",
    },
    {
      code: "3210",
      description: "",
    },
    {
      code: "3213",
      description: "",
    },
    {
      code: "3214",
      description: "",
    },
    {
      code: "3215",
      description: "",
    },
    {
      code: "3218",
      description: "",
    },
    {
      code: "3219",
      description: "",
    },
  ];
  return (
    <UserTemplate templateParams={templateParams}>
      <InsideNav />
      <div className="h-fit w-full p-4">
        <div className="flex items-center justify-center">
          <div className="flex w-full items-end justify-center ">
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
              HSN Codes
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
      <TableComponent columns={columns} data={data} />
    </UserTemplate>
  );
};

export default HsnCode;
