import * as React from "react";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { UserTemplate } from "@/components";
import { getSession } from "next-auth/react";
import { api } from "../utils/api";
import Router from "next/router";

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
    userType: "",
  };

  return <UserTemplate templateParams={templateParams}></UserTemplate>;
}

export default Dashboard;
