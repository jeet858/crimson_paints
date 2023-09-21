import React from "react";
import { useRouter } from "next/router";
import { InsideNav, TableComponent, UserTemplate } from "@/components";

const packagingunit = () => {
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };

  const columns = [
    { header: "Qty / Unit", field: "qtyunit" },
    { header: "Packaging", field: "packaging" },
    { header: "Name", field: "Name" },
  ];
  const data = [
    {
      qtyunit: "0.20 Kilogram",
      packaging: "Container",
      Name: "0.2 Kg Con.",
    },
    {
      qtyunit: "0.25 Kilogram",
      packaging: "Container",
      Name: "0.2 Kg Con.",
    },
    {
      qtyunit: "0.50 Kilogram",
      packaging: "Container",
      Name: "0.5 Kg Con.",
    },
    {
      qtyunit: "0.20 Kilogram",
      packaging: "Pouch.",
      Name: "0.2 Kg Con.",
    },
    {
      qtyunit: "0.20 Kilogram",
      packaging: "Container",
      Name: "0.2 Kg pou.",
    },
    {
      qtyunit: "0.50 Liter",
      packaging: "Container",
      Name: "0.2 ltr Con.",
    },
    {
      qtyunit: "1.00 Kilogram",
      packaging: "Container",
      Name: "1 Kg Con.",
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
      <TableComponent columns={columns} data={data} />
    </UserTemplate>
  );
};

export default packagingunit;
