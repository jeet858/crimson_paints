import * as React from "react";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { DashboardTile, UserTemplate } from "@/components";
import { getSession } from "next-auth/react";
import { api } from "../utils/api";
import Router from "next/router";
import { BiUserCircle } from "react-icons/bi";
import { PiBridgeDuotone } from "react-icons/pi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbFileDollar } from "react-icons/tb";

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
          href="#"
          icon={<BiUserCircle className="h-8 w-8" />}
        />
        <DashboardTile
          name="Kolkata"
          href="#"
          icon={<PiBridgeDuotone className="h-8 w-8" />}
        />
        <DashboardTile
          name="Other Location"
          href="#"
          icon={<HiOutlineLocationMarker className="h-8 w-8" />}
        />
        <DashboardTile
          name="Master"
          href="#"
          icon={<BiUserCircle className="h-8 w-8" />}
        />
        <DashboardTile
          name="Costing"
          href="#"
          icon={<TbFileDollar className="h-8 w-8" />}
        />
      </div>
    </UserTemplate>
  );
}

export default Dashboard;
