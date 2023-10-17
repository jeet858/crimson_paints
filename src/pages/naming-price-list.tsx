import { InsideNav, TableComponent, UserTemplate } from "@/components";
import { useRouter } from "next/router";
import React from "react";

const NamingPriceList = () => {
  const router = useRouter();
  const { userType } = router.query;
  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };
  const columns = [{ header: "Name", field: "name" }];
  const Pricelist = [
    { name: "price list 1" },
    { name: "price list 2" },
    { name: "price list 3" },
    { name: "price list 4" },
  ];
  return (
    <UserTemplate templateParams={templateParams}>
      <div className="w-full">
        <InsideNav />
        <div className="h-fit w-full p-4">
          <div className="flex items-center justify-center">
            <div className="flex w-full items-end justify-center ">
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
              <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
                Price List
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
        <TableComponent
          columns={columns}
          data={Pricelist}
          idField={["name"]}
          editUrl=""
          deleteUrl=""
        />
      </div>
    </UserTemplate>
  );
};

export default NamingPriceList;
