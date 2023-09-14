import React from "react";
import { useRouter } from "next/router";
import { InsideNav, TableComponent, UserTemplate } from "@/components";
import ColorTable from "~/components/tables/ColorTable";

const colors = () => {
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };

  const columns = [
    { header: "Color Name", field: "colorname" },
    { header: "Short Name", field: "shortname" },
    {
      header: "Color",
      field: "color",
      render: (color: string) => (
        <div
          style={{ backgroundColor: color, width: "149px", height: "41px" }}
        ></div>
      ),
    },
  ];
  const data = [
    {
      colorname: "AD 01",
      shortname: "AD 01",
      color: "#FF0000",
    },
    {
      colorname: "AD 01",
      shortname: "AD 02",
      color: "#FF0000",
    },
    {
      colorname: "AD 01",
      shortname: "AD 03",
      color: "#FF0000",
    },
    {
      colorname: "AD 01",
      shortname: "AD 04",
      color: "#FF0000",
    },
    {
      colorname: "AD 01",
      shortname: "AD 10",
      color: "#11009E",
    },
    {
      colorname: "AD 01",
      shortname: "AD 20",
      color: "#11009E",
    },
    {
      colorname: "AD 01",
      shortname: "AD 30",
      color: "#11009E",
    },
    {
      colorname: "AD 01",
      shortname: "AD 40",
      color: "#11009E",
    },
  ];
  return (
    <UserTemplate templateParams={templateParams}>
      <InsideNav />
      <div className="h-fit w-full p-4">
        <div className="flex items-end justify-center ">
          <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
          <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
            Colors
          </div>
          <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
        </div>
      </div>
      <ColorTable columns={columns} data={data} />
    </UserTemplate>
  );
};

export default colors;
