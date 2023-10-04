import React from "react";
import { useRouter } from "next/router";
import { InsideNav, TableComponent, UserTemplate } from "@/components";
import ColorTable from "~/components/tables/ColorTable";
import { api } from "~/utils/api";

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
    { header: "Color Name", field: "color_name" },
    {
      header: "Color",
      field: "rgb_code",
      render: (color: string) => (
        <div
          style={{ backgroundColor: color, width: "149px", height: "41px" }}
        ></div>
      ),
    },
  ];
  const { data: colors, isLoading, isError } = api.colors.all.useQuery();
  if (isLoading) {
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
        <div>Still Loading</div>
      </UserTemplate>
    );
  }
  if (isError) {
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
        <div>Error</div>
      </UserTemplate>
    );
  }
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
      <ColorTable columns={columns} data={colors} />
    </UserTemplate>
  );
};

export default colors;
