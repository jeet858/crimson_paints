import React from "react";
import { useRouter } from "next/router";
import { InsideNav, TableComponent, UserTemplate } from "@/components";
import { api } from "~/utils/api";

const productpackaginglist = () => {
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
    { header: "Short Code", field: "short_code" },
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
  const handleEditClick = (row) => {
    console.log("edit");
  };
  const handleDeleteClick = (row) => {
    console.log("delet");
  };
  const {
    data: packagingType,
    isLoading,
    isError,
  } = api.packagingType.all.useQuery();
  if (isLoading)
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
          <p>Loading Basic Units</p>
        </div>
      </UserTemplate>
    );
  if (isError)
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
          <p>Error fetching Basic Units ❌</p>
        </div>
      </UserTemplate>
    );
  return (
    <UserTemplate templateParams={templateParams}>
      <InsideNav />
      <div className="w-full p-4">
        <div className="flex items-end justify-center ">
          <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
          <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
            Product Packaging List
          </div>
          <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
        </div>
      </div>
      <TableComponent
        columns={columns}
        data={packagingType}
        onDeleteClick={handleDeleteClick}
        onEditClick={handleEditClick}
        editUrl=""
        deleteUrl=""
      />
    </UserTemplate>
  );
};

export default productpackaginglist;
