import React from "react";
import { useRouter } from "next/router";
import { InsideNav, TableComponent, UserTemplate } from "@/components";

const masterbasicunit = () => {
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };

  const columns = [
    { header: "Symbol", field: "symbol" },
    { header: "Name", field: "name" },
    { header: "Short Code", field: "shortcode" },
  ];
  const data = [
    {
      symbol: "Gm",
      name: "Gram",
      shortcode: "Gram",
    },
    {
      symbol: "Kg",
      name: "Kilogram",
      shortcode: "Kg",
    },
    {
      symbol: "Lit",
      name: "Liter",
      shortcode: "Lit",
    },
    {
      symbol: "ML.",
      name: "Milliliter",
      shortcode: "ML.",
    },
  ];
  return (
    <UserTemplate templateParams={templateParams}>
      <div className="w-full">
        <InsideNav />
        <div className="flex items-end justify-center py-8">
          <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
          <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
            Basic Units
          </div>
          <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
        </div>
        <TableComponent columns={columns} data={data} />
      </div>
    </UserTemplate>
  );
};

export default masterbasicunit;
