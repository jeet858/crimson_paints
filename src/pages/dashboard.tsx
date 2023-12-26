import * as React from "react";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { DashboardTile, UserTemplate } from "@/components";
import { getSession } from "next-auth/react";
import { BiUserCircle } from "react-icons/bi";
import { PiBridgeDuotone } from "react-icons/pi";
import { TbFileDollar } from "react-icons/tb";
import { LuFileLineChart, LuFileKey2 } from "react-icons/lu";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      userInfo: null,
    },
  };
};

function Dashboard({
  userInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: "admin",
  };

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="grid h-full w-full grid-cols-3 grid-rows-2 items-center justify-items-center p-[5%]">
        <DashboardTile
          name="Admin"
          href="/admin"
          icon={<BiUserCircle className="h-8 w-8" />}
        />
        <DashboardTile
          name="Branch"
          href="/inter-company"
          icon={<PiBridgeDuotone className="h-8 w-8" />}
        />
        <DashboardTile
          name="Master"
          href="#"
          icon={<LuFileKey2 className="h-8 w-8" />}
        />
        <DashboardTile
          name="Costing"
          href="#"
          icon={<TbFileDollar className="h-8 w-8" />}
        />
        <DashboardTile
          name="Report"
          href="#"
          icon={<LuFileLineChart className="h-8 w-8" />}
        />
      </div>
    </UserTemplate>
  );
}

export default Dashboard;
