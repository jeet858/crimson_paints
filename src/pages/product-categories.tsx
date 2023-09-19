import React from "react";
import { useRouter } from "next/router";
import { InsideNav, TableComponent, UserTemplate } from "@/components";

const ProductCategories = () => {
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };

  const columns = [
    { header: "Name", field: "name" },
    { header: "Code", field: "code" },
  ];
  const data = [
    {
      name: "Putty",
      code: "Putty",
    },
    {
      name: "Cement Paints",
      code: "Cem. Paint",
    },
    {
      name: "Water Primer",
      code: "Wtr. Primer",
    },
    {
      name: "Tilo Items",
      code: "Tilo Items",
    },
    {
      name: "Exterior Finish",
      code: "Exterior ",
    },
    {
      name: "Interior Finish",
      code: "Interior ",
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
              Product Categories
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

export default ProductCategories;
